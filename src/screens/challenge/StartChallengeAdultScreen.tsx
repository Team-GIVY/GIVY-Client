// 아이콘 import
import backIcon from '../../assets/images/svg/ic_back.svg';
import flightIcon from '../../assets/images/svg/ic_flight_color.svg';

// 캐릭터 이미지 import
import characterDefault from '../../assets/images/png/img_charater_coin_default.png';

interface StartChallengeAdultScreenProps {
  onBack?: () => void;
  onConfirm?: () => void;
}

function StartChallengeAdultScreen({ onBack, onConfirm }: StartChallengeAdultScreenProps) {
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
          성향조사를 바탕으로
          <br />
          상품을 추천해드릴게요
        </h1>

        {/* 서브텍스트 */}
        <p
          style={{
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1.57,
            letterSpacing: '-0.14px',
            color: '#6B6B6B',
            margin: '4px 0 0 0',
          }}
        >
          지금 5만원으로 투자자가 되어보세요
        </p>
      </div>

      {/* 캐릭터 이미지 영역 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={characterDefault}
          alt="캐릭터"
          style={{
            width: '280px',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* 하단 버튼 영역 */}
      <div
        style={{
          padding: '0 24px 32px 24px',
        }}
      >
        {/* 좋아요 버튼 */}
        <button
          onClick={onConfirm}
          style={{
            width: '100%',
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

export default StartChallengeAdultScreen;
