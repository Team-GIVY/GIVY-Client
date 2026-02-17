import coinChar from '../../assets/images/png/img_charater_coin_default.png';
import moneyChar from '../../assets/images/png/img_charater_paper-money_default.png';
import cardChar from '../../assets/images/png/img_charater_card_default.png';
import bankbookChar from '../../assets/images/png/img_charater_bankbook_default.png';

interface LoadingScreenProps {
  withCard?: boolean;
}

function LoadingScreen({ withCard = true }: LoadingScreenProps) {
  const content = (
    <>
      {/* 캐릭터 그룹 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        {/* 노랑 캐릭터 (코인) */}
        <img
          src={coinChar}
          alt=""
          style={{
            width: '52.7px',
            height: '53.8px',
            margin: '16.4px 0 3.7px 0',
            padding: '0 2px 1.4px 0',
            objectFit: 'contain',
          }}
        />
        {/* 초록 캐릭터 (지폐) */}
        <img
          src={moneyChar}
          alt=""
          style={{
            width: '37.5px',
            height: '51.1px',
            margin: '0 2px 7.4px 0',
            objectFit: 'contain',
          }}
        />
        {/* 빨강 캐릭터 (카드) */}
        <img
          src={cardChar}
          alt=""
          style={{
            width: '42.7px',
            height: '50.7px',
            margin: '10px 0 9.1px 2px',
            padding: '0 2px 1.1px 0',
            objectFit: 'contain',
          }}
        />
        {/* 분홍 캐릭터 (통장) */}
        <img
          src={bankbookChar}
          alt=""
          style={{
            width: '51px',
            height: '55.4px',
            margin: '14.9px 0 3.7px 0',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* 타이틀 */}
      <p
        style={{
          fontFamily: 'Pretendard',
          fontSize: '18px',
          fontWeight: 'bold',
          lineHeight: 1.56,
          letterSpacing: '-0.18px',
          textAlign: 'center',
          color: '#7681fc',
          margin: '0 0 4px 0',
        }}
      >
        잠시만 기다려 주세요
      </p>

      {/* 설명 */}
      <p
        style={{
          fontFamily: 'Pretendard',
          fontSize: '12px',
          fontWeight: 'normal',
          lineHeight: 1.5,
          letterSpacing: '-0.12px',
          textAlign: 'center',
          color: '#8d8d8d',
          margin: 0,
        }}
      >
        고객님의 정보를 확인하고 있습니다
        <br />
        통신 상황에 따라 최대 1분 정도 소요될 수 있습니다
      </p>
    </>
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        maxWidth: '402px',
        margin: '0 auto',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {withCard ? (
        <div
          style={{
            width: '260px',
            height: '230px',
            padding: '47.5px 26px 21px',
            borderRadius: '20px',
            backgroundColor: '#FFFFFF',
            boxSizing: 'content-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {content}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default LoadingScreen;
