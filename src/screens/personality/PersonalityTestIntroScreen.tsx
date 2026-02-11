import { Character } from '../../components/common';

interface PersonalityTestIntroScreenProps {
  onBack?: () => void;
  onStart?: () => void;
  userName?: string;
}

function PersonalityTestIntroScreen({ onBack, onStart, userName = '기비' }: PersonalityTestIntroScreenProps) {
  return (
    <div
      className="w-full h-screen max-w-[402px] max-h-[874px] mx-auto relative overflow-hidden"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      {/* 뒤로가기 버튼 - width: 24px, height: 24px, margin: 23px 116px 0 24px */}
      <button
        onClick={onBack}
        style={{
          width: '24px',
          height: '24px',
          margin: '23px 116px 0 24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          color: '#252525',
          padding: 0
        }}
      >
        ←
      </button>

      {/* 성향 테스트 제목 - width: 64px, height: 22px, margin: 23px 165px 2px 116px */}
      <h2
        style={{
          width: '64px',
          height: '22px',
          fontFamily: 'Pretendard',
          fontSize: '14px',
          fontWeight: 'bold',
          lineHeight: '1.57',
          letterSpacing: '-0.14px',
          textAlign: 'center',
          color: '#252525',
          position: 'absolute',
          top: '23px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        성향 테스트
      </h2>

      {/* 메인 컨텐츠 */}
      <div style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '71px' }}>
        {/* 메인 타이틀 - font-size: 28px, font-weight: 800, line-height: 1.36, letter-spacing: -0.28px, color: #393939 */}
        <h1
          style={{
            fontFamily: 'Pretendard',
            fontSize: '28px',
            fontWeight: 800,
            lineHeight: '1.36',
            letterSpacing: '-0.28px',
            textAlign: 'left',
            color: '#393939',
            marginBottom: '16px'
          }}
        >
          {userName} 님은 <span style={{ color: '#545FE8' }}>어떤 투자 성향</span>을
          <br />
          가지고 있을까요?
        </h1>

        {/* 부제목 - width: 262px, height: 48px, font-size: 16px, line-height: 1.5, letter-spacing: -0.16px, color: #6b6b6b */}
        <p
          style={{
            width: '262px',
            height: '48px',
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'normal',
            lineHeight: '1.5',
            letterSpacing: '-0.16px',
            textAlign: 'left',
            color: '#6B6B6B',
            marginBottom: '195px'
          }}
        >
          시작하기 전 딱 맞는 선택지를
          <br />
          추천드리기 위해 간단한 테스트가 필요해요
        </p>
      </div>

      {/* 말풍선 */}
      <div
        style={{
          position: 'absolute',
          bottom: '240px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {/* 말풍선 박스 */}
        <div
          style={{
            width: '253.7px',
            height: '78.8px',
            padding: '11.5px 28.6px 9.6px 29.4px',
            transform: 'rotate(-4.11deg)',
            borderRadius: '8px',
            backgroundColor: '#DEE0FA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* 말풍선 텍스트 - width: 195.7px, height: 57.7px, color: #515152 */}
          <p
            style={{
              width: '195.7px',
              height: '57.7px',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '1.57',
              letterSpacing: '-0.14px',
              textAlign: 'center',
              color: '#515152',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            테스트를 하면 성향에 맞는 캐릭터가
            <br />
            찾아 갈거에요!
          </p>

          {/* 말풍선 꼬리 - 삼각형 */}
          <div
            style={{
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '30.1px',
              height: '31.8px',
              backgroundColor: '#DEE0FA',
              borderRadius: '6px',
              clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)'
            }}
          />
        </div>
      </div>

      {/* 캐릭터 이미지들 */}
      <div
        style={{
          position: 'absolute',
          bottom: '133px',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: '12px',
          padding: '0 24px'
        }}
      >
        <Character type="coin" width="75px" />
        <Character type="paper-money" width="55px" />
        <Character type="card" width="65px" />
        <Character type="bankbook" width="80px" />
      </div>

      {/* 시작하기 버튼 - 캐릭터와 버튼의 간격 61px, width: 345px, height: 54px, background-color: #545fe8 */}
      <button
        onClick={onStart}
        style={{
          position: 'absolute',
          bottom: '8px',
          left: '24px',
          width: '345px',
          height: '54px',
          borderRadius: '12px',
          backgroundColor: '#545FE8',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Pretendard',
          fontSize: '16px',
          fontWeight: 'bold',
          lineHeight: '1.5',
          letterSpacing: '-0.16px',
          color: '#FFFFFF'
        }}
      >
        시작하기
      </button>
    </div>
  );
}

export default PersonalityTestIntroScreen;
