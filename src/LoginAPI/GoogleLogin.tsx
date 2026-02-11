import { useEffect, useState } from 'react';
import { authApi } from '../api';

interface GoogleLoginProps {
  onSuccess?: (result: string) => void;
  onError?: (error: Error) => void;
  onNeedSignup?: () => void;
}

// 구글 로그인 버튼 컴포넌트
export const GoogleLoginButton = ({ onClick }: { onClick?: () => void }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      authApi.redirectToGoogleLogin();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full h-12 bg-white border border-gray-300 rounded-xl flex items-center justify-center gap-2 font-medium text-gray-700"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M19.6 10.23c0-.68-.06-1.36-.17-2H10v3.77h5.4c-.24 1.26-.94 2.34-1.98 3.05v2.54h3.2c1.87-1.72 2.95-4.26 2.95-7.36z"
          fill="#4285F4"
        />
        <path
          d="M10 20c2.7 0 4.96-.89 6.62-2.42l-3.2-2.54c-.9.6-2.04.96-3.42.96-2.63 0-4.86-1.77-5.65-4.16H1.04v2.62A9.996 9.996 0 0 0 10 20z"
          fill="#34A853"
        />
        <path
          d="M4.35 11.84A6.01 6.01 0 0 1 4.04 10c0-.64.11-1.26.31-1.84V5.54H1.04A9.996 9.996 0 0 0 0 10c0 1.61.39 3.14 1.04 4.46l3.31-2.62z"
          fill="#FBBC05"
        />
        <path
          d="M10 3.96c1.47 0 2.8.51 3.84 1.5l2.87-2.87C14.96.99 12.7 0 10 0 6.09 0 2.71 2.25 1.04 5.54l3.31 2.62C5.14 5.73 7.37 3.96 10 3.96z"
          fill="#EA4335"
        />
      </svg>
      구글로 시작하기
    </button>
  );
};

// 구글 콜백 처리 컴포넌트
export const GoogleCallback = ({ onSuccess, onError, onNeedSignup }: GoogleLoginProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (!code) {
        const errorMsg = '인증 코드가 없습니다.';
        setError(errorMsg);
        onError?.(new Error(errorMsg));
        setIsLoading(false);
        return;
      }

      try {
        const result = await authApi.handleGoogleCallback(code);

        // 결과에 따라 처리
        if (result === 'NEED_SIGNUP') {
          onNeedSignup?.();
        } else {
          onSuccess?.(result);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : '구글 로그인에 실패했습니다.';
        setError(errorMsg);
        onError?.(err instanceof Error ? err : new Error(errorMsg));
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [onSuccess, onError, onNeedSignup]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7681FC] mx-auto mb-4" />
          <p className="text-gray-600">구글 로그인 처리 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-[#7681FC] text-white rounded-lg"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default GoogleLoginButton;
