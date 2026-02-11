import { Character } from '../common';
import stampFirstChallenge from '../../assets/images/png/img_stamp_first-challenge.png';

// 성향 분석 데이터 타입
export interface PersonalityData {
  riskTolerance?: string;      // 리스크 성향 (중립형 등)
  investmentPeriod?: string;   // 유동 성향 (중기 목표 등)
  spendingHabit?: string;      // 소비 성향 (소비 중심 등)
  financialAffinity?: string;  // 금융 친숙도 (낮음 등)
}

// 사용자 프로필 데이터 타입
export interface UserProfileData {
  userName?: string;
  userHandle?: string;
  profileImage?: string;
}

// 도장 데이터 타입
export interface StampData {
  id: string;
  productName: string;
  productCode: string;
  completedAt: string;
}

interface UserProfileCardProps {
  personality?: PersonalityData | null;
  profile?: UserProfileData | null;
  stamps?: StampData[];
  onEditProfile?: () => void;
}

// 성향별 게이지 값 매핑
const getGaugeValue = (value?: string): number => {
  if (!value) return 0;

  const gaugeMap: Record<string, number> = {
    // 리스크 성향
    '안정형': 25,
    '중립형': 50,
    '공격형': 75,
    '적극형': 100,
    // 유동 성향
    '단기 목표': 25,
    '중기 목표': 50,
    '장기 목표': 75,
    // 소비 성향
    '저축 중심': 25,
    '균형형': 50,
    '소비 중심': 75,
    // 금융 친숙도
    '낮음': 25,
    '보통': 50,
    '높음': 75,
    '매우 높음': 100,
  };

  return gaugeMap[value] ?? 50;
};

// 게이지 바 컴포넌트
function GaugeBar({ label, value }: { label: string; value?: string }) {
  const gaugeValue = getGaugeValue(value);
  const hasData = !!value;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px',
      }}
    >
      {/* 라벨 */}
      <span
        style={{
          width: '65px',
          fontFamily: 'Pretendard',
          fontSize: '10px',
          fontWeight: 'normal',
          lineHeight: 1.6,
          color: '#6b6b6b',
          flexShrink: 0,
        }}
      >
        {label}
      </span>

      {/* 게이지 바 */}
      <div
        style={{
          flex: 1,
          height: '6px',
          backgroundColor: '#e0e0e0',
          borderRadius: '3px',
          overflow: 'hidden',
          maxWidth: '80px',
        }}
      >
        <div
          style={{
            width: `${gaugeValue}%`,
            height: '100%',
            backgroundColor: hasData ? '#7681fc' : '#e0e0e0',
            borderRadius: '3px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* 값 표시 */}
      <span
        style={{
          fontFamily: 'Pretendard',
          fontSize: '10px',
          fontWeight: 500,
          color: hasData ? '#545fe8' : '#a8a8a8',
          minWidth: '50px',
        }}
      >
        {hasData ? value : '분석 필요'}
      </span>
    </div>
  );
}

function UserProfileCard({
  personality,
  profile,
  stamps = [],
  onEditProfile,
}: UserProfileCardProps) {
  // 기본값 처리 (빈 문자열도 체크)
  const userName = profile?.userName?.trim() || '익명의 투자자';
  const userHandle = profile?.userHandle?.trim() || '@anonymous';

  // 성향 데이터 존재 여부
  const hasPersonalityData = personality && (
    personality.riskTolerance ||
    personality.investmentPeriod ||
    personality.spendingHabit ||
    personality.financialAffinity
  );

  return (
    <div
      className="user-profile-card"
      style={{
        width: '343px',
        margin: '0 auto',
        borderRadius: '20px',
        boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
      }}
    >
      {/* ========== 상단 섹션 (프로필 정보) ========== */}
      <div
        className="profile-top-section"
        style={{
          backgroundColor: '#FFFFFF',
          padding: '12px 17px 17px 17px',
        }}
      >
        {/* 여권 헤더 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          {/* 왼쪽: 여권 PASSPORT */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: '-0.12px',
                color: '#a8a8a8',
              }}
            >
              여권
            </span>
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: '-0.12px',
                color: '#a8a8a8',
              }}
            >
              PASSPORT
            </span>
          </div>

          {/* 오른쪽: 기비 REPUBLIC OF GIVY */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: '-0.12px',
                color: '#a8a8a8',
              }}
            >
              기비
            </span>
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: '-0.12px',
                color: '#a8a8a8',
              }}
            >
              REPUBLIC OF GIVY
            </span>
          </div>
        </div>

        {/* 프로필 컨텐츠 */}
        <div style={{ display: 'flex', gap: '13px' }}>
          {/* 프로필 이미지 */}
          <div
            style={{
              width: '90px',
              height: '92px',
              borderRadius: '8px',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {profile?.profileImage ? (
              <img
                src={profile.profileImage}
                alt="프로필"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Character type="coin" width="70px" />
            )}
          </div>

          {/* 오른쪽 정보 */}
          <div style={{ flex: 1 }}>
            {/* 인사말 */}
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '8px' }}>
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: '-0.12px',
                  color: '#6b6b6b',
                  marginRight: '6px',
                }}
              >
                안녕하세요,
              </span>
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  lineHeight: 1.5,
                  letterSpacing: '-0.16px',
                  color: '#393939',
                }}
              >
                {userName} 님
              </span>
            </div>

            {/* 성향 게이지 */}
            {hasPersonalityData ? (
              <div>
                <GaugeBar label="리스트 성향" value={personality?.riskTolerance} />
                <GaugeBar label="유동 성향" value={personality?.investmentPeriod} />
                <GaugeBar label="소비 성향" value={personality?.spendingHabit} />
                <GaugeBar label="금융 친숙도" value={personality?.financialAffinity} />
              </div>
            ) : (
              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '12px',
                    color: '#a8a8a8',
                    margin: 0,
                  }}
                >
                  분석 데이터가 없습니다
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 하단: 핸들 + 수정 버튼 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '12px',
          }}
        >
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: '-0.12px',
              color: '#a8a8a8',
            }}
          >
            {userHandle}
          </span>

          <button
            onClick={onEditProfile}
            style={{
              padding: '4px 10px',
              borderRadius: '30px',
              border: 'solid 1px #e0e0e0',
              backgroundColor: '#f5f5f5',
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: '-0.12px',
              color: '#8d8d8d',
              cursor: 'pointer',
            }}
          >
            회원정보 수정
          </button>
        </div>
      </div>

      {/* ========== 하단 섹션 (VISAS) ========== */}
      <div
        className="profile-bottom-section"
        style={{
          width: '343px',
          minHeight: '240px',
          padding: '14px 20px 20px 20px',
          backgroundColor: '#F5F5F5',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* 사증 / VISAS 헤더 (세로 배치) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0px',
            marginBottom: '16px',
          }}
        >
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: '-0.12px',
              color: '#a8a8a8',
            }}
          >
            사증
          </span>
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: '-0.12px',
              color: '#a8a8a8',
            }}
          >
            VISAS
          </span>
        </div>

        {/* 도장 목록 */}
        {stamps.length > 0 ? (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              flex: 1,
            }}
          >
            {stamps.map((stamp) => (
              <img
                key={stamp.id}
                src={stampFirstChallenge}
                alt="First Challenge 도장"
                style={{
                  width: '170px',
                  height: 'auto',
                  transform: 'rotate(-2deg)',
                }}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '12px',
                color: '#a8a8a8',
                textAlign: 'center',
              }}
            >
              아직 받은 도장이 없어요
              <br />
              스타트 챌린지를 완료하면 도장을 받을 수 있어요!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfileCard;
