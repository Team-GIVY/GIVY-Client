import { useState, useEffect } from 'react';
import { guideApi } from '../../api';
import type { GuideDetailDTO } from '../../api/types';
import heartOn from '../../assets/images/svg/ic_heart_on.svg';
import heartOff from '../../assets/images/svg/ic_heart_off.svg';
import bookmarkOn from '../../assets/images/svg/ic_bookmark_on.svg';
import bookmarkOff from '../../assets/images/svg/ic_bookmark_off.svg';
import talkIcon from '../../assets/images/svg/ic_talk.svg';

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

  const handleLike = async () => {
    if (!guideId) return;

    try {
      await guideApi.toggleGuideLike(guideId);
      if (isLiked) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error('좋아요 토글 실패:', err);
    }
  };

  const handleBookmark = async () => {
    if (!guideId) return;

    try {
      await guideApi.toggleGuideStore(guideId);
      setIsBookmarked(!isBookmarked);
    } catch (err) {
      console.error('저장 토글 실패:', err);
    }
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
              {guideDetail?.category || 'ETF'}
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
                color: isLiked ? '#545fe8' : '#a9a9a9',
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
