import { useEffect, useState } from 'react';
import Character from '../../components/common/Character';

interface PersonalityTestAnalyzingScreenProps {
  onBack?: () => void;
  onNext?: () => void;
  userName?: string;
}

function PersonalityTestAnalyzingScreen({ onBack, onNext, userName = '기비' }: PersonalityTestAnalyzingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3초 후 로딩 완료 및 자동 전환
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onNext) {
        onNext();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div
      className="analyzing-screen-container"
      style={{
        width: '100%',
        height: '100vh',
        maxWidth: '402px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* 헤더 */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '56px',
          position: 'relative',
          borderBottom: '1px solid #F0F0F0'
        }}
      >
        {/* 뒤로가기 버튼 */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            left: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            color: '#252525',
            padding: '8px'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* 성향 테스트 제목 */}
        <h1
          style={{
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 600,
            color: '#252525',
            margin: 0
          }}
        >
          성향 테스트
        </h1>
      </header>

      {/* 메인 컨텐츠 */}
      <div style={{ flex: 1, padding: '40px 24px 0' }}>
        {/* 메인 텍스트 */}
        <div style={{ marginBottom: '40px' }}>
          <h2
            style={{
              fontFamily: 'Pretendard',
              fontSize: '26px',
              fontWeight: 700,
              lineHeight: '1.4',
              letterSpacing: '-0.5px',
              color: '#252525',
              marginBottom: '12px'
            }}
          >
            {userName} 님의
            <br />
            투자 성향을 분석 중이에요
          </h2>

          <p
            style={{
              fontFamily: 'Pretendard',
              fontSize: '15px',
              fontWeight: 400,
              lineHeight: '1.5',
              color: '#8E8E8E',
              margin: 0
            }}
          >
            분석을 위해 잠시만 기다려 주세요
          </p>
        </div>

        {/* 캐릭터 영역 - 분석을위해에서 107.5px, 버튼에서 240px */}
        <div
          className="character-bounce"
          style={{
            width: '142.2px',
            height: '142.2px',
            marginTop: '107.5px',
            marginBottom: '240px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          <Character type="coin" width="100%" />
        </div>
      </div>

      {/* 다음으로 버튼 */}
      <div style={{ padding: '0 24px', marginBottom: '8px' }}>
        <button
          onClick={onNext}
          disabled={isLoading}
          style={{
            width: '100%',
            height: '54px',
            borderRadius: '12px',
            backgroundColor: isLoading ? '#E8E8E8' : '#545FE8',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 600,
            color: isLoading ? '#BFBFBF' : '#FFFFFF',
            transition: 'all 0.3s ease'
          }}
        >
          다음으로
        </button>
      </div>

      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .character-bounce {
          animation: bounce 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default PersonalityTestAnalyzingScreen;
