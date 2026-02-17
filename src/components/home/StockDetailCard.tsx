import { useState } from 'react';
import changeCircleOn from '../../assets/images/svg/ic_change-circle_on.svg';
import changeCircleOff from '../../assets/images/svg/ic_change-circle_off.svg';

import bgFlight from '../../assets/images/png/bg_flight.png';
import { ResponsiveContainer, AreaChart, Area, Line } from 'recharts';

// Stock Info 타입 정의
export interface StockInfo {
  ticker: string;
  tickerName: string;
  index: string;
  destination: string;
  brokerage: string;
  expectedAmount: number;
  descriptionTitle: string;
  descriptionBody: string[];
  // 차트 관련 데이터
  companyName?: string;
  chartData?: { date: string; value: number }[];
  averageYield?: number;
  maxIncrease?: number;
  maxDecrease?: number;
}

interface StockDetailCardProps {
  stockInfo: StockInfo;
}

function StockDetailCard({ stockInfo }: StockDetailCardProps) {
  const [isFlipped, setIsFlipped] = useState(true);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const averageYield = stockInfo.averageYield ?? 6;
  const maxIncrease = stockInfo.maxIncrease ?? 15;
  const maxDecrease = stockInfo.maxDecrease ?? 15;

  // 차트 데이터: prop이 있으면 사용, 없으면 averageYield 기반 12개월 데이터 생성
  const chartData = stockInfo.chartData || (() => {
    const rate = averageYield / 100;
    const months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
    const base = 100;
    return months.map((date, i) => {
      const t = i / 11;
      // 주가: 급등락이 뚜렷한 곡선 (상승 추세 + 큰 변동)
      const value = base + t * rate * base * 3
        + Math.sin(i * 1.6) * 50 + Math.cos(i * 0.8) * 32 + Math.sin(i * 3) * 22 + Math.cos(i * 2.2) * 15;
      // 벤치마크: 거의 직선에 가까운 완만한 곡선
      const benchmark = base + t * rate * base * 0.15 + Math.sin(i * 0.4) * 1;
      return { date, value: +value.toFixed(1), benchmark: +benchmark.toFixed(1) };
    });
  })();

  return (
    <div
      className="stock-detail-card-container"
      style={{
        width: '345px',
        height: '420px',
        margin: '0 auto 12px auto',
        perspective: '1000px',
      }}
    >
      <div
        className="stock-detail-card-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ========== 앞면 (설명) ========== */}
        <div
          className="stock-detail-card-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: '20px',
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.05)',
            border: 'solid 1px #c2c7fc',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 상단 섹션 */}
          <div
            className="detail-card-top"
            style={{
              padding: '11px 12px 11px 21px',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* 종목 이름 */}
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  lineHeight: 1.57,
                  letterSpacing: '-0.14px',
                  color: '#6b6b6b',
                }}
              >
                {stockInfo.index}
              </span>

              {/* 종목명 뱃지 */}
              <span
                style={{
                  height: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  border: 'solid 0.5px #c2c7fc',
                  backgroundColor: '#f2f3fa',
                  fontFamily: 'Pretendard',
                  fontSize: '10px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: '-0.12px',
                  color: '#545fe8',
                }}
              >
                {stockInfo.tickerName}
              </span>
            </div>

            {/* 카드 뒤집기 버튼 */}
            <button
              onClick={handleFlip}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              title="차트 보기"
            >
              <img src={changeCircleOff} alt="차트 보기" style={{ width: '32px', height: '32px' }} />
            </button>
          </div>

          {/* 하단 섹션 (설명) */}
          <div
            className="detail-card-bottom"
            style={{
              flex: 1,
              padding: '30px 22px 40px 22px',
              background: 'linear-gradient(to bottom, #FFFFFF 0%, #E8EAFF 30%, #DEE0FA 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* 배경 비행기 */}
            <img
              src={bgFlight}
              alt=""
              style={{
                position: 'absolute',
                left: '50%',
                top: '60%',
                transform: 'translate(-50%, -50%)',
                width: '280px',
                height: '280px',
                objectFit: 'contain',
                mixBlendMode: 'multiply',
                pointerEvents: 'none',
              }}
            />
            {/* 설명 타이틀 */}
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                textAlign: 'center',
                color: '#252525',
                margin: '0 0 16px 0',
              }}
            >
              {stockInfo.descriptionTitle}
            </p>

            {/* 설명 본문 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {stockInfo.descriptionBody.map((text, index) => (
                <p
                  key={index}
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: 1.57,
                    letterSpacing: '-0.14px',
                    textAlign: 'center',
                    color: '#252525',
                    margin: '0',
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ========== 뒷면 (차트) ========== */}
        <div
          className="stock-detail-card-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '20px',
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.05)',
            border: 'solid 1px #c2c7fc',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 상단 섹션 */}
          <div
            style={{
              padding: '11px 12px 6px 21px',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              {/* 종목 이름 (NASDAQ) */}
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  lineHeight: 1.57,
                  letterSpacing: '-0.14px',
                  color: '#6b6b6b',
                }}
              >
                {stockInfo.index}
              </span>

              {/* JP모건 박스 */}
              <div
                style={{
                  height: '20px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  border: 'solid 0.5px #c6c6c6',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    letterSpacing: '-0.12px',
                    color: '#6b6b6b',
                  }}
                >
                  {stockInfo.companyName || 'JP모건 나스닥 프리미엄 인컴 ETF'}
                </span>
              </div>
            </div>

            {/* 카드 뒤집기 버튼 (뒷면) */}
            <button
              onClick={handleFlip}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              title="설명 보기"
            >
              <img src={changeCircleOn} alt="설명 보기" style={{ width: '32px', height: '32px' }} />
            </button>
          </div>

          {/* 타이틀 */}
          <div style={{ padding: '6px 21px 0 21px' }}>
            <h3
              style={{
                fontFamily: 'Pretendard',
                fontSize: '24px',
                fontWeight: 'bold',
                lineHeight: 1.5,
                letterSpacing: '-0.24px',
                color: '#252525',
                margin: '0 0 16px 0',
              }}
            >
              {stockInfo.tickerName}에 {stockInfo.expectedAmount.toLocaleString()}원 투자 중이에요
            </h3>
          </div>

          {/* 차트 영역 */}
          <div
            style={{
              width: '100%',
              height: '125px',
              padding: '0 12px',
              boxSizing: 'border-box',
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <defs>
                  <linearGradient id={`chartGrad-${stockInfo.ticker}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#545fe8" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#545fe8" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <Area
                  type="linear"
                  dataKey="value"
                  stroke="#545fe8"
                  strokeWidth={1}
                  fill={`url(#chartGrad-${stockInfo.ticker})`}
                  dot={false}
                  activeDot={false}
                />
                <Line
                  type="linear"
                  dataKey="benchmark"
                  stroke="#d0d0d0"
                  strokeWidth={0.8}
                  dot={false}
                  activeDot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 평균 수익률 */}
          <div style={{ padding: '20px 21px 12px 21px', textAlign: 'center' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '18px',
                fontWeight: 'bold',
                lineHeight: 1.56,
                letterSpacing: '-0.18px',
                color: '#252525',
                margin: '0',
              }}
            >
              평균적으로 매년{' '}
              <span style={{ color: averageYield >= 0 ? '#545fe8' : '#ef4444' }}>
                {averageYield}%
              </span>
              {' '}상승했어요!
            </p>
          </div>

          {/* 구분선 */}
          <div
            style={{
              width: '280px',
              height: '0.5px',
              backgroundColor: '#c0c0c0',
              margin: '0 auto 12px auto',
            }}
          />

          {/* 최대 상승/하락 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '60px',
              padding: '0 21px 20px 21px',
            }}
          >
            {/* 최대 상승 시 */}
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: '-0.12px',
                  color: '#a9a9a9',
                  margin: '0 0 8px 0',
                }}
              >
                최대 상승 시
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  lineHeight: 1.5,
                  letterSpacing: '-0.16px',
                  color: '#515151',
                  margin: '0',
                }}
              >
                ± {maxIncrease}%
              </p>
            </div>

            {/* 최대 하락 시 */}
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: '-0.12px',
                  color: '#a9a9a9',
                  margin: '0 0 8px 0',
                }}
              >
                최대 하락 시
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  lineHeight: 1.5,
                  letterSpacing: '-0.16px',
                  color: '#515151',
                  margin: '0',
                }}
              >
                ± {maxDecrease}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockDetailCard;
