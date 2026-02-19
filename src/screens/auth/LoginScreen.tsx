import { useCallback } from 'react';
import { authApi } from '../../api';
import kakaoIcon from '../../assets/images/svg/ic_kakao.svg';
import googleIcon from '../../assets/images/svg/ic_google.svg';
import appleIcon from '../../assets/images/svg/ic_apple.svg';
import { Logo } from '../../components/common';
// Google Identity Services 타입 선언
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
          }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

/**
 * LoginScreen - 로그인 화면 컴포넌트
 * example.css 디자인 스펙 정확히 준수
 */

interface LoginScreenProps {
  onEmailLogin?: () => void;
  onSocialLogin?: (provider: 'kakao' | 'google' | 'apple') => void;
  onSignup?: () => void;
}

function LoginScreen({ onEmailLogin, onSocialLogin, onSignup }: LoginScreenProps) {
  // 최근 로그인 체크 (localStorage 활용)
  const checkRecentLogin = () => {
    const lastLogin = localStorage.getItem('lastLoginTime');
    const lastLogout = localStorage.getItem('lastLogoutTime');

    if (!lastLogin || !lastLogout) return false;

    const loginTime = new Date(lastLogin).getTime();
    const logoutTime = new Date(lastLogout).getTime();
    const now = new Date().getTime();

    // 로그아웃 후 24시간 이내에 재접속한 경우
    const oneDayInMs = 24 * 60 * 60 * 1000;
    return logoutTime > loginTime && (now - logoutTime) < oneDayInMs;
  };

  const showRecentLoginBubble = checkRecentLogin();

  const handleGoogleLogin = useCallback(() => {
    console.log('Google 로그인 시도 (GIS)');
    if (!window.google?.accounts?.id) {
      alert('Google 로그인 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response: { credential: string }) => {
        try {
          await authApi.googleIdTokenLogin(response.credential);
          onSocialLogin?.('google');
        } catch (err) {
          console.error('구글 로그인 실패:', err);
          alert('구글 로그인에 실패했습니다.');
        }
      },
    });
    window.google.accounts.id.prompt();
  }, [onSocialLogin]);

  const handleKakaoLogin = useCallback(() => {
    console.log('카카오 로그인 시도 - 카카오 OAuth 페이지로 리다이렉트');
    authApi.redirectToKakaoLogin();
  }, []);

  const handleSocialLogin = (provider: 'kakao' | 'google' | 'apple') => {
    console.log(`${provider} 로그인 시도`);
    if (provider === 'kakao') {
      handleKakaoLogin();
      return;
    }
    if (provider === 'google') {
      handleGoogleLogin();
      return;
    }
    onSocialLogin?.(provider);
  };

  const handleEmailLogin = () => {
    console.log('이메일 로그인 시도');
    onEmailLogin?.();
  };

  const handleSignup = () => {
    console.log('회원가입 시도');
    onSignup?.();
  };

  return (
    <div
      className="w-full h-screen max-w-[402px] max-h-[874px] mx-auto relative overflow-x-hidden overflow-y-auto"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      {/* 상단 로고 */}
      <div
        style={{
          marginTop: '31px',
          marginLeft: '24px',
          marginBottom: '65.6px'
        }}
      >
        <Logo />
      </div>

      {/* 컨텐츠 영역 */}
      <div style={{ marginLeft: '32px', marginRight: '32px' }}>
        {/* 환영 멘트 - font-size: 28px, font-weight: 800, line-height: 1.36, letter-spacing: -0.28px */}
        <h1
          style={{
            fontFamily: 'Pretendard',
            fontSize: '28px',
            fontWeight: 800,
            lineHeight: '1.36',
            letterSpacing: '-0.28px',
            textAlign: 'left',
            color: '#393939',
            marginBottom: '8px'
          }}
        >
          복잡한 고민 없이 시작하는
          <br />
          <span style={{ color: '#7681FC' }}>기비</span>에 오신 것을
          <br />
          환영합니다!
        </h1>

        {/* 부제 - font-size: 16px, line-height: 1.5, letter-spacing: -0.16px */}
        <p
          style={{
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'normal',
            lineHeight: '1.5',
            letterSpacing: '-0.16px',
            textAlign: 'left',
            color: '#8D8D8D',
            marginBottom: '200px'
          }}
        >
          3초 가입으로 바로 시작해보세요.
        </p>

        {/* 말풍선 라벨 - 최근 로그인 시에만 표시 */}
        {showRecentLoginBubble && (
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <div
              style={{
                display: 'inline-block',
                position: 'relative',
                backgroundColor: '#7681FC',
                borderRadius: '20px',
                padding: '6px 14px',
                transform: 'rotate(-4deg)'
              }}
            >
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: '1.5',
                  letterSpacing: '-0.12px',
                  color: '#F2F3FA'
                }}
              >
                최근에 로그인 했어요!
              </span>

              {/* 말풍선 꼬리 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: '20px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#7681FC',
                  transform: 'rotate(45deg)',
                  borderRadius: '0 0 3px 0'
                }}
              />
            </div>
          </div>
        )}

        {/* 소셜 로그인 버튼들 - 구글 기준 양옆 12.5px, 카톡-좌측 35px, 애플-우측 35px */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '60px', marginLeft: '-32px', marginRight: '-32px' }}>
          <div style={{ display: 'flex', gap: '12.5px', paddingLeft: '35px', paddingRight: '35px' }}>
            {/* 카카오톡 - width: 85px, height: 60px, border-radius: 16px */}
            <button
              onClick={() => handleSocialLogin('kakao')}
              style={{
                width: '85px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '16px',
                border: 'solid 1px #E0E0E0',
                backgroundColor: '#F5F5F5',
                cursor: 'pointer',
                padding: 0
              }}
            >
              {/* 카카오톡 아이콘 - 31.9px x 31.9px */}
              <img src={kakaoIcon} alt="카카오" style={{ width: '32px', height: '32px' }} />
            </button>

            {/* Google */}
            <button
              onClick={() => handleSocialLogin('google')}
              style={{
                width: '85px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '16px',
                border: 'solid 1px #E0E0E0',
                backgroundColor: '#F5F5F5',
                cursor: 'pointer',
                padding: 0
              }}
            >
              {/* Google 아이콘 - 24px x 24px */}
              <img src={googleIcon} alt="Google" style={{ width: '24px', height: '24px' }} />
            </button>

            {/* Apple */}
            <button
              onClick={() => handleSocialLogin('apple')}
              style={{
                width: '85px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '16px',
                border: 'solid 1px #E0E0E0',
                backgroundColor: '#F5F5F5',
                cursor: 'pointer',
                padding: 0
              }}
            >
              {/* Apple 아이콘 - 20.2px x 24px */}
              <img src={appleIcon} alt="Apple" style={{ width: '20px', height: '24px' }} />
            </button>
          </div>
        </div>
      </div>

      {/* 이메일로 로그인 버튼 - margin: 60px(top) 24px(left/right) 20px(bottom), width: 345px, height: 62px */}
      <div style={{ marginTop: '60px', marginLeft: '24px', marginRight: '24px', marginBottom: '20px' }}>
        <button
          onClick={handleEmailLogin}
          className="email-login-button"
          style={{
            width: '345px',
            height: '62px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '66px',
            backgroundColor: '#E0E0E0',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#7681FC';
            const span = e.currentTarget.querySelector('span');
            if (span) (span as HTMLElement).style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#E0E0E0';
            const span = e.currentTarget.querySelector('span');
            if (span) (span as HTMLElement).style.color = '#393939';
          }}
        >
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: '16px',
              fontWeight: 'normal',
              lineHeight: '1.5',
              letterSpacing: '-0.16px',
              color: '#393939',
              transition: 'color 0.3s ease'
            }}
          >
            이메일로 로그인
          </span>
        </button>
      </div>

      {/* 회원가입 링크 - font-size: 14px, line-height: 1.57, letter-spacing: -0.14px */}
      <div style={{ textAlign: 'center', marginLeft: '24px', marginRight: '24px' }}>
        <span
          style={{
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 'normal',
            lineHeight: '1.57',
            letterSpacing: '-0.14px',
            color: '#A8A8A8'
          }}
        >
          아직 회원이 아니신가요?{' '}
        </span>
        <button
          onClick={handleSignup}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <span
            style={{
              width: '48px',
              height: '22px',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '1.57',
              letterSpacing: '-0.14px',
              textAlign: 'left',
              color: '#6B6B6B',
              textDecoration: 'underline'
            }}
          >
            회원가입
          </span>
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
