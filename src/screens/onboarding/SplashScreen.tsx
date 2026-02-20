import flightIcon from '../../assets/images/svg/ic_flight_color.svg';
import givyLogo from '../../assets/images/png/img_logo_givy_symbol.png';

/**
 * Splash 스플래시 스크린 컴포넌트
 * 앱 시작 시 보여지는 초기 화면
 *
 * 디자인 스펙:
 * - 디바이스: iPhone 16 Pro (402 x 874px)
 * - 그리드: 4 Column, Gutter 12px, Margin 24px, Container 345px
 * - 배경색: #7681FC
 * - 텍스트: top 160px, left 24px, width 190px, height 250px
 * - 폰트: Pretendard 300, 40px, line-height 50px, letter-spacing -1%
 */
function Splash() {
  return (
    // 전체 화면 컨테이너 (iPhone 16 Pro 사이즈: 402 x 874px)
    <div className="w-full h-screen max-w-[402px] max-h-[874px] mx-auto bg-[#7681FC] flex flex-col text-white overflow-x-hidden overflow-y-auto relative">

      {/* 메인 텍스트 섹션 - margin: 101px 123px 295px 24px */}
      <div
        className="absolute top-[101px] left-[24px] text-white"
        style={{
          fontFamily: 'Pretendard',
          fontSize: '40px',
          fontWeight: 300,
          lineHeight: 1.25,
          letterSpacing: '-0.4px',
          textAlign: 'left'
        }}
      >
        <div>복잡함 없이</div>
        <div>시작하는</div>

        {/* 점선과 비행기 */}
        <div className="flex items-center my-4 relative">
          <div
            style={{
              width: '320px',
              height: '1px',
              backgroundImage: 'linear-gradient(to right, #c2c7fc 50%, transparent 50%)',
              backgroundSize: '8px 1px',
              backgroundRepeat: 'repeat-x'
            }}
          ></div>
          <img
            src={flightIcon}
            alt=""
            className="animate-bounce-slow"
            style={{ width: '32px', height: '32px', marginLeft: '8px' }}
          />
        </div>

        <div>자산 형성의</div>
        <div>첫 걸음.</div>
      </div>

      {/* 하단 로고 섹션 */}
      <div className="absolute left-[24px] bottom-[40px]">
        <img
          src={givyLogo}
          alt="GIVY"
          style={{
            width: '45px',
            height: '41px',
            filter: 'brightness(0) saturate(100%) invert(83%) sepia(10%) saturate(1000%) hue-rotate(200deg) brightness(100%)'
          }}
        />
        <div
          style={{
            fontFamily: 'Pretendard',
            fontSize: '20px',
            fontWeight: 'bold',
            lineHeight: 1.6,
            letterSpacing: '-0.2px',
            textAlign: 'left',
            color: '#c2c7fc',
          }}
        >
          GIVY
        </div>
      </div>

      {/* 커스텀 애니메이션을 위한 스타일 태그 */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}

export default Splash;
