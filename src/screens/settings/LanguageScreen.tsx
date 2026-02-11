import { useState } from 'react';
import { settingsApi } from '../../api';

interface LanguageScreenProps {
  onBack?: () => void;
  onComplete?: (language: string) => void;
}

function LanguageScreen({ onBack, onComplete }: LanguageScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('ko');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      localStorage.setItem('currentScreen', 'profileEdit');
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleComplete = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await settingsApi.updateLanguage({
        language: selectedLanguage === 'ko' ? 'KO' : 'EN',
      });
      console.log('언어 선택 완료:', selectedLanguage);
      onComplete?.(selectedLanguage);
    } catch (err) {
      console.error('언어 변경 실패:', err);
      alert('언어 변경에 실패했습니다.');
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
          앱 언어
        </span>
      </div>

      {/* 메인 컨텐츠 */}
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
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
          {`앱에서 사용할\n언어를 선택해주세요`}
        </h1>

        {/* 언어 선택 옵션 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* 한국어 */}
          <button
            onClick={() => setSelectedLanguage('ko')}
            style={{
              width: '100%',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 20px',
              borderRadius: '16px',
              border: selectedLanguage === 'ko' ? 'solid 1px #545fe8' : 'solid 1px #e0e0e0',
              backgroundColor: '#F5F5F5',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: selectedLanguage === 'ko' ? 'bold' : 'normal',
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                color: selectedLanguage === 'ko' ? '#545fe8' : '#252525',
              }}
            >
              한국어
            </span>
            {selectedLanguage === 'ko' && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="#545fe8" />
                <path
                  d="M8 12L11 15L16 9"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* English (비활성화) */}
          <button
            disabled
            style={{
              width: '100%',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 20px',
              borderRadius: '16px',
              border: 'solid 1px #e0e0e0',
              backgroundColor: '#F5F5F5',
              cursor: 'not-allowed',
              boxSizing: 'border-box',
              opacity: 0.5,
            }}
          >
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 'normal',
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                color: '#a8a8a8',
              }}
            >
              English
            </span>
          </button>
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
          onClick={handleComplete}
          disabled={isLoading}
          style={{
            width: '100%',
            height: '54px',
            borderRadius: '12px',
            backgroundColor: isLoading ? '#dee0fa' : '#545FE8',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: 1.5,
            letterSpacing: '-0.16px',
            color: '#FFFFFF',
          }}
        >
          {isLoading ? '변경 중...' : '선택 완료'}
        </button>
      </div>
    </div>
  );
}

export default LanguageScreen;
