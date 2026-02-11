import { useState, useEffect } from 'react';
import { BottomNav } from '../../components/common';
import { settingsApi } from '../../api';

interface NotificationSettingsScreenProps {
  onBack?: () => void;
  onTabChange?: (tab: 'home' | 'guide' | 'settings') => void;
}

function NotificationSettingsScreen({
  onBack,
  onTabChange,
}: NotificationSettingsScreenProps) {
  const [challengeEnabled, setChallengeEnabled] = useState(true);
  const [guideEnabled, setGuideEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 알림 설정 로드
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsApi.getNotificationSettings();
        setChallengeEnabled(data.challengeNotificationEnabled);
        setGuideEnabled(data.guideNotificationEnabled);
      } catch (err) {
        console.error('알림 설정 로드 실패:', err);
      }
    };

    loadSettings();
  }, []);

  const handleToggle = async (type: 'challenge' | 'guide') => {
    if (isLoading) return;

    const newChallengeEnabled = type === 'challenge' ? !challengeEnabled : challengeEnabled;
    const newGuideEnabled = type === 'guide' ? !guideEnabled : guideEnabled;

    setIsLoading(true);
    try {
      await settingsApi.updateNotificationSettings({
        challengeNotificationEnabled: newChallengeEnabled,
        guideNotificationEnabled: newGuideEnabled,
      });

      if (type === 'challenge') {
        setChallengeEnabled(newChallengeEnabled);
      } else {
        setGuideEnabled(newGuideEnabled);
      }
    } catch (err) {
      console.error('알림 설정 변경 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const settings = [
    { id: 'challenge', label: '스타트 챌린지 알림', enabled: challengeEnabled },
    { id: 'guide', label: '가이드 알림', enabled: guideEnabled },
  ];

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
      {/* 헤더 */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 20px',
          backgroundColor: '#FFFFFF',
          position: 'relative',
        }}
      >
        {/* 뒤로가기 버튼 */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            left: '20px',
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

        {/* 타이틀 */}
        <h1
          style={{
            fontFamily: 'Pretendard',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#252525',
            margin: 0,
          }}
        >
          PUSH 알림
        </h1>
      </header>

      {/* 설정 리스트 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {settings.map((setting) => (
            <div
              key={setting.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.05)',
              }}
            >
              {/* 아이콘 + 라벨 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* 알림 아이콘 */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 0 1-3.46 0"
                    stroke={setting.enabled ? '#545fe8' : '#c6c6c6'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill={setting.enabled ? '#dee0fa' : 'none'}
                  />
                </svg>

                <span
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#252525',
                  }}
                >
                  {setting.label}
                </span>
              </div>

              {/* 토글 스위치 */}
              <button
                onClick={() => handleToggle(setting.id as 'challenge' | 'guide')}
                disabled={isLoading}
                style={{
                  width: '51px',
                  height: '31px',
                  borderRadius: '15.5px',
                  backgroundColor: setting.enabled ? '#545fe8' : '#e0e0e0',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background-color 0.2s ease',
                  padding: 0,
                }}
              >
                <div
                  style={{
                    width: '27px',
                    height: '27px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    position: 'absolute',
                    top: '2px',
                    left: setting.enabled ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 바텀 네비게이션 */}
      <BottomNav activeTab="settings" onTabChange={onTabChange} />
    </div>
  );
}

export default NotificationSettingsScreen;
