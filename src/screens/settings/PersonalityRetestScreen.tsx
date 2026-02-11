import { useState } from 'react';
import Character from '../../components/common/Character';
import { settingsApi } from '../../api';

interface PersonalityRetestScreenProps {
  onBack?: () => void;
  onStart?: () => void;
  userName?: string;
}

function PersonalityRetestScreen({
  onBack,
  onStart,
  userName = '기비',
}: PersonalityRetestScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRetest = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      // 기존 투자 성향 삭제
      await settingsApi.resetTendency();
      // 성향 테스트 시작
      onStart?.();
    } catch (err) {
      console.error('투자 성향 재설정 실패:', err);
      alert('투자 성향 재설정에 실패했습니다.');
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
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '23px 24px 2px 24px',
          backgroundColor: '#F5F5F5',
          position: 'relative',
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
          성향 테스트
        </span>
      </header>

      {/* 구분선 */}
      <div
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#e0e0e0',
          marginTop: '16px',
        }}
      />

      {/* 메인 컨텐츠 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 24px 24px 24px',
        }}
      >
        {/* 제목 */}
        <div style={{ marginBottom: '16px' }}>
          <p
            style={{
              margin: 0,
              fontFamily: 'Pretendard',
              fontSize: '24px',
              fontWeight: 'bold',
              lineHeight: 1.4,
              letterSpacing: '-0.24px',
              color: '#252525',
            }}
          >
            {userName} 님의 투자 성향,
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'Pretendard',
              fontSize: '24px',
              fontWeight: 'bold',
              lineHeight: 1.4,
              letterSpacing: '-0.24px',
            }}
          >
            <span style={{ color: '#545fe8' }}>다시 한 번 점검</span>
            <span style={{ color: '#252525' }}>해볼까요?</span>
          </p>
        </div>

        {/* 설명 텍스트 */}
        <p
          style={{
            margin: '0 0 40px 0',
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: '-0.14px',
            color: '#6b6b6b',
          }}
        >
          변화된 목표나 상황에 맞는 새로운 투자 성향을
          <br />
          간단히 테스트하면 딱맞는 성향을 안내드릴게요
        </p>

        {/* 말풍선 + 캐릭터 영역 */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 말풍선 */}
          <div
            style={{
              width: '253.7px',
              height: '78.8px',
              padding: '11.5px 28.6px 9.6px 29.4px',
              transform: 'rotate(-4.11deg)',
              borderRadius: '8px',
              backgroundColor: '#DEE0FA',
              marginBottom: '24px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: 'Pretendard',
                fontSize: '13px',
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                color: '#515152',
                textAlign: 'center',
              }}
            >
              이번엔 {userName} 님께서 더 성장한 모습에
              <br />
              딱 맞는 투자 성향을 찾아갈 거에요!
            </p>
            {/* 말풍선 꼬리 */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '30.1px',
                height: '31.8px',
                backgroundColor: '#DEE0FA',
                borderRadius: '6px',
                clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
              }}
            />
          </div>

          {/* 캐릭터 이미지들 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '12px',
              width: '100%',
              padding: '0 24px',
            }}
          >
            <Character type="coin" width="75px" />
            <Character type="paper-money" width="55px" />
            <Character type="card" width="65px" />
            <Character type="bankbook" width="80px" />
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div
        style={{
          padding: '16px 24px 34px 24px',
        }}
      >
        <button
          onClick={handleRetest}
          disabled={isLoading}
          style={{
            width: '100%',
            height: '56px',
            borderRadius: '16px',
            border: 'none',
            backgroundColor: isLoading ? '#dee0fa' : '#545fe8',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#FFFFFF',
          }}
        >
          {isLoading ? '처리 중...' : '재검사 하기'}
        </button>
      </div>
    </div>
  );
}

export default PersonalityRetestScreen;
