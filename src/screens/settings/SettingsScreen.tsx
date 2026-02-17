import { useState, useEffect } from 'react';
import { Header, BottomNav } from '../../components/common';
import { authApi, settingsApi } from '../../api';

// 이미지 imports
import profileCharacter from '../../assets/images/png/img_charater_coin_profile.png';

// SVG imports
import badgeCheckIcon from '../../assets/images/svg/ic_badge-check.svg';
import heartIcon from '../../assets/images/svg/ic_heart_off.svg';
import personPlayIcon from '../../assets/images/svg/ic_person-play.svg';
import flightIcon from '../../assets/images/svg/ic_flight_black.svg';

interface SettingsScreenProps {
  onNotification?: () => void;
  onProfile?: () => void;
  onTabChange?: (tab: 'home' | 'guide' | 'settings') => void;
  onMyStamp?: () => void;
  onWishlist?: () => void;
  onMyTendency?: () => void;
  onPurchaseHistory?: () => void;
  onBrokerageSettings?: () => void;
  onProfileEdit?: () => void;
  onTendencyTest?: () => void;
  onPasswordChange?: () => void;
  onPushNotification?: () => void;
  onLogout?: () => void;
  onWithdraw?: () => void;
  onTerms?: () => void;
  userName?: string;
  productName?: string;
  productDestination?: string;
  productCode?: string;
  brokerName?: string;
  expectedInvestment?: string;
  appVersion?: string;
}

function SettingsScreen({
  onNotification,
  onProfile,
  onTabChange,
  onMyStamp,
  onWishlist,
  onMyTendency,
  onPurchaseHistory,
  onBrokerageSettings,
  onProfileEdit,
  onTendencyTest,
  onPasswordChange,
  onPushNotification,
  onLogout,
  onWithdraw,
  onTerms,
  userName: propUserName = '기비',
  productName = 'S&P 500',
  productDestination = '미국 기술주',
  productCode = '360750',
  brokerName = '토스증권',
  expectedInvestment = '50,000원',
  appVersion = '1.00.0',
}: SettingsScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState(propUserName);

  // 사용자 정보 로드
  useEffect(() => {
    const loadUserInfo = async () => {
      // API에서 최신 정보 가져오기
      try {
        const userDetail = await authApi.getMyInfo();
        // nickname 또는 username이 유효한 경우 업데이트
        if (userDetail?.nickname) {
          setUserName(userDetail.nickname);
        } else if (userDetail?.username) {
          setUserName(userDetail.username);
        }
      } catch (err) {
        console.error('사용자 정보 로드 실패:', err);
      }
    };

    loadUserInfo();
  }, []);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    if (!confirm('정말 로그아웃 하시겠습니까?')) return;

    setIsLoading(true);
    try {
      await authApi.logout();
      onLogout?.();
    } catch (err) {
      console.error('로그아웃 실패:', err);
      alert('로그아웃에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 회원 탈퇴 핸들러
  const handleWithdraw = async () => {
    if (!confirm('정말 회원 탈퇴를 하시겠습니까?\n탈퇴 시 모든 데이터가 삭제됩니다.')) return;

    setIsLoading(true);
    try {
      await settingsApi.deleteAccount();
      await authApi.logout();
      onWithdraw?.();
    } catch (err) {
      console.error('회원 탈퇴 실패:', err);
      alert('회원 탈퇴에 실패했습니다.');
    } finally {
      setIsLoading(false);
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
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 헤더 */}
      <Header onNotification={onNotification} onProfile={onProfile} />

      {/* 메인 컨텐츠 */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '20px' }}>
        {/* 프로필 섹션 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '28px 24px',
            gap: '20px',
          }}
        >
          <img
            src={profileCharacter}
            alt="프로필 캐릭터"
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <div>
            <p
              style={{
                margin: 0,
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: '-0.12px',
                color: '#6b6b6b',
              }}
            >
              안녕하세요,
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: 'Pretendard',
                fontSize: '16px',
                fontWeight: 'bold',
                lineHeight: 1.5,
                letterSpacing: '-0.16px',
                color: '#393939',
              }}
            >
              {userName} 님
            </p>
          </div>
        </div>

        {/* 현재 매수 중인 상품 카드 (티켓 형태) */}
        <div
          style={{
            width: '100%',
            maxWidth: '353px',
            height: '140px',
            margin: '0 auto 24px auto',
            position: 'relative',
            boxSizing: 'border-box',
          }}
        >
          {/* 티켓 본체 */}
          <div
            style={{
              width: '100%',
              height: '100%',
              padding: '14px 32px 18px 18px',
              borderRadius: '16px',
              backgroundColor: '#7681fc',
              boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.04)',
              boxSizing: 'border-box',
            }}
          >
            {/* 현재 매수 중인 상품 라벨 */}
            <p
              style={{
                margin: '0 0 11px 0',
                paddingLeft: '32px',
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: '-0.12px',
                color: '#e0e0e0',
              }}
            >
              현재 매수 중인 상품
            </p>

            {/* 상품명 행 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              {/* 비행기 아이콘 */}
              <img
                src={flightIcon}
                alt=""
                style={{
                  width: '24px',
                  height: '24px',
                  marginRight: '8px',
                  filter: 'brightness(0) invert(1)',
                }}
              />
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  maxWidth: '120px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                }}
              >
                {productName}
              </span>
              {/* 점선 */}
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  borderBottom: '2px dashed rgba(255, 255, 255, 0.5)',
                  margin: '0 14px',
                }}
              />
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                }}
              >
                {productDestination}
              </span>
            </div>

            {/* 상세 정보 행 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingLeft: '32px',
                gap: '8px',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'Pretendard',
                    fontSize: '11px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    letterSpacing: '-0.12px',
                    color: '#e0e0e0',
                    whiteSpace: 'nowrap',
                  }}
                >
                  상품코드
                </p>
                <p
                  style={{
                    margin: '2px 0 0 0',
                    fontFamily: 'Pretendard',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {productCode}
                </p>
              </div>
              <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'Pretendard',
                    fontSize: '11px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    letterSpacing: '-0.12px',
                    color: '#e0e0e0',
                    whiteSpace: 'nowrap',
                  }}
                >
                  증권계좌
                </p>
                <p
                  style={{
                    margin: '2px 0 0 0',
                    fontFamily: 'Pretendard',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {brokerName}
                </p>
              </div>
              <div style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'Pretendard',
                    fontSize: '11px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    letterSpacing: '-0.12px',
                    color: '#e0e0e0',
                    whiteSpace: 'nowrap',
                  }}
                >
                  예상 투자금
                </p>
                <p
                  style={{
                    margin: '2px 0 0 0',
                    fontFamily: 'Pretendard',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {expectedInvestment}
                </p>
              </div>
            </div>
          </div>

          {/* 왼쪽 노치 구멍 */}
          <div
            style={{
              position: 'absolute',
              left: '-10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#F5F5F5',
            }}
          />
          {/* 오른쪽 노치 구멍 */}
          <div
            style={{
              position: 'absolute',
              right: '-10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#F5F5F5',
            }}
          />
        </div>

        {/* 아이콘 버튼 3개 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '80px',
            marginBottom: '24px',
          }}
        >
          <button
            onClick={onMyStamp}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <img
              src={badgeCheckIcon}
              alt="나의 도장"
              style={{ width: '24px', height: '24px', marginBottom: '8px' }}
            />
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: 500,
                color: '#6b6b6b',
              }}
            >
              나의 도장
            </span>
          </button>

          <button
            onClick={onWishlist}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <img
              src={heartIcon}
              alt="관심 목록"
              style={{ width: '24px', height: '24px', marginBottom: '8px' }}
            />
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: 500,
                color: '#6b6b6b',
              }}
            >
              관심 목록
            </span>
          </button>

          <button
            onClick={onMyTendency}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <img
              src={personPlayIcon}
              alt="나의 성향"
              style={{ width: '24px', height: '24px', marginBottom: '8px' }}
            />
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: 500,
                color: '#6b6b6b',
              }}
            >
              나의 성향
            </span>
          </button>
        </div>

        {/* 조회 섹션 */}
        <div
          style={{
            padding: '0 24px',
            marginBottom: '16px',
          }}
        >
          <h3
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
            조회
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              rowGap: '12px',
            }}
          >
            <button
              onClick={onPurchaseHistory}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                color: '#8d8d8d',
                textAlign: 'left',
              }}
            >
              매수 이력
            </button>
            <button
              onClick={onBrokerageSettings}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                color: '#8d8d8d',
                textAlign: 'left',
              }}
            >
              증권사 설정 및 연결
            </button>
          </div>
        </div>

        {/* 구분선 */}
        <div
          style={{
            width: '345px',
            height: '1px',
            margin: '19.5px 24px',
            backgroundColor: '#e0e0e0',
          }}
        />

        {/* 프로필 및 로그인 섹션 */}
        <div
          style={{
            padding: '0 24px',
            marginBottom: '16px',
          }}
        >
          <h3
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
            프로필 및 로그인
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              rowGap: '12px',
            }}
          >
            <button
              onClick={onProfileEdit}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                color: '#8d8d8d',
                textAlign: 'left',
              }}
            >
              회원정보 확인 및 수정
            </button>
            <button
              onClick={onTendencyTest}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                color: '#8d8d8d',
                textAlign: 'left',
              }}
            >
              성향테스트 확인 및 재검사
            </button>
            <button
              onClick={onPasswordChange}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                color: '#8d8d8d',
                textAlign: 'left',
              }}
            >
              비밀번호 변경
            </button>
          </div>
        </div>

        {/* 구분선 */}
        <div
          style={{
            width: '345px',
            height: '1px',
            margin: '19.5px 24px',
            backgroundColor: '#e0e0e0',
          }}
        />

        {/* 서비스 섹션 */}
        <div
          style={{
            padding: '0 24px',
          }}
        >
          <h3
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
            서비스
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              rowGap: '12px',
            }}
          >
            <button
              onClick={onPushNotification}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                color: '#8d8d8d',
                textAlign: 'left',
              }}
            >
              PUSH 알림
            </button>
            <span
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                color: '#8d8d8d',
                textAlign: 'left',
              }}
            >
              현재 앱 버전 {appVersion}
            </span>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                color: '#8d8d8d',
                textAlign: 'left',
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              {isLoading ? '처리 중...' : '로그아웃'}
            </button>
            <button
              onClick={handleWithdraw}
              disabled={isLoading}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                color: '#8d8d8d',
                textAlign: 'left',
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              회원 탈퇴
            </button>
            <button
              onClick={onTerms}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: '-0.14px',
                color: '#8d8d8d',
                textAlign: 'left',
              }}
            >
              약관 및 이용정책
            </button>
          </div>
        </div>
      </div>

      {/* 바텀 네비게이션 */}
      <BottomNav activeTab="settings" onTabChange={onTabChange} />
    </div>
  );
}

export default SettingsScreen;
