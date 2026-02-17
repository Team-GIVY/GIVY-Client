import { useState, useEffect } from 'react';
import { Header, BottomNav } from '../../components/common';
import { homeApi } from '../../api';
import flightIcon from '../../assets/images/svg/ic_flight_black.svg';
import changeCircleIcon from '../../assets/images/svg/ic_change-circle_on.svg';

interface HomeScreenProps {
  onNotification?: () => void;
  onProfile?: () => void;
  onTabChange?: (tab: 'home' | 'guide' | 'settings') => void;
  onRefresh?: () => void;
  userName?: string;
  stockCode?: string;
  brokerageAccount?: string;
  expectedInvestment?: string;
  destination?: string;
  startPoint?: string;
  etfName?: string;
  etfLabel?: string;
  investAmount?: string;
  avgReturn?: string;
  maxUp?: string;
  maxDown?: string;
}

function HomeScreen({
  onNotification,
  onProfile,
  onTabChange,
  onRefresh,
  stockCode: propStockCode = '360750',
  brokerageAccount: propBrokerageAccount = '토스증권',
  expectedInvestment: propExpectedInvestment = '50,000원',
  destination: propDestination = '미국 기술주',
  startPoint: propStartPoint = 'S&P 500',
  etfName: propEtfName = 'JP모건 나스닥 프리미엄 인컴 ETF',
  etfLabel: propEtfLabel = 'NASDAQ',
  investAmount: propInvestAmount = '5만원',
  avgReturn: propAvgReturn = '6%',
  maxUp: propMaxUp = '± 15%',
  maxDown: propMaxDown = '± 15%',
}: HomeScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [, setHomeData] = useState<{
    nickname: string;
    status: string;
  } | null>(null);

  // 홈 데이터 로드
  useEffect(() => {
    const loadHomeData = async () => {
      setIsLoading(true);
      try {
        const data = await homeApi.getHome();
        setHomeData({
          nickname: data.nickname,
          status: data.status,
        });
      } catch (err) {
        console.error('홈 데이터 로드 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHomeData();
  }, []);

  // 새로고침 핸들러
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const data = await homeApi.getHome();
      setHomeData({
        nickname: data.nickname,
        status: data.status,
      });
    } catch (err) {
      console.error('새로고침 실패:', err);
    } finally {
      setIsLoading(false);
    }
    onRefresh?.();
  };

  // props 또는 API 데이터 사용
  const stockCode = propStockCode;
  const brokerageAccount = propBrokerageAccount;
  const expectedInvestment = propExpectedInvestment;
  const destination = propDestination;
  const startPoint = propStartPoint;
  const etfName = propEtfName;
  const etfLabel = propEtfLabel;
  const investAmount = propInvestAmount;
  const avgReturn = propAvgReturn;
  const maxUp = propMaxUp;
  const maxDown = propMaxDown;
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
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 헤더 */}
      <Header onNotification={onNotification} onProfile={onProfile} />

      {/* 메인 컨텐츠 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>

        {/* ========== 도착지 카드 ========== */}
        <div
          style={{
            margin: '16px auto',
            width: '100%',
            maxWidth: '353px',
            padding: '16px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            boxSizing: 'border-box',
          }}
        >
          {/* 도착지 라벨 */}
          <p
            style={{
              margin: '0 0 8px 0',
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontWeight: 500,
              color: '#a9a9a9',
            }}
          >
            도착지
          </p>

          {/* 경로 표시 (S&P 500 ----✈️----> 미국 기술주) */}
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
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#252525',
                flexShrink: 0,
                minWidth: '70px',
              }}
            >
              {startPoint}
            </span>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                margin: '0 12px',
                minWidth: '80px',
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  backgroundImage: 'linear-gradient(to right, #c0c0c0 50%, transparent 50%)',
                  backgroundSize: '8px 1px',
                  backgroundRepeat: 'repeat-x',
                  minWidth: '20px',
                }}
              />
              <img
                src={flightIcon}
                alt=""
                style={{ width: '20px', height: '20px', margin: '0 4px', flexShrink: 0 }}
              />
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  backgroundImage: 'linear-gradient(to right, #c0c0c0 50%, transparent 50%)',
                  backgroundSize: '8px 1px',
                  backgroundRepeat: 'repeat-x',
                  minWidth: '20px',
                }}
              />
            </div>
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#252525',
                flexShrink: 0,
                minWidth: '70px',
                textAlign: 'right',
              }}
            >
              {destination}
            </span>
          </div>

          {/* 상품코드, 증권계좌, 예상 투자금 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontFamily: 'Pretendard', fontSize: '11px', color: '#a9a9a9', whiteSpace: 'nowrap' }}>
                상품코드
              </p>
              <p style={{ margin: '2px 0 0 0', fontFamily: 'Pretendard', fontSize: '12px', fontWeight: 'bold', color: '#252525', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {stockCode}
              </p>
            </div>
            <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
              <p style={{ margin: 0, fontFamily: 'Pretendard', fontSize: '11px', color: '#a9a9a9', whiteSpace: 'nowrap' }}>
                증권계좌
              </p>
              <p style={{ margin: '2px 0 0 0', fontFamily: 'Pretendard', fontSize: '12px', fontWeight: 'bold', color: '#252525', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {brokerageAccount}
              </p>
            </div>
            <div style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
              <p style={{ margin: 0, fontFamily: 'Pretendard', fontSize: '11px', color: '#a9a9a9', whiteSpace: 'nowrap' }}>
                예상 투자금
              </p>
              <p style={{ margin: '2px 0 0 0', fontFamily: 'Pretendard', fontSize: '12px', fontWeight: 'bold', color: '#252525', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {expectedInvestment}
              </p>
            </div>
          </div>
        </div>

        {/* ========== 주식 카드 ========== */}
        <div
          style={{
            margin: '0 auto 16px auto',
            width: '100%',
            maxWidth: '353px',
            padding: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            boxSizing: 'border-box',
          }}
        >
          {/* 상단: NASDAQ 라벨 + ETF 이름 + 새로고침 버튼 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#252525',
                }}
              >
                {etfLabel}
              </span>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  fontFamily: 'Pretendard',
                  fontSize: '11px',
                  color: '#656565',
                }}
              >
                {etfName}
              </span>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              style={{
                background: 'none',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                padding: 0,
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              <img
                src={changeCircleIcon}
                alt="새로고침"
                style={{
                  width: '24px',
                  height: '24px',
                  animation: isLoading ? 'spin 1s linear infinite' : 'none',
                }}
              />
            </button>
          </div>

          {/* 투자 중 텍스트 */}
          <p
            style={{
              margin: '0 0 20px 0',
              fontFamily: 'Pretendard',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#252525',
            }}
          >
            EPQ에 {investAmount} 투자 중이에요
          </p>

          {/* 차트 영역 (플레이스홀더) */}
          <div
            style={{
              width: '100%',
              height: '120px',
              backgroundColor: '#fafafa',
              borderRadius: '8px',
              border: 'solid 1px #e0e0e0',
              marginBottom: '20px',
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

          {/* 평균 수익률 */}
          <p
            style={{
              margin: '0 0 16px 0',
              fontFamily: 'Pretendard',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#545fe8',
              textAlign: 'center',
            }}
          >
            평균적으로 매년 {avgReturn} 상승했어요!
          </p>

          {/* 구분선 */}
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: '#e0e0e0',
              margin: '0 0 16px 0',
            }}
          />

          {/* 최대 상승/하락 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: '8px',
            }}
          >
            <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
              <p style={{ margin: 0, fontFamily: 'Pretendard', fontSize: '11px', color: '#a9a9a9', whiteSpace: 'nowrap' }}>
                최대 상승 시
              </p>
              <p style={{ margin: '4px 0 0 0', fontFamily: 'Pretendard', fontSize: '12px', fontWeight: 'bold', color: '#252525', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {maxUp}
              </p>
            </div>
            <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
              <p style={{ margin: 0, fontFamily: 'Pretendard', fontSize: '11px', color: '#a9a9a9', whiteSpace: 'nowrap' }}>
                최대 하락 시
              </p>
              <p style={{ margin: '4px 0 0 0', fontFamily: 'Pretendard', fontSize: '12px', fontWeight: 'bold', color: '#252525', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {maxDown}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 바텀 네비게이션 */}
      <BottomNav activeTab="home" onTabChange={onTabChange} />
    </div>
  );
}

export default HomeScreen;
