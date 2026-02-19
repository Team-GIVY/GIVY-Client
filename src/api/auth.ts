import { apiClient, publicClient, resetAuthState } from './client';
import { saveTokens, clearAuth, getRefreshToken } from '../utils/token';
import type {
  ApiResponse,
  UserSignupDTO,
  UserInfoDTO,
  UserLoginDTO,
  UserLoginResDTO,
  UserProfileDTO,
  UserDetailDTO,
  UserTokenRefreshResDTO,
} from './types';

// 01-01 회원가입
export const signup = async (data: UserSignupDTO): Promise<UserInfoDTO> => {
  const response = await publicClient.post<ApiResponse<UserInfoDTO>>('/auth/signup', data);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

// 01-02 로그인
export const login = async (data: UserLoginDTO): Promise<UserLoginResDTO> => {
  console.log('[로그인] 요청 시작:', data.email);
  const response = await publicClient.post<ApiResponse<UserLoginResDTO>>('/auth/login', data);

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  const { accessToken, refreshToken, user } = response.data.result;
  console.log('[로그인] 응답 받음 - accessToken:', accessToken ? '있음' : '없음!');
  console.log('[로그인] 응답 받음 - refreshToken:', refreshToken ? '있음' : '없음!');

  saveTokens(accessToken, refreshToken, user);

  // 저장 확인
  const saved = localStorage.getItem('accessToken');
  console.log('[로그인] 저장 후 확인:', saved ? '토큰 저장 성공' : '토큰 저장 실패!');
  console.log('[로그인] 저장된 토큰:', saved?.substring(0, 50) + '...');

  // 인증 상태 리셋 (이전 실패 상태 초기화)
  resetAuthState();

  // 토큰이 저장되었는지 한번 더 확인
  await new Promise(resolve => setTimeout(resolve, 100));
  const tokenCheck = localStorage.getItem('accessToken');
  console.log('[로그인] 100ms 후 토큰 확인:', tokenCheck ? '있음' : '없음');

  // 성향 테스트 완료 여부 확인
  try {
    await apiClient.get('/tendency/me');
    localStorage.setItem('tendencyCompleted', 'true');
    console.log('[로그인] 성향 테스트 완료 상태');
  } catch {
    localStorage.setItem('tendencyCompleted', 'false');
    console.log('[로그인] 성향 테스트 미완료 상태');
  }

  // 스타트 챌린지 상태 확인
  try {
    const challengeRes = await apiClient.get('/start-challenge');
    const challengeData = challengeRes.data.result;
    if (challengeData && challengeData.status === 'COMPLETED') {
      localStorage.setItem('challengeCompleted', 'true');
      console.log('[로그인] 챌린지 완료 상태');
    } else if (challengeData && challengeData.status === 'IN_PROGRESS') {
      localStorage.setItem('challengeCompleted', 'false');
      localStorage.setItem('challengeProductId', String(challengeData.productId));
      localStorage.setItem('startChallengeId', String(challengeData.startChallengeId));
      console.log('[로그인] 챌린지 진행 중 - productId:', challengeData.productId);
    }
  } catch {
    localStorage.setItem('challengeCompleted', 'false');
    console.log('[로그인] 챌린지 없음');
  }

  // 홈 데이터 조회 (유저 상태 및 닉네임)
  try {
    const homeRes = await apiClient.get('/home');
    const homeData = homeRes.data.result;
    if (homeData) {
      localStorage.setItem('userStatus', homeData.status || '');
      localStorage.setItem('cachedNickname', homeData.nickname || '');
      console.log('[로그인] 홈 데이터 - status:', homeData.status, '| nickname:', homeData.nickname);
    }
  } catch {
    console.log('[로그인] 홈 데이터 조회 실패');
  }

  return response.data.result;
};

// 01-04 소셜 회원가입 (프로필 완성)
export const socialSignup = async (data: UserProfileDTO): Promise<void> => {
  const response = await apiClient.post<ApiResponse<object>>('/auth/social/signup', data);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
};

// 01-05 내 정보 조회
export const getMyInfo = async (): Promise<UserDetailDTO> => {
  const response = await apiClient.get<ApiResponse<UserDetailDTO>>('/auth/users/me');
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

// 01-06 로그아웃
export const logout = async (): Promise<void> => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      await apiClient.post<ApiResponse<object>>('/auth/logout', { refreshToken });
    } catch {
      // 로그아웃 요청 실패해도 로컬 토큰은 삭제
    }
  }
  clearAuth();
};

// 01-07 토큰 재발급
export const refreshToken = async (token: string): Promise<UserTokenRefreshResDTO> => {
  const response = await publicClient.post<ApiResponse<UserTokenRefreshResDTO>>('/auth/refresh', {
    refreshToken: token,
  });
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  const { accessToken, refreshToken: newRefreshToken } = response.data.result;
  saveTokens(accessToken, newRefreshToken);

  return response.data.result;
};

// 카카오 로그인 URL로 리다이렉트 (Netlify 프록시 경유)
export const redirectToKakaoLogin = (): void => {
  window.location.href = window.location.origin + '/api/oauth/kakao/login';
};

// 구글 ID 토큰으로 로그인 (Google Identity Services 방식)
export const googleIdTokenLogin = async (idToken: string): Promise<UserLoginResDTO> => {
  console.log('[구글 로그인] ID 토큰으로 로그인 요청');
  const response = await publicClient.post<ApiResponse<string>>('/oauth/google/id-token', { idToken });

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  // 백엔드에서 JWT(accessToken)만 반환하므로 이를 처리
  const jwt = response.data.result;
  console.log('[구글 로그인] JWT 발급 성공');

  saveTokens(jwt, '');
  resetAuthState();

  // 성향 테스트 완료 여부 확인
  try {
    await apiClient.get('/tendency/me');
    localStorage.setItem('tendencyCompleted', 'true');
  } catch {
    localStorage.setItem('tendencyCompleted', 'false');
  }

  // 스타트 챌린지 상태 확인
  try {
    const challengeRes = await apiClient.get('/start-challenge');
    const challengeData = challengeRes.data.result;
    if (challengeData && challengeData.status === 'COMPLETED') {
      localStorage.setItem('challengeCompleted', 'true');
    } else if (challengeData && challengeData.status === 'IN_PROGRESS') {
      localStorage.setItem('challengeCompleted', 'false');
      localStorage.setItem('challengeProductId', String(challengeData.productId));
      localStorage.setItem('startChallengeId', String(challengeData.startChallengeId));
    }
  } catch {
    localStorage.setItem('challengeCompleted', 'false');
  }

  // 홈 데이터 조회 (유저 상태 및 닉네임)
  try {
    const homeRes = await apiClient.get('/home');
    const homeData = homeRes.data.result;
    if (homeData) {
      localStorage.setItem('userStatus', homeData.status || '');
      localStorage.setItem('cachedNickname', homeData.nickname || '');
    }
  } catch {
    // 홈 데이터 조회 실패
  }

  return { accessToken: jwt, refreshToken: '' };
};

// 카카오 콜백 처리
export const handleKakaoCallback = async (code: string): Promise<UserLoginResDTO> => {
  const response = await publicClient.get<ApiResponse<UserLoginResDTO>>('/oauth/kakao/callback', {
    params: { code },
  });
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  const { accessToken, refreshToken, user } = response.data.result;
  saveTokens(accessToken, refreshToken, user);

  // 성향 테스트 완료 여부 확인
  try {
    await apiClient.get('/tendency/me');
    localStorage.setItem('tendencyCompleted', 'true');
  } catch {
    localStorage.setItem('tendencyCompleted', 'false');
  }

  // 스타트 챌린지 상태 확인
  try {
    const challengeRes = await apiClient.get('/start-challenge');
    const challengeData = challengeRes.data.result;
    if (challengeData && challengeData.status === 'COMPLETED') {
      localStorage.setItem('challengeCompleted', 'true');
    } else if (challengeData && challengeData.status === 'IN_PROGRESS') {
      localStorage.setItem('challengeCompleted', 'false');
      localStorage.setItem('challengeProductId', String(challengeData.productId));
      localStorage.setItem('startChallengeId', String(challengeData.startChallengeId));
    }
  } catch {
    localStorage.setItem('challengeCompleted', 'false');
  }

  // 홈 데이터 조회 (유저 상태 및 닉네임)
  try {
    const homeRes = await apiClient.get('/home');
    const homeData = homeRes.data.result;
    if (homeData) {
      localStorage.setItem('userStatus', homeData.status || '');
      localStorage.setItem('cachedNickname', homeData.nickname || '');
    }
  } catch {
    // 홈 데이터 조회 실패
  }

  return response.data.result;
};


export const authApi = {
  signup,
  login,
  socialSignup,
  getMyInfo,
  logout,
  refreshToken,
  redirectToKakaoLogin,
  googleIdTokenLogin,
  handleKakaoCallback,
};

export default authApi;
