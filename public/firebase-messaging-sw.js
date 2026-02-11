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

// 백그라운드 메시지 수신
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] 백그라운드 메시지 수신:', payload);

  const notificationTitle = payload.notification?.title || '새 알림';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] 알림 클릭:', event);
  event.notification.close();

  // 앱 열기
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});
