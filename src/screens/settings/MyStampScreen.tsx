import { useState, useEffect } from 'react';
// SVG import
import newIcon from '../../assets/images/svg/ic_new.svg';
import partyPopperIcon from '../../assets/images/svg/ic_party-popper.svg';

interface StampItem {
  id: string;
  name: string;
  date?: string;
  image?: string;
  isNew?: boolean;
}

interface MyStampScreenProps {
  onBack?: () => void;
  stampItems?: StampItem[];
}

// 조회한 도장 ID 저장 키
const VIEWED_STAMPS_KEY = 'viewedStampIds';

// 조회한 도장 ID 목록 가져오기
const getViewedStampIds = (): string[] => {
  try {
    const stored = localStorage.getItem(VIEWED_STAMPS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// 도장을 조회했다고 표시
const markStampAsViewed = (stampId: string): void => {
  const viewedIds = getViewedStampIds();
  if (!viewedIds.includes(stampId)) {
    viewedIds.push(stampId);
    localStorage.setItem(VIEWED_STAMPS_KEY, JSON.stringify(viewedIds));
  }
};

function MyStampScreen({
  onBack,
  stampItems = [],
}: MyStampScreenProps) {
  const [viewedStampIds, setViewedStampIds] = useState<string[]>([]);

  // 컴포넌트 마운트 시 조회 기록 로드 및 모든 도장 조회 처리
  useEffect(() => {
    const viewedIds = getViewedStampIds();
    setViewedStampIds(viewedIds);

    // 화면 진입 시 모든 도장을 조회했다고 표시
    stampItems.forEach((stamp) => {
      if (!viewedIds.includes(stamp.id)) {
        markStampAsViewed(stamp.id);
      }
    });

    // 새로 조회한 도장이 있으면 상태 업데이트
    if (stampItems.some((stamp) => !viewedIds.includes(stamp.id))) {
      setViewedStampIds(getViewedStampIds());
    }
  }, [stampItems]);

  // 미조회 도장 확인
  const hasUnviewedStamp = stampItems.some(
    (stamp) => !viewedStampIds.includes(stamp.id)
  );

  // 받은 도장만 표시 (locked 도장 제외, stampItems에는 이미 받은 것만 전달됨)
  const receivedStamps = stampItems.filter((stamp) => stamp.image);
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
          나의 도장
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
        {/* 알림 카드 - 미조회 도장이 있을 때만 표시 */}
        {hasUnviewedStamp && receivedStamps.length > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderRadius: '12px',
              backgroundColor: '#dee0fa',
              marginBottom: '24px',
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: '#515152',
                }}
              >
                축하해요!
              </p>
              <p
                style={{
                  margin: '4px 0 0 0',
                  fontFamily: 'Pretendard',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  lineHeight: 1.5,
                  letterSpacing: '-0.14px',
                  color: '#252525',
                }}
              >
                새로운 도장이 생겼어요!
              </p>
            </div>
            {/* 폭죽 아이콘 */}
            <img
              src={partyPopperIcon}
              alt="축하"
              style={{ width: '40px', height: '40px' }}
            />
          </div>
        )}

        {/* 내 도장 기록 섹션 */}
        <div>
          <h2
            style={{
              margin: '0 0 16px 0',
              fontFamily: 'Pretendard',
              fontSize: '16px',
              fontWeight: 'bold',
              lineHeight: 1.5,
              letterSpacing: '-0.16px',
              color: '#252525',
            }}
          >
            내 도장 기록
          </h2>

          {/* 스탬프 그리드 - 받은 도장만 표시 */}
          {receivedStamps.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
              }}
            >
              {receivedStamps.map((stamp) => {
                const isUnviewed = !viewedStampIds.includes(stamp.id);
                return (
                  <div
                    key={stamp.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {/* 스탬프 이미지 */}
                    <div
                      style={{
                        width: '140px',
                        height: '100px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={stamp.image}
                        alt={stamp.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </div>

                    {/* 스탬프 정보 */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Pretendard',
                          fontSize: '14px',
                          fontWeight: 500,
                          lineHeight: 1.5,
                          letterSpacing: '-0.14px',
                          color: '#252525',
                        }}
                      >
                        {stamp.name}
                      </span>
                      {isUnviewed && (
                        <img
                          src={newIcon}
                          alt="New"
                          style={{ width: '16px', height: '16px' }}
                        />
                      )}
                    </div>

                    {/* 날짜 */}
                    {stamp.date && (
                      <span
                        style={{
                          fontFamily: 'Pretendard',
                          fontSize: '12px',
                          fontWeight: 'normal',
                          lineHeight: 1.5,
                          letterSpacing: '-0.12px',
                          color: '#a9a9a9',
                          marginTop: '4px',
                        }}
                      >
                        {stamp.date}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px 0',
              }}
            >
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#a9a9a9',
                }}
              >
                아직 받은 도장이 없어요
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyStampScreen;
