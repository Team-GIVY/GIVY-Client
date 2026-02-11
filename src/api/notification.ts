import apiClient from './client';
import type {
  ApiResponse,
  UserNotificationInfoListDTO,
  ReadUserNotification,
  NotificationListParams,
} from './types';

// 기기 토큰 등록
export const registerDeviceToken = async (fcmToken: string): Promise<void> => {
  const response = await apiClient.post<ApiResponse<void>>('/userNotifications/token', {
    fcmToken,
  });
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
};

// 07-01 사용자 알림 조회
export const getNotifications = async (
  params?: NotificationListParams
): Promise<UserNotificationInfoListDTO> => {
  const response = await apiClient.get<ApiResponse<UserNotificationInfoListDTO>>('/userNotifications', {
    params: {
      page: params?.page ?? 0,
      size: params?.size ?? 20,
      isRead: params?.isRead,
    },
  });
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

// 07-02 사용자 알림 읽음 처리
export const markNotificationAsRead = async (
  userNotificationId: number
): Promise<ReadUserNotification> => {
  const response = await apiClient.patch<ApiResponse<ReadUserNotification>>(
    `/userNotifications/${userNotificationId}`
  );
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

export const notificationApi = {
  getNotifications,
  markNotificationAsRead,
  registerDeviceToken,
};

export default notificationApi;
