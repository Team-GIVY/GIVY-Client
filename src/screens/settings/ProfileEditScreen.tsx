import { useState, useEffect } from 'react';
// 이미지 imports
import profileCharacter from '../../assets/images/png/img_charater_coin_profile.png';
import kakaoIcon from '../../assets/images/svg/ic_kakao.svg';
import googleIcon from '../../assets/images/svg/ic_google.svg';
import { authApi } from '../../api';

interface ProfileData {
  nickname?: string;
  name?: string;
  email?: string;
  profileImage?: string;
  socialAccount?: 'kakao' | 'google' | 'apple' | null;
  language?: string;
}

interface ProfileEditScreenProps {
  onBack?: () => void;
  onNicknameEdit?: () => void;
  onNameEdit?: () => void;
  onEmailEdit?: () => void;
  onPasswordChange?: () => void;
  onProfileImageChange?: () => void;
  onLinkedAccount?: () => void;
  onLanguage?: () => void;
}

function ProfileEditScreen({
  onBack,
  onNicknameEdit,
  onNameEdit,
  onEmailEdit,
  onPasswordChange,
  onProfileImageChange,
  onLinkedAccount,
  onLanguage,
}: ProfileEditScreenProps) {
  const [profileData, setProfileData] = useState<ProfileData>({
    nickname: '',
    name: '',
    email: '',
    profileImage: '',
    socialAccount: null,
    language: '한국어',
  });
  const [isLoading, setIsLoading] = useState(true);

  // 프로필 데이터 로드
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const userDetail = await authApi.getMyInfo();
        setProfileData({
          nickname: userDetail.nickname || userDetail.username || '',
          name: userDetail.username || '',
          email: userDetail.email || '',
          profileImage: '',
          socialAccount: userDetail.socialAccounts?.[0] as 'kakao' | 'google' | 'apple' | null,
          language: userDetail.language === 'KO' ? '한국어' : '영어',
        });
      } catch (err) {
        console.error('프로필 로드 실패:', err);
        // 로컬 캐시에서 가져오기
        const cachedNickname = localStorage.getItem('cachedNickname');
        if (cachedNickname) {
          setProfileData(prev => ({ ...prev, nickname: cachedNickname }));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);
  // 메뉴 아이템 컴포넌트
  const MenuItem = ({
    label,
    value,
    onClick,
    icon,
    showArrow = true,
  }: {
    label: string;
    value?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    showArrow?: boolean;
  }) => (
    <button
      onClick={onClick}
      style={{
        width: '345px',
        height: '60px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 20px',
        borderRadius: '16px',
        border: 'solid 1px #e0e0e0',
        backgroundColor: '#f5f5f5',
        cursor: onClick ? 'pointer' : 'default',
        boxSizing: 'border-box',
      }}
    >
      <span
        style={{
          fontFamily: 'Pretendard',
          fontSize: '14px',
          fontWeight: 'bold',
          lineHeight: 1.57,
          letterSpacing: '-0.14px',
          textAlign: 'left',
          color: '#515152',
        }}
      >
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {icon}
        {value && (
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'normal',
              lineHeight: 1.57,
              letterSpacing: '-0.14px',
              textAlign: 'left',
              color: '#6b6b6b',
            }}
          >
            {value}
          </span>
        )}
        {showArrow && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6L15 12L9 18"
              stroke="#a9a9a9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </button>
  );

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
          내 정보 수정
        </span>
      </header>

      {/* 메인 컨텐츠 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px',
        }}
      >
        {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
            <p style={{ fontFamily: 'Pretendard', fontSize: '14px', color: '#a9a9a9' }}>로딩 중...</p>
          </div>
        ) : (
        <>
        {/* 프로필 이미지 */}
        <div
          style={{
            position: 'relative',
            marginBottom: '39.8px',
          }}
        >
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#f5f5f5',
            }}
          >
            <img
              src={profileData.profileImage || profileCharacter}
              alt="프로필"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          {/* 카메라 아이콘 */}
          <button
            onClick={onProfileImageChange}
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#e0e0e0',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M5.25 2.33333L4.375 3.5H2.33333C1.69167 3.5 1.16667 4.025 1.16667 4.66667V10.5C1.16667 11.1417 1.69167 11.6667 2.33333 11.6667H11.6667C12.3083 11.6667 12.8333 11.1417 12.8333 10.5V4.66667C12.8333 4.025 12.3083 3.5 11.6667 3.5H9.625L8.75 2.33333H5.25Z"
                stroke="#6b6b6b"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="7"
                cy="7.58333"
                r="2.33333"
                stroke="#6b6b6b"
                strokeWidth="1.2"
              />
            </svg>
          </button>
        </div>

        {/* 메뉴 목록 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <MenuItem
            label="닉네임"
            value={profileData.nickname}
            onClick={onNicknameEdit}
          />
          <MenuItem
            label="이름"
            value={profileData.name}
            onClick={onNameEdit}
          />
          <MenuItem
            label="대표 이메일"
            value={profileData.email}
            onClick={onEmailEdit}
          />
        </div>

        {/* 비밀번호 변경 (간격 32px) */}
        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <MenuItem
            label="비밀번호 변경"
            onClick={onPasswordChange}
          />
        </div>

        {/* 연동된 소셜 계정 (간격 32px, 있을 때만 표시) */}
        {profileData.socialAccount && (
          <div
            style={{
              marginTop: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <MenuItem
              label="연동된 소셜 계정"
              showArrow={true}
              onClick={onLinkedAccount}
              icon={
                profileData.socialAccount === 'kakao' ? (
                  <img
                    src={kakaoIcon}
                    alt="카카오"
                    style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                  />
                ) : profileData.socialAccount === 'google' ? (
                  <img
                    src={googleIcon}
                    alt="구글"
                    style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                  />
                ) : null
              }
            />
          </div>
        )}

        {/* 앱 언어 */}
        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <MenuItem
            label="앱 언어"
            value={profileData.language}
            showArrow={true}
            onClick={onLanguage}
          />
        </div>
        </>
        )}
      </div>
    </div>
  );
}

export default ProfileEditScreen;
