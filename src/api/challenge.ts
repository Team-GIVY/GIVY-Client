import apiClient from './client';
import type {
  ApiResponse,
  RegisterSecuritiesDTO,
  UserSecuritiesListDTO,
  AgeVerificationResDTO,
  JoinChallengeDTO,
  StartChallengeInfoDTO,
  StartChallengeStatusDTO,
} from './types';

// 06-01 증권 계좌 등록
export const registerSecurities = async (data: RegisterSecuritiesDTO): Promise<UserSecuritiesListDTO> => {
  const response = await apiClient.post<ApiResponse<UserSecuritiesListDTO>>(
    '/start-challenge/setup/securities',
    data
  );
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

// 06-02 성인 여부 판단
export const checkAge = async (): Promise<AgeVerificationResDTO> => {
  const response = await apiClient.get<ApiResponse<AgeVerificationResDTO>>(
    '/start-challenge/setup/age-check'
  );
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

// 06-03 스타트 챌린지 시작
export const startChallenge = async (data: JoinChallengeDTO): Promise<StartChallengeInfoDTO> => {
  const response = await apiClient.post<ApiResponse<StartChallengeInfoDTO>>('/start-challenge', data);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

// 06-04 스타트 챌린지 완료
export const completeChallenge = async (startChallengeId: number): Promise<StartChallengeInfoDTO> => {
  const response = await apiClient.patch<ApiResponse<StartChallengeInfoDTO>>(
    `/start-challenge/${startChallengeId}`
  );
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

// 06-05 스타트 챌린지 상태 조회
export const getChallengeStatus = async (): Promise<StartChallengeStatusDTO> => {
  const response = await apiClient.get<ApiResponse<StartChallengeStatusDTO>>('/start-challenge');
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

export const challengeApi = {
  registerSecurities,
  checkAge,
  startChallenge,
  completeChallenge,
  getChallengeStatus,
};

export default challengeApi;
