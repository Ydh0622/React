import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "사용자명은 필수입니다."],
    unique: true,
    trim: true,
    minlength: [3, "사용자 명은 최소 3자 이상이어야 합니다."],
    maxlength: [20, "사용자 명은 최대 20자까지 가능합니다."],
  },
  email: {
    type: String,
    required: [true, "이메일은 필수입니다."],
    unique: true,
    trim: true,
    lowercase: true,
    // 정규식 오타 수정 완료 (.\S+)
    match: [/^\S+@\S+\.\S+$/, "올바른 이메일 형식이 아닙니다."],
  },
  password: {
    type: String,
    required: [true, "비밀번호는 필수입니다."],
    minlength: [6, "비밀번호는 최소 6자입니다."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// [수정] next와 try/catch를 모두 제거한 깔끔한 로직
userSchema.pre("save", async function () {
  // 비밀번호가 수정되지 않았다면 함수 종료 (Mongoose가 알아서 다음으로 넘어감)
  if (!this.isModified("password")) return;

  // bcrypt 자체가 Promise를 반환하므로 await만 해주면 됩니다.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 비밀번호 비교 메서드
userSchema.methods.comparePassword = async function (candidatePassword) {
  // 에러 핸들링은 상위 라우터(auth.js)의 try/catch에서 처리되므로 여기서 뺄 수 있습니다.
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
