import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, type Messaging } from 'firebase/messaging';

// Firebase 설정
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Messaging 인스턴스 (브라우저 환경에서만)
let messaging: Messaging | null = null;

if (typeof window !== 'undefined' && 'Notification' in window) {
  messaging = getMessaging(app);
}

// FCM 토큰 가져오기
export const getFCMToken = async (): Promise<string | null> => {
  if (!messaging) {
    console.log('[FCM] 메시징을 지원하지 않는 환경입니다.');
    return null;
  }

  try {
    // 알림 권한 요청
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('[FCM] 알림 권한이 거부되었습니다.');
      return null;
    }

    // FCM 토큰 가져오기
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (token) {
      console.log('[FCM] 토큰 발급 성공');
      return token;
    } else {
      console.log('[FCM] 토큰을 가져올 수 없습니다.');
      return null;
    }
  } catch (error) {
    console.error('[FCM] 토큰 발급 실패:', error);
    return null;
  }
};

// 포그라운드 메시지 수신 리스너
export const onForegroundMessage = (callback: (payload: unknown) => void) => {
  if (!messaging) return;

  return onMessage(messaging, (payload) => {
    console.log('[FCM] 포그라운드 메시지 수신:', payload);
    callback(payload);
  });
};

export { app, messaging };
