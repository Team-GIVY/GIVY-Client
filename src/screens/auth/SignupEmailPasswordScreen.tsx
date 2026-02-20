import { useState } from 'react';
import { authApi } from '../../api';
import { clearAuth } from '../../utils/token';
import emailIcon from '../../assets/images/svg/ic_email.svg';
import lockIcon from '../../assets/images/svg/ic_lock.svg';
import eyeOnIcon from '../../assets/images/svg/ic_eye_on.svg';
import eyeOffIcon from '../../assets/images/svg/ic_eye_off.svg';
import backIcon from '../../assets/images/svg/ic_back.svg';

/**
 * SignupEmailPasswordScreen - 회원가입 이메일/비밀번호 설정 화면
 * 로그인을 위한 이메일과 비밀번호를 설정하는 화면
 */

interface SignupEmailPasswordScreenProps {
  onBack?: () => void;
  onNext?: (email: string, password: string) => void;
  userName?: string;
}

function SignupEmailPasswordScreen({ onBack, onNext, userName }: SignupEmailPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    if (!email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (!password.trim()) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 회원가입 API 호출
      await authApi.signup({
        email,
        password,
        name: userName || '',
        nickname: userName || '',
        language: 'KO',
        birthDate: birthDate || '',
      });

      console.log('회원가입 성공:', { email, name: userName });

      // 기존 인증 데이터 초기화 후 자동 로그인
      clearAuth();
      await authApi.login({ email, password });
      console.log('자동 로그인 성공');

      onNext?.(email, password);
    } catch (err: unknown) {
      let message = '회원가입에 실패했습니다.';
      if (err instanceof Error) {
        message = err.message;
      }
      // 400 에러 (중복 이메일 등) 시 사용자 친화적 메시지
      const axiosErr = err as { response?: { status?: number } };
      if (axiosErr?.response?.status === 400) {
        message = '이미 가입된 이메일입니다. 다른 이메일을 사용해주세요.';
      }
      setError(message);
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  // 이메일 유효성 검사 (간단한 형식 체크)
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 비밀번호 유효성 검사 (영문/숫자 포함 6자 이상)
  const isPasswordValid = password.length >= 6 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);

  // 비밀번호 확인 일치 여부
  const isPasswordMatch = passwordConfirm.length > 0 && password === passwordConfirm;

  // 생년월일 유효성 검사 (YYYY-MM-DD 형식)
  const isBirthDateValid = /^\d{4}-\d{2}-\d{2}$/.test(birthDate);

  // 모든 조건 충족 여부
  const isFormValid = isEmailValid && isPasswordValid && isPasswordMatch && isBirthDateValid;

  return (
    <div
      className="w-full h-screen max-w-[402px] max-h-[874px] mx-auto relative overflow-x-hidden overflow-y-auto"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      {/* 뒤로가기 버튼 */}
      <button
        onClick={onBack}
        style={{
          width: '24px',
          height: '24px',
          margin: '23px 124px 0 24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <img src={backIcon} alt="뒤로가기" style={{ width: '24px', height: '24px' }} />
      </button>

      {/* 메인 컨텐츠 */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '96px' }}>
        {/* 제목 */}
        <h1
          style={{
            fontFamily: 'Pretendard',
            fontSize: '20px',
            fontWeight: 'bold',
            lineHeight: '1.6',
            letterSpacing: '-0.2px',
            textAlign: 'left',
            color: '#545FE8',
            marginBottom: '4px'
          }}
        >
          로그인을 위한
        </h1>
        <h1
          style={{
            fontFamily: 'Pretendard',
            fontSize: '20px',
            fontWeight: 'bold',
            lineHeight: '1.6',
            letterSpacing: '-0.2px',
            textAlign: 'left',
            color: '#545FE8',
            marginBottom: '40px'
          }}
        >
          이메일과 비밀번호를 설정해주세요
        </h1>

        {/* 이메일 입력 필드 */}
        <div
          style={{
            width: '345px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '18px 20px',
            borderRadius: '16px',
            border: 'solid 1px #C6C6C6',
            backgroundColor: '#F5F5F5',
            marginBottom: '12px'
          }}
        >
          <img src={emailIcon} alt="" style={{ width: '24px', height: '24px' }} />
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
              color: '#252525',
              backgroundColor: 'transparent'
            }}
          />
        </div>

        {/* 비밀번호 입력 필드 */}
        <div
          style={{
            width: '345px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '18px 20px',
            borderRadius: '16px',
            border: 'solid 1px #C6C6C6',
            backgroundColor: '#F5F5F5',
            marginBottom: '8px'
          }}
        >
          <img src={lockIcon} alt="" style={{ width: '24px', height: '24px' }} />
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
              color: '#252525',
              backgroundColor: 'transparent'
            }}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <img
              src={showPassword ? eyeOnIcon : eyeOffIcon}
              alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              style={{ width: '24px', height: '24px' }}
            />
          </button>
        </div>

        {/* 비밀번호 조건 안내 */}
        <p
          style={{
            fontFamily: 'Pretendard',
            fontSize: '12px',
            fontWeight: 'normal',
            lineHeight: '1.57',
            letterSpacing: '-0.12px',
            textAlign: 'left',
            color: '#7681FC',
            marginBottom: '16px',
            paddingLeft: '4px'
          }}
        >
          안전한 비밀번호를 입력해주세요. (영문/숫자 포함 6자 이상)
        </p>

        {/* 비밀번호 확인 입력 필드 */}
        <div
          style={{
            width: '345px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '18px 20px',
            borderRadius: '16px',
            border: 'solid 1px #C6C6C6',
            backgroundColor: '#F5F5F5'
          }}
        >
          <img src={lockIcon} alt="" style={{ width: '24px', height: '24px' }} />
          <input
            type={showPasswordConfirm ? 'text' : 'password'}
            placeholder="비밀번호를 한번 더 입력해 주세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'normal',
              lineHeight: '1.57',
              letterSpacing: '-0.14px',
              color: '#252525',
              backgroundColor: 'transparent'
            }}
          />
          <button
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <img
              src={showPasswordConfirm ? eyeOnIcon : eyeOffIcon}
              alt={showPasswordConfirm ? '비밀번호 숨기기' : '비밀번호 보기'}
              style={{ width: '24px', height: '24px' }}
            />
          </button>
        </div>

        {/* 생년월일 입력 필드 */}
        <div
          style={{
            width: '345px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '18px 20px',
            borderRadius: '16px',
            border: 'solid 1px #C6C6C6',
            backgroundColor: '#F5F5F5',
            marginTop: '16px'
          }}
        >
          <input
            type="date"
            placeholder="생년월일"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'normal',
              lineHeight: '1.57',
              letterSpacing: '-0.14px',
              color: birthDate ? '#252525' : '#a8a8a8',
              backgroundColor: 'transparent'
            }}
          />
        </div>
        <p
          style={{
            fontFamily: 'Pretendard',
            fontSize: '12px',
            fontWeight: 'normal',
            lineHeight: '1.57',
            letterSpacing: '-0.12px',
            textAlign: 'left',
            color: '#7681FC',
            marginTop: '8px',
            paddingLeft: '4px'
          }}
        >
          생년월일을 선택해주세요.
        </p>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <p style={{
          textAlign: 'center',
          color: '#e74c3c',
          fontSize: '14px',
          margin: '16px 24px',
          position: 'absolute',
          bottom: '70px',
          left: 0,
          right: 0,
        }}>
          {error}
        </p>
      )}

      {/* 다음으로 버튼 */}
      <button
        onClick={handleNext}
        disabled={!isFormValid || isLoading}
        style={{
          position: 'absolute',
          bottom: '8px',
          left: '24px',
          width: '345px',
          height: '54px',
          borderRadius: '12px',
          backgroundColor: isFormValid && !isLoading ? '#545FE8' : '#DEE0FA',
          border: 'none',
          cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span
          style={{
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: '1.5',
            letterSpacing: '-0.16px',
            textAlign: 'center',
            color: isFormValid && !isLoading ? '#FFFFFF' : '#A8A8A8'
          }}
        >
          {isLoading ? '가입 중...' : '다음으로'}
        </span>
      </button>
    </div>
  );
}

export default SignupEmailPasswordScreen;
