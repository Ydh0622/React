import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// .env 파일 로드 (server 폴더 내) -> 필수는 아님 .env파일을 못 잡는 경우가 있어서 추가함
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envResult = dotenv.config({ path: join(__dirname, ".env") });

if (envResult.error) {
  console.warn(".env파일을 찾을 수 없습니다.");
} else {
  console.log(".env 파일 로드 성공");
}

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB 연결
const MongoDB_URI = process.env.MongoDB_URI;

async function connectDB() {
  try {
    await mongoose.connect(MongoDB_URI, { bufferCommands: false });
    console.log("MongoDB 연결 성공!");
    console.log(`데이터베이스 : ${mongoose.connection.name}`);
  } catch (error) {
    console.error("MongoDB 연결 실패!", error.message);
    console.log("MongoDB 서버가 실행 중인지 확인해보세요");
  }
}

connectDB();

// 라우트
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.json({ message: "회원 인증 API 서버가 실행 중입니다." });
});

// MongoDB 연결 상태 확인 미들웨어
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: "데이터베이스에 연결할 수 없습니다.",
      error: "Database connection not available",
    });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
