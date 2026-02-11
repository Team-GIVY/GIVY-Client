import { useState, useEffect } from 'react';
import { guideApi } from '../../api';
import type { GuideSummaryDTO } from '../../api/types';

interface WishlistScreenProps {
  onBack?: () => void;
  onItemClick?: (id: number) => void;
}

function WishlistScreen({
  onBack,
  onItemClick,
}: WishlistScreenProps) {
  const [items, setItems] = useState<GuideSummaryDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 저장한 가이드 목록 로드
  useEffect(() => {
    const loadStoredGuides = async () => {
      setIsLoading(true);
      try {
        const data = await guideApi.getMyStoredGuides();
        setItems(data);
      } catch (err) {
        console.error('저장한 가이드 로드 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredGuides();
  }, []);

  const handleBookmarkToggle = async (guideId: number) => {
    try {
      await guideApi.toggleGuideStore(guideId);
      // 북마크 해제 시 목록에서 제거
      setItems(prev => prev.filter(item => item.guideId !== guideId));
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
        overflow: 'hidden',
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
          justifyContent: 'center',
          padding: '23px 24px 2px 24px',
          backgroundColor: '#FFFFFF',
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
          관심 목록
        </span>
      </header>

      {/* 메인 컨텐츠 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 24px',
        }}
      >
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
              color: '#a9a9a9',
              fontFamily: 'Pretendard',
              fontSize: '14px',
            }}
          >
            <p>로딩 중...</p>
          </div>
        ) : items.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#a9a9a9',
              fontFamily: 'Pretendard',
              fontSize: '14px',
            }}
          >
            <p>북마크한 항목이 없습니다.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {items.map((item) => (
              <div
                key={item.guideId}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* 썸네일 이미지 */}
                <div
                  onClick={() => onItemClick?.(item.guideId)}
                  style={{
                    width: '100%',
                    height: '180px',
                    borderRadius: '12px',
                    backgroundColor: '#e0e0e0',
                    marginBottom: '12px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </div>

                {/* 컨텐츠 정보 */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    onClick={() => onItemClick?.(item.guideId)}
                    style={{ flex: 1, cursor: 'pointer' }}
                  >
                    {/* 제목 */}
                    <p
                      style={{
                        margin: '0 0 8px 0',
                        fontFamily: 'Pretendard',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        lineHeight: 1.5,
                        letterSpacing: '-0.16px',
                        color: '#252525',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {item.title}
                    </p>

                    {/* 카테고리 및 좋아요/저장 수 */}
                    <p
                      style={{
                        margin: 0,
                        fontFamily: 'Pretendard',
                        fontSize: '12px',
                        fontWeight: 'normal',
                        lineHeight: 1.5,
                        letterSpacing: '-0.12px',
                        color: '#a9a9a9',
                      }}
                    >
                      {item.category}  ·  좋아요 {item.likeCount}  ·  저장 {item.storeCount}
                    </p>
                  </div>

                  {/* 북마크 버튼 */}
                  <button
                    onClick={() => handleBookmarkToggle(item.guideId)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#545fe8">
                      <path
                        d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17L5 21V5Z"
                        stroke="#545fe8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistScreen;
