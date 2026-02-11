/**
 * LogoutModal - 로그아웃 확인 모달
 * example.css 스펙 참고
 */

interface LogoutModalProps {
  onCancel?: () => void;
  onConfirm?: () => void;
}

function LogoutModal({ onCancel, onConfirm }: LogoutModalProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onCancel}
    >
      {/* 모달 프레임 */}
      <div
        style={{
          width: '345px',
          height: '200px',
          padding: '31px 0 14px',
          borderRadius: '12px',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 제목 */}
        <span
          style={{
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: 1.5,
            letterSpacing: '-0.16px',
            textAlign: 'center',
            color: '#393939',
            marginBottom: '12px',
          }}
        >
          로그아웃
        </span>

        {/* 메시지 */}
        <span
          style={{
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1.57,
            letterSpacing: '-0.14px',
            textAlign: 'center',
            color: '#6b6b6b',
            marginBottom: '47px',
          }}
        >
          로그아웃 하시겠습니까?
        </span>

        {/* 버튼 영역 */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            paddingLeft: '14px',
            paddingRight: '13px',
          }}
        >
          {/* 아니요 버튼 */}
          <button
            onClick={onCancel}
            style={{
              width: '70px',
              height: '50px',
              borderRadius: '12px',
              backgroundColor: '#c6c6c6',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            아니요
          </button>

          {/* 로그아웃 버튼 */}
          <button
            onClick={onConfirm}
            style={{
              width: '240px',
              height: '50px',
              borderRadius: '12px',
              backgroundColor: '#7681fc',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
