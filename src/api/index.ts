// API 클라이언트
export { apiClient, publicClient, resetAuthState } from './client';

// API 모듈
export { authApi, default as auth } from './auth';
export { guideApi, default as guide } from './guide';
export { settingsApi, default as settings } from './settings';
export { challengeApi, default as challenge } from './challenge';
export { notificationApi, default as notification } from './notification';
export { tendencyApi, default as tendency } from './tendency';
export { homeApi, default as home } from './home';

// 타입 export
export * from './types';

// 통합 API 객체
import authApi from './auth';
import guideApi from './guide';
import settingsApi from './settings';
import challengeApi from './challenge';
import notificationApi from './notification';
import tendencyApi from './tendency';
import homeApi from './home';

const api = {
  auth: authApi,
  guide: guideApi,
  settings: settingsApi,
  challenge: challengeApi,
  notification: notificationApi,
  tendency: tendencyApi,
  home: homeApi,
};

export default api;
