interface OptionCardProps {
  optionId: string;
  optionText: string;
  isSelected: boolean;
  onSelect: () => void;
  isLast?: boolean;
}

function OptionCard({ optionId, optionText, isSelected, onSelect, isLast }: OptionCardProps) {
  return (
    <button
      className={`option-card ${isSelected ? 'option-card-selected' : 'option-card-unselected'}`}
      onClick={onSelect}
      style={{
        width: '345px',
        height: '120px',
        marginBottom: isLast ? '44px' : '12px',
        padding: '13px 14px 9px 24px',
        borderRadius: '12px',
        border: isSelected ? 'solid 1px #C2C7FC' : 'solid 1px #C6C6C6',
        backgroundColor: isSelected ? '#DEE0FA' : '#E0E0E0',
        opacity: isSelected ? 1 : 0.5,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
        transition: 'all 0.2s ease'
      }}
    >
      <div
        className="option-card-header"
        style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}
      >
        <span
          className="option-label"
          style={{
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#393939'
          }}
        >
          {optionId}
        </span>
        {isSelected && (
          <div
            className="option-check-icon"
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#545FE8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: '16px'
            }}
          >
            ✓
          </div>
        )}
      </div>

      <p
        className="option-text"
        style={{
          fontFamily: 'Pretendard',
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '1.57',
          letterSpacing: '-0.14px',
          color: '#393939',
          margin: 0,
          marginTop: 'auto',
          textAlign: 'left'
        }}
      >
        {optionText}
      </p>
    </button>
  );
}

export default OptionCard;
