import { useState } from 'react';
import { settingsApi } from '../../api';

interface NicknameEditScreenProps {
  onBack?: () => void;
  onComplete?: (nickname: string) => void;
  currentNickname?: string;
}

function NicknameEditScreen({
  onBack,
  onComplete,
  currentNickname = 'GIVY',
}: NicknameEditScreenProps) {
  const [nickname, setNickname] = useState(currentNickname);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = nickname.trim().length > 0 && nickname !== currentNickname;

  const handleClear = () => {
    setNickname('');
  };

  const handleComplete = async () => {
    if (!isValid || isLoading) return;

    setIsLoading(true);
    try {
      await settingsApi.updateProfile({
        nickname: nickname.trim(),
        language: 'KO',
      });
      onComplete?.(nickname.trim());
    } catch (err) {
      console.error('닉네임 변경 실패:', err);
      alert('닉네임 변경에 실패했습니다.');
    } finally {
      setIsLoading(false);
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
        overflowX: 'hidden',
        overflowY: 'auto',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 헤더 */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '23px 24px 8px 24px',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          borderBottom: 'solid 1px #e6e6e6',
        }}
      >
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            left: '24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
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
          닉네임 변경
        </span>
      </header>

      {/* 메인 컨텐츠 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '33px 24px 24px 24px',
        }}
      >
        {/* 안내 텍스트 */}
        <div style={{ marginBottom: '50.8px' }}>
          <p
            style={{
              margin: 0,
              fontFamily: 'Pretendard',
              fontSize: '18px',
              fontWeight: 'bold',
              lineHeight: 1.56,
              letterSpacing: '-0.18px',
              textAlign: 'left',
              color: '#252525',
            }}
          >
            새로운 닉네임을
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'Pretendard',
              fontSize: '18px',
              fontWeight: 'bold',
              lineHeight: 1.56,
              letterSpacing: '-0.18px',
              textAlign: 'left',
              color: '#252525',
            }}
          >
            입력해주세요
          </p>
        </div>

        {/* 입력 박스 */}
        <div
          style={{
            width: '100%',
            maxWidth: '345px',
            height: '60px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 20px',
            borderRadius: '16px',
            border: 'solid 1px #e0e0e0',
            backgroundColor: '#f5f5f5',
            boxSizing: 'border-box',
          }}
        >
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
            style={{
              flex: 1,
              border: 'none',
              backgroundColor: 'transparent',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'normal',
              lineHeight: 1.57,
              letterSpacing: '-0.14px',
              color: '#252525',
              outline: 'none',
            }}
          />
          {nickname && (
            <button
              onClick={handleClear}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="11" fill="#a8a8a8" />
                <path
                  d="M7 7L15 15M15 7L7 15"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div
        style={{
          padding: '16px 24px 8px 24px',
        }}
      >
        <button
          onClick={handleComplete}
          disabled={!isValid || isLoading}
          style={{
            width: '100%',
            maxWidth: '345px',
            height: '54px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: isValid && !isLoading ? '#545fe8' : '#dee0fa',
            cursor: isValid && !isLoading ? 'pointer' : 'not-allowed',
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'bold',
            color: isValid && !isLoading ? '#FFFFFF' : '#a9a9a9',
          }}
        >
          {isLoading ? '변경 중...' : '변경 완료'}
        </button>
      </div>
    </div>
  );
}

export default NicknameEditScreen;
