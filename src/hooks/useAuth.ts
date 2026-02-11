import { useState, useCallback } from 'react';
import { authApi } from '../api';
import { isLoggedIn, getUserInfo, clearAuth } from '../utils/token';
import type {
  UserSignupDTO,
  UserLoginDTO,
  UserProfileDTO,
  UserDetailDTO,
  UserLoginResDTO,
} from '../api/types';

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: ReturnType<typeof getUserInfo>;
  isLoading: boolean;
  error: string | null;
  login: (data: UserLoginDTO) => Promise<UserLoginResDTO | null>;
  signup: (data: UserSignupDTO) => Promise<boolean>;
  socialSignup: (data: UserProfileDTO) => Promise<boolean>;
  logout: () => Promise<void>;
  getMyInfo: () => Promise<UserDetailDTO | null>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authState, setAuthState] = useState({
    isAuthenticated: isLoggedIn(),
    user: getUserInfo(),
  });

  const login = useCallback(async (data: UserLoginDTO): Promise<UserLoginResDTO | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authApi.login(data);
      // 로그인 성공 시 상태 업데이트
      setAuthState({
        isAuthenticated: true,
        user: result.user || null,
      });
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : '로그인에 실패했습니다.';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (data: UserSignupDTO): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.signup(data);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : '회원가입에 실패했습니다.';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const socialSignup = useCallback(async (data: UserProfileDTO): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.socialSignup(data);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : '소셜 회원가입에 실패했습니다.';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } finally {
      clearAuth();
      setAuthState({
        isAuthenticated: false,
        user: null,
      });
      setIsLoading(false);
    }
  }, []);

  const getMyInfo = useCallback(async (): Promise<UserDetailDTO | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authApi.getMyInfo();
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : '정보를 불러오는데 실패했습니다.';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    isLoading,
    error,
    login,
    signup,
    socialSignup,
    logout,
    getMyInfo,
    clearError,
  };
};

export default useAuth;
