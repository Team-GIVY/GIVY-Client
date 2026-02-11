import { useState } from 'react';

// 아이콘 import
import backIcon from '../../assets/images/svg/ic_back.svg';
import flightIcon from '../../assets/images/svg/ic_flight_color.svg';
import flightBlackIcon from '../../assets/images/svg/ic_flight_black.svg';

// API 상품 타입
interface ProductOverviewDTO {
  productId: number;
  name: string;
  code: string;
  imageUrl: string;
  tagline: string;
  description: string;
  rateAvg: number;
}

interface StartChallengeProductScreenProps {
  onBack?: () => void;
  onConfirm?: (productId: number) => void;
  userName?: string;
  products?: ProductOverviewDTO[];
}

function StartChallengeProductScreen({
  onBack,
  onConfirm,
  userName = '기비',
  products = [],
}: StartChallengeProductScreenProps) {
  // API에서 상품이 없으면 로딩 표시
  if (!products || products.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <p>추천 상품을 불러오는 중...</p>
        <p style={{ fontSize: '12px', color: '#757575', marginTop: '8px' }}>성향 테스트를 먼저 완료해주세요</p>
      </div>
    );
  }

  const productList = products;
  const [productIndex, setProductIndex] = useState(0);
  const product = productList[productIndex];

  const handleOtherProduct = () => {
    setProductIndex((prev) => (prev + 1) % productList.length);
  };

  const handleConfirm = () => {
    onConfirm?.(product.productId);
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
      {/* 상단 영역 */}
      <div style={{ padding: '0 24px' }}>
        {/* 뒤로가기 버튼 */}
        <button
          onClick={onBack}
          style={{
            width: '24px',
            height: '24px',
            marginTop: '23px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={backIcon} alt="뒤로가기" style={{ width: '24px', height: '24px' }} />
        </button>

        {/* 비행기 아이콘 */}
        <img
          src={flightIcon}
          alt="비행기"
          style={{
            width: '24px',
            height: '24px',
            marginTop: '16px',
            transform: 'rotate(-45deg)',
          }}
        />

        {/* 타이틀 */}
        <h1
          style={{
            fontFamily: 'Pretendard',
            fontSize: '24px',
            fontWeight: 'bold',
            lineHeight: 1.5,
            letterSpacing: '-0.24px',
            color: '#252525',
            margin: '8px 0 0 0',
          }}
        >
          {productIndex === 0 ? '이 상품은 어떠신가요?' : '그럼 이 상품은 어떠신가요?'}
        </h1>

        {/* 서브텍스트 */}
        <p
          style={{
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: 1.5,
            letterSpacing: '-0.16px',
            color: '#717171',
            margin: '8px 0 0 0',
          }}
        >
          {userName} 님의 성향과 잘 맞아요 (평균 수익률 {product.rateAvg}%)
        </p>
      </div>

      {/* 상품 카드 영역 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 24px',
        }}
      >
        {/* 상품 정보 카드 (티켓) */}
        <div
          style={{
            width: '345px',
            marginTop: '60px',
            marginBottom: '12px',
            position: 'relative',
          }}
        >
          {/* 티켓 본체 */}
          <div
            style={{
              width: '100%',
              padding: '16px 24px 20px 24px',
              borderRadius: '20px',
              backgroundColor: '#FFFFFF',
              boxSizing: 'border-box',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          >
            {/* 도착지 라벨 */}
            <span
              style={{
                display: 'block',
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: '-0.12px',
                color: '#A9A9A9',
                margin: '0 63px 2px 28px',
              }}
            >
              도착지
            </span>

            {/* S&P 500 + 점선 + TIGER (같은 줄) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '2px',
              }}
            >
              {/* 비행기 아이콘 + S&P 500 */}
              <img
                src={flightBlackIcon}
                alt="비행기"
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#252525',
                  marginLeft: '6px',
                }}
              >
                {product.code}
              </span>

              {/* 점선 (가로) */}
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  margin: '0 12px',
                  backgroundImage: 'linear-gradient(to right, #CCCCCC 4px, transparent 4px)',
                  backgroundSize: '8px 1px',
                  backgroundRepeat: 'repeat-x',
                }}
              />

              {/* 상품명 */}
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: product.name.length > 15 ? '10px' : product.name.length > 10 ? '12px' : '14px',
                  fontWeight: 'bold',
                  color: '#252525',
                  maxWidth: '150px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {product.name}
              </span>
            </div>

            {/* 짧은 설명 */}
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                color: '#757575',
                margin: '14px 49px 0 28px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as const,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product.tagline}
            </p>
          </div>

          {/* 왼쪽 노치 (반원 홈) */}
          <div
            style={{
              position: 'absolute',
              left: '-10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#F5F5F5',
              boxShadow: 'inset -2px 0 4px rgba(0, 0, 0, 0.04)',
            }}
          />

          {/* 오른쪽 노치 (반원 홈) */}
          <div
            style={{
              position: 'absolute',
              right: '-10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#F5F5F5',
              boxShadow: 'inset 2px 0 4px rgba(0, 0, 0, 0.04)',
            }}
          />
        </div>

        {/* 상세 설명 카드 */}
        <div
          style={{
            width: '345px',
            height: '250px',
            padding: '64px 29px 76px',
            borderRadius: '18px',
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.04)',
            backgroundColor: '#FFFFFF',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 상세 설명 */}
          <p
            style={{
              width: '287px',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'normal',
              lineHeight: 1.7,
              letterSpacing: '-0.14px',
              color: '#393939',
              margin: 0,
              textAlign: 'center',
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.description}
          </p>
        </div>

        {/* 다른 상품으로 하고 싶어요 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <button
            onClick={handleOtherProduct}
            style={{
              width: '167px',
              height: '28px',
              padding: '4.2px 12px 2.2px 10px',
              borderRadius: '4px',
              border: 'solid 0.5px #A0A7FA',
              backgroundColor: '#DEE0FA',
              cursor: 'pointer',
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: '-0.12px',
              textAlign: 'center',
              color: '#3A45B0',
            }}
          >
            다른 상품으로 하고 싶어요
          </button>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div
        style={{
          padding: '0 24px 32px 24px',
        }}
      >
        {/* 좋아요 버튼 */}
        <button
          onClick={handleConfirm}
          style={{
            width: '345px',
            height: '54px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#4F46E5',
            cursor: 'pointer',
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: 1.5,
            letterSpacing: '-0.16px',
            color: '#FFFFFF',
          }}
        >
          좋아요
        </button>
      </div>
    </div>
  );
}

export default StartChallengeProductScreen;
