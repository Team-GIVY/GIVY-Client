import { useState } from 'react';

// 증권사 로고 이미지 import
import tossLogo from '../../assets/images/png/img_logo_toss.png';
import kiwoomLogo from '../../assets/images/png/img_logo_kiwoom.png';
import kbLogo from '../../assets/images/png/img_logo_kb.png';
import nhLogo from '../../assets/images/png/img_logo_nh.png';
import miraeAssetLogo from '../../assets/images/png/img_logo_mirae-asset.png';
import samsungLogo from '../../assets/images/png/img_logo_mpop.png';
import kakaoLogo from '../../assets/images/png/img_logo_kakao-bank.png';
import characterImage from '../../assets/images/png/img_charater_coin_default.png';

// 아이콘 import
import flightIcon from '../../assets/images/svg/ic_flight_color.svg';
import backIcon from '../../assets/images/svg/ic_back.svg';

interface BrokerageOption {
  id: string;
  name: string;
  logo: string | null;
  isOther?: boolean;
}

const brokerageOptions: BrokerageOption[] = [
  { id: 'toss', name: '토스 증권', logo: tossLogo },
  { id: 'kiwoom', name: '키움 증권', logo: kiwoomLogo },
  { id: 'kb', name: 'KB증권', logo: kbLogo },
  { id: 'nh', name: 'NH투자증권', logo: nhLogo },
  { id: 'mirae', name: '미래에셋증권', logo: miraeAssetLogo },
  { id: 'samsung', name: '삼성증권', logo: samsungLogo },
  { id: 'kakao', name: '카카오뱅크', logo: kakaoLogo },
  { id: 'other', name: '다른 증권 앱을 가지고 있어요', logo: null, isOther: true },
];

interface StartChallengeScreenProps {
  onBack?: () => void;
  onNext?: (selectedBrokerage: string) => void;
  onNoAccount?: () => void;
}

function StartChallengeScreen({ onBack, onNext, onNoAccount }: StartChallengeScreenProps) {
  const [selectedBrokerage, setSelectedBrokerage] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedBrokerage(id);
  };

  const handleSubmit = () => {
    if (selectedBrokerage && onNext) {
      // id 대신 name을 전달
      const selected = brokerageOptions.find(b => b.id === selectedBrokerage);
      onNext(selected?.name || selectedBrokerage);
    }
  };

  return (
    <div
      className="w-full h-screen max-w-[402px] max-h-[874px] mx-auto relative overflow-hidden"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      {/* 상단 영역 */}
      <div style={{ backgroundColor: '#EDEEF2', paddingBottom: '24px' }}>
        {/* 뒤로가기 버튼 */}
        <button
          onClick={onBack}
          style={{
            width: '24px',
            height: '24px',
            margin: '23px 0 0 24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img src={backIcon} alt="뒤로가기" style={{ width: '24px', height: '24px' }} />
        </button>

        {/* 타이틀 영역 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '16px 24px 0 24px'
        }}>
          {/* 비행기 아이콘 + 텍스트 */}
          <div>
            <img
              src={flightIcon}
              alt="비행기"
              style={{
                width: '24px',
                height: '24px',
                marginBottom: '8px',
                transform: 'rotate(-45deg)'
              }}
            />
            <h1
              style={{
                fontFamily: 'Pretendard',
                fontSize: '24px',
                fontWeight: 'bold',
                lineHeight: '1.5',
                letterSpacing: '-0.24px',
                textAlign: 'left',
                color: '#252525',
                margin: 0
              }}
            >
              시작할 증권 앱을
              <br />
              선택해주세요.
            </h1>
          </div>

          {/* 캐릭터 이미지 */}
          <img
            src={characterImage}
            alt="캐릭터"
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>

      {/* 증권사 선택 영역 */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px 24px 0 0',
          padding: '24px 20px',
          marginTop: '-16px',
          position: 'relative',
          zIndex: 1,
          height: 'calc(100% - 200px)',
          overflowY: 'auto'
        }}
      >
        {/* 증권사 그리드 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            marginBottom: '24px'
          }}
        >
          {brokerageOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              style={{
                width: option.isOther ? '228px' : '110px',
                height: '110px',
                borderRadius: '8px',
                border: selectedBrokerage === option.id ? 'solid 1px #7681fc' : 'none',
                backgroundColor: selectedBrokerage === option.id ? '#DEE0FA' : '#F5F5F5',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px',
                position: 'relative',
                gridColumn: option.isOther ? 'span 2' : 'span 1'
              }}
            >
              {/* 체크 표시 */}
              {selectedBrokerage === option.id && (
                <div
                  style={{
                    position: 'absolute',
                    top: '7px',
                    right: '7px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#7681FC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                </div>
              )}

              {/* 로고 또는 물음표 아이콘 */}
              {option.logo ? (
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={option.logo}
                    alt={option.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: '#E5E5E5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px'
                  }}
                >
                  <span style={{ fontSize: '24px', color: '#999999' }}>?</span>
                </div>
              )}

              {/* 증권사 이름 */}
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '14px',
                  fontWeight: option.isOther ? 500 : 'bold',
                  lineHeight: '1.57',
                  letterSpacing: '-0.14px',
                  textAlign: 'center',
                  color: option.isOther ? '#515152' : '#252525'
                }}
              >
                {option.name}
              </span>
            </button>
          ))}
        </div>

        {/* 가지고 있는 증권 계좌가 없어요 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <button
            onClick={onNoAccount}
            style={{
              padding: '4px 12px',
              borderRadius: '4px',
              border: 'solid 0.5px #FABBB4',
              backgroundColor: '#FADCD9',
              cursor: 'pointer',
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: '1.5',
              letterSpacing: '-0.12px',
              textAlign: 'center',
              color: '#FA5343'
            }}
          >
            가지고 있는 증권 계좌가 없어요
          </button>
        </div>

        {/* 선택했어요 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={!selectedBrokerage}
          style={{
            width: '100%',
            maxWidth: '345px',
            height: '54px',
            margin: '0 auto',
            display: 'block',
            borderRadius: '12px',
            backgroundColor: selectedBrokerage ? '#545FE8' : '#CCCCCC',
            border: 'none',
            cursor: selectedBrokerage ? 'pointer' : 'not-allowed',
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: '1.5',
            letterSpacing: '-0.16px',
            color: '#FFFFFF'
          }}
        >
          선택했어요
        </button>
      </div>
    </div>
  );
}

export default StartChallengeScreen;
