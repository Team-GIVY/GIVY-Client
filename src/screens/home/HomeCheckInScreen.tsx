import { Header, BottomNav } from '../../components/common';

// 캐릭터 이미지 (기본 캐릭터 - 여행 이미지가 추가되면 교체)
import characterImg from '../../assets/images/png/img_charater_coin_default.png';

interface HomeCheckInScreenProps {
  onNotification?: () => void;
  onProfile?: () => void;
  onTabChange?: (tab: 'home' | 'guide' | 'settings') => void;
  onCheckIn?: () => void;
  onSkipChallenge?: () => void;
  userName?: string;
  expectedInvestment?: string;
  destination?: string;
}

function HomeCheckInScreen({
  onNotification,
  onProfile,
  onTabChange,
  onCheckIn,
  onSkipChallenge,
  userName = '기비',
  expectedInvestment = '50,000원',
  destination = '미국 기술주',
}: HomeCheckInScreenProps) {
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
      {/* 헤더 */}
      <Header onNotification={onNotification} onProfile={onProfile} />

      {/* 메인 컨텐츠 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 24px',
        }}
      >
        {/* 카드 */}
        <div
          style={{
            width: '345px',
            marginTop: '23px',
            borderRadius: '16px',
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.05), 0 2px 8px 0 rgba(0, 0, 0, 0.05)',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* 상단 흰색 영역 */}
          <div
            style={{
              padding: '24px 20px 20px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* 타이틀 */}
            <h1
              style={{
                width: '100%',
                margin: '0 0 20px 0',
                fontFamily: 'Pretendard',
                fontSize: '24px',
                fontWeight: 'bold',
                lineHeight: 1.5,
                letterSpacing: '-0.24px',
                textAlign: 'left',
                color: '#252525',
              }}
            >
              투자의 첫 걸음,
              <br />
              스타트 챌린지가 곧 출발해요
            </h1>

            {/* 캐릭터 이미지 */}
            <div
              style={{
                width: '200px',
                height: '180px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <img
                src={characterImg}
                alt="캐릭터"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* 예상 투자금 & 도착지 */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '60px',
                marginTop: '10px',
              }}
            >
              {/* 예상 투자금 */}
              <div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'Pretendard',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: 1.57,
                    letterSpacing: '-0.14px',
                    color: '#a9a9a9',
                  }}
                >
                  예상 투자금
                </p>
                <p
                  style={{
                    margin: '4px 0 0 0',
                    fontFamily: 'Pretendard',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    lineHeight: 1.6,
                    letterSpacing: '-0.2px',
                    color: '#252525',
                  }}
                >
                  {expectedInvestment}
                </p>
              </div>

              {/* 도착지 */}
              <div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'Pretendard',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: 1.57,
                    letterSpacing: '-0.14px',
                    color: '#a9a9a9',
                  }}
                >
                  도착지
                </p>
                <p
                  style={{
                    margin: '4px 0 0 0',
                    fontFamily: 'Pretendard',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    lineHeight: 1.6,
                    letterSpacing: '-0.2px',
                    color: '#252525',
                  }}
                >
                  {destination}
                </p>
              </div>
            </div>
          </div>

          {/* 구분선 - 점선 스타일 */}
          <div
            style={{
              width: '308px',
              height: '0',
              margin: '0 auto',
              borderTop: '1px dashed #c0c0c0',
            }}
          />

          {/* 하단 흰색 영역 */}
          <div
            style={{
              width: '100%',
              height: '140px',
              padding: '25px 20px 17px 20px',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* 체크인 하기 버튼 */}
            <button
              onClick={onCheckIn}
              style={{
                width: '160px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#dee0fa',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  lineHeight: 1.6,
                  letterSpacing: '-0.2px',
                  color: '#545fe8',
                }}
              >
                체크인 하기
              </span>
            </button>

            {/* 안내 텍스트 */}
            <p
              style={{
                marginTop: '18px',
                marginBottom: 0,
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                textAlign: 'center',
                color: '#656565',
              }}
            >
              {userName} 님이 원하는 [{destination}] 투자를
              <br />
              가장 쉽게 시작하는 방법이에요
            </p>
          </div>
        </div>

        {/* 스타트 챌린지 건너뛰기 버튼 - 카드 밖 */}
        <button
          onClick={onSkipChallenge}
          style={{
            width: '130px',
            height: '24px',
            marginTop: '16px',
            borderRadius: '4px',
            border: 'solid 0.5px #cbcbcb',
            backgroundColor: '#dedede',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: '10px',
              fontWeight: 'normal',
              lineHeight: 1.8,
              letterSpacing: '-0.1px',
              color: '#595959',
            }}
          >
            스타트 챌린지 건너뛰기
          </span>
        </button>
      </div>

      {/* 바텀 네비게이션 */}
      <BottomNav activeTab="home" onTabChange={onTabChange} />
    </div>
  );
}

export default HomeCheckInScreen;
