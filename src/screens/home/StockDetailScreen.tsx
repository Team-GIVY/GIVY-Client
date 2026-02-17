import { Header, BottomNav } from '../../components/common';
import { StockDetailCard } from '../../components/home';
import type { StockInfo } from '../../components/home';
import flightIcon from '../../assets/images/svg/ic_flight_black.svg';

interface ProductDTO {
  productId: number;
  name: string;
  code: string;
  imageUrl: string;
  tagline: string;
  description: string;
  rateAvg: number;
}

interface StockDetailScreenProps {
  onNotification?: () => void;
  onProfile?: () => void;
  onTabChange?: (tab: 'home' | 'guide' | 'settings') => void;
  userName?: string;
  product?: ProductDTO;
  brokerage?: string;
  category?: string;
}

function StockDetailScreen({
  onNotification,
  onProfile,
  onTabChange,
  userName = '기비',
  product,
  brokerage,
  category,
}: StockDetailScreenProps) {
  // API 데이터 또는 기본값
  const stockInfo: StockInfo = {
    ticker: product?.code || '360750',
    tickerName: product?.name || 'JEPQ',
    index: product?.code || 'NASDAQ',
    destination: category || '미국 기술주',
    brokerage: brokerage || '토스증권',
    expectedAmount: 50000,
    descriptionTitle: `${userName} 님!`,
    descriptionBody: product?.description
      ? [product.description]
      : [
        'JEPQ는 애플, 엔비디아 같은 미국 1등 기술주에 투자하면서 매달 월세처럼 현금도 챙기는 상품이에요',
        '게다가 세계적인 은행 JP모건이 직접 관리해주니 더 든든하죠',
        '성장과 이자를 동시에 잡는 똑똑한 선택입니다!',
      ],
    companyName: product?.name || 'JP모건 나스닥 프리미엄 인컴 ETF',
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
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 헤더 */}
      <Header onNotification={onNotification} onProfile={onProfile} />

      {/* 메인 컨텐츠 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
        {/* ========== 티켓 카드 (Ticket Card) ========== */}
        <div
          className="ticket-card"
          style={{
            width: '100%',
            maxWidth: '353px',
            margin: '23px auto 20px auto',
            padding: '12px 23px 16px 18px',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.05)',
            position: 'relative',
            boxSizing: 'border-box',
          }}
        >
          {/* 왼쪽 원형 커팅 (Ellipse-27) */}
          <div
            style={{
              position: 'absolute',
              left: '-8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: '#F5F5F5',
            }}
          />
          {/* 오른쪽 원형 커팅 (Ellipse-28) */}
          <div
            style={{
              position: 'absolute',
              right: '-8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: '#F5F5F5',
            }}
          />
          {/* 도착지 라벨 */}
          <p
            style={{
              margin: '0 0 4px 0',
              paddingLeft: '32px',
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontWeight: 500,
              color: '#a9a9a9',
            }}
          >
            도착지
          </p>

          {/* 출발 → 도착 구조 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            {/* 왼쪽: 비행기 + S&P 500 */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* 비행기 아이콘 */}
              <img
                src={flightIcon}
                alt=""
                style={{ width: '24px', height: '24px', marginRight: '8px' }}
              />

              {/* 상품명 */}
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  lineHeight: 1.6,
                  letterSpacing: '-0.2px',
                  color: '#252525',
                  maxWidth: '120px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                }}
              >
                {product?.name || 'S&P 500'}
              </span>
            </div>

            {/* 점선 */}
            <div
              style={{
                flex: 1,
                height: '1px',
                borderBottom: '2px dashed #c0c0c0',
                margin: '0 14px',
              }}
            />

            {/* 오른쪽: 도착지 */}
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '18px',
                fontWeight: 'bold',
                lineHeight: 1.56,
                letterSpacing: '-0.18px',
                color: '#252525',
              }}
            >
              {stockInfo.destination}
            </span>
          </div>

          {/* 상품코드, 증권계좌, 예상 투자금 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              paddingLeft: '32px',
              gap: '8px',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: '0',
                  fontFamily: 'Pretendard',
                  fontSize: '11px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: '-0.12px',
                  color: '#a9a9a9',
                  whiteSpace: 'nowrap',
                }}
              >
                상품코드
              </p>
              <p
                style={{
                  margin: '2px 0 0 0',
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#252525',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {stockInfo.ticker}
              </p>
            </div>

            <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
              <p
                style={{
                  margin: '0',
                  fontFamily: 'Pretendard',
                  fontSize: '11px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: '-0.12px',
                  color: '#a9a9a9',
                  whiteSpace: 'nowrap',
                }}
              >
                증권계좌
              </p>
              <p
                style={{
                  margin: '2px 0 0 0',
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#252525',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {stockInfo.brokerage}
              </p>
            </div>

            <div style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
              <p
                style={{
                  margin: '0',
                  fontFamily: 'Pretendard',
                  fontSize: '11px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: '-0.12px',
                  color: '#a9a9a9',
                  whiteSpace: 'nowrap',
                }}
              >
                예상 투자금
              </p>
              <p
                style={{
                  margin: '2px 0 0 0',
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#252525',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {stockInfo.expectedAmount.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>

        {/* ========== 상세 카드 (컴포넌트) ========== */}
        <StockDetailCard stockInfo={stockInfo} />
      </div>

      {/* 바텀 네비게이션 */}
      <BottomNav activeTab="home" onTabChange={onTabChange} />
    </div>
  );
}

export default StockDetailScreen;
