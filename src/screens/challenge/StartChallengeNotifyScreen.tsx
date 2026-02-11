import { useState } from 'react';

// 아이콘 import
import backIcon from '../../assets/images/svg/ic_back.svg';
import flightIcon from '../../assets/images/svg/ic_flight_color.svg';
import flightBlackIcon from '../../assets/images/svg/ic_flight_black.svg';

interface ProductInfo {
  destination: string;
  productName: string;
  shortDescription: string;
}

interface StartChallengeNotifyScreenProps {
  onBack?: () => void;
  onReselect?: () => void;
  onConfirm?: (notifyEnabled: boolean) => void;
  product?: ProductInfo;
}

function StartChallengeNotifyScreen({
  onBack,
  onReselect,
  onConfirm,
  product,
}: StartChallengeNotifyScreenProps) {
  if (!product) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>상품 정보를 불러오는 중...</p>
      </div>
    );
  }
  const [notifyEnabled, setNotifyEnabled] = useState(true);

  const handleToggle = () => {
    setNotifyEnabled(!notifyEnabled);
  };

  const handleConfirm = () => {
    onConfirm?.(notifyEnabled);
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
        backgroundColor: '#FFFFFF',
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
            marginTop: '23px',
            transform: 'rotate(-45deg)',
          }}
        />

        {/* 서브 텍스트 */}
        <p
          style={{
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1.57,
            letterSpacing: '-0.14px',
            color: '#717171',
            margin: '4px 0 0 0',
          }}
        >
          지금은 마켓이 열리지 않았어요
        </p>

        {/* 타이틀 */}
        <h1
          style={{
            fontFamily: 'Pretendard',
            fontSize: '24px',
            fontWeight: 'bold',
            lineHeight: 1.5,
            letterSpacing: '-0.24px',
            color: '#252525',
            margin: '4px 0 0 0',
          }}
        >
          마켓이 열리면 알림을 보내드릴게요!
        </h1>
      </div>

      {/* 컨텐츠 영역 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* 티켓 카드 */}
        <div
          style={{
            width: '345px',
            marginTop: '26px',
            position: 'relative',
          }}
        >
          {/* 티켓 본체 */}
          <div
            style={{
              width: '100%',
              padding: '16px 23px 19px 18px',
              borderRadius: '20px',
              backgroundColor: '#F5F5F5',
              boxSizing: 'border-box',
              boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.04)',
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
                {product.destination}
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
                  fontSize: product.productName.length > 15 ? '10px' : product.productName.length > 10 ? '12px' : '14px',
                  fontWeight: 'bold',
                  color: '#252525',
                  maxWidth: '150px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {product.productName}
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
              {product.shortDescription}
            </p>
          </div>

          {/* 왼쪽 노치 (반원 홈) */}
          <div
            style={{
              position: 'absolute',
              left: '-8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
            }}
          />

          {/* 오른쪽 노치 (반원 홈) */}
          <div
            style={{
              position: 'absolute',
              right: '-8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
            }}
          />
        </div>

        {/* 알림 토글 카드 */}
        <div
          style={{
            width: '256px',
            marginTop: '40px',
            padding: '16px 20px',
            borderRadius: '12px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          {/* 벨 아이콘 + 텍스트 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* 벨 아이콘 */}
            <svg
              width="24"
              height="26.7"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 24.7C13.1 24.7 14 23.8 14 22.7H10C10 23.8 10.9 24.7 12 24.7ZM18 18.7V12.7C18 9.63 16.36 7.06 13.5 6.38V5.7C13.5 4.87 12.83 4.2 12 4.2C11.17 4.2 10.5 4.87 10.5 5.7V6.38C7.63 7.06 6 9.62 6 12.7V18.7L4 20.7V21.7H20V20.7L18 18.7Z"
                fill="#6B6B6B"
              />
            </svg>

            {/* 텍스트 */}
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 500,
                color: '#252525',
              }}
            >
              알림 받을게요
            </span>
          </div>

          {/* 토글 스위치 */}
          <button
            onClick={handleToggle}
            style={{
              width: '48px',
              height: '28px',
              borderRadius: '14px',
              border: 'none',
              backgroundColor: notifyEnabled ? '#545FE8' : '#E0E0E0',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.2s ease',
              padding: 0,
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                top: '2px',
                left: notifyEnabled ? '22px' : '2px',
                transition: 'left 0.2s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            />
          </button>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div
        style={{
          padding: '0 24px 32px 24px',
          display: 'flex',
          gap: '12px',
        }}
      >
        {/* 재선택 버튼 */}
        <button
          onClick={onReselect}
          style={{
            width: '80px',
            height: '54px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#F5F5F5',
            cursor: 'pointer',
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 500,
            color: '#717171',
          }}
        >
          재선택
        </button>

        {/* 좋아요 버튼 */}
        <button
          onClick={handleConfirm}
          style={{
            flex: 1,
            height: '54px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#545FE8',
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

export default StartChallengeNotifyScreen;
