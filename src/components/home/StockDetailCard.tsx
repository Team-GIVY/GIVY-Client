import { useState } from 'react';
import changeCircleOn from '../../assets/images/svg/ic_change-circle_on.svg';
import changeCircleOff from '../../assets/images/svg/ic_change-circle_off.svg';
import flightIcon from '../../assets/images/svg/ic_flight_color.svg';
// 차트 라이브러리 (추후 사용 예정)
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

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

  // Mock 차트 데이터 (API 연동 시 사용 예정)
  // const defaultChartData = [
  //   { date: '1월', value: 0 },
  //   { date: '2월', value: 2 },
  //   { date: '3월', value: -1 },
  //   { date: '4월', value: 3 },
  //   { date: '5월', value: 1 },
  //   { date: '6월', value: 4 },
  //   { date: '7월', value: 2 },
  //   { date: '8월', value: 5 },
  //   { date: '9월', value: 3 },
  //   { date: '10월', value: 6 },
  //   { date: '11월', value: 4 },
  //   { date: '12월', value: 7 },
  // ];
  // const chartData = stockInfo.chartData || defaultChartData;

  const averageYield = stockInfo.averageYield ?? 6;
  const maxIncrease = stockInfo.maxIncrease ?? 15;
  const maxDecrease = stockInfo.maxDecrease ?? 15;

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
            {/* 배경 비행기 아이콘 */}
            <div
              style={{
                position: 'absolute',
                left: '-20px',
                bottom: '-20px',
                width: '180px',
                height: '180px',
                background: 'rgba(242, 243, 250, 0.7)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <img
                src={flightIcon}
                alt=""
                style={{
                  width: '100px',
                  height: '100px',
                  opacity: 0.5,
                  transform: 'rotate(-45deg)',
                }}
              />
            </div>
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

          {/* 차트 영역 (추후 API 연동 시 활성화) */}
          <div
            style={{
              width: '100%',
              height: '125px',
              padding: '0 12px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                border: 'solid 1px #e0e0e0',
                borderRadius: '4px',
                backgroundColor: '#fafafa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  color: '#a9a9a9',
                }}
              >
                차트 영역
              </span>
            </div>
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
