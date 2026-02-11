// SVG 아이콘 imports
import homeOn from '../../assets/images/svg/ic_home_on.svg';
import homeOff from '../../assets/images/svg/ic_home_off.svg';
import studyOn from '../../assets/images/svg/ic_study_on.svg';
import studyOff from '../../assets/images/svg/ic_study_off.svg';
import myOn from '../../assets/images/svg/ic_my_on.svg';
import myOff from '../../assets/images/svg/ic_my_off.svg';

type TabType = 'home' | 'guide' | 'settings';

interface BottomNavProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

function BottomNav({ activeTab = 'home', onTabChange }: BottomNavProps) {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '90px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 -4px 20px 0 rgba(0, 0, 0, 0.12)',
        paddingTop: '21px',
        borderRadius: '20px 20px 0 0',
      }}
    >
      {/* 가이드(사전) 탭 */}
      <button
        onClick={() => onTabChange?.('guide')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={activeTab === 'guide' ? studyOn : studyOff}
          alt="가이드"
          style={{ width: '24px', height: '24px' }}
        />
      </button>

      {/* 홈 탭 */}
      <button
        onClick={() => onTabChange?.('home')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={activeTab === 'home' ? homeOn : homeOff}
          alt="홈"
          style={{ width: '24px', height: '24px' }}
        />
      </button>

      {/* 프로필(설정) 탭 */}
      <button
        onClick={() => onTabChange?.('settings')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={activeTab === 'settings' ? myOn : myOff}
          alt="프로필"
          style={{ width: '24px', height: '24px' }}
        />
      </button>
    </nav>
  );
}

export default BottomNav;
