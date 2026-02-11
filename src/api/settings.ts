import apiClient from './client';
import type {
  ApiResponse,
  UpdateProfileDTO,
  UpdatePasswordDTO,
  UpdateLanguageDTO,
  NotificationSettingDTO,
  UpdateNotificationDTO,
} from './types';

// 05-01 프로필 수정
export const updateProfile = async (data: UpdateProfileDTO): Promise<void> => {
  const response = await apiClient.patch<ApiResponse<void>>('/settings/users/profile', data);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
};

// 05-02 비밀번호 변경
export const updatePassword = async (data: UpdatePasswordDTO): Promise<void> => {
  const response = await apiClient.patch<ApiResponse<void>>('/settings/users/password', data);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
};

// 05-03 투자 성향 재설정 (삭제)
export const resetTendency = async (): Promise<void> => {
  console.log('[settings] resetTendency 호출');
  console.log('[settings] 현재 토큰:', localStorage.getItem('accessToken')?.substring(0, 50) + '...');
  const response = await apiClient.delete<ApiResponse<void>>('/settings/tendency');
  console.log('[settings] resetTendency 응답:', response.data);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
};

// 05-04 알림 설정 조회
export const getNotificationSettings = async (): Promise<NotificationSettingDTO> => {
  const response = await apiClient.get<ApiResponse<NotificationSettingDTO>>('/settings/notifications');
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

// 05-05 알림 수신 설정 변경
export const updateNotificationSettings = async (data: UpdateNotificationDTO): Promise<void> => {
  const response = await apiClient.patch<ApiResponse<void>>('/settings/notifications', data);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
};

// 05-06 앱 언어 변경
export const updateLanguage = async (data: UpdateLanguageDTO): Promise<void> => {
  const response = await apiClient.patch<ApiResponse<void>>('/settings/users/language', data);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
};

// 05-08 회원 탈퇴
export const deleteAccount = async (): Promise<void> => {
  const response = await apiClient.delete<ApiResponse<void>>('/settings/users');
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
};

export const settingsApi = {
  updateProfile,
  updatePassword,
  resetTendency,
  getNotificationSettings,
  updateNotificationSettings,
  updateLanguage,
  deleteAccount,
};

export default settingsApi;
