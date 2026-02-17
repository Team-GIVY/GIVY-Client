import { useState, useEffect } from 'react';
import { notificationApi } from '../../api';
import type { UserNotificationInfoDTO } from '../../api/types';

interface NotificationItem {
  id: string;
  category: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

interface NotificationScreenProps {
  onBack?: () => void;
  onSettings?: () => void;
  onNotificationClick?: (id: string) => void;
}

// 시간 포맷팅 함수
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  return date.toLocaleDateString('ko-KR');
};

// 알림 타입을 카테고리 이름으로 변환
const getCategoryName = (type: string): string => {
  const categoryMap: Record<string, string> = {
    CHALLENGE: '챌린지',
    GUIDE: '가이드',
    AD: '광고',
    SYSTEM: '시스템',
    MARKET_OPEN: '장 오픈',
  };
  return categoryMap[type] || '알림';
};

function NotificationScreen({
  onBack,
  onSettings,
  onNotificationClick,
}: NotificationScreenProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 알림 목록 로드
  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await notificationApi.getNotifications({ page: 0, size: 20 });
        const formattedNotifications: NotificationItem[] = response.userNotificationInfo.map(
          (item: UserNotificationInfoDTO) => ({
            id: String(item.userNotificationId),
            category: getCategoryName(item.notificationType),
            title: item.title,
            description: item.body,
            time: formatTime(item.deliveredAt),
            isRead: item.isRead,
          })
        );
        setNotifications(formattedNotifications);
      } catch (err) {
        console.error('알림 로드 실패:', err);
        setNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications();
  }, []);

  // 알림 클릭 시 읽음 처리
  const handleNotificationClick = async (id: string) => {
    try {
      await notificationApi.markNotificationAsRead(Number(id));
      // 로컬 상태 업데이트
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error('알림 읽음 처리 실패:', err);
    }
    onNotificationClick?.(id);
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        maxWidth: '402px',
        margin: '0 auto',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 헤더 */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* 뒤로가기 버튼 */}
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="#252525"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 타이틀 */}
        <h1
          style={{
            fontFamily: 'Pretendard',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#252525',
            margin: 0,
          }}
        >
          알림
        </h1>

        {/* 설정 버튼 */}
        <button
          onClick={onSettings}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="#252525" strokeWidth="2" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              stroke="#252525"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>

      {/* 알림 리스트 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
            <p style={{ fontFamily: 'Pretendard', fontSize: '14px', color: '#a9a9a9' }}>
              로딩 중...
            </p>
          </div>
        ) : notifications.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {/* 상단: 카테고리 + 시간 */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Pretendard',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#a9a9a9',
                    }}
                  >
                    {notification.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        fontFamily: 'Pretendard',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#a9a9a9',
                      }}
                    >
                      {notification.time}
                    </span>
                    {/* 읽지 않은 알림 표시 */}
                    {!notification.isRead && (
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#545fe8',
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* 타이틀 */}
                <h3
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#252525',
                    margin: '0 0 4px 0',
                    lineHeight: 1.5,
                  }}
                >
                  {notification.title}
                </h3>

                {/* 설명 */}
                <p
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#a9a9a9',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {notification.description}
                </p>
              </button>
            ))}
          </div>
        ) : (
          /* 알림 없음 */
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
                color: '#a9a9a9',
              }}
            >
              새로운 알림이 없습니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationScreen;
