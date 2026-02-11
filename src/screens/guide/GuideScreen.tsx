import { useState, useEffect } from 'react';
import { Character, BottomNav } from '../../components/common';
import { guideApi } from '../../api';
import type { GuideSummaryDTO, GuideCategory } from '../../api/types';

interface GuideScreenProps {
  onTabChange?: (tab: 'home' | 'guide' | 'settings') => void;
  onDetailClick?: (guideId: number) => void;
}

// 기본 가이드 카드 데이터 (API 실패 시 폴백)
const defaultGuideCards = [
  {
    id: 1,
    title: '혹시 아직도\n내 돈으로만 투자하세요?',
    description: '증권사 계좌 개설만으로 받는 꽁돈으로\n실제 투자를 경험해 보세요!',
    characterType: 'coin' as const,
    characterVariant: 'question' as const,
  },
  {
    id: 2,
    title: '투자, 어렵게\n생각하지 마세요',
    description: '기비와 함께라면\n누구나 쉽게 시작할 수 있어요!',
    characterType: 'coin' as const,
    characterVariant: 'default' as const,
  },
  {
    id: 3,
    title: '매일 체크인하고\n투자 습관을 만들어요',
    description: '꾸준한 체크인으로\n나만의 투자 루틴을 만들어보세요!',
    characterType: 'coin' as const,
    characterVariant: 'exclamation' as const,
  },
];

function GuideScreen({ onTabChange, onDetailClick }: GuideScreenProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'quiz'>('guide');
  const [currentCard, setCurrentCard] = useState(0);
  const [guides, setGuides] = useState<GuideSummaryDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory | undefined>(undefined);

  // 가이드 목록 로드
  useEffect(() => {
    const loadGuides = async () => {
      setIsLoading(true);
      try {
        const data = await guideApi.getGuideList({
          category: selectedCategory,
          page: 0,
          size: 20
        });
        setGuides(data);
      } catch (err) {
        console.error('가이드 로드 실패:', err);
        // 실패 시 기본 데이터 사용
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab === 'guide') {
      loadGuides();
    }
  }, [activeTab, selectedCategory]);

  // API 데이터를 카드 형식으로 변환
  const guideCards = guides.length > 0
    ? guides.map((guide) => ({
        id: guide.guideId,
        title: guide.title,
        description: `좋아요 ${guide.likeCount} · 저장 ${guide.storeCount}`,
        imageUrl: guide.imageUrl,
        category: guide.category,
        characterType: 'coin' as const,
        characterVariant: 'default' as const,
      }))
    : defaultGuideCards;

  const handleTabClick = (tab: 'guide' | 'quiz') => {
    setActiveTab(tab);
  };

  const currentGuide = guideCards[currentCard];

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
      {/* 상단 탭 */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          padding: '15px 24px 8px 24px',
          backgroundColor: '#F5F5F5',
        }}
      >
        {/* 가이드 탭 */}
        <button
          onClick={() => handleTabClick('guide')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            fontFamily: 'Pretendard',
            fontSize: '20px',
            fontWeight: activeTab === 'guide' ? 'bold' : 500,
            lineHeight: 1.6,
            letterSpacing: '-0.2px',
            color: activeTab === 'guide' ? '#161616' : '#8d8d8d',
            borderBottom: activeTab === 'guide' ? '2px solid #161616' : 'none',
            paddingBottom: '4px',
          }}
        >
          가이드
        </button>

        {/* 퀴즈 탭 */}
        <button
          onClick={() => handleTabClick('quiz')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            fontFamily: 'Pretendard',
            fontSize: '20px',
            fontWeight: activeTab === 'quiz' ? 'bold' : 500,
            lineHeight: 1.6,
            letterSpacing: '-0.2px',
            color: activeTab === 'quiz' ? '#161616' : '#8d8d8d',
            borderBottom: activeTab === 'quiz' ? '2px solid #161616' : 'none',
            paddingBottom: '4px',
          }}
        >
          퀴즈
        </button>
      </div>

      {/* 메인 컨텐츠 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
        {activeTab === 'guide' ? (
          <>
            {/* 가이드 카드 */}
            <div
              style={{
                width: '345px',
                margin: '16px auto 0 auto',
                position: 'relative',
              }}
            >
              {/* 상단 프레임 */}
              <div
                style={{
                  width: '345px',
                  height: '420px',
                  padding: '18px 21px',
                  boxSizing: 'border-box',
                  backgroundImage: 'linear-gradient(to bottom, #fff, #dee0fa)',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '20px 20px 0 0',
                  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.05)',
                }}
              >
                {/* 타이틀 */}
                <h2
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    lineHeight: 1.6,
                    letterSpacing: '-0.2px',
                    color: '#252525',
                    margin: '0 0 20px 0',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {currentGuide.title}
                </h2>

                {/* 캐릭터 영역 */}
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Character type={currentGuide.characterType} variant={currentGuide.characterVariant} width="200px" height="200px" />
                </div>
              </div>

              {/* 점선 구분선 */}
              <div
                style={{
                  width: '308.2px',
                  margin: '0 auto',
                  borderTop: '1px dashed #c0c0c0',
                }}
              />

              {/* 하단 프레임 */}
              <div
                style={{
                  width: '345px',
                  height: '140px',
                  padding: '23px 21px 19px 21px',
                  borderRadius: '0 0 20px 20px',
                  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.05)',
                  boxSizing: 'border-box',
                  backgroundImage: 'linear-gradient(to bottom, #dee0fa 0%, #fff 64%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* 설명 텍스트 */}
                <p
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: 1.57,
                    letterSpacing: '-0.14px',
                    textAlign: 'center',
                    color: '#656565',
                    margin: '0 0 18px 0',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {currentGuide.description}
                </p>

                {/* 자세히 보기 버튼 */}
                <button
                  onClick={() => onDetailClick?.(currentGuide.id)}
                  style={{
                    width: '160px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: '#dee0fa',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Pretendard',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    lineHeight: 1.5,
                    letterSpacing: '-0.16px',
                    color: '#545fe8',
                  }}
                >
                  자세히 보기
                </button>
              </div>
            </div>

            {/* 진행 상황 인디케이터 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px',
                marginTop: '16px',
              }}
            >
              {guideCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCard(index)}
                  style={{
                    width: index === currentCard ? '48px' : '9px',
                    height: '9px',
                    borderRadius: '12px',
                    backgroundColor: index === currentCard ? '#7681fc' : '#c6c6c6',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'width 0.3s ease',
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          /* 퀴즈 탭 컨텐츠 */
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '400px',
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '16px',
                color: '#a9a9a9',
              }}
            >
              퀴즈 컨텐츠 준비 중입니다
            </p>
          </div>
        )}
      </div>

      {/* 바텀 네비게이션 */}
      <BottomNav activeTab="guide" onTabChange={onTabChange} />
    </div>
  );
}

export default GuideScreen;
