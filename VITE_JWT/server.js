// JWT 를 위한 임시 백엔드 서버
// JWT 토큰의 생성, 검증 , 사용 방법을 작성합니다.
// 주요 기능 : 1. 사용자 로그인 (JWT 토큰 발급) 2. 보호된 API 엔드포인트 (JWT 토큰 검증) 3. 토큰 갱신

import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3001;

// JWT 비밀 (실제 프로덕션에서는 절대 이렇게 하면 안 됩니다!!!!!!!! 환경변수로 관리해야 합니다!)
// 이 키는 토큰을 서명하고 검증하는 데 사용됩니다. 절대 노출이 되어서는 안 됩니다!
const JWT_SECRET =
  "교육용_비밀키_실제로는_복잡한_랜덤_문자열을_사용해야_합니다";

// 미들웨어 설정
app.use(
  cors({
    origin: "http://localhost:5173", // 프론트엔드 주소
    credentials: true, // 쿠키를 포함한 요청 허용 (중요!)
  })
);
app.use(express.json()); // JSON 요청 본문 파싱
app.use(cookieParser()); // 쿠키 파싱 미들웨어

// 간단한 사용자 DB  -> 실제로는 진짜 데이터베이스가 쓰입니다.
const users = [
  { id: 1, username: "student1", password: "password123", role: "student" },
  { id: 2, username: "teacher", password: "teacher123", role: "teacher" },
];

// 1단계 : 로그인 엔드포인트
// 사용자가 로그인하면 JWT 토큰을 발급합니다.
/*
저장 방식 : 
- localStorage : 토큰을 JSON 응답으로 반환 (클라이언트가 직접 저장)
- cookie : HttpOnly 쿠키로 자동 저장 (XSS 공격 방어) 
*/

app.post("/api/login", (req, res) => {
  const { username, password, storageType = "localStorage" } = req.body;

  // 사용자 인증
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "사용자 이름 또는 비밀번호가 잘못되었습니다.",
    });
  }

  // JWT 토큰 생성
  // payload : 토큰에 포함될 정보 (민감한 정보는 포함하지 않습니다!)
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role,
    // lat : 발급 시간 (자동 추가됨)
    // exp : 만료 시간 (자동 추가됨)
  };

  // 토큰 생성 옵션
  const options = {
    expiresIn: "1h", // 만료시간 -> 1시간 후 만료
    issuer: "jwt-education-server", // 발급자
    subject: user.username, // 주제 (사용자)
  };

  // jwt 토큰 생성 (서명) -> 핵심!!
  const token = jwt.sign(payload, JWT_SECRET, options);

  // 확인용 콘솔
  console.log("로그인 성공", username);
  console.log("발급된 토큰", token);
  console.log("저장 방식", storageType);

  // 저장 방식에 따라 토큰 전달 방법 결정
  if (storageType === "cookie") {
    // HttpOnly 쿠키로 토큰 저장 -> Javascript 로 접근 불가 (XSS 공격 방어)
    // Secure : HTTPS 에서만 전송 (프로덕션 레벨)
    // SameSite : CSRF 공격 방어
    res.cookie("jwt_token", token, {
      httpOnly: true, // Javascript 접근 불가 (XSS 방어)
      secure: false, // 개발 환경에서는 false 프로덕션에서는 true (HTTPS 필요)
      sameSite: "lax", // CSRF 공격 방어
      maxAge: 60 * 60 * 1000, // 1시간 (밀리초)
      path: "/", // 모든 경로에서 접근 가능
    });

    // 쿠키로 저장했으므로 토큰을 응답에 포함하지 않음.
    res.json({
      success: true,
      message: "로그인 성공! (쿠키에 저장됨)",
      storageType: "cookie",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } else {
    // localStorage 저장 방식  : 토큰을 JSON 응답으로 반환.
    res.json({
      success: true,
      message: "로그인 성공! (로컬 스토리지에 저장됨)",
      token: token,
      storageType: "localStorage",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  }
});

/*
JWT 토큰 검증 미들웨어
토큰을 두 가지 방식으로 받을 수 있습니다.
1. Authorization 헤더 (localStorage 방식)
2. HttpOnly 쿠키 (cookie 방식)
*/

const verifyToken = (req, res, next) => {
  let token = null;

  // 1. 쿠키에서 토큰 확인 (HttpOnly 방식)
  if (req.cookies && req.cookies.jwt_token) {
    token = req.cookies.jwt_token;
    console.log("쿠키에서 토큰 발견");
  }

  // 2. Authorization 헤더에서 토큰 확인 (localStorage 방식)
  else {
    const authHeader = req.headers["authorization"];

    if (authHeader) {
      // 형식 : "Bearer <token>"
      token = authHeader.split(" ")[1];
      console.log("헤더에서 토큰 확인");
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "인증 토큰이 제공되지 않았습니다.",
    });
  }

  try {
    // 토큰 검증 및 디코딩
    // jwt.verify 는 다음을 확인합니다. 1. 토큰이 유요한 형식인지 2. 서명이 올바른지 (JWT_SECRET으로 검증) 3. 만료 시간이 지나지 않았는지
    const decoded = jwt.verify(token, JWT_SECRET);

    // 검증된 사용자 정보를 요청 객체에 추가
    req.user = decoded;

    console.log("토큰 검증 성공", decoded.username);

    // 다음 미들웨어로 진행
    next();
  } catch (error) {
    console.log("토큰 검증 실패", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "토큰이 만료되었습니다. 다시 로그인해주세요",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "유효하지 않은 토큰입니다.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "토큰 검증 중 오류가 발생했습니다.",
    });
  }
};

/*
 2단계 : 보호된 API 엔드포인트
 이 엔드포인트는 JWT토큰이 있어야만 접근할 수 있습니다.
*/

app.get("/api/profile", verifyToken, (req, res) => {
  // verifyToken 미들웨어를 통과했다라는 것은 토큰이 검증이 되어 유효하다라는 의미입니다.
  // req.user에는 토큰에서 디코딩된 사용자 정보가 들어옵니다.

  console.log("프로필 요청", req.user.username);

  res.json({
    success: true,
    message: "프로필 정보를 성공적으로 가져왔습니다.",
    user: {
      userId: req.user.userId,
      username: req.user.username,
      role: req.user.role,
      // 토큰에서 가져온 정보를 그대로 전달
    },
  });
});

/*
3단계 : 역할 기반 접근 제어
특정 역할 teacher 만 관리자 페이지에 접근 가능
*/

app.get("/api/admin", verifyToken, (req, res) => {
  // 토큰에서 역할 확인
  if (req.user.role !== "teacher") {
    return res.status(403).json({
      success: false,
      message: "관리자 권한이 필요합니다.",
    });
  }

  res.json({
    success: true,
    message: "관리자 페이지에 접근했습니다.",
    data: "이것은 관리자만 볼 수 있는 정보입니다.",
  });
});

/*
  4단계 : 토큰 갱신 엔드포인트
  만료되기 전에 토큰을 갱신할 수 있습니다.
*/
app.post("/api/refresh", verifyToken, (req, res) => {
  const { storageType = "localStorage" } = req.body;

  // 새로운 토큰 생성
  const payload = {
    userId: req.user.userId,
    username: req.user.username,
    role: req.user.role,
  };

  const options = {
    expiresIn: "1h",
    issuer: "jwt-education-server",
    subject: req.user.username,
  };

  const newToken = jwt.sign(payload, JWT_SECRET, options);

  console.log("토큰 갱신", req.user.username);

  if (storageType === "cookie") {
    // 쿠키로 새 토큰 저장
    res.cookie("jwt_token", newToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    res.json({
      success: true,
      message: "토큰이 갱신되었습니다 (쿠키에 저장됨)",
      storageType: "cookie",
    });
  } else {
    res.json({
      success: true,
      message: "토큰이 갱신되었습니다.",
      token: newToken,
      storageType: "localStorage",
    });
  }
});

/*
  로그아웃 엔드포인트
  쿠키를 삭제합니다.
*/
app.post("/api/logout", (req, res) => {
  // 쿠키 삭제
  res.clearCookie("jwt_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.json({
    success: true,
    message: "로그아웃되었습니다.",
  });
});

/**
 * 5단계 : 토큰 디코딩 엔드포인트 -> 저희 학습용입니다.
 * 토큰의 내용을 확인할 수 있는 엔드포인트 (요청)입니다.
 * 실제로는 보안상 노출되지 않아야 됩니다.
 */

app.post("/api/decode-token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "토큰이 제공되지 않았습니다.",
    });
  }

  try {
    // 검증 없이 디코딩 -> 학습용이니까
    // 실제로는 verify 를 사용해야 합니다.

    const decoded = jwt.decode(token, { complete: true });

    res.json({
      success: true,
      decoded: decoded,
      explanation: {
        header: "토큰 헤더 - 알고리즘 정보",
        payload: "토큰 페이로드 - 사용자 정보",
        signature: "토큰 서명 - 위조 방지",
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "토큰 디코딩 실패:" + error.message,
    });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log("JWT 서버 시작!");
});
