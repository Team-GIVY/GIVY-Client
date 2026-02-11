import apiClient from './client';
import type {
  ApiResponse,
  GuideSummaryDTO,
  GuideDetailDTO,
  GuideListParams,
} from './types';

// 04-01 / 04-06 가이드 목록 조회
export const getGuideList = async (params?: GuideListParams): Promise<GuideSummaryDTO[]> => {
  const response = await apiClient.get<ApiResponse<GuideSummaryDTO[]>>('/guide', {
    params: {
      category: params?.category,
      page: params?.page ?? 0,
      size: params?.size ?? 20,
      sort: params?.sort,
    },
  });
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

// 04-02 가이드 상세 조회
export const getGuideDetail = async (guideId: number): Promise<GuideDetailDTO> => {
  const response = await apiClient.get<ApiResponse<GuideDetailDTO>>(`/guide/${guideId}`);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

// 04-03 가이드 좋아요 토글
export const toggleGuideLike = async (guideId: number): Promise<void> => {
  const response = await apiClient.post<ApiResponse<void>>(`/guide/${guideId}/guide_like`);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
};

// 04-04 가이드 저장 토글
export const toggleGuideStore = async (guideId: number): Promise<void> => {
  const response = await apiClient.post<ApiResponse<void>>(`/guide/${guideId}/guide_store`);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
};

// 04-05 내가 저장한 가이드 조회
export const getMyStoredGuides = async (): Promise<GuideSummaryDTO[]> => {
  const response = await apiClient.get<ApiResponse<GuideSummaryDTO[]>>('/guide/users/me/store');
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

export const guideApi = {
  getGuideList,
  getGuideDetail,
  toggleGuideLike,
  toggleGuideStore,
  getMyStoredGuides,
};

export default guideApi;
