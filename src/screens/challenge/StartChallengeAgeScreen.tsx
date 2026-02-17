// 아이콘 import
import backIcon from '../../assets/images/svg/ic_back.svg';
import flightIcon from '../../assets/images/svg/ic_flight_color.svg';

// 캐릭터 이미지 import
import characterQuestion from '../../assets/images/png/img_charater_coin_question.png';

interface StartChallengeAgeScreenProps {
  onBack?: () => void;
  onNo?: () => void;
  onYes?: () => void;
}

function StartChallengeAgeScreen({ onBack, onNo, onYes }: StartChallengeAgeScreenProps) {
  // 오늘 기준 19세가 되는 생년월일 계산
  const today = new Date();
  const birthYear = today.getFullYear() - 19;
  const birthMonth = today.getMonth() + 1;
  const birthDay = today.getDate();

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
          만 19세 이상이신가요?
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
          오늘 기준 {birthYear}년 {birthMonth}월 {birthDay}일 생이에요
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
          src={characterQuestion}
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
          display: 'flex',
          gap: '8px',
        }}
      >
        {/* 아니요 버튼 */}
        <button
          onClick={onNo}
          style={{
            width: '72px',
            height: '54px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#E5E5E5',
            cursor: 'pointer',
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: 1.5,
            letterSpacing: '-0.16px',
            color: '#666666',
          }}
        >
          아니요
        </button>

        {/* 네, 19세 이상이에요 버튼 */}
        <button
          onClick={onYes}
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
          네, 19세 이상이에요
        </button>
      </div>
    </div>
  );
}

export default StartChallengeAgeScreen;
