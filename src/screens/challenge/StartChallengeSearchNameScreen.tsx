// 아이콘 import
import backIcon from '../../assets/images/svg/ic_back.svg';
import flightIcon from '../../assets/images/svg/ic_flight_color.svg';
import flightBlackIcon from '../../assets/images/svg/ic_flight_black.svg';

interface ProductInfo {
  destination: string;
  productName: string;
  shortDescription: string;
}

interface StartChallengeSearchNameScreenProps {
  onBack?: () => void;
  onCopyName?: () => void;
  onComplete?: () => void;
  product?: ProductInfo;
}

function StartChallengeSearchNameScreen({
  onBack,
  onCopyName,
  onComplete,
  product,
}: StartChallengeSearchNameScreenProps) {
  if (!product) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>상품 정보를 불러오는 중...</p>
      </div>
    );
  }
  const handleCopyName = () => {
    navigator.clipboard.writeText(product.productName);
    onCopyName?.();
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
          복사한 상품 코드가 검색되지 않는다면
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
          이름으로 검색해보세요
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

        {/* 상품명 카드 */}
        <div
          style={{
            width: '256px',
            marginTop: '60px',
            padding: '16px 0',
            borderRadius: '12px',
            boxShadow: '0 0 20px 0 rgba(194, 199, 252, 0.4)',
            border: 'solid 1px #c2c7fc',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          {/* 상품명 라벨 */}
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 1.57,
              letterSpacing: '-0.14px',
              color: '#A9A9A9',
            }}
          >
            상품명
          </span>

          {/* 종목명 */}
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: product.productName.length > 15 ? '14px' : product.productName.length > 10 ? '16px' : '20px',
              fontWeight: 'bold',
              lineHeight: 1.6,
              letterSpacing: '-0.2px',
              color: '#252525',
              marginTop: '4px',
              maxWidth: '220px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'block',
            }}
          >
            {product.productName}
          </span>
        </div>

        {/* 복사하기 버튼 */}
        <button
          onClick={handleCopyName}
          style={{
            width: '78px',
            height: '28px',
            marginTop: '16px',
            padding: '3px 15px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#DEE0FA',
            cursor: 'pointer',
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1.57,
            letterSpacing: '-0.14px',
            textAlign: 'center',
            color: '#3A45B0',
          }}
        >
          복사하기
        </button>
      </div>

      {/* 하단 버튼 영역 */}
      <div
        style={{
          padding: '21px 24px 32px 24px',
        }}
      >
        {/* 매수를 완료했어요 버튼 */}
        <button
          onClick={onComplete}
          style={{
            width: '345px',
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
          매수를 완료했어요
        </button>
      </div>
    </div>
  );
}

export default StartChallengeSearchNameScreen;
