import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken, saveTokens, clearAuth } from '../utils/token';
import type { ApiResponse, UserTokenRefreshResDTO } from './types';

// 강제 로그아웃 처리
const forceLogout = () => {
  console.log('[apiClient] 인증 만료 - 로그아웃 처리');
  clearAuth();
  localStorage.setItem('currentScreen', 'login');
  window.location.reload();
};

// API 기본 URL 설정 (환경변수 사용)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://43.202.26.68:8080';

// 재시도 플래그를 위한 확장 타입
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인증 상태 리셋 (로그인 성공 시 호출) - 하위 호환성 유지
export const resetAuthState = () => {
  // 현재는 특별한 상태 관리 없음
};

// Request Interceptor - 토큰 추가 및 디버그
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    console.log('[apiClient 요청]', config.method?.toUpperCase(), config.url);
    console.log('[apiClient 토큰]', token ? `Bearer ${token.substring(0, 30)}...` : '토큰 없음!');

    // 토큰 만료 시간 체크
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp ? new Date(payload.exp * 1000) : null;
        const now = new Date();
        console.log('[apiClient 토큰 만료]', exp ? exp.toLocaleString() : '만료정보없음', '| 현재:', now.toLocaleString(), '| 만료여부:', exp && exp < now ? '만료됨!' : '유효');
      } catch (e) {
        console.log('[apiClient 토큰 파싱 실패]');
      }
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - 401 에러 시 토큰 갱신 시도
apiClient.interceptors.response.use(
  (response) => {
    console.log('[apiClient 응답]', response.config.url, '성공');
    return response;
  },
  async (error: AxiosError<ApiResponse<null>>) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig | undefined;
    console.log('[apiClient 에러]', originalRequest?.url, error.response?.status);

    // 401 에러 상세 로그
    if (error.response?.status === 401) {
      console.log('[apiClient] 401 상세:', error.response.data);
      console.log('[apiClient] _retry 상태:', originalRequest?._retry);
    }

    // 401 에러 + 재시도 안 한 경우만 토큰 갱신 시도
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/')
    ) {
      console.log('[apiClient] 401 발생 - 토큰 갱신 시도');
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          console.log('[apiClient] refreshToken으로 갱신 요청');
          const response = await axios.post<ApiResponse<UserTokenRefreshResDTO>>(
            `${API_BASE_URL}/auth/refresh`,
            { refreshToken },
            { timeout: 10000 }
          );

          if (response.data.isSuccess && response.data.result) {
            const { accessToken, refreshToken: newRefreshToken } = response.data.result;
            saveTokens(accessToken, newRefreshToken);
            console.log('[apiClient] 토큰 갱신 성공');
            console.log('[apiClient] 새 토큰:', accessToken.substring(0, 50) + '...');
            console.log('[apiClient] 재요청 시작:', originalRequest.url);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          console.log('[apiClient] 토큰 갱신 실패:', refreshError);
          forceLogout();
          return Promise.reject(refreshError);
        }
      } else {
        console.log('[apiClient] refreshToken 없음');
        forceLogout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// 인증이 필요 없는 요청용 클라이언트
export const publicClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// publicClient - Authorization 헤더 명시적 제거
publicClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Authorization 헤더가 있으면 삭제
    if (config.headers) {
      delete config.headers.Authorization;
      delete config.headers.authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
