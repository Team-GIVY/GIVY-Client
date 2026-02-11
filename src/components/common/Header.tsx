import Logo from './Logo';
import bellIcon from '../../assets/images/svg/ic_bell-outline_default.svg';
import profileIcon from '../../assets/images/svg/ic_profile_default.svg';

interface HeaderProps {
  onNotification?: () => void;
  onProfile?: () => void;
  backgroundColor?: string;
}

function Header({
  onNotification,
  onProfile,
  backgroundColor = '#F5F5F5',
}: HeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 24px 6px 24px',
        backgroundColor,
      }}
    >
      <Logo width="24px" height="22px" />
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onNotification}
          style={{
            width: '24px',
            height: '24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={bellIcon} alt="알림" style={{ width: '24px', height: '24px' }} />
        </button>
        <button
          onClick={onProfile}
          style={{
            width: '30px',
            height: '30px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={profileIcon} alt="프로필" style={{ width: '30px', height: '30px' }} />
        </button>
      </div>
    </header>
  );
}

export default Header;
