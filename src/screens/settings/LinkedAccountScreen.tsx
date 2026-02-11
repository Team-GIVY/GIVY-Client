import { useState, useEffect } from 'react';

// 소셜 로그인 아이콘 imports
import googleIcon from '../../assets/images/svg/ic_google.svg';
import kakaoIcon from '../../assets/images/svg/ic_kakao.svg';
import appleIcon from '../../assets/images/svg/ic_apple.svg';
// TODO: 네이버 아이콘 추가 시 아래 주석 해제
// import naverIcon from '../../assets/images/svg/ic_naver.svg';

type SocialProvider = 'naver' | 'google' | 'kakao' | 'apple' | 'email' | null;

interface LinkedAccountScreenProps {
  onBack?: () => void;
  onDisconnect?: (provider: SocialProvider) => void;
}

// 소셜 로그인 프로바이더 설정
const providerConfig: Record<string, { name: string; icon: string | null; bgColor: string }> = {
  naver: {
    name: '네이버',
    icon: null, // TODO: 네이버 아이콘 추가 시 naverIcon으로 변경
    bgColor: '#03C75A',
  },
  google: {
    name: '구글',
    icon: googleIcon,
    bgColor: '#FFFFFF',
  },
  kakao: {
    name: '카카오',
    icon: kakaoIcon,
    bgColor: '#FEE500',
  },
  apple: {
    name: '애플',
    icon: appleIcon,
    bgColor: '#000000',
  },
};

function LinkedAccountScreen({ onBack, onDisconnect }: LinkedAccountScreenProps) {
  const [linkedProvider, setLinkedProvider] = useState<SocialProvider>(null);
  const [linkedEmail, setLinkedEmail] = useState<string>('');

  useEffect(() => {
    // localStorage에서 로그인 정보 가져오기
    const loginProvider = localStorage.getItem('loginProvider') as SocialProvider;
    const loginEmail = localStorage.getItem('loginEmail') || 'givy123@email.com';

    setLinkedProvider(loginProvider);
    setLinkedEmail(loginEmail);
  }, []);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      localStorage.setItem('currentScreen', 'profileEdit');
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleDisconnect = () => {
    if (onDisconnect && linkedProvider) {
      onDisconnect(linkedProvider);
    } else {
      console.log('소셜 계정 해지 클릭:', linkedProvider);
    }
  };

  // 프로바이더 아이콘 렌더링
  const renderProviderIcon = (provider: string) => {
    const config = providerConfig[provider];
    if (!config) return null;

    if (provider === 'naver') {
      return (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: config.bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#FFFFFF',
            }}
          >
            N
          </span>
        </div>
      );
    }

    if (config.icon) {
      return (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: config.bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: provider === 'google' ? '1px solid #E5E5E5' : 'none',
          }}
        >
          <img
            src={config.icon}
            alt={config.name}
            style={{
              width: '24px',
              height: '24px',
            }}
          />
        </div>
      );
    }

    return null;
  };

  // 이메일 로그인이거나 소셜 계정이 없는 경우
  const hasLinkedAccount = linkedProvider && linkedProvider !== 'email' && providerConfig[linkedProvider];

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
          연결된 소셜 계정
        </span>
      </div>

      {/* 메인 컨텐츠 */}
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        {hasLinkedAccount ? (
          /* 소셜 계정 카드 */
          <div
            style={{
              position: 'relative',
              width: '100%',
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxSizing: 'border-box',
              marginTop: '16px',
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

            {/* 프로바이더 아이콘 */}
            {renderProviderIcon(linkedProvider)}

            {/* 계정 정보 */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              {/* 이메일 주소 */}
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: '-0.16px',
                  color: '#252525',
                }}
              >
                {linkedEmail}
              </span>

              {/* 프로바이더 이름 */}
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: 'normal',
                  lineHeight: 1.5,
                  letterSpacing: '-0.12px',
                  color: '#a8a8a8',
                }}
              >
                {providerConfig[linkedProvider].name}
              </span>
            </div>

            {/* 해지 버튼 */}
            <button
              onClick={handleDisconnect}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                backgroundColor: '#E5E5E5',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: 500,
                color: '#757575',
              }}
            >
              해지
            </button>
          </div>
        ) : (
          /* 연결된 소셜 계정 없음 */
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
            }}
          >
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
                color: '#a8a8a8',
              }}
            >
              연결된 소셜 계정이 없습니다.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default LinkedAccountScreen;
