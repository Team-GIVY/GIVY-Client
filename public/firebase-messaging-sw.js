// Firebase 메시징 서비스 워커
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// Firebase 설정 (환경변수 사용 불가 - 직접 입력)
firebase.initializeApp({
  apiKey: 'AIzaSyCRehLvsTbyH3QrATk7R81F0p1Z4dPDUTI',
  authDomain: 'givy-3f1a1.firebaseapp.com',
  projectId: 'givy-3f1a1',
  storageBucket: 'givy-3f1a1.firebasestorage.app',
  messagingSenderId: '449238967064',
  appId: '1:449238967064:web:12c6e8cfd76b0c7cd7346d',
});

const messaging = firebase.messaging();

// targetType → screen 매핑
const TARGET_SCREEN_MAP = {
  CHALLENGE: 'startChallenge',
  GUIDE: 'guide',
  GUIDE_DETAIL: 'guideDetail',
  NOTIFICATION: 'notification',
  HOME: 'home',
  SETTINGS: 'settings',
};

// 백그라운드 메시지 수신
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] 백그라운드 메시지 수신:', payload);

  const notificationTitle = payload.notification?.title || '새 알림';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    data: payload.data || {},
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 처리 → 딥링크
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] 알림 클릭:', event);
  event.notification.close();

  const data = event.notification.data || {};
  const targetType = data.targetType || '';
  const targetId = data.targetId || '';

  // 딥링크 URL 생성
  let url = '/';
  const screen = TARGET_SCREEN_MAP[targetType];
  if (screen) {
    url = `/?screen=${screen}`;
    if (targetId) {
      url += `&id=${targetId}`;
    }
  } else if (targetType) {
    // 매핑에 없는 경우 알림 목록으로
    url = '/?screen=notification';
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // 이미 열린 창이 있으면 해당 창으로 이동
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          client.navigate(url);
          return;
        }
      }
      // 열린 창이 없으면 새로 열기
      return clients.openWindow(url);
    })
  );
});
