import { useState } from 'react';
import { Character } from '../../components/common';

/**
 * OnboardingScreen - 온보딩 화면 컴포넌트
 * 4개의 화면을 슬라이드로 보여주며, 각 화면마다 다른 메시지와 캐릭터를 표시
 * 디자인 스펙: example.css 참고하여 정확한 margin 값 적용
 */
interface OnboardingScreenProps {
  onComplete?: () => void;
}

interface OnboardingPage {
  title: string;
  description: string;
  characterType: 'coin' | 'paper-money' | 'card' | 'bankbook';
}

function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentPage, setCurrentPage] = useState(0);

  // 온보딩 페이지 데이터
  const pages: OnboardingPage[] = [
    {
      title: '복잡한 시작을\n기비가 도와드려요',
      description: '사회초년생 10명 중 7명이 투자를 시작도 못 하고 포기한대요.\n어려운 용어와 복잡한 절차는 싹 뺐습니다.\n기비와 함께라면 누구나 5분 만에 시작할 수 있어요.',
      characterType: 'coin'
    },
    {
      title: '가장 알맞는 선택지를\n추천해드려요',
      description: '수천 개의 ETF를 혼자 다 공부할 수는 없으니까요.\n기비의 알고리즘이 메이트님의 상황을 분석해서,\n지금 가장 필요한 \'방법\'을 찾아드려요.',
      characterType: 'paper-money'
    },
    {
      title: '선택의 결과가\n궁금하지 않으신가요?',
      description: '오늘 아낀 외식값 5만 원이 10년 뒤면 얼마가 될까요?\n막연하기만 했던 미래의 내 자산\n기비와 \'미래 보기\' 시뮬레이션으로 지금 바로 확인해보세요.',
      characterType: 'card'
    },
    {
      title: '여정을 함께할 나만의 투자 메이트를\n지금 만나보세요',
      description: '준비는 다 되셨나요? 마지막으로 가장 중요한 \'가이드\'가 남았어요.\n나의 여정 스타일과 딱 맞는 메이트가 지금 기다리고 있어요.\n누구와 함께 떠나게 될지, 지금 바로 확인해 보세요!',
      characterType: 'bankbook'
    }
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete?.();
    }
  };

  const handleSkip = () => {
    onComplete?.();
  };

  const currentPageData = pages[currentPage];
  const isLastPage = currentPage === pages.length - 1;

  return (
    <div className="w-full h-screen max-w-[402px] max-h-[874px] mx-auto bg-white relative overflow-hidden">
      {/* 페이지 인디케이터*/}
      <div
        className="flex gap-[4px]"
        style={{
          position: 'absolute',
          top: '21px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        {pages.map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ${
              index === currentPage
                ? 'w-[48px] h-[9px] rounded-[12px] bg-[#7681FC]'
                : 'w-[9px] h-[9px] rounded-full bg-[#C6C6C6]'
            }`}
          />
        ))}
      </div>

      {/* SKIP 버튼 - margin: 15px 24px 0 33.5px */}
      <button
        onClick={handleSkip}
        style={{
          position: 'absolute',
          top: '15px',
          right: '24px',
          fontFamily: 'Pretendard',
          fontSize: '14px',
          fontWeight: 'bold',
          letterSpacing: '-0.14px',
          color: '#8D8D8D',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          lineHeight: '1.57'
        }}
      >
        SKIP
      </button>

      {/* 캐릭터 영역 - 고정 위치 */}
      <div
        style={{
          position: 'absolute',
          top: '173px',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px'
        }}
      >
        {currentPage === 0 && <Character type="coin" width="180px" />}
        {currentPage === 1 && <Character type="paper-money" width="90px" />}
        {currentPage === 2 && <Character type="card" width="100px" />}
        {currentPage === 3 && <Character type="bankbook" width="160px" />}
      </div>

      {/* 제목 - width: 329px, height: 72px, 고정 위치 */}
      <h1
        className="text-center whitespace-pre-line"
        style={{
          position: 'absolute',
          top: '411.6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '329px',
          height: '72px',
          fontFamily: 'Pretendard',
          fontSize: '24px',
          fontWeight: 'bold',
          lineHeight: '1.5',
          letterSpacing: '-0.24px',
          color: '#252525'
        }}
      >
        {currentPageData.title}
      </h1>

      {/* 설명 - width: 351px, height: 66px, 고정 위치 */}
      <p
        className="text-center whitespace-pre-line"
        style={{
          position: 'absolute',
          top: '496px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '351px',
          height: '66px',
          fontFamily: 'Pretendard',
          fontSize: '14px',
          fontWeight: 'normal',
          lineHeight: '1.57',
          letterSpacing: '-0.14px',
          color: '#6B6B6B'
        }}
      >
        {currentPageData.description}
      </p>

      {/* 다음으로 버튼 - 고정 위치 */}
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          left: '24px',
          right: '24px'
        }}
      >
        <button
          onClick={handleNext}
          className="w-full rounded-[12px] flex items-center justify-center"
          style={{
            height: '54px',
            backgroundColor: '#545FE8'
          }}
        >
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: '16px',
              fontWeight: 'bold',
              lineHeight: '1.5',
              letterSpacing: '-0.16px',
              color: '#FFFFFF'
            }}
          >
            {isLastPage ? '시작하기' : '다음으로'}
          </span>
        </button>
      </div>
    </div>
  );
}

export default OnboardingScreen;
