import { useEffect, useState } from 'react';
import { authApi } from '../api';

interface KakaoLoginProps {
  onSuccess?: (accessToken: string, refreshToken: string) => void;
  onError?: (error: Error) => void;
  onNeedSignup?: () => void; // 추가 정보 입력이 필요한 경우
}

// 카카오 로그인 버튼 컴포넌트
export const KakaoLoginButton = ({ onClick }: { onClick?: () => void }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      authApi.redirectToKakaoLogin();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full h-12 bg-[#FEE500] rounded-xl flex items-center justify-center gap-2 font-medium text-[#191919]"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 2.5C5.30558 2.5 1.5 5.52783 1.5 9.27273C1.5 11.6364 3.02558 13.7182 5.35558 14.9545L4.5 18.1818C4.44442 18.3636 4.66667 18.5 4.83333 18.4091L8.66667 15.9091C9.11111 15.9545 9.55558 16 10 16C14.6944 16 18.5 12.9722 18.5 9.27273C18.5 5.52783 14.6944 2.5 10 2.5Z"
          fill="#191919"
        />
      </svg>
      카카오로 시작하기
    </button>
  );
};

// 카카오 콜백 처리 컴포넌트
export const KakaoCallback = ({ onSuccess, onError, onNeedSignup }: KakaoLoginProps) => {
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
        const result = await authApi.handleKakaoCallback(code);

        // 신규 사용자인 경우 (user 정보가 없거나 추가 정보 입력 필요)
        if (!result.user) {
          onNeedSignup?.();
        } else {
          onSuccess?.(result.accessToken, result.refreshToken);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : '카카오 로그인에 실패했습니다.';
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
          <p className="text-gray-600">카카오 로그인 처리 중...</p>
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

export default KakaoLoginButton;
