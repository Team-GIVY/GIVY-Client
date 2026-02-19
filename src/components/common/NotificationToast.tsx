import { useState, useEffect } from 'react';

interface NotificationToastProps {
  title: string;
  body: string;
  targetType?: string;
  targetId?: string;
  onClose: () => void;
  onClick?: (targetType: string, targetId: string) => void;
}

function NotificationToast({
  title,
  body,
  targetType,
  targetId,
  onClose,
  onClick,
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 등장 애니메이션
    requestAnimationFrame(() => setIsVisible(true));

    // 4초 후 자동 닫기
    const timer = setTimeout(() => {
      handleClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleClick = () => {
    if (onClick && targetType) {
      onClick(targetType, targetId || '');
    }
    handleClose();
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: isVisible && !isExiting ? '16px' : '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '370px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        cursor: 'pointer',
        zIndex: 10000,
        transition: 'top 0.3s ease',
        border: '1px solid #E0E0E0',
      }}
    >
      {/* 알림 아이콘 */}
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          backgroundColor: '#F0F1FE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 0 1-3.46 0"
            stroke="#545FE8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 텍스트 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 600,
            color: '#252525',
            marginBottom: '2px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: 'Pretendard',
            fontSize: '13px',
            fontWeight: 'normal',
            color: '#8D8D8D',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {body}
        </div>
      </div>

      {/* 닫기 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '2px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="#A8A8A8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default NotificationToast;
