import { useState } from 'react';

// 소셜 로그인 아이콘 imports
import googleIcon from '../../assets/images/svg/ic_google.svg';
import kakaoIcon from '../../assets/images/svg/ic_kakao.svg';
import appleIcon from '../../assets/images/svg/ic_apple.svg';
import givyLogo from '../../assets/images/png/img_logo_givy_symbol.png';
// TODO: 네이버 아이콘 추가 시 아래 주석 해제
// import naverIcon from '../../assets/images/svg/ic_naver.svg';

interface EmailItem {
  id: string;
  email: string;
  provider: 'naver' | 'google' | 'kakao' | 'apple' | 'email';
  isDefault: boolean;
}

interface EmailEditScreenProps {
  onBack?: () => void;
  onAddEmail?: () => void;
  onSelectEmail?: (id: string) => void;
  userEmail?: string;
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
  email: {
    name: '이메일',
    icon: null,
    bgColor: '#545fe8',
  },
};

function EmailEditScreen({ onBack, onAddEmail, onSelectEmail, userEmail }: EmailEditScreenProps) {
  // 로그인된 이메일 가져오기
  const currentEmail = userEmail || localStorage.getItem('loginEmail') || 'givy123@email.com';
  const currentProvider = (localStorage.getItem('loginProvider') || 'email') as EmailItem['provider'];

  const [emails] = useState<EmailItem[]>([
    {
      id: '1',
      email: currentEmail,
      provider: currentProvider,
      isDefault: true,
    },
  ]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      localStorage.setItem('currentScreen', 'profileEdit');
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleAddEmail = () => {
    if (onAddEmail) {
      onAddEmail();
    } else {
      console.log('이메일 직접 등록하기 클릭');
    }
  };

  const handleSelectEmail = (id: string) => {
    if (onSelectEmail) {
      onSelectEmail(id);
    } else {
      console.log('이메일 선택:', id);
    }
  };

  // 이메일 도메인에서 로고 결정
  const getEmailDomainIcon = (email: string): { icon: string | null; bgColor: string; label: string } => {
    const domain = email.split('@')[1]?.toLowerCase() || '';
    if (domain.includes('naver')) return { icon: null, bgColor: '#03C75A', label: 'N' };
    if (domain.includes('google') || domain.includes('gmail')) return { icon: googleIcon, bgColor: '#FFFFFF', label: '' };
    if (domain.includes('kakao') || domain.includes('daum')) return { icon: kakaoIcon, bgColor: '#FEE500', label: '' };
    if (domain.includes('apple') || domain.includes('icloud')) return { icon: appleIcon, bgColor: '#000000', label: '' };
    return { icon: givyLogo, bgColor: '#FFFFFF', label: '' };
  };

  const renderProviderIcon = (provider: string, email?: string) => {
    // 이메일 주소가 있으면 도메인 기반으로 아이콘 결정
    const domainInfo = email ? getEmailDomainIcon(email) : null;
    const config = domainInfo || providerConfig[provider] || providerConfig['email'];

    if (domainInfo) {
      if (domainInfo.label) {
        // 텍스트 아이콘 (네이버 N)
        return (
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: domainInfo.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontFamily: 'Pretendard', fontSize: '24px', fontWeight: 'bold', color: '#FFFFFF' }}>
              {domainInfo.label}
            </span>
          </div>
        );
      }
      // 이미지 아이콘
      return (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: domainInfo.bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: domainInfo.bgColor === '#FFFFFF' ? '1px solid #E5E5E5' : 'none',
          }}
        >
          <img src={domainInfo.icon!} alt="" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
        </div>
      );
    }

    // 폴백: provider 기반
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
          <img src={config.icon} alt={config.name} style={{ width: '24px', height: '24px' }} />
        </div>
      );
    }

    // 기본: GIVY 로고
    return (
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #E5E5E5',
        }}
      >
        <img src={givyLogo} alt="GIVY" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
      </div>
    );
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
          대표 이메일 변경
        </span>
      </div>

      {/* 메인 컨텐츠 */}
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        {/* 이메일 목록 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '16px',
          }}
        >
          {emails.map((item) => (
            <div
              key={item.id}
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
                cursor: 'pointer',
              }}
              onClick={() => handleSelectEmail(item.id)}
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
              {renderProviderIcon(item.provider, item.email)}

              {/* 이메일 정보 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                {/* 대표 배지 */}
                {item.isDefault && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 'fit-content',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: '#C2C7FC',
                      fontFamily: 'Pretendard',
                      fontSize: '10px',
                      fontWeight: 500,
                      color: '#545fe8',
                    }}
                  >
                    대표
                  </span>
                )}

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
                  {item.email}
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
                  {providerConfig[item.provider].name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 이메일 직접 등록하기 버튼 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '32px',
          }}
        >
          <button
            onClick={handleAddEmail}
            style={{
              padding: '3.2px 12px 3.2px 10px',
              borderRadius: '4px',
              backgroundColor: '#dee0fa',
              border: '0.5px solid #a0a7fa',
              cursor: 'pointer',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: '-0.14px',
              color: '#545fe8',
            }}
          >
            이메일 직접 등록하기 +
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailEditScreen;
