const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_INFO_KEY = 'userInfo';

export interface StoredUserInfo {
  userId: number;
  username: string;
  email: string;
}

// Access Token
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

// Refresh Token
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const removeRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// User Info
export const getUserInfo = (): StoredUserInfo | null => {
  const data = localStorage.getItem(USER_INFO_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const setUserInfo = (user: StoredUserInfo): void => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
};

export const removeUserInfo = (): void => {
  localStorage.removeItem(USER_INFO_KEY);
};

// 모든 토큰 및 사용자 정보 삭제 (로그아웃 시)
export const clearAuth = (): void => {
  removeAccessToken();
  removeRefreshToken();
  removeUserInfo();
};

// 토큰 저장 (로그인 성공 시)
export const saveTokens = (accessToken: string, refreshToken: string, user?: StoredUserInfo): void => {
  if (accessToken) {
    setAccessToken(accessToken);
  }
  if (refreshToken) {
    setRefreshToken(refreshToken);
  }
  if (user) {
    setUserInfo(user);
  }
};

// 로그인 여부 확인
export const isLoggedIn = (): boolean => {
  return !!getAccessToken();
};

// JWT 토큰 디코딩 (만료 시간 확인용)
export const decodeToken = (token: string): { exp?: number; sub?: string; role?: string } | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
};

// 토큰 만료 여부 확인
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return false;
  const now = Math.floor(Date.now() / 1000);
  return decoded.exp < now;
};

// 토큰 상태 디버깅 (콘솔용)
export const debugTokenStatus = (): void => {
  const token = getAccessToken();
  if (!token) {
    console.log('[토큰 디버그] 토큰 없음');
    return;
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    console.log('[토큰 디버그] 토큰 디코딩 실패');
    return;
  }

  console.log('[토큰 디버그] 페이로드:', decoded);

  if (decoded.exp) {
    const expDate = new Date(decoded.exp * 1000);
    const now = new Date();
    const isExpired = expDate < now;
    console.log('[토큰 디버그] 만료 시간:', expDate.toLocaleString());
    console.log('[토큰 디버그] 현재 시간:', now.toLocaleString());
    console.log('[토큰 디버그] 만료 여부:', isExpired ? '만료됨' : '유효함');
  } else {
    console.log('[토큰 디버그] 만료 시간 정보 없음');
  }
};
