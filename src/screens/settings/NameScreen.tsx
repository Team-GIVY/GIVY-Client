import { useState } from 'react';

interface NameScreenProps {
  onBack?: () => void;
  onReauthenticate?: () => void;
}

function NameScreen({ onBack, onReauthenticate }: NameScreenProps) {
  // 사용자 정보 (실제로는 props나 상태 관리에서 가져올 수 있음)
  const [userName] = useState('김기비');
  const [authDate] = useState('2025. 12. 23. 화');

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      localStorage.setItem('currentScreen', 'settings');
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleReauthenticate = () => {
    if (onReauthenticate) {
      onReauthenticate();
    } else {
      console.log('본인인증 다시하기 클릭');
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        maxWidth: '402px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '23px 24px',
          backgroundColor: '#F5F5F5',
        }}
      >
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleBack}
          style={{
            position: 'absolute',
            left: '24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
        <span
          style={{
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 'bold',
            lineHeight: 1.57,
            letterSpacing: '-0.14px',
            textAlign: 'center',
            color: '#252525',
          }}
        >
          이름
        </span>
      </div>

      {/* 메인 컨텐츠 */}
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        {/* 티켓 카드 */}
        <div
          style={{
            width: '345px',
            height: '120px',
            marginTop: '33px',
            borderRadius: '16px',
            backgroundColor: '#fff',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '28px 32px',
            boxSizing: 'border-box',
          }}
        >
          {/* 왼쪽 노치 구멍 */}
          <div
            style={{
              position: 'absolute',
              left: '-10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#F5F5F5',
            }}
          />
          {/* 오른쪽 노치 구멍 */}
          <div
            style={{
              position: 'absolute',
              right: '-10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#F5F5F5',
            }}
          />

          {/* 이름 */}
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: '20px',
              fontWeight: 'bold',
              lineHeight: 1.6,
              letterSpacing: '-0.2px',
              textAlign: 'left',
              color: '#252525',
              marginBottom: '11px',
            }}
          >
            {userName}
          </span>

          {/* 본인인증 날짜 */}
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontWeight: 'normal',
              lineHeight: 1.5,
              letterSpacing: '-0.12px',
              textAlign: 'left',
              color: '#757575',
            }}
          >
            본인인증 날짜 : {authDate}
          </span>
        </div>

        {/* 유의 사항 */}
        <div
          style={{
            marginTop: '32px',
          }}
        >
          <p
            style={{
              fontFamily: 'Pretendard',
              fontSize: '10px',
              fontWeight: 'normal',
              lineHeight: 1.8,
              letterSpacing: '-0.1px',
              textAlign: 'left',
              color: '#a8a8a8',
              margin: 0,
              whiteSpace: 'pre-line',
            }}
          >
            {`유의 사항
* 타인의 정보로는 변경할 수 없습니다.
`}
          </p>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div
        style={{
          padding: '0 24px 8px 24px',
          paddingBottom: 'calc(8px + env(safe-area-inset-bottom))',
        }}
      >
        <button
          onClick={handleReauthenticate}
          style={{
            width: '100%',
            height: '54px',
            borderRadius: '12px',
            backgroundColor: '#545fe8',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: 1.5,
            letterSpacing: '-0.16px',
            color: '#fff',
          }}
        >
          본인인증 다시하기
        </button>
      </div>
    </div>
  );
}

export default NameScreen;
