import { useState, useEffect, useCallback } from 'react';
import { getFCMToken, onForegroundMessage } from '../utils/firebase';
import { notificationApi } from '../api';

interface ToastData {
  id: number;
  title: string;
  body: string;
  targetType?: string;
  targetId?: string;
}

interface UsePushNotificationReturn {
  isSupported: boolean;
  isPermissionGranted: boolean;
  fcmToken: string | null;
  isLoading: boolean;
  error: string | null;
  toasts: ToastData[];
  requestPermission: () => Promise<boolean>;
  removeToast: (id: number) => void;
  // [DEV] 테스트용 - 배포 시 제거
  addTestToast: (title: string, body: string, targetType?: string, targetId?: string) => void;
}

let toastIdCounter = 0;

export const usePushNotification = (): UsePushNotificationReturn => {
  const [isSupported, setIsSupported] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // 브라우저 지원 여부 확인
  useEffect(() => {
    const supported = 'Notification' in window && 'serviceWorker' in navigator;
    setIsSupported(supported);

    if (supported) {
      setIsPermissionGranted(Notification.permission === 'granted');
    }
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // [DEV] 테스트용 토스트 추가 - 배포 시 제거
  const addTestToast = useCallback((title: string, body: string, targetType?: string, targetId?: string) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, title, body, targetType, targetId }]);
  }, []);

  // 포그라운드 메시지 리스너 설정
  useEffect(() => {
    if (!isPermissionGranted) return;

    const unsubscribe = onForegroundMessage((payload) => {
      const msg = payload as {
        notification?: { title?: string; body?: string };
        data?: { targetType?: string; targetId?: string };
      };

      const title = msg.notification?.title || '새 알림';
      const body = msg.notification?.body || '';
      const targetType = msg.data?.targetType;
      const targetId = msg.data?.targetId;

      // 커스텀 토스트 추가
      const id = ++toastIdCounter;
      setToasts((prev) => [...prev, { id, title, body, targetType, targetId }]);
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

      // 백엔드에 토큰 등록 (로그인 상태일 때만)
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        try {
          await notificationApi.registerDeviceToken(token);
          console.log('[Push] 토큰 서버 등록 완료');
        } catch {
          // 401 등 인증 실패 시 무시 (로그인 갱신 후 재시도됨)
          console.log('[Push] 토큰 서버 등록 실패 - 다음 로그인 시 재시도');
        }
      } else {
        console.log('[Push] 로그인 전이라 서버 등록 건너뜀');
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
    toasts,
    requestPermission,
    removeToast,
    addTestToast,
  };
};

export default usePushNotification;
