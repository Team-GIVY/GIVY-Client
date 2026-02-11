// 아이콘 import
import backIcon from '../../assets/images/svg/ic_back.svg';
import flightIcon from '../../assets/images/svg/ic_flight_color.svg';

// 캐릭터 이미지 import
import characterDefault from '../../assets/images/png/img_charater_coin_default.png';

interface StartChallengeCompleteScreenProps {
  onBack?: () => void;
  onConfirm?: () => void;
}

function StartChallengeCompleteScreen({ onBack, onConfirm }: StartChallengeCompleteScreenProps) {
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
          모든 절차가 끝났어요
          <br />
          새로운 홈 화면에서 다시 만나요!
        </h1>
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

export default StartChallengeCompleteScreen;
