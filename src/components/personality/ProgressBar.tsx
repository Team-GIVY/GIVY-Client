interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progressWidth = (currentStep / totalSteps) * 393;

  return (
    <div
      className="progress-bar-container"
      style={{
        width: '393px',
        height: '2px',
        margin: '0 0 32px 0',
        backgroundColor: '#E0E0E0',
        position: 'relative'
      }}
    >
      <div
        className="progress-bar-fill"
        style={{
          width: `${progressWidth}px`,
          height: '2px',
          backgroundColor: '#7681FC',
          transition: 'width 0.3s ease'
        }}
      />
    </div>
  );
}

export default ProgressBar;
