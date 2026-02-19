// API 공통 응답 타입
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// ============ 01. Auth / User ============

export interface UserInfoDTO {
  userId: number;
  username: string;
  email: string;
}

export interface UserDetailDTO {
  userId: number;
  username: string;
  nickname?: string;
  email: string;
  role?: string;
  language?: 'KO' | 'EN';
  socialAccounts?: string[];
}

export interface UserSignupDTO {
  email: string;
  password: string;
  name: string;
  nickname: string;
  language: string;
  birthDate: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserLoginResDTO {
  accessToken: string;
  refreshToken: string;
  user?: UserInfoDTO;
}

export interface UserProfileDTO {
  name: string;
  nickname: string;
  language: 'KO' | 'EN';
  birthDate: string;
  profileImageUrl: string;
}

export interface UserLogoutDTO {
  refreshToken: string;
}

export interface UserTokenRefreshDTO {
  refreshToken: string;
}

export interface UserTokenRefreshResDTO {
  accessToken: string;
  refreshToken: string;
}

// ============ 04. Guide ============

export type GuideCategory = 'ETF' | 'FUND' | 'SAVING';

export interface GuideSummaryDTO {
  guideId: number;
  title: string;
  imageUrl: string;
  likeCount: number;
  storeCount: number;
  category: GuideCategory;
}

export interface GuideDetailDTO {
  guideId: number;
  title: string;
  body: string;
  imageUrl: string;
  category: GuideCategory;
  likeCount: number;
  storeCount: number;
  isLiked: boolean;
  isStored: boolean;
}

export interface GuideListParams {
  category?: GuideCategory;
  page?: number;
  size?: number;
  sort?: string[];
}

// ============ 05. Settings ============

export interface UpdateProfileDTO {
  nickname: string;
  language: 'KO' | 'EN';
  profileImageUrl?: string;
}

export interface UpdatePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateLanguageDTO {
  language: 'KO' | 'EN';
}

export interface NotificationSettingDTO {
  guideNotificationEnabled: boolean;
  challengeNotificationEnabled: boolean;
}

export interface UpdateNotificationDTO {
  guideNotificationEnabled: boolean;
  challengeNotificationEnabled: boolean;
}

// ============ 06. Start Challenge ============

export type ChallengeStatus = 'IN_PROGRESS' | 'COMPLETED';

export interface RegisterSecuritiesDTO {
  securitiesList: string[];
}

export interface UserSecuritiesInfoDTO {
  accountId: number;
  securitiesName: string;
}

export interface UserSecuritiesListDTO {
  securitiesList: UserSecuritiesInfoDTO[];
}

export interface AgeVerificationResDTO {
  userId: number;
  birth: string;
  adult: boolean;
}

export interface JoinChallengeDTO {
  productId: number;
}

export interface StartChallengeInfoDTO {
  startChallengeId: number;
  status?: ChallengeStatus;
}

export interface StartChallengeStatusDTO {
  startChallengeId: number;
  productId: number;
  status: ChallengeStatus;
  startedAt: string;
}

// ============ 07. UserNotification ============

export type NotificationType = 'CHALLENGE' | 'GUIDE' | 'AD' | 'SYSTEM' | 'MARKET_OPEN';

export interface UserNotificationInfoDTO {
  userNotificationId: number;
  notificationId: number;
  notificationType: NotificationType;
  title: string;
  body: string;
  targetType: string;
  targetId: string;
  isRead: boolean;
  deliveredAt: string;
  createdAt: string;
}

export interface UserNotificationInfoListDTO {
  userNotificationInfo: UserNotificationInfoDTO[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface ReadUserNotification {
  userNotificationId: number;
  isRead: boolean;
}

export interface NotificationListParams {
  page?: number;
  size?: number;
  isRead?: boolean;
}

// ============ Tendency (투자 성향) ============

export interface TendencySurveyDTO {
  survey: string[]; // 8개 문항 답변
}

export interface TendencyResultDTO {
  investmentType: string;
  scoreR: number;
  scoreL: number;
  scoreT: number;
  totalScore: number;
  imageBasicUrl: string;
  riskLabel: string;
  periodLabel: string;
  familiarityLabel: string;
}

export interface TendencyViewDTO {
  investmentType: string;
  imageBasicUrl: string;
  riskLabel: string;
  periodLabel: string;
  familiarityLabel: string;
}

export interface ProductOverviewDTO {
  productId: number;
  name: string;
  code: string;
  imageUrl: string;
  tagline: string;
  description: string;
  rateAvg: number;
}

export interface RecommendationListDTO {
  recommendationEventId: number;
  investmentType: string;
  products: ProductOverviewDTO[];
}

export interface RecommendationResultDTO {
  investmentType: string;
  bestProductName: string;
  bestProductCode: string;
}

// ============ Home ============

export interface HomeResponseDTO {
  nickname: string;
  status: string;
  data: unknown;
}
