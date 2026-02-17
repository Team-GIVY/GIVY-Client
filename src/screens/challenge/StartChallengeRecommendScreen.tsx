import { useState } from 'react';

// 아이콘 import
import backIcon from '../../assets/images/svg/ic_back.svg';
import flightIcon from '../../assets/images/svg/ic_flight_color.svg';

// 증권사 로고 import
import tossLogo from '../../assets/images/png/img_logo_toss.png';
import kiwoomLogo from '../../assets/images/png/img_logo_kiwoom.png';
import kbLogo from '../../assets/images/png/img_logo_kb.png';

interface BrokerageRecommend {
  id: string;
  name: string;
  subName?: string;
  logo: string;
  description: string;
  isRecommended?: boolean;
}

// 전체 증권사 목록 (세트별로 그룹화)
const allRecommendations: BrokerageRecommend[][] = [
  // 세트 1: 기본 추천
  [
    {
      id: 'toss',
      name: '토스 증권',
      logo: tossLogo,
      description: '별도 앱 설치 NO! 토스 앱 그대로,\n가장 쉽고 직관적으로 시작하세요.',
      isRecommended: true,
    },
    {
      id: 'kiwoom',
      name: '키움증권',
      subName: '(영웅문S#)',
      logo: kiwoomLogo,
      description: '19년 연속 대한민국 주식 점유율 1위!\n사람들이 많이 쓰는 데는 이유가 있어요.',
    },
    {
      id: 'kb',
      name: 'KB증권',
      subName: '(M-able)',
      logo: kbLogo,
      description: '압도적인 월간 사용자 수!\nKB국민은행을 쓰신다면 가장 편한 선택이에요.',
    },
  ],
  // 세트 2: 다른 추천
  [
    {
      id: 'kiwoom',
      name: '키움증권',
      subName: '(영웅문S#)',
      logo: kiwoomLogo,
      description: '19년 연속 대한민국 주식 점유율 1위!\n사람들이 많이 쓰는 데는 이유가 있어요.',
      isRecommended: true,
    },
    {
      id: 'kb',
      name: 'KB증권',
      subName: '(M-able)',
      logo: kbLogo,
      description: '압도적인 월간 사용자 수!\nKB국민은행을 쓰신다면 가장 편한 선택이에요.',
    },
    {
      id: 'toss',
      name: '토스 증권',
      logo: tossLogo,
      description: '별도 앱 설치 NO! 토스 앱 그대로,\n가장 쉽고 직관적으로 시작하세요.',
    },
  ],
  // 세트 3: 또 다른 추천
  [
    {
      id: 'kb',
      name: 'KB증권',
      subName: '(M-able)',
      logo: kbLogo,
      description: '압도적인 월간 사용자 수!\nKB국민은행을 쓰신다면 가장 편한 선택이에요.',
      isRecommended: true,
    },
    {
      id: 'toss',
      name: '토스 증권',
      logo: tossLogo,
      description: '별도 앱 설치 NO! 토스 앱 그대로,\n가장 쉽고 직관적으로 시작하세요.',
    },
    {
      id: 'kiwoom',
      name: '키움증권',
      subName: '(영웅문S#)',
      logo: kiwoomLogo,
      description: '19년 연속 대한민국 주식 점유율 1위!\n사람들이 많이 쓰는 데는 이유가 있어요.',
    },
  ],
];

interface StartChallengeRecommendScreenProps {
  onBack?: () => void;
  onReselect?: () => void;
  onConfirm?: (selectedBrokerage: string) => void;
  onOtherRecommend?: () => void;
  userName?: string;
}

function StartChallengeRecommendScreen({
  onBack,
  onReselect,
  onConfirm,
  onOtherRecommend,
  userName = '기비',
}: StartChallengeRecommendScreenProps) {
  const [recommendSetIndex, setRecommendSetIndex] = useState(0);
  const currentRecommendations = allRecommendations[recommendSetIndex];
  const [selectedBrokerage, setSelectedBrokerage] = useState<string>(currentRecommendations[0].id);

  const handleSelect = (id: string) => {
    setSelectedBrokerage(id);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(selectedBrokerage);
    }
  };

  const handleOtherRecommend = () => {
    // 다음 세트로 순환
    const nextIndex = (recommendSetIndex + 1) % allRecommendations.length;
    setRecommendSetIndex(nextIndex);
    // 새 세트의 첫 번째(추천) 증권사 선택
    setSelectedBrokerage(allRecommendations[nextIndex][0].id);
    // 외부 핸들러도 호출 (필요시)
    onOtherRecommend?.();
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
          {userName} 님에게 맞는
          <br />
          증권 계좌 추천드려요!
        </h1>
      </div>

      {/* 추천 카드 영역 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 24px',
        }}
      >
        {/* 추천 태그 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
          <span
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: '#393939',
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontWeight: 500,
              color: '#FFFFFF',
            }}
          >
            {userName}님의 성향과 가장 잘 맞아요!
          </span>
        </div>

        {/* 증권사 카드 목록 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentRecommendations.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              style={{
                width: '100%',
                padding: '20px',
                borderRadius: '16px',
                border: selectedBrokerage === item.id ? '2px solid #7681FC' : '2px solid transparent',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                textAlign: 'left',
              }}
            >
              {/* 로고 */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#F5F5F5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* 텍스트 */}
              <div>
                <p
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#252525',
                    margin: 0,
                  }}
                >
                  {item.name} {item.subName && <span style={{ fontWeight: 500 }}>{item.subName}</span>}
                </p>
                <p
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#6B6B6B',
                    margin: '4px 0 0 0',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* 다른 증권계좌를 추천해주세요 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button
            onClick={handleOtherRecommend}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #CCCCCC',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              fontFamily: 'Pretendard',
              fontSize: '13px',
              fontWeight: 500,
              color: '#666666',
            }}
          >
            다른 증권계좌를 추천해주세요
          </button>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div
        style={{
          padding: '0 24px 32px 24px',
          display: 'flex',
          gap: '8px',
        }}
      >
        {/* 재선택 버튼 */}
        <button
          onClick={onReselect}
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
          재선택
        </button>

        {/* 좋아요 버튼 */}
        <button
          onClick={handleConfirm}
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
          좋아요
        </button>
      </div>
    </div>
  );
}

export default StartChallengeRecommendScreen;
