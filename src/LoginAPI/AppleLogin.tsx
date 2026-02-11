// Apple 로그인 - 백엔드 API가 준비되면 구현
// 현재 Swagger 문서에 Apple OAuth 엔드포인트가 없음

interface AppleLoginProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

// Apple 로그인 버튼 컴포넌트
export const AppleLoginButton = ({ onClick }: { onClick?: () => void }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // TODO: Apple 로그인 구현 필요
      alert('Apple 로그인은 준비 중입니다.');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full h-12 bg-black rounded-xl flex items-center justify-center gap-2 font-medium text-white"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M14.94 10.34c-.03-2.85 2.33-4.22 2.44-4.29-1.33-1.95-3.4-2.22-4.13-2.25-1.76-.18-3.44 1.04-4.33 1.04-.9 0-2.28-1.02-3.75-.99-1.93.03-3.71 1.12-4.71 2.86-2.01 3.49-.51 8.65 1.44 11.48.96 1.39 2.1 2.95 3.6 2.89 1.45-.06 2-1.02 3.75-1.02s2.24.99 3.77.95c1.56-.03 2.54-1.41 3.48-2.81 1.1-1.61 1.55-3.17 1.58-3.25-.03-.02-3.02-1.16-3.05-4.61h-.09zm-2.86-8.48c.8-.97 1.33-2.31 1.19-3.65-1.15.05-2.54.77-3.37 1.73-.74.85-1.38 2.22-1.21 3.53 1.28.1 2.59-.65 3.39-1.61z"
          fill="white"
        />
      </svg>
      Apple로 시작하기
    </button>
  );
};

// Apple 콜백 처리 컴포넌트 (미구현)
export const AppleCallback = ({ onError }: AppleLoginProps) => {
  // TODO: Apple OAuth 콜백 처리 구현
  onError?.(new Error('Apple 로그인은 아직 지원되지 않습니다.'));
  return null;
};

export default AppleLoginButton;
