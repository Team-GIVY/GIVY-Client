import { useState } from 'react';

// 로고 imports
import tossLogo from '../../assets/images/png/img_logo_toss.png';
import kiwoomLogo from '../../assets/images/png/img_logo_kiwoom.png';
import kbLogo from '../../assets/images/png/img_logo_kb.png';
import nhLogo from '../../assets/images/png/img_logo_nh.png';
import miraeAssetLogo from '../../assets/images/png/img_logo_mirae-asset.png';
import mpopLogo from '../../assets/images/png/img_logo_mpop.png';
import kakaoBankLogo from '../../assets/images/png/img_logo_kakao-bank.png';

// 증권사 타입
interface Brokerage {
  id: string;
  name: string;
  logo: string;
}

interface BrokerageSettingsScreenProps {
  onBack?: () => void;
  onSelect?: (brokerageId: string) => void;
  selectedBrokerage?: string;
}

const brokerageList: Brokerage[] = [
  { id: 'toss', name: '토스 증권', logo: tossLogo },
  { id: 'kiwoom', name: '키움 증권', logo: kiwoomLogo },
  { id: 'kb', name: 'KB 증권', logo: kbLogo },
  { id: 'nh', name: 'NH투자증권', logo: nhLogo },
  { id: 'mirae', name: '미래에셋 증권', logo: miraeAssetLogo },
  { id: 'samsung', name: '삼성증권', logo: mpopLogo },
  { id: 'kakao', name: '카카오뱅크', logo: kakaoBankLogo },
];

function BrokerageSettingsScreen({
  onBack,
  onSelect,
  selectedBrokerage = 'toss',
}: BrokerageSettingsScreenProps) {
  const [selected, setSelected] = useState<string>(selectedBrokerage);

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect?.(id);
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
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 헤더 */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '23px 24px 2px 24px',
          backgroundColor: '#F5F5F5',
          position: 'relative',
        }}
      >
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            left: '24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="#252525"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span
          style={{
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 'bold',
            lineHeight: 1.57,
            letterSpacing: '-0.14px',
            textAlign: 'center',
            color: '#252525',
          }}
        >
          증권사 설정 및 연결
        </span>
      </header>

      {/* 구분선 */}
      <div
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#e0e0e0',
          marginTop: '16px',
        }}
      />

      {/* 메인 컨텐츠 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
        }}
      >
        {/* 안내 텍스트 */}
        <div style={{ marginBottom: '24px' }}>
          <p
            style={{
              margin: 0,
              fontFamily: 'Pretendard',
              fontSize: '18px',
              fontWeight: 'bold',
              lineHeight: 1.5,
              letterSpacing: '-0.18px',
              color: '#252525',
            }}
          >
            갖고있으신 증권 앱을
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'Pretendard',
              fontSize: '18px',
              fontWeight: 'bold',
              lineHeight: 1.5,
              letterSpacing: '-0.18px',
              color: '#252525',
            }}
          >
            선택해주세요
          </p>
        </div>

        {/* 증권사 목록 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {brokerageList.map((brokerage) => (
            <button
              key={brokerage.id}
              onClick={() => handleSelect(brokerage.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 20px',
                borderRadius: '16px',
                border: 'none',
                backgroundColor: selected === brokerage.id ? '#dee0fa' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <img
                  src={brokerage.logo}
                  alt={brokerage.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
              <span
                style={{
                  flex: 1,
                  fontFamily: 'Pretendard',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#252525',
                  textAlign: 'left',
                }}
              >
                {brokerage.name}
              </span>
              {selected === brokerage.id && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#7681fc" />
                  <path
                    d="M8 12L11 15L16 9"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}

          {/* 다른 증권 앱 옵션 */}
          <button
            onClick={() => handleSelect('other')}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 20px',
              borderRadius: '16px',
              border: 'none',
              backgroundColor: selected === 'other' ? '#dee0fa' : '#FFFFFF',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                backgroundColor: '#f5f5f5',
                color: '#a8a8a8',
                fontFamily: 'Pretendard',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              ?
            </div>
            <span
              style={{
                flex: 1,
                fontFamily: 'Pretendard',
                fontSize: '16px',
                fontWeight: 500,
                color: '#252525',
                textAlign: 'left',
              }}
            >
              다른 증권 앱을 갖고 있어요
            </span>
            {selected === 'other' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#7681fc" />
                <path
                  d="M8 12L11 15L16 9"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BrokerageSettingsScreen;
