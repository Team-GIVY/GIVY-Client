import apiClient from './client';
import type {
  ApiResponse,
  TendencySurveyDTO,
  TendencyResultDTO,
  TendencyViewDTO,
  RecommendationListDTO,
} from './types';

// 투자 성향 설문 제출 (POST /tendency)
// survey: 8개의 문자열 배열
export const submitTendency = async (data: TendencySurveyDTO): Promise<TendencyResultDTO> => {
  console.log('[tendency] submitTendency 호출:', data);
  const response = await apiClient.post<ApiResponse<TendencyResultDTO>>('/tendency', data);
  console.log('[tendency] submitTendency 응답:', response.data);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  // 성향 제출 성공 시 바로 tendencyCompleted 설정
  localStorage.setItem('tendencyCompleted', 'true');
  return response.data.result;
};

// 내 투자 성향 조회 (GET /tendency/me)
export const getMyTendency = async (): Promise<TendencyViewDTO> => {
  const response = await apiClient.get<ApiResponse<TendencyViewDTO>>('/tendency/me');
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

// 추천 이력 생성 (POST /tendency/recommendations)
export const createRecommendations = async (): Promise<{ investmentType: string; bestProductName: string; bestProductCode: string }> => {
  console.log('[tendency] createRecommendations 호출');
  const response = await apiClient.post<ApiResponse<{ investmentType: string; bestProductName: string; bestProductCode: string }>>('/tendency/recommendations');
  console.log('[tendency] createRecommendations 응답:', response.data);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

// 추천 상품 목록 조회 (GET /tendency/recommendations)
export const getRecommendations = async (): Promise<RecommendationListDTO> => {
  console.log('[tendency] getRecommendations 호출');
  const response = await apiClient.get<ApiResponse<RecommendationListDTO>>('/tendency/recommendations');
  console.log('[tendency] getRecommendations 응답:', response.data);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

export const tendencyApi = {
  submitTendency,
  getMyTendency,
  createRecommendations,
  getRecommendations,
};

export default tendencyApi;
