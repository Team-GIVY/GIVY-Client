import apiClient from './client';
import type { ApiResponse } from './types';

export interface BuyHistoryItemDTO {
  buyHistoryId: number;
  purchaseDate: string;
  productName: string;
  productDestination: string;
  productCode: string;
  brokerName: string;
  expectedInvestment: string;
}

export interface BuyHistoryListDTO {
  items: BuyHistoryItemDTO[];
}

// 매수 이력 조회
export const getBuyHistoryList = async (): Promise<BuyHistoryListDTO> => {
  const response = await apiClient.get<ApiResponse<BuyHistoryListDTO>>('/buy-history');
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

// 매수 이력 삭제
export const deleteBuyHistory = async (buyHistoryId: number): Promise<void> => {
  const response = await apiClient.delete<ApiResponse<void>>(`/buy-history/${buyHistoryId}`);
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
};

export const buyHistoryApi = {
  getBuyHistoryList,
  deleteBuyHistory,
};

export default buyHistoryApi;
