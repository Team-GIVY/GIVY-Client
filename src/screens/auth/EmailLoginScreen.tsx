import { useState, useCallback } from 'react';
import givyCharLogo from '../../assets/images/png/img_logo_givy_symbol+text+charater.png';
import { authApi } from '../../api';
import emailIcon from '../../assets/images/svg/ic_email.svg';
import lockIcon from '../../assets/images/svg/ic_lock.svg';
import eyeOnIcon from '../../assets/images/svg/ic_eye_on.svg';
import eyeOffIcon from '../../assets/images/svg/ic_eye_off.svg';
import kakaoIcon from '../../assets/images/svg/ic_kakao.svg';
import googleIcon from '../../assets/images/svg/ic_google.svg';
import appleIcon from '../../assets/images/svg/ic_apple.svg';
import backIcon from '../../assets/images/svg/ic_back.svg';

/**
 * EmailLoginScreen - 이메일 로그인 화면
 * LoginScreen에서 "이메일로 로그인" 버튼 클릭 시 표시
 */

interface EmailLoginScreenProps {
  onBack?: () => void;
  onLogin?: (email: string, password: string) => void;
  onLoginSuccess?: () => void;
  onSocialLogin?: (provider: 'kakao' | 'google' | 'apple') => void;
  onFindAccount?: () => void;
  onSignup?: () => void;
}

function EmailLoginScreen({
  onBack,
  onLogin,
  onLoginSuccess,
  onSocialLogin,
  onFindAccount,
  onSignup
}: EmailLoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // API 로그인 호출
      await authApi.login({ email, password });

      // 아이디 저장 옵션
      if (rememberMe) {
        localStorage.setItem('savedEmail', email);
      } else {
        localStorage.removeItem('savedEmail');
      }

      // 로그인 성공 콜백
      onLoginSuccess?.();
      onLogin?.(email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : '로그인에 실패했습니다.';
      setError(message);
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSocialLogin = (provider: 'kakao' | 'google' | 'apple') => {
    if (provider === 'kakao') {
      authApi.redirectToKakaoLogin();
      onSocialLogin?.(provider);
    } else if (provider === 'google') {
      handleGoogleLogin();
      // onSocialLogin은 handleGoogleLogin 콜백 내부에서 호출
    } else {
      // Apple 로그인은 아직 미구현
      alert('Apple 로그인은 준비 중입니다.');
    }
  };

  return (
    <div
      className="w-full h-screen max-w-[402px] max-h-[874px] mx-auto relative overflow-x-hidden overflow-y-auto"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      {/* 상단 뒤로가기 버튼 - margin: 23px 130px 0 24px */}
      <button
        onClick={onBack}
        style={{
          width: '24px',
          height: '24px',
          margin: '23px 130px 0 24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img src={backIcon} alt="뒤로가기" style={{ width: '24px', height: '24px' }} />
      </button>

      {/* 캐릭터 로고 이미지 - 203.7px x 104.7px, margin: 52px 94.6px 59.3px 94.8px */}
      <div
        style={{
          margin: '52px 94.6px 59.3px 94.8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={givyCharLogo} alt="GIVY" style={{ width: '203.7px', height: '104.7px', objectFit: 'contain' }} />
      </div>

      {/* 입력 폼 */}
      <div style={{ paddingLeft: '28.5px', paddingRight: '28.5px' }}>
        {/* 이메일 입력 - width: 345px, height: 60px */}
        <div
          style={{
            width: '345px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '18px 20px',
            borderRadius: '16px',
            border: 'solid 1px #e0e0e0',
            backgroundColor: '#fff',
            marginBottom: '12px'
          }}
        >
          <img src={emailIcon} alt="" style={{ width: '20px', height: '20px' }} />
          <input
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'normal',
              lineHeight: '1.57',
              letterSpacing: '-0.14px',
              color: '#252525'
            }}
          />
        </div>

        {/* 비밀번호 입력 - width: 345px, height: 60px */}
        <div
          style={{
            width: '345px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '18px 20px',
            borderRadius: '16px',
            border: 'solid 1px #e0e0e0',
            backgroundColor: '#fff',
            marginBottom: '16px'
          }}
        >
          <img src={lockIcon} alt="" style={{ width: '20px', height: '20px' }} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'normal',
              lineHeight: '1.57',
              letterSpacing: '-0.14px',
              color: '#252525'
            }}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{
              width: '20px',
              height: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={showPassword ? eyeOnIcon : eyeOffIcon}
              alt=""
              style={{ width: '20px', height: '20px' }}
            />
          </button>
        </div>

        {/* 아이디 저장 & 찾기 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px'
          }}
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '1.57',
              letterSpacing: '-0.14px',
              color: '#8D8D8D'
            }}
          >
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                accentColor: '#7681FC',
                cursor: 'pointer'
              }}
            />
            아이디 저장
          </label>

          <button
            onClick={onFindAccount}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '1.57',
              letterSpacing: '-0.14px',
              textAlign: 'right',
              color: '#8D8D8D',
              textDecoration: 'underline',
              padding: 0
            }}
          >
            아이디/비밀번호 찾기
          </button>
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <p style={{
          textAlign: 'center',
          color: '#e74c3c',
          fontSize: '14px',
          margin: '0 24px'
        }}>
          {error}
        </p>
      )}

      {/* 로그인 버튼 - width: 345px, height: 62px, margin: 60px 24px 35px, background-color: #545fe8 */}
      <button
        onClick={handleLogin}
        disabled={isLoading}
        style={{
          width: '345px',
          height: '62px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '66px',
          backgroundColor: isLoading ? '#a0a0a0' : '#545FE8',
          border: 'none',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontFamily: 'Pretendard',
          fontSize: '16px',
          fontWeight: 'bold',
          color: 'white',
          margin: '60px 24px 35px'
        }}
      >
        {isLoading ? '로그인 중...' : '로그인'}
      </button>

      {/* 소셜 로그인 버튼들 - width: 280px, height: 60px, margin: 35px 57px 38px 56px */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12.5px', margin: '35px 57px 38px 56px' }}>
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

      {/* 회원가입 링크 */}
      <div style={{ textAlign: 'center' }}>
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
          onClick={onSignup}
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

export default EmailLoginScreen;
