const API_BASE_URL = "http://localhost:5000/api/auth";

export const authAPI = {
  // 회원가입
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },

  // 로그인
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  },

  // 내 정보 가져오기 (수정 완료)
  getMe: async (userId) => {
    // API_BASE_URL 뒤에 '/'를 추가했습니다.
    const response = await fetch(`${API_BASE_URL}/me?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  },
};
