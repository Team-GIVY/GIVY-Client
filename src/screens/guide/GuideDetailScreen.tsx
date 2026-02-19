import { useState, useEffect } from 'react';
import { guideApi } from '../../api';
import type { GuideDetailDTO, GuideCategory } from '../../api/types';
import guidePhoto01 from '../../assets/guide/Guide photo 01.png';
import guidePhoto02 from '../../assets/guide/Guide photo 02.png';
import guidePhoto03 from '../../assets/guide/Guide photo 03.png';
import heartOn from '../../assets/images/svg/ic_heart_on.svg';
import heartOff from '../../assets/images/svg/ic_heart_off.svg';
import bookmarkOn from '../../assets/images/svg/ic_bookmark_on.svg';
import bookmarkOff from '../../assets/images/svg/ic_bookmark_off.svg';
import talkIcon from '../../assets/images/svg/ic_talk.svg';

// 하드코딩 가이드 상세 데이터
const hardcodedGuides: Record<number, { title: string; category: string; body: string; imageUrl?: string }> = {
  1: {
    title: '세금 낼 돈 아껴서 공짜 치킨 드세요!',
    category: '#절세꿀팁 #필수통장 #13월의월급',
    imageUrl: 'guidePhoto01',
    body: `나라에서 허락한 합법적 탈세? 만들기만 해도 돈 버는 '필수 절세 통장' 2대장을 소개합니다.

열심히 번 돈, 세금으로 다 떼일 순 없잖아요?

주식이나 예금으로 돈을 벌면 원래 15.4%를 세금으로 내야 해요.
100만 원 벌면 15만 원이 사라지는 셈이죠. (내 치킨 5마리...🍗)
이 아까운 세금을 막아주는 방패 같은 통장이 딱 2개 있습니다.

✅ 1. ISA (만능 통장)

• 특징: 여기서 번 돈은 200만 원(서민형 400만 원)까지 세금을 한 푼도 안 내요.
• 누구에게?: 3년 이상 돈을 굴릴 분, 목돈 만들고 싶은 분.

✅ 2. IRP (퇴직연금 통장)

• 특징: 여기에 돈을 넣으면 연말정산 때 세금을 돌려줘요. (일명 '13월의 월급')
• 누구에게?: 직장인 필수! 노후 준비와 세액 공제를 동시에 잡고 싶은 분.

남들은 이미 다 챙기고 있는 혜택,
오늘 바로 은행 앱 켜서 개설해 볼까요?`,
  },
  2: {
    title: '월급 들어오면 바로 이렇게 나눠보세요!',
    category: '#월급관리 #통장쪼개기 #재테크기초',
    imageUrl: 'guidePhoto02',
    body: `매달 월급은 들어오는데, 어디로 다 사라지는지 모르겠다고요? '통장 쪼개기'로 돈의 흐름을 한눈에 잡아보세요.

돈을 잘 모으는 사람들의 비밀, 바로 통장 쪼개기입니다.

월급이 들어오면 하나의 통장에 다 두는 게 아니라, 목적별로 나눠서 관리하는 거예요. 이렇게 하면 쓸 돈과 모을 돈이 자연스럽게 분리됩니다.

✅ 1. 생활비 통장 (50%)

• 용도: 식비, 교통비, 통신비 등 매달 고정 지출
• 팁: 체크카드를 연결해서 예산 안에서만 쓰기

✅ 2. 저축/투자 통장 (30%)

• 용도: 비상금, 적금, 투자 자금
• 팁: 월급일에 자동이체 설정해두면 강제 저축 완성!

✅ 3. 용돈 통장 (20%)

• 용도: 취미, 쇼핑, 외식 등 자유롭게 쓸 돈
• 팁: 이 안에서는 죄책감 없이 마음껏 쓰기!

처음엔 귀찮아도 한 번만 세팅하면 돈이 알아서 모입니다.
이번 달부터 바로 시작해 볼까요?`,
  },
  3: {
    title: 'ETF가 뭔데 다들 사라고 하는 걸까?',
    category: '#ETF입문 #분산투자 #초보추천',
    imageUrl: 'guidePhoto03',
    body: `주식은 무섭고, 예금은 답답하고... 그 딱 중간이 ETF입니다. 요즘 2030이 가장 많이 사는 투자 상품, ETF를 쉽게 알려드릴게요.

ETF는 쉽게 말해 '주식 묶음 바구니'예요.

하나의 주식을 사는 게 아니라, 여러 기업의 주식을 한꺼번에 담은 상품을 사는 거예요. 그래서 한 기업이 망해도 내 돈이 다 날아가지 않아요.

✅ 1. ETF의 장점

• 분산투자: 삼성전자, SK하이닉스 등 여러 종목에 동시에 투자
• 소액 가능: 1만 원대부터 시작 가능
• 수수료 저렴: 일반 펀드보다 운용 비용이 훨씬 낮아요

✅ 2. 초보자에게 추천하는 ETF

• KODEX 200: 한국 대표 기업 200개에 투자
• TIGER 미국S&P500: 미국 대표 기업 500개에 투자
• KODEX 배당가치: 배당금을 꾸준히 주는 기업에 투자

✅ 3. ETF 시작하는 법

• 증권 계좌 개설 (토스, 키움, KB 등)
• 앱에서 ETF 검색 후 원하는 금액만큼 매수
• 장기 보유하면서 복리 효과 누리기!

어렵게 생각하지 마세요.
ETF 하나 사는 것부터 투자 인생이 시작됩니다!`,
  },
};

interface GuideDetailScreenProps {
  guideId?: number;
  onBack?: () => void;
  onShare?: () => void;
  onApply?: () => void;
}

function GuideDetailScreen({ guideId, onBack, onShare, onApply }: GuideDetailScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [guideDetail, setGuideDetail] = useState<GuideDetailDTO | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(3);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 가이드 상세 정보 로드
  useEffect(() => {
    const loadGuideDetail = async () => {
      if (!guideId) return;

      // 하드코딩 데이터 먼저 확인
      const hardcoded = hardcodedGuides[guideId];
      if (hardcoded) {
        const imageMap: Record<string, string> = {
          guidePhoto01,
          guidePhoto02,
          guidePhoto03,
        };
        setGuideDetail({
          guideId,
          title: hardcoded.title,
          body: hardcoded.body,
          category: 'SAVING' as GuideCategory,
          imageUrl: imageMap[hardcoded.imageUrl] || '',
          likeCount: 3,
          storeCount: 0,
          isLiked: false,
          isStored: false,
        });
        return;
      }

      setIsLoading(true);
      try {
        const data = await guideApi.getGuideDetail(guideId);
        setGuideDetail(data);
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount);
        setIsBookmarked(data.isStored);
      } catch (err) {
        console.error('가이드 상세 로드 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadGuideDetail();
  }, [guideId]);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
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
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 헤더 */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* 뒤로가기 버튼 */}
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
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

        {/* 공유 버튼 */}
        <button
          onClick={onShare}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12"
              stroke="#252525"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 6L12 2L8 6"
              stroke="#252525"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 2V15"
              stroke="#252525"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>

      {/* 메인 컨텐츠 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 100px 20px' }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <p style={{ color: '#a9a9a9' }}>로딩 중...</p>
          </div>
        ) : (
          <>
            {/* 타이틀 */}
            <h1
              style={{
                fontFamily: 'Pretendard',
                fontSize: '24px',
                fontWeight: 'bold',
                lineHeight: 1.5,
                letterSpacing: '-0.24px',
                color: '#252525',
                margin: '0 0 8px 0',
                whiteSpace: 'pre-line',
              }}
            >
              {guideDetail?.title || '가이드'}
            </h1>

            {/* 카테고리 */}
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: 500,
                color: '#a9a9a9',
                margin: '0 0 20px 0',
              }}
            >
              {guideId && hardcodedGuides[guideId]
                ? hardcodedGuides[guideId].category
                : guideDetail?.category || 'ETF'}
            </p>

            {/* 이미지 */}
            {guideDetail?.imageUrl ? (
              <img
                src={guideDetail.imageUrl}
                alt={guideDetail.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '24px',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '200px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                  marginBottom: '24px',
                }}
              />
            )}

            {/* 본문 내용 */}
            <div
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.7,
                letterSpacing: '-0.14px',
                color: '#252525',
                whiteSpace: 'pre-line',
              }}
            >
              {guideDetail?.body || '가이드 내용을 불러오는 중입니다.'}
            </div>

            {/* 이벤트 신청하기 버튼 */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
              <button
                onClick={onApply}
                style={{
                  width: '200px',
                  height: '44px',
                  borderRadius: '8px',
                  backgroundColor: '#dee0fa',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Pretendard',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#545fe8',
                }}
              >
                이벤트 신청하기
              </button>
            </div>
          </>
        )}
      </div>

      {/* 하단 인게이지먼트 바 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '0 0 40px 0',
        }}
      >
        <div
          style={{
            width: '191px',
            height: '60px',
            padding: '12px 22px 9.2px 31px',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: 'solid 1px #e0e0e0',
            backgroundColor: 'rgba(224, 224, 224, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          {/* 좋아요 */}
          <button
            onClick={handleLike}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              padding: 0,
            }}
          >
            <img
              src={isLiked ? heartOn : heartOff}
              alt="좋아요"
              style={{ width: '24px', height: '24px' }}
            />
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '10px',
                fontWeight: 500,
                color: isLiked ? '#7681FC' : '#a9a9a9',
              }}
            >
              {likeCount}
            </span>
          </button>

          {/* 댓글 */}
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              padding: 0,
            }}
          >
            <img
              src={talkIcon}
              alt="댓글"
              style={{ width: '24px', height: '24px' }}
            />
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '10px',
                fontWeight: 500,
                color: '#a9a9a9',
              }}
            >
              0
            </span>
          </button>

          {/* 북마크 */}
          <button
            onClick={handleBookmark}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              padding: 0,
            }}
          >
            <img
              src={isBookmarked ? bookmarkOn : bookmarkOff}
              alt="북마크"
              style={{ width: '24px', height: '24px' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuideDetailScreen;
