// CORS 실습을 위한 Node.js 기본 서버
// 실행 방법 : 터미널에서 'node s  sever.js' or npm run server 입력
// 사전 준비 : package.json "type" : "module" 설정이 되어 있어야 import 문법 사용 가능

import http from "http";

// 서버 생성 (요청이 들어올 때마다 실행됩니다.)
const server = http.createServer((req, res) => {
  // case 1 CORS 에러가 발생하는 상황 (실패 예시)
  if (req.url === "/api/data") {
    // 브라우저가 허락한 출처(origin)를 명시하지 않았습니다.
    // 프론트엔드 (localhost:5173)에서 요청하면, 브라우저는 서버가 허락을 해주지 않아 차단합니다.
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Hello from server",
        data: "This will cause CORS error", // 브라우저 콘솔에 빨간색 CORS에러가 뜹니다.
        timeStamp: new Date().toISOString(),
      })
    );
  }

  // case 2 CORS를 허용하는 상황 (성공 예시)
  else if (req.url === "/api/data-cors") {
    res.writeHead(200, {
      "Content-Type": "application/json",

      // 1. [origin] "http://localhost:5173" 에서 오는 요청을 받아줘라
      // 주의할 점 -> 개발단계에서 * 쓰더라도 완성단계에서는 특정 도메인만 받아주자
      "Access-Control-Allow-Origin": "http://localhost:5173",

      // 2. [Methods] "ex ) GET,POST,PUT,DELETE"
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",

      // 3. [Headers] "Content-Type" 같은 특정 헤더를 포함한 요청도 허용한다.
      "Access-Control-Allow-Headers": "Content-Type",
    });

    res.end(
      JSON.stringify({
        message: "Hello from CORS-enabled server!",
        data: "This works because CORS headers are set", // 이제 에러 없이 데이터를 잘 받아옵니다.
        timeStamp: new Date().toISOString(),
      })
    );
  }

  // case 3 Preflight 요청 처리 (사전 검사)
  // 브라우저는 진짜 요청(GET/POST)을 보내기 전에, 보내도 되는지 미리 물어봅니다
  // 이 사전 요청이 바로 OPTIONS 메서드입니다.
  else if (req.method === "OPTIONS") {
    res.writeHead(200, {
      // 가능하다라고 보내주고, 지금 보내는 방법(Method)이랑 헤더(Header) 가 가능하다고 반응합니다.
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end(); //내용은 필요 없고, 헤더만 잘 보내주면 됩니다.
  }

  // case 4 없는 주소로 요청했을 떄 (404처리)
  else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
  console.log(`테스트 엔드포인트`);
  console.log(
    ` 1. 실패 케이스 : http://localhost:${PORT}/api/data (CORS 헤더 없음 ->브라우저 차단)`
  );
  console.log(
    ` 2. 성공 케이스 : http://localhost:${PORT}/api/data-cors (CORS 헤더 있음 ->통과)`
  );
  console.log(
    ` *. 프론트엔드(http://localhost:5173)에서 fetch/axios로 요청해야 테스트 가능합니다.`
  );
});
