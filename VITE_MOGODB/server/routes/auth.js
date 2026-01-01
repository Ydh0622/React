import express from "express";
import User from "../models/User.js";

const router = express.Router();

// 회원가입
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "모든 필드를 입력해주세요",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "이미 존재하는 이메일 또는 사용자입니다.",
      });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({
      success: true,
      message: "회원가입이 완료되었습니다!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("회원가입 오류:", error);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다.",
      error: error.message,
    });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "이메일과 비밀번호를 입력해주세요",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "이메일 또는 비밀번호가 올바르지 않습니다.",
      });
    }

    // [보안 팁] 비밀번호 검증
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "이메일 또는 비밀번호가 올바르지 않습니다.",
      });
    }

    res.json({
      success: true,
      message: "로그인 성공!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생하였습니다.",
      error: error.message,
    });
  }
});

// 사용자 정보 조회
router.get("/me", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "사용자 ID가 필요합니다.",
      });
    }

    // .select("-password")는 비밀번호를 제외하고 가져온다는 뜻으로 매우 좋습니다.
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "사용자를 찾을 수 없습니다.",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("사용자 정보 조회 오류:", error);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생하였습니다.",
      error: error.message,
    });
  }
});

export default router;
