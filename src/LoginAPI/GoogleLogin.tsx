import { useCallback } from 'react';
import { authApi } from '../api';

interface GoogleLoginButtonProps {
  onClick?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

// 구글 로그인 버튼 컴포넌트 (Google Identity Services 방식)
export const GoogleLoginButton = ({ onClick, onSuccess, onError }: GoogleLoginButtonProps) => {
  const handleGoogleLogin = useCallback(() => {
    if (!window.google?.accounts?.id) {
      const err = new Error('Google 로그인 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      onError?.(err);
      alert(err.message);
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response: { credential: string }) => {
        try {
          await authApi.googleIdTokenLogin(response.credential);
          onSuccess?.();
        } catch (err) {
          console.error('구글 로그인 실패:', err);
          onError?.(err instanceof Error ? err : new Error('구글 로그인에 실패했습니다.'));
        }
      },
    });
    window.google.accounts.id.prompt();
  }, [onSuccess, onError]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      handleGoogleLogin();
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

export default GoogleLoginButton;
