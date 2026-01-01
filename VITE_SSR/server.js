import fs from "node:fs/promises";
import express from "express";
import { Transform } from "node:stream"; // Node.js Transform 스트림을 가져옵니다.  스트림 데이터 조작에 사용됩니다.

// constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/"; // ㄱ
const ABORT_DELAY = 10000; // 스트리밍 지연시간(10초)

// Cached production assets
// 프로덕션 환경에서는 HTML 템플릿을 한 번만 읽어 캐시합니다.
const templateHTML = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";

// Create http server
const app = express();

// Add Vite or respective production middlewares
// @type {import ('vite').ViteDevServer | undefined}
let vite;
if (!isProduction) {
  // 개발 환경 : Vite Dev Server를 생성하고 미들웨어로 사용합니다.
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  // 프로덕션 환경 : 압축(compression)과 정적 파일 제공(sirv) 미들웨어를 사용합니다.
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
// 모든 요청("all" or "*all")을 ssr 처리합니다.
app.use("*all", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    // @type {string}
    let template;
    // @type {import('./src/entry-server.js).render}
    let render;
    if (!isProduction) {
      // 개발 환경 : HTML 템플릿을 항상 새로 읽고, Vite의 변환 거칩니다.
      template = await fs.readFile("./index.html", "utf-8"); // ㄴ
      template = await vite.transformIndexHtml(url, template); // SSR 렌더링 함수를 Vite의 모듈 로더를 통해 로드합니다.
      render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
    } else {
      // 프로덕션 환경 : 캐시된 템플릿을 사용하고, 빌드된 서버 엔트리를 불러옵니다.
      template = templateHTML;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    let didError = false; // 에러 발생 여부 플래그 // renderToPipeableStream 호출 및 콜백 처리

    const { pipe, abort } = render(url, {
      // 셀 렌더링 중 오류 발생 시 :  HTTP 500 응답을 즉시 보냅니다.
      onShellError() {
        res.status(500);
        res.set({ "Content-Type": "text/html" });
        res.send("<h1>Something went wrong</h1>");
      },

      // onShellReady : HTML 셀이 준비되었을 때 스트리밍을 시작합니다 중요한 부분.
      onShellReady() {
        res.status(didError ? 500 : 200);
        res.set({ "Content-Type": "text/html" });

        // HTML 템플릿을 ''마커를 기준으로 앞/뒤 부분으로 분리합니다.
        const [htmlStart, htmlEnd] = template.split("<!--app-html-->");
        let htmlEnded = false;

        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            // 이 로직은 entry-server.jsx의 <'vite=streaming=end'> 마커를 처리합니다.
            if (!htmlEnded) {
              chunk = chunk.toString();
              if (chunk.endsWith("<vite-streaming-end></vite-streaming-end>")) {
                res.write(chunk.slice(0, -41) + htmlEnd, "utf-8");
                htmlEnded = true;
              } else {
                // 마커가 없으면 (스트리밍 진행 중), 데이터를 그대로 응답 스트림에 담는다.
                res.write(chunk, "utf-8");
              }
            } else {
              // htmlEnd가 이미 추가되었다면, 남은 모든 데이터(js)를 그대로 씁니다.
              res.write(chunk, encoding);
            }
            callback();
          },
        });

        //Transform 스트림이 종료되면 HTTP 응답도 종료합니다.
        transformStream.on("finish", () => {
          res.end();
        });

        // 1. HTML 템플릿의 시작 부분(<body>이전, <div id="root"> 이전)을 먼저 스트림에 씁니다.

        res.write(htmlStart);

        // 2. React의 렌더링 스트림을 커스컴 Transform Stream을 거쳐 응답 스트림에 연결합니다.

        pipe(transformStream);
      },

      // 스트리밍 도중 오류 발 생 시 : 에러 플러그 설정 및 콘솔 로깅
      onError(error) {
        didError = true;
        console.error(error);
      },
    });

    // 타임 아웃 처리 : 10초 후에도 렌더링이 완료되지 않으면 스트림을 강제 중단합니다.
    setTimeout(() => {
      abort();
    }, ABORT_DELAY);
  } catch (e) {
    // 에러 처리: 스택 트레이스 수정 및 500 응답 전송
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
