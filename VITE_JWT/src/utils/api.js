/**
 * API 통신을 위한 유틸리티 함수
 * JWT토큰을 사용한 API통신을 위한 헬퍼 함수입니다.
 *
 * 두 가지 저장 방식을 사용합니다.
 * 1. localStorage -> 클라이언트에서 직접 관리 , 개발 테스트에서 많이 쓰임
 * 2. cookie => HttpOnly 쿠키로 서버에서 관리 , 프로덕션에서 많이 쓰임
 */

const API_BASE_URL = "http://localhost:3001/api";

// 현재 사용 중인 저장 방식 (기본값 : localStorage)
let currentStorageType = localStorage.getItem("storage_type") || "localStorage";

// 저장 방식 설정
export const setStorageType = (type) => {
  currentStorageType = type;
  localStorage.setItem("storage_type", type);
};

// 현재 저장 방식 가져오기
export const getStorageType = () => {
  return currentStorageType;
};

// 로컬 스토리지에서 토큰 가져오기
export const getToken = () => {
  if (currentStorageType === "cookie") {
    return null;
  }
  return localStorage.getItem("jwt_token");
};

export const setToken = (token) => {
  if (currentStorageType === "cookie") {
    return;
  }
  localStorage.setItem("jwt_token", token);
};

// 로컬 스토리지에서 토큰 제거하기 -> 로그아웃
export const removeToken = () => {
  if (currentStorageType === "localStorage") {
    localStorage.removeItem("jwt_token");
  }
  // 쿠키는 서버에서 삭제됨
};

/**
 * API 요청 헤더 생성
 * localStorage 방식 : Authorization 헤더에 토큰 포함
 * cookie 방식 : credential : 'include'로 쿠기 전송
 *
 */

const getAuthHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  // localStorage 방식인 경우, 헤더에 토큰 추가

  if (currentStorageType === "localStorage") {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

// 쿠키 방식
const getFetchOptions = (method = "GET", body = null) => {
  const options = {
    method,
    headers: getAuthHeaders(),
    credentials: "include", //쿠키를 포함한 요청 -> 중요!
  };

  if (body) {
    options.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  return options;
};

/**
 *  로그인 API 호출
 *  @param {string} username - 사용자 이름
 *  @param {string} password - 비밀번호
 *  @param {string} storageType - 저장 방식 [ 로컬 스토리지 or 쿠키 ]
 */

export const login = async (username, password, storageType = null) => {
  try {
    const type = storageType || currentStorageType;

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", //쿠키 전송을 위해 필요
      body: JSON.stringify({ username, password, storageType: type }), // ㄱ
    });

    const data = await response.json();

    if (data.success) {
      // localStorage 방식인 경우에만 토큰 저장
      if (data.token) {
        setToken(data.token); // ㄴ
      }

      return {
        success: true,
        user: data.user,
        token: data.token || null,
        storageType: data.setStorageType,
      };
    } else {
      return { success: false, message: data.message || "로그인 실패" };
    }
  } catch (err) {
    console.error("로그인 오류", err);
    return { success: false, message: "서버 연결 오류" };
  }
};

/**
 * 프로필 조회 API 호출
 *
 * 로컬 스토리지 방식 : Authorization 헤더에 토큰 포함
 * 쿠키 방식 : 쿠기가 자동으로 전송됨 -> 단점은 네트워크 전송간에 공격을 당할 수 있음
 */

export const getProfile = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/profile`,
      getFetchOptions("GET")
    );

    const data = await response.json();

    if (data.success) {
      return { success: true, user: data.user };
    } else {
      // 토큰이 만료되었거나 유효하지 않은 경우
      if (response.status === 401) {
        removeToken();
      }
      return { success: false, message: data.message || "프로필 조회 실패" };
    }
  } catch (error) {
    console.error("프로필 조회 오류", error);
    return { success: false, message: "서버 연결 오류" };
  }
};

// 관리자 페이지 API 호출

export const getAdminData = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin`,
      getFetchOptions("GET")
    );

    const data = await response.json();

    if (data.success) {
      return { success: true, data: data.data };
    } else {
      if (response.status === 401) {
        removeToken();
      }
      return { success: false, message: data.message || "접근 실패" };
    }
  } catch (error) {
    console.error("관리자 페이지 오류", error);
    return { success: false, message: "서버 연결 오류" };
  }
};

// 토큰 갱신 API 호출
export const refreshToken = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/refresh`,
      getFetchOptions("POST", { storageType: currentStorageType })
    );

    const data = await response.json();

    if (data.success) {
      // 로컬 방식에서는 토큰 저장
      if (data.token) {
        setToken(data.token);
      }
      return { success: true, token: data.token || null };
    } else {
      return { success: false, message: data.message || "토큰 갱신 실패" };
    }
  } catch (error) {
    console.error("토큰 갱신 오류", error);
    return { success: false, message: "서버 연결 오류" };
  }
};

// 로그아웃 API 호출 -> 쿠키 삭제하기 위해 서버 요청

export const logout = async () => {
  try {
    // 쿠키 방식인 경우 서버에 로그아웃 요청
    if (currentStorageType === "cookie") {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    }

    // 로컬 방식은 경우 클라이언트에서 삭제
    removeToken();

    return { success: true };
  } catch (error) {
    console.error("로그아웃 오류", error);
    return { success: false };
  }
};

// 토큰 디코딩 -> 학습용 O 실전은 X
export const decodeToken = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/decode-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("디코딩 오류", error);
    return { success: false, message: "서버 연결 오류" };
  }
};
