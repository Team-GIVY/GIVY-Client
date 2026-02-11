import { useEffect, useState } from 'react';
import Character from '../../components/common/Character';

interface PersonalityTestResultScreenProps {
  onBack?: () => void;
  onNext?: () => void;
  userName?: string;
  // 결과 분석 데이터 (나중에 분석 로직 추가 시 사용)
  resultData?: {
    investmentType: string;
    riskTendency: { label: string; value: number };
    liquidityTendency: { label: string; value: number };
    spendingTendency: { label: string; value: number };
    financialFamiliarity: { label: string; value: number };
  };
}

// 기본 결과 데이터 (실제 분석 로직이 추가되면 대체됨)
const defaultResultData = {
  investmentType: '파킹형',
  riskTendency: { label: '중립형', value: 50 },
  liquidityTendency: { label: '중기 목표', value: 60 },
  spendingTendency: { label: '소비 중심', value: 80 },
  financialFamiliarity: { label: '낮음', value: 20 },
};

function PersonalityTestResultScreen({
  onBack,
  onNext,
  userName = '기비',
  resultData = defaultResultData,
}: PersonalityTestResultScreenProps) {
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);

  useEffect(() => {
    // 분석 완료 시뮬레이션 (1.5초 후 버튼 활성화)
    const timer = setTimeout(() => {
      setIsAnalysisComplete(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // 결과 항목 컴포넌트
  const ResultItem = ({
    label,
    value,
    resultLabel,
  }: {
    label: string;
    value: number;
    resultLabel: string;
  }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}
    >
      <span
        style={{
          fontFamily: 'Pretendard',
          fontSize: '14px',
          fontWeight: 500,
          color: '#8E8E8E',
          minWidth: '70px',
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: '8px',
          backgroundColor: '#E8EAFF',
          borderRadius: '4px',
          marginLeft: '12px',
          marginRight: '12px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: '100%',
            backgroundColor: '#545FE8',
            borderRadius: '4px',
            transition: 'width 1s ease-out',
          }}
        />
      </div>
      <span
        style={{
          fontFamily: 'Pretendard',
          fontSize: '14px',
          fontWeight: 600,
          color: '#545FE8',
          minWidth: '60px',
          textAlign: 'right',
        }}
      >
        {resultLabel}
      </span>
    </div>
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        maxWidth: '402px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
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
          height: '56px',
          position: 'relative',
          borderBottom: '1px solid #F0F0F0',
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
            padding: '8px',
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

        {/* 성향 테스트 제목 */}
        <h1
          style={{
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 600,
            color: '#252525',
            margin: 0,
          }}
        >
          성향 테스트
        </h1>
      </header>

      {/* 메인 컨텐츠 */}
      <div style={{ flex: 1, padding: '32px 24px 0', overflowY: 'auto' }}>
        {/* 결과 타이틀 */}
        <div style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontFamily: 'Pretendard',
              fontSize: '26px',
              fontWeight: 700,
              lineHeight: '1.4',
              letterSpacing: '-0.5px',
              color: '#252525',
              margin: 0,
            }}
          >
            {userName} 님의
            <br />
            투자 성향은{' '}
            <span style={{ color: '#545FE8' }}>'{resultData.investmentType}'</span>{' '}
            이에요
          </h2>
        </div>

        {/* 캐릭터 이미지 영역 (나중에 SVG 파일로 대체 예정) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '40px',
            height: '200px',
          }}
        >
          <Character type="coin" width="150px" />
        </div>

        {/* 결과 분석 카드 */}
        <div
          style={{
            backgroundColor: '#FAFAFA',
            borderRadius: '16px',
            padding: '24px 20px',
          }}
        >
          <ResultItem
            label="리스트 성향"
            value={resultData.riskTendency.value}
            resultLabel={resultData.riskTendency.label}
          />
          <ResultItem
            label="유동 성향"
            value={resultData.liquidityTendency.value}
            resultLabel={resultData.liquidityTendency.label}
          />
          <ResultItem
            label="소비 성향"
            value={resultData.spendingTendency.value}
            resultLabel={resultData.spendingTendency.label}
          />
          <ResultItem
            label="금융 친숙도"
            value={resultData.financialFamiliarity.value}
            resultLabel={resultData.financialFamiliarity.label}
          />
        </div>
      </div>

      {/* 시작하기 버튼 */}
      <div style={{ padding: '16px 24px', marginBottom: '8px' }}>
        <button
          onClick={onNext}
          disabled={!isAnalysisComplete}
          style={{
            width: '100%',
            height: '54px',
            borderRadius: '12px',
            backgroundColor: isAnalysisComplete ? '#545FE8' : '#E8E8E8',
            border: 'none',
            cursor: isAnalysisComplete ? 'pointer' : 'not-allowed',
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 600,
            color: isAnalysisComplete ? '#FFFFFF' : '#BFBFBF',
            transition: 'all 0.3s ease',
          }}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}

export default PersonalityTestResultScreen;
