import { useState, useEffect, useCallback } from 'react';
import { getFCMToken, onForegroundMessage } from '../utils/firebase';
import { notificationApi } from '../api';

interface UsePushNotificationReturn {
  isSupported: boolean;
  isPermissionGranted: boolean;
  fcmToken: string | null;
  isLoading: boolean;
  error: string | null;
  requestPermission: () => Promise<boolean>;
}

export const usePushNotification = (): UsePushNotificationReturn => {
  const [isSupported, setIsSupported] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 브라우저 지원 여부 확인
  useEffect(() => {
    const supported = 'Notification' in window && 'serviceWorker' in navigator;
    setIsSupported(supported);

    if (supported) {
      setIsPermissionGranted(Notification.permission === 'granted');
    }
  }, []);

  // 포그라운드 메시지 리스너 설정
  useEffect(() => {
    if (!isPermissionGranted) return;

    const unsubscribe = onForegroundMessage((payload) => {
      // 포그라운드에서 알림 표시
      const notification = payload as { notification?: { title?: string; body?: string } };
      if (notification.notification) {
        new Notification(notification.notification.title || '새 알림', {
          body: notification.notification.body || '',
          icon: '/icon-192x192.png',
        });
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, [isPermissionGranted]);

  // 알림 권한 요청 및 토큰 등록
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      setError('이 브라우저는 푸시 알림을 지원하지 않습니다.');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 서비스 워커 등록
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('[Push] 서비스 워커 등록 완료:', registration);

      // FCM 토큰 가져오기
      const token = await getFCMToken();
      if (!token) {
        setError('알림 권한이 거부되었거나 토큰을 가져올 수 없습니다.');
        return false;
      }

      setFcmToken(token);
      setIsPermissionGranted(true);

      // 백엔드에 토큰 등록
      try {
        await notificationApi.registerDeviceToken(token);
        console.log('[Push] 토큰 서버 등록 완료');
      } catch (err) {
        console.error('[Push] 토큰 서버 등록 실패:', err);
        // 서버 등록 실패해도 로컬에서는 동작
      }

      return true;
    } catch (err) {
      console.error('[Push] 권한 요청 실패:', err);
      setError('푸시 알림 설정에 실패했습니다.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  return {
    isSupported,
    isPermissionGranted,
    fcmToken,
    isLoading,
    error,
    requestPermission,
  };
};

export default usePushNotification;
