import { useState } from 'react';
import { settingsApi } from '../../api';
import lockIcon from '../../assets/images/svg/ic_lock.svg';
import eyeOnIcon from '../../assets/images/svg/ic_eye_on.svg';
import eyeOffIcon from '../../assets/images/svg/ic_eye_off.svg';

interface PasswordChangeScreenProps {
  onBack?: () => void;
  onComplete?: (newPassword: string) => void;
}

function PasswordChangeScreen({ onBack, onComplete }: PasswordChangeScreenProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (onBack) {
      onBack();
    } else {
      localStorage.setItem('currentScreen', 'profileEdit');
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleVerify = () => {
    if (!currentPassword.trim()) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    // 일단 다음 단계로 진행 (실제 검증은 변경 시 수행)
    setStep(2);
  };

  const handleComplete = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    try {
      await settingsApi.updatePassword({
        currentPassword,
        newPassword,
      });
      alert('비밀번호가 변경되었습니다.');
      onComplete?.(newPassword);
    } catch (err) {
      const message = err instanceof Error ? err.message : '비밀번호 변경에 실패했습니다.';
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  // 비밀번호 유효성 검사 (영문/숫자 포함 6자 이상)
  const isPasswordValid = newPassword.length >= 6 && /[a-zA-Z]/.test(newPassword) && /[0-9]/.test(newPassword);

  // 비밀번호 확인 일치 여부
  const isPasswordMatch = newPasswordConfirm.length > 0 && newPassword === newPasswordConfirm;

  // 폼 유효성
  const isFormValid = isPasswordValid && isPasswordMatch;

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
          비밀번호 변경
        </span>
      </div>

      {/* 메인 컨텐츠 */}
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        {step === 1 ? (
          /* Step 1: 기존 비밀번호 입력 */
          <>
            {/* 제목 */}
            <h1
              style={{
                fontFamily: 'Pretendard',
                fontSize: '20px',
                fontWeight: 'bold',
                lineHeight: 1.6,
                letterSpacing: '-0.2px',
                textAlign: 'left',
                color: '#252525',
                marginTop: '24px',
                marginBottom: '32px',
                whiteSpace: 'pre-line',
              }}
            >
              {`기존 비밀번호를\n입력해주세요`}
            </h1>

            {/* 비밀번호 입력 필드 */}
            <div
              style={{
                width: '100%',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 20px',
                borderRadius: '16px',
                border: 'solid 1px #C6C6C6',
                backgroundColor: '#F5F5F5',
                boxSizing: 'border-box',
              }}
            >
              <img src={lockIcon} alt="" style={{ width: '24px', height: '24px' }} />
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해 주세요"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Pretendard',
                  fontSize: '14px',
                  fontWeight: 'normal',
                  lineHeight: 1.57,
                  letterSpacing: '-0.14px',
                  color: '#252525',
                  backgroundColor: 'transparent',
                }}
              />
              <button
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <img
                  src={showCurrentPassword ? eyeOnIcon : eyeOffIcon}
                  alt={showCurrentPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                  style={{ width: '24px', height: '24px' }}
                />
              </button>
            </div>
          </>
        ) : (
          /* Step 2: 새 비밀번호 입력 */
          <>
            {/* 제목 */}
            <h1
              style={{
                fontFamily: 'Pretendard',
                fontSize: '20px',
                fontWeight: 'bold',
                lineHeight: 1.6,
                letterSpacing: '-0.2px',
                textAlign: 'left',
                color: '#252525',
                marginTop: '24px',
                marginBottom: '32px',
                whiteSpace: 'pre-line',
              }}
            >
              {`새로운 비밀번호를\n입력해주세요`}
            </h1>

            {/* 새 비밀번호 입력 필드 */}
            <div
              style={{
                width: '100%',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 20px',
                borderRadius: '16px',
                border: 'solid 1px #C6C6C6',
                backgroundColor: '#F5F5F5',
                boxSizing: 'border-box',
                marginBottom: '8px',
              }}
            >
              <img src={lockIcon} alt="" style={{ width: '24px', height: '24px' }} />
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해 주세요"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Pretendard',
                  fontSize: '14px',
                  fontWeight: 'normal',
                  lineHeight: 1.57,
                  letterSpacing: '-0.14px',
                  color: '#252525',
                  backgroundColor: 'transparent',
                }}
              />
              <button
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <img
                  src={showNewPassword ? eyeOnIcon : eyeOffIcon}
                  alt={showNewPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
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
                lineHeight: 1.57,
                letterSpacing: '-0.12px',
                textAlign: 'left',
                color: '#7681FC',
                marginBottom: '16px',
                paddingLeft: '4px',
              }}
            >
              안전한 비밀번호를 입력해주세요. (영문/숫자 포함 6자 이상)
            </p>

            {/* 비밀번호 확인 입력 필드 */}
            <div
              style={{
                width: '100%',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 20px',
                borderRadius: '16px',
                border: 'solid 1px #C6C6C6',
                backgroundColor: '#F5F5F5',
                boxSizing: 'border-box',
              }}
            >
              <img src={lockIcon} alt="" style={{ width: '24px', height: '24px' }} />
              <input
                type={showNewPasswordConfirm ? 'text' : 'password'}
                placeholder="비밀번호를 한번 더 입력해 주세요"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Pretendard',
                  fontSize: '14px',
                  fontWeight: 'normal',
                  lineHeight: 1.57,
                  letterSpacing: '-0.14px',
                  color: '#252525',
                  backgroundColor: 'transparent',
                }}
              />
              <button
                onClick={() => setShowNewPasswordConfirm(!showNewPasswordConfirm)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <img
                  src={showNewPasswordConfirm ? eyeOnIcon : eyeOffIcon}
                  alt={showNewPasswordConfirm ? '비밀번호 숨기기' : '비밀번호 보기'}
                  style={{ width: '24px', height: '24px' }}
                />
              </button>
            </div>
          </>
        )}
      </div>

      {/* 하단 버튼 */}
      <div
        style={{
          padding: '0 24px 8px 24px',
          paddingBottom: 'calc(8px + env(safe-area-inset-bottom))',
        }}
      >
        {step === 1 ? (
          <button
            onClick={handleVerify}
            style={{
              width: '100%',
              height: '54px',
              borderRadius: '12px',
              backgroundColor: '#545FE8',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Pretendard',
              fontSize: '16px',
              fontWeight: 'bold',
              lineHeight: 1.5,
              letterSpacing: '-0.16px',
              color: '#FFFFFF',
            }}
          >
            본인인증 하기
          </button>
        ) : (
          <button
            onClick={handleComplete}
            disabled={!isFormValid}
            style={{
              width: '100%',
              height: '54px',
              borderRadius: '12px',
              backgroundColor: isFormValid ? '#545FE8' : '#DEE0FA',
              border: 'none',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              fontFamily: 'Pretendard',
              fontSize: '16px',
              fontWeight: 'bold',
              lineHeight: 1.5,
              letterSpacing: '-0.16px',
              color: isFormValid ? '#FFFFFF' : '#A8A8A8',
            }}
          >
            변경 완료
          </button>
        )}
      </div>
    </div>
  );
}

export default PasswordChangeScreen;
