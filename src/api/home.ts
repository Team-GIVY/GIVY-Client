import apiClient from './client';
import type { ApiResponse, HomeResponseDTO } from './types';

// 홈 화면 데이터 조회
export const getHome = async (): Promise<HomeResponseDTO> => {
  const response = await apiClient.get<ApiResponse<HomeResponseDTO>>('/home');
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

export const homeApi = {
  getHome,
};

export default homeApi;
