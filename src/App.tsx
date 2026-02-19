import { useState, useEffect, useCallback } from 'react';
import { SplashScreen, OnboardingScreen } from './screens/onboarding';
import { LoginScreen, EmailLoginScreen, SignupNameScreen, SignupEmailPasswordScreen } from './screens/auth';
import { PersonalityTestIntroScreen, PersonalityTestQuestionScreen, PersonalityTestAnalyzingScreen, PersonalityTestResultScreen } from './screens/personality';
import { StartChallengeScreen, StartChallengeAgeScreen, StartChallengeYouthScreen, StartChallengeAdultScreen, StartChallengeRecommendScreen, StartChallengeProductScreen, StartChallengeCopyCodeScreen, StartChallengeNotifyScreen, StartChallengeSearchNameScreen, StartChallengeCompleteScreen } from './screens/challenge';
import { HomeScreen, HomeCheckInScreen, StockDetailScreen } from './screens/home';
import { GuideScreen, GuideDetailScreen } from './screens/guide';
import { NotificationScreen, NotificationSettingsScreen } from './screens/notification';
import { LoadingScreen } from './screens/loading';
import { FAQScreen } from './screens/faq';
import { SettingsScreen, PurchaseHistoryScreen, BrokerageSettingsScreen, PersonalityRetestScreen, WishlistScreen, MyStampScreen, ProfileEditScreen, NicknameEditScreen, NameScreen, EmailEditScreen, PasswordChangeScreen, LinkedAccountScreen, LanguageScreen } from './screens/settings';
import { UserProfileCard } from './components/profile';
import { LogoutModal, WithdrawModal } from './components/common';
// import NotificationToast from './components/common/NotificationToast';
// import { usePushNotification } from './hooks/usePushNotification';
import { authApi, homeApi, tendencyApi, challengeApi } from './api';
import { getBuyHistoryList, deleteBuyHistory } from './api/buyHistory';
import type { UserDetailDTO, ProductOverviewDTO, TendencyResultDTO, StartChallengeStatusDTO } from './api/types';
// 스탬프 이미지
import firstChallengeStamp from './assets/images/png/img_stamp_first-challenge.png';

/**
 * App 메인 애플리케이션 컴포넌트
 * 앱 진입 로직:
 * 1. 스플래시 화면 표시 (2초)
 * 2. Fade-out 효과와 함께 온보딩 화면으로 전환
 * 3. 온보딩 완료 후 로그인 화면으로 이동
 */
function App() {
  // URL 쿼리 파라미터 또는 localStorage에서 현재 화면 가져오기
  const getCurrentScreen = () => {
    // URL 쿼리 파라미터 우선 확인 (예: ?screen=startChallenge)
    const params = new URLSearchParams(window.location.search);
    const screen = params.get('screen');
    if (screen) return screen;

    // 카카오 콜백 code 파라미터가 있으면 로딩 화면 표시 (콜백 처리 대기)
    const code = params.get('code');
    if (code && !localStorage.getItem('accessToken')) {
      return 'loading';
    }

    const savedScreen = localStorage.getItem('currentScreen');
    const tendencyCompleted = localStorage.getItem('tendencyCompleted') === 'true';
    const challengeCompleted = localStorage.getItem('challengeCompleted') === 'true';

    // Protected Route: 성향테스트 미완료 시 접근 불가 화면 목록
    const protectedScreens = [
      'home',
      'homeCheckIn',
      'stockDetail',
      'guide',
      'guideDetail',
      'settings',
      'purchaseHistory',
      'brokerageSettings',
      'wishlist',
      'myStamp',
      'profileEdit',
      'nicknameEdit',
      'nameEdit',
      'emailEdit',
      'passwordChange',
      'linkedAccount',
      'language',
      'notification',
      'notificationSettings',
      'personalityRetest',
      'startChallenge',
      'startChallengeAge',
      'startChallengeYouth',
      'startChallengeAdult',
      'startChallengeRecommend',
      'startChallengeProduct',
      'startChallengeCopyCode',
      'startChallengeNotify',
      'startChallengeSearchName',
      'startChallengeComplete',
    ];

    // 성향테스트 미완료 상태에서 보호된 화면 접근 시 성향테스트로 리다이렉트
    if (!tendencyCompleted && savedScreen && protectedScreens.includes(savedScreen)) {
      console.log('[Protected Route] 성향테스트 미완료 - personalityTestIntro로 리다이렉트');
      return 'personalityTestIntro';
    }

    // 홈 관련 화면인 경우 챌린지 완료 여부 체크
    if (savedScreen === 'home' || savedScreen === 'stockDetail') {
      return challengeCompleted ? savedScreen : 'homeCheckIn';
    }

    // 성향 테스트 화면에서 새로고침 시 - 이미 완료했으면 적절한 화면으로 이동
    const personalityScreens = [
      'personalityTestIntro',
      'personalityTestQuestion',
      'personalityTestAnalyzing',
      'personalityTestResult',
    ];
    if (savedScreen && personalityScreens.includes(savedScreen) && tendencyCompleted) {
      return challengeCompleted ? 'stockDetail' : 'homeCheckIn';
    }

    // 챌린지 진행 중 화면에서 새로고침 시 homeCheckIn으로 리다이렉트
    const challengeScreens = [
      'startChallenge',
      'startChallengeAge',
      'startChallengeYouth',
      'startChallengeAdult',
      'startChallengeRecommend',
      'startChallengeProduct',
      'startChallengeCopyCode',
      'startChallengeNotify',
      'startChallengeSearchName',
      'startChallengeComplete',
    ];
    if (savedScreen && challengeScreens.includes(savedScreen) && !challengeCompleted) {
      return 'homeCheckIn';
    }

    return savedScreen || 'splash';
  };

  const initialScreen = getCurrentScreen();

  const [showSplash, setShowSplash] = useState(initialScreen === 'splash');
  const [showOnboarding, setShowOnboarding] = useState(initialScreen === 'onboarding');
  const [showLogin, setShowLogin] = useState(initialScreen === 'login');
  const [showEmailLogin, setShowEmailLogin] = useState(initialScreen === 'emailLogin');
  const [showSignupName, setShowSignupName] = useState(initialScreen === 'signupName');
  const [showSignupEmailPassword, setShowSignupEmailPassword] = useState(initialScreen === 'signupEmailPassword');
  const [showPersonalityTestIntro, setShowPersonalityTestIntro] = useState(initialScreen === 'personalityTestIntro');
  const [showPersonalityTestQuestion, setShowPersonalityTestQuestion] = useState(initialScreen === 'personalityTestQuestion');
  const [showPersonalityTestAnalyzing, setShowPersonalityTestAnalyzing] = useState(initialScreen === 'personalityTestAnalyzing');
  const [showPersonalityTestResult, setShowPersonalityTestResult] = useState(initialScreen === 'personalityTestResult');
  const [showStartChallenge, setShowStartChallenge] = useState(initialScreen === 'startChallenge');
  const [showStartChallengeAge, setShowStartChallengeAge] = useState(initialScreen === 'startChallengeAge');
  const [showStartChallengeYouth, setShowStartChallengeYouth] = useState(initialScreen === 'startChallengeYouth');
  const [showStartChallengeAdult, setShowStartChallengeAdult] = useState(initialScreen === 'startChallengeAdult');
  const [showStartChallengeRecommend, setShowStartChallengeRecommend] = useState(initialScreen === 'startChallengeRecommend');
  const [showStartChallengeProduct, setShowStartChallengeProduct] = useState(initialScreen === 'startChallengeProduct');
  const [showStartChallengeCopyCode, setShowStartChallengeCopyCode] = useState(initialScreen === 'startChallengeCopyCode');
  const [showStartChallengeNotify, setShowStartChallengeNotify] = useState(initialScreen === 'startChallengeNotify');
  const [showStartChallengeSearchName, setShowStartChallengeSearchName] = useState(initialScreen === 'startChallengeSearchName');
  const [showStartChallengeComplete, setShowStartChallengeComplete] = useState(initialScreen === 'startChallengeComplete');
  const [showHome, setShowHome] = useState(initialScreen === 'home');
  const [showHomeCheckIn, setShowHomeCheckIn] = useState(initialScreen === 'homeCheckIn');
  const [showStockDetail, setShowStockDetail] = useState(initialScreen === 'stockDetail');
  const [showGuide, setShowGuide] = useState(initialScreen === 'guide');
  const [showGuideDetail, setShowGuideDetail] = useState(initialScreen === 'guideDetail');
  const [showNotification, setShowNotification] = useState(initialScreen === 'notification');
  const [showNotificationSettings, setShowNotificationSettings] = useState(initialScreen === 'notificationSettings');
  const [showSettings, setShowSettings] = useState(initialScreen === 'settings');
  const [showPurchaseHistory, setShowPurchaseHistory] = useState(initialScreen === 'purchaseHistory');
  const [showBrokerageSettings, setShowBrokerageSettings] = useState(initialScreen === 'brokerageSettings');
  const [showPersonalityRetest, setShowPersonalityRetest] = useState(initialScreen === 'personalityRetest');
  const [showWishlist, setShowWishlist] = useState(initialScreen === 'wishlist');
  const [showMyStamp, setShowMyStamp] = useState(initialScreen === 'myStamp');
  const [showProfileEdit, setShowProfileEdit] = useState(initialScreen === 'profileEdit');
  const [showNicknameEdit, setShowNicknameEdit] = useState(initialScreen === 'nicknameEdit');
  const [showNameEdit, setShowNameEdit] = useState(initialScreen === 'nameEdit');
  const [showEmailEdit, setShowEmailEdit] = useState(initialScreen === 'emailEdit');
  const [showPasswordChange, setShowPasswordChange] = useState(initialScreen === 'passwordChange');
  const [showLinkedAccount, setShowLinkedAccount] = useState(initialScreen === 'linkedAccount');
  const [showLanguage, setShowLanguage] = useState(initialScreen === 'language');
  const [showLoading, setShowLoading] = useState(initialScreen === 'loading');
  const [showLoadingNoCard] = useState(initialScreen === 'loadingNoCard');
  const [showFAQ, setShowFAQ] = useState(initialScreen === 'faq');
  const [showProfileCard, setShowProfileCard] = useState(false);

  // 푸시 알림 (연동 비활성화)
  // const { toasts, removeToast, addTestToast, requestPermission: requestPushPermission } = usePushNotification();

  // 회원가입 데이터 상태
  const [signupName, setSignupName] = useState('');

  // 사용자 정보 및 상품 정보 상태 (API 연동)
  const [userInfo, setUserInfo] = useState<UserDetailDTO | null>(null);
  const [homeNickname, setHomeNickname] = useState<string>(
    () => localStorage.getItem('cachedNickname') || ''
  );
  const [recommendedProduct, setRecommendedProduct] = useState<ProductOverviewDTO | null>(null);
  const [allProducts, setAllProducts] = useState<ProductOverviewDTO[]>([]);

  // 챌린지 관련 상태
  const [startChallengeId, setStartChallengeId] = useState<number | null>(null);
  const [challengeStatus, setChallengeStatus] = useState<StartChallengeStatusDTO | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductOverviewDTO | null>(null);
  const [selectedBrokerage, setSelectedBrokerage] = useState<string>(localStorage.getItem('selectedBrokerage') || '');
  const [investmentType, setInvestmentType] = useState<string>(localStorage.getItem('investmentType') || '');

  // 성향 테스트 결과 상태
  const [tendencyResult, setTendencyResult] = useState<{
    investmentType: string;
    riskTendency: { label: string; value: number };
    liquidityTendency: { label: string; value: number };
    spendingTendency: { label: string; value: number };
    financialFamiliarity: { label: string; value: number };
  } | null>(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [previousScreen, setPreviousScreen] = useState<string | null>(null);
  const [purchaseHistoryData, setPurchaseHistoryData] = useState<{
    id: string;
    purchaseDate: string;
    productName: string;
    productDestination: string;
    productCode: string;
    brokerName: string;
    expectedInvestment: string;
  }[]>([]);
  const [fadeOut, setFadeOut] = useState(false);

  // 카카오 OAuth 콜백 처리
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    // code 파라미터가 있고, 이미 로그인 상태가 아닌 경우 카카오 콜백 처리
    if (code && !localStorage.getItem('accessToken')) {
      console.log('[카카오 콜백] code 파라미터 감지:', code);

      // URL에서 code 파라미터 제거 (히스토리 정리)
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);

      // 카카오 콜백 처리
      (async () => {
        try {
          await authApi.handleKakaoCallback(code);
          console.log('[카카오 콜백] 로그인 성공');
          // 로딩 화면 숨기기
          setShowLoading(false);
          // handleSocialLogin과 동일한 흐름
          await handleSocialLogin('kakao');
        } catch (err) {
          console.error('[카카오 콜백] 로그인 실패:', err);
          setShowLoading(false);
          alert('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
          // 로그인 화면으로 이동
          setShowLogin(true);
          localStorage.setItem('currentScreen', 'login');
        }
      })();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // 스플래시 화면일 때만 자동 전환
    if (initialScreen === 'splash') {
      // 2초 후 Fade-out 시작
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 2000);

      // 2.5초 후 스플래시 숨기고 온보딩 표시
      const transitionTimer = setTimeout(() => {
        setShowSplash(false);
        setShowOnboarding(true);
        localStorage.setItem('currentScreen', 'onboarding');
      }, 2500);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(transitionTimer);
      };
    }
  }, [initialScreen]);

  // 사용자 정보 및 추천 상품 로드 함수
  const loadUserData = useCallback(async () => {
    console.log('[loadUserData] 시작');
    let loadingShown = false;
    const loadingTimer = setTimeout(() => {
      loadingShown = true;
      setShowLoading(true);
    }, 2000);
    try {
      // 사용자 정보 조회
      console.log('[loadUserData] getMyInfo 호출...');
      const userDetail = await authApi.getMyInfo();
      console.log('[loadUserData] getMyInfo 성공:', userDetail);
      setUserInfo(userDetail);
      console.log('사용자 정보 로드 성공:', userDetail);

      // 홈 데이터 조회 (nickname)
      try {
        console.log('[loadUserData] getHome 호출...');
        const homeData = await homeApi.getHome();
        console.log('[loadUserData] getHome 성공:', homeData);
        console.log('[loadUserData] homeData.status:', homeData.status, '| 타입:', typeof homeData.status);
        console.log('[loadUserData] homeData.data:', homeData.data);
        const nickname = homeData.nickname || userDetail.nickname || '';
        console.log('[loadUserData] nickname 설정:', nickname);
        setHomeNickname(nickname);
        localStorage.setItem('cachedNickname', nickname);

        // homeData.status로 성향테스트 완료 여부 판단
        // 예상 값: 'BEFORE_TENDENCY', 'AFTER_TENDENCY', 'AFTER_CHALLENGE' 등
        if (homeData.status === 'AFTER_TENDENCY' || homeData.status === 'AFTER_CHALLENGE') {
          console.log('[loadUserData] status로 성향테스트 완료 판단:', homeData.status);
          localStorage.setItem('tendencyCompleted', 'true');
        }
        if (homeData.status === 'AFTER_CHALLENGE') {
          console.log('[loadUserData] status로 챌린지 완료 판단:', homeData.status);
          localStorage.setItem('challengeCompleted', 'true');
        }
      } catch (homeErr) {
        // 홈 데이터 실패 시 nickname 사용
        console.log('[loadUserData] getHome 실패:', homeErr);
        console.log('[loadUserData] nickname으로 대체:', userDetail.nickname);
        setHomeNickname(userDetail.nickname || '');
        localStorage.setItem('cachedNickname', userDetail.nickname || '');
      }

      // 성향 테스트 완료 여부 확인 및 성향 데이터 로드
      try {
        console.log('[loadUserData] getMyTendency 호출...');
        const myTendency = await tendencyApi.getMyTendency();
        console.log('[loadUserData] getMyTendency 성공:', myTendency);
        console.log('[loadUserData] myTendency.investmentType:', myTendency?.investmentType, '| 타입:', typeof myTendency?.investmentType);

        if (myTendency && myTendency.investmentType) {
          console.log('[loadUserData] tendencyCompleted = true 설정');
          localStorage.setItem('tendencyCompleted', 'true');
          // 성향 데이터를 tendencyResult에 저장
          setTendencyResult({
            investmentType: myTendency.investmentType,
            riskTendency: { label: myTendency.riskLabel || '', value: 0 },
            liquidityTendency: { label: myTendency.periodLabel || '', value: 0 },
            spendingTendency: { label: '', value: 0 },
            financialFamiliarity: { label: myTendency.familiarityLabel || '', value: 0 },
          });
          console.log('[loadUserData] 성향 데이터 저장 완료');
        } else {
          console.log('[loadUserData] investmentType이 없음 - 성향테스트 미완료로 판단');
        }
      } catch (tendencyErr) {
        console.log('[loadUserData] getMyTendency 실패:', tendencyErr);
        console.log('[loadUserData] 성향 테스트 미완료');
      }

      // 추천 상품 조회
      try {
        const recommendations = await tendencyApi.getRecommendations();
        if (recommendations.products && recommendations.products.length > 0) {
          setRecommendedProduct(recommendations.products[0]);
          setAllProducts(recommendations.products);
          console.log('추천 상품 로드 성공:', recommendations.products);
        }
        // 투자 유형 저장 (카테고리)
        if (recommendations.investmentType) {
          setInvestmentType(recommendations.investmentType);
          localStorage.setItem('investmentType', recommendations.investmentType);
          console.log('투자 유형:', recommendations.investmentType);
        }
      } catch {
        console.log('추천 상품 없음');
      }

      // 챌린지 상태 조회
      try {
        const status = await challengeApi.getChallengeStatus();
        setChallengeStatus(status);
        setStartChallengeId(status.startChallengeId);
        console.log('챌린지 상태 로드 성공:', status);

        // 서버 상태에 따라 localStorage 동기화
        if (status.status === 'COMPLETED') {
          localStorage.setItem('challengeCompleted', 'true');
        }

        // 챌린지에서 선택한 상품 로드
        if (status.productId) {
          const recommendations = await tendencyApi.getRecommendations();
          const product = recommendations.products?.find(p => p.productId === status.productId);
          if (product) {
            setSelectedProduct(product);
            console.log('선택한 상품 로드 성공:', product);
          }
        }
      } catch {
        console.log('챌린지 상태 없음 (챌린지 미시작)');
      }

      // 선택한 증권사 로드
      const savedBrokerage = localStorage.getItem('selectedBrokerage');
      if (savedBrokerage) {
        setSelectedBrokerage(savedBrokerage);
      }

      // 푸시 알림 권한 요청 (연동 비활성화)
      // requestPushPermission();
    } catch (err) {
      console.error('사용자 데이터 로드 실패:', err);
    } finally {
      clearTimeout(loadingTimer);
      if (loadingShown) {
        setShowLoading(false);
      }
    }
  }, []);

  // 로그인 상태일 때 데이터 로드 및 화면 상태 확인
  useEffect(() => {
    const hasToken = localStorage.getItem('accessToken');
    if (hasToken) {
      loadUserData();
    }
  }, [loadUserData]);

  // 성향 테스트 완료 후 해당 화면 접근 시 리다이렉트
  useEffect(() => {
    const tendencyCompleted = localStorage.getItem('tendencyCompleted') === 'true';
    const challengeCompleted = localStorage.getItem('challengeCompleted') === 'true';

    const isOnPersonalityScreen = showPersonalityTestIntro || showPersonalityTestQuestion ||
                                   showPersonalityTestAnalyzing || showPersonalityTestResult;

    if (tendencyCompleted && isOnPersonalityScreen && !showPersonalityRetest && previousScreen !== 'settings') {
      // 성향 테스트 완료 상태인데 테스트 화면에 있으면 리다이렉트
      setShowPersonalityTestIntro(false);
      setShowPersonalityTestQuestion(false);
      setShowPersonalityTestAnalyzing(false);
      setShowPersonalityTestResult(false);

      if (challengeCompleted) {
        setShowStockDetail(true);
        localStorage.setItem('currentScreen', 'stockDetail');
      } else {
        setShowHomeCheckIn(true);
        localStorage.setItem('currentScreen', 'homeCheckIn');
      }
    }
  }, [showPersonalityTestIntro, showPersonalityTestQuestion, showPersonalityTestAnalyzing, showPersonalityTestResult, showPersonalityRetest]);

  const handleOnboardingComplete = () => {
    // 온보딩 완료 후 로그인 화면으로 이동
    setShowOnboarding(false);
    setShowLogin(true);
    localStorage.setItem('currentScreen', 'login');
    console.log('온보딩 완료! 로그인 화면으로 이동합니다.');
  };

  const handleEmailLogin = () => {
    console.log('이메일 로그인 클릭');
    setShowLogin(false);
    setShowEmailLogin(true);
    localStorage.setItem('currentScreen', 'emailLogin');
  };

  const handleSocialLogin = async (provider: 'kakao' | 'google' | 'apple') => {
    console.log(`${provider} 소셜 로그인 성공`);
    // 로그인 성공 시 시간 저장
    localStorage.setItem('lastLoginTime', new Date().toISOString());
    localStorage.removeItem('lastLogoutTime');
    // 소셜 로그인 정보 저장
    localStorage.setItem('loginProvider', provider);
    localStorage.setItem('loginEmail', 'givy123@email.com'); // 실제로는 API에서 받아옴

    setShowLogin(false);
    setShowEmailLogin(false);

    // 서버에서 사용자 상태 로드
    await loadUserData();

    // 서버 확인 후 진행 상태 읽기
    const tendencyCompleted = localStorage.getItem('tendencyCompleted') === 'true';
    const challengeCompleted = localStorage.getItem('challengeCompleted') === 'true';

    console.log('[소셜로그인] tendencyCompleted:', tendencyCompleted, ', challengeCompleted:', challengeCompleted);

    if (challengeCompleted) {
      // 챌린지까지 완료 → 홈 화면
      setShowStockDetail(true);
      localStorage.setItem('currentScreen', 'stockDetail');
    } else if (tendencyCompleted) {
      // 성향 테스트만 완료 → 체크인 화면
      setShowHomeCheckIn(true);
      localStorage.setItem('currentScreen', 'homeCheckIn');
    } else {
      // 아무것도 완료 안함 → 성향 테스트
      setShowPersonalityTestIntro(true);
      localStorage.setItem('currentScreen', 'personalityTestIntro');
    }
  };

  const handleSignup = () => {
    console.log('회원가입 클릭');
    setShowLogin(false);
    setShowEmailLogin(false);
    setShowSignupName(true);
    localStorage.setItem('currentScreen', 'signupName');
  };

  const handleEmailLoginBack = () => {
    setShowEmailLogin(false);
    setShowLogin(true);
    localStorage.setItem('currentScreen', 'login');
  };

  const handleEmailLoginSubmit = async (email: string, password: string) => {
    console.log('이메일 로그인 성공:', { email, password });
    // 로그인 성공 시 시간 저장
    localStorage.setItem('lastLoginTime', new Date().toISOString());
    localStorage.removeItem('lastLogoutTime');
    // 이메일 로그인 정보 저장
    localStorage.setItem('loginProvider', 'email');
    localStorage.setItem('loginEmail', email);

    setShowEmailLogin(false);
    setShowLogin(false);

    // 서버에서 사용자 상태 로드
    await loadUserData();

    // 서버 확인 후 진행 상태 읽기
    const tendencyCompleted = localStorage.getItem('tendencyCompleted') === 'true';
    const challengeCompleted = localStorage.getItem('challengeCompleted') === 'true';

    console.log('[로그인] tendencyCompleted:', tendencyCompleted, ', challengeCompleted:', challengeCompleted);

    if (challengeCompleted) {
      // 챌린지까지 완료 → 홈 화면
      setShowStockDetail(true);
      localStorage.setItem('currentScreen', 'stockDetail');
    } else if (tendencyCompleted) {
      // 성향 테스트만 완료 → 체크인 화면
      setShowHomeCheckIn(true);
      localStorage.setItem('currentScreen', 'homeCheckIn');
    } else {
      // 아무것도 완료 안함 → 성향 테스트
      setShowPersonalityTestIntro(true);
      localStorage.setItem('currentScreen', 'personalityTestIntro');
    }
  };

  const handleFindAccount = () => {
    console.log('아이디/비밀번호 찾기 클릭');
    // TODO: 계정 찾기 화면으로 이동
  };

  const handleSignupNameBack = () => {
    setShowSignupName(false);
    setShowLogin(true);
    localStorage.setItem('currentScreen', 'login');
  };

  const handleSignupNameNext = (name: string) => {
    console.log('입력한 이름:', name);
    setSignupName(name);  // 이름 저장
    setShowSignupName(false);
    setShowSignupEmailPassword(true);
    localStorage.setItem('currentScreen', 'signupEmailPassword');
  };

  const handleSignupEmailPasswordBack = () => {
    setShowSignupEmailPassword(false);
    setShowSignupName(true);
    localStorage.setItem('currentScreen', 'signupName');
  };

  const handleSignupEmailPasswordNext = (email: string, password: string) => {
    console.log('입력한 이메일/비밀번호:', { email, password });
    setShowSignupEmailPassword(false);
    setShowPersonalityTestIntro(true);
    localStorage.setItem('currentScreen', 'personalityTestIntro');
  };

  const handlePersonalityTestIntroBack = () => {
    setShowPersonalityTestIntro(false);
    // 이전 화면 확인
    if (previousScreen === 'settings') {
      setShowSettings(true);
      localStorage.setItem('currentScreen', 'settings');
      setPreviousScreen(null);
    } else {
      setShowLogin(true);
      localStorage.setItem('currentScreen', 'login');
    }
  };

  const handlePersonalityTestStart = () => {
    console.log('성향 테스트 시작');
    setShowPersonalityTestIntro(false);
    setShowPersonalityTestQuestion(true);
    localStorage.setItem('currentScreen', 'personalityTestQuestion');
  };

  const handlePersonalityTestQuestionBack = () => {
    setShowPersonalityTestQuestion(false);
    // 이전 화면 확인
    if (previousScreen === 'settings') {
      setShowPersonalityRetest(true);
      localStorage.setItem('currentScreen', 'personalityRetest');
    } else {
      setShowPersonalityTestIntro(true);
      localStorage.setItem('currentScreen', 'personalityTestIntro');
    }
  };

  const handlePersonalityTestComplete = (answers: Record<number, string>, result?: TendencyResultDTO) => {
    console.log('성향 테스트 완료:', answers);
    console.log('API 결과:', result);

    // API 결과가 있으면 결과 상태에 저장
    if (result) {
      setTendencyResult({
        investmentType: result.investmentType,
        riskTendency: { label: result.riskLabel, value: result.scoreR || 50 },
        liquidityTendency: { label: result.periodLabel, value: result.scoreL || 50 },
        spendingTendency: { label: '중립', value: result.scoreT || 50 },
        financialFamiliarity: { label: result.familiarityLabel, value: result.totalScore || 50 },
      });
    }

    setShowPersonalityTestQuestion(false);
    setShowPersonalityTestAnalyzing(true);
    localStorage.setItem('currentScreen', 'personalityTestAnalyzing');
  };

  const handlePersonalityTestAnalyzingBack = () => {
    setShowPersonalityTestAnalyzing(false);
    setShowPersonalityTestQuestion(true);
    localStorage.setItem('currentScreen', 'personalityTestQuestion');
  };

  const handlePersonalityTestAnalyzingNext = () => {
    console.log('분석 완료, 결과 화면으로 이동');
    setShowPersonalityTestAnalyzing(false);
    setShowPersonalityTestResult(true);
    localStorage.setItem('currentScreen', 'personalityTestResult');
  };

  const handlePersonalityTestResultBack = () => {
    setShowPersonalityTestResult(false);
    setShowPersonalityTestAnalyzing(true);
    localStorage.setItem('currentScreen', 'personalityTestAnalyzing');
  };

  const handlePersonalityTestResultNext = async () => {
    console.log('결과 확인 완료, 체크인 화면으로 이동');

    // 추천 상품 조회 (API에서 가져오기)
    try {
      console.log('[App] getRecommendations 호출 시작');
      const recommendations = await tendencyApi.getRecommendations();
      console.log('[App] getRecommendations 결과:', recommendations);
      if (recommendations.products && recommendations.products.length > 0) {
        setAllProducts(recommendations.products);
        setRecommendedProduct(recommendations.products[0]);
        console.log('[App] 추천 상품 로드 성공:', recommendations.products.length, '개');
      } else {
        console.log('[App] 추천 상품이 비어있음');
      }
    } catch (err) {
      console.error('[App] 추천 상품 조회 실패:', err);
    }

    setShowPersonalityTestResult(false);
    setShowHomeCheckIn(true);
    localStorage.setItem('currentScreen', 'homeCheckIn');
    localStorage.setItem('tendencyCompleted', 'true'); // 성향 테스트 완료 플래그
  };

  const handleStartChallengeBack = () => {
    setShowStartChallenge(false);
    setShowHomeCheckIn(true);
    localStorage.setItem('currentScreen', 'homeCheckIn');
  };

  const handleStartChallengeNext = async (brokerage: string) => {
    console.log('선택한 증권사:', brokerage);
    localStorage.setItem('selectedBrokerage', brokerage);
    setSelectedBrokerage(brokerage);

    // 증권사 등록 API 호출
    try {
      const result = await challengeApi.registerSecurities({
        securitiesList: [brokerage],
      });
      console.log('증권사 등록 성공:', result);
    } catch (error) {
      console.error('증권사 등록 실패:', error);
      // 실패해도 다음 화면으로 진행 (백엔드 불안정 대비)
    }

    setShowStartChallenge(false);
    setShowStartChallengeAge(true);
    localStorage.setItem('currentScreen', 'startChallengeAge');
  };

  const handleNoAccount = () => {
    console.log('증권 계좌 없음 선택');
    setShowStartChallenge(false);
    setShowStartChallengeAge(true);
    localStorage.setItem('currentScreen', 'startChallengeAge');
  };

  const handleStartChallengeAgeBack = () => {
    setShowStartChallengeAge(false);
    setShowStartChallenge(true);
    localStorage.setItem('currentScreen', 'startChallenge');
  };

  const handleStartChallengeAgeNo = () => {
    console.log('19세 미만 선택 - 상품 화면으로 이동');
    setShowStartChallengeAge(false);
    setShowStartChallengeProduct(true);
    localStorage.setItem('currentScreen', 'startChallengeProduct');
  };

  const handleStartChallengeAgeYes = async () => {
    console.log('19세 이상 확인');

    // 나이 확인 API 호출
    try {
      const ageResult = await challengeApi.checkAge();
      console.log('나이 확인 결과:', ageResult);

      setShowStartChallengeAge(false);
        setShowStartChallengeProduct(true);
        localStorage.setItem('currentScreen', 'startChallengeProduct');
    } catch (error) {
      console.error('나이 확인 실패:', error);
      setShowStartChallengeAge(false);
      setShowStartChallengeProduct(true);
      localStorage.setItem('currentScreen', 'startChallengeProduct');
    }
  };

  const handleStartChallengeAdultBack = () => {
    setShowStartChallengeAdult(false);
    setShowStartChallengeProduct(true);
    localStorage.setItem('currentScreen', 'startChallengeProduct');
  };

  const handleStartChallengeAdultConfirm = () => {
    console.log('성인 상품 추천 확인 - 완료 화면으로');
    setShowStartChallengeAdult(false);
    setShowStartChallengeComplete(true);
    localStorage.setItem('currentScreen', 'startChallengeComplete');
  };

  const handleStartChallengeYouthBack = () => {
    setShowStartChallengeYouth(false);
    setShowStartChallengeAge(true);
    localStorage.setItem('currentScreen', 'startChallengeAge');
  };

  const handleStartChallengeYouthReselect = () => {
    console.log('재선택 - 증권 선택 화면으로');
    setShowStartChallengeYouth(false);
    setShowStartChallenge(true);
    localStorage.setItem('currentScreen', 'startChallenge');
  };

  const handleStartChallengeYouthConfirm = () => {
    console.log('청소년 적금 선택 - 상품 화면으로');
    setShowStartChallengeYouth(false);
    setShowStartChallengeProduct(true);
    localStorage.setItem('currentScreen', 'startChallengeProduct');
  };

  const handleStartChallengeRecommendBack = () => {
    setShowStartChallengeRecommend(false);
    setShowStartChallengeYouth(true);
    localStorage.setItem('currentScreen', 'startChallengeYouth');
  };

  const handleStartChallengeRecommendReselect = () => {
    console.log('재선택 - 증권 선택 화면으로');
    setShowStartChallengeRecommend(false);
    setShowStartChallenge(true);
    localStorage.setItem('currentScreen', 'startChallenge');
  };

  const handleStartChallengeRecommendConfirm = async (brokerage: string) => {
    console.log('추천 증권사 선택:', brokerage);
    localStorage.setItem('selectedBrokerage', brokerage);
    setSelectedBrokerage(brokerage);

    // 상품 데이터가 없으면 화면 전환 전에 로드
    if (allProducts.length === 0) {
      try {
        const recommendations = await tendencyApi.getRecommendations();
        if (recommendations.products && recommendations.products.length > 0) {
          setAllProducts(recommendations.products);
          setRecommendedProduct(recommendations.products[0]);
          if (recommendations.investmentType) {
            setInvestmentType(recommendations.investmentType);
            localStorage.setItem('investmentType', recommendations.investmentType);
          }
        } else {
          alert('추천 상품이 없습니다. 성향 테스트를 다시 진행해주세요.');
          return;
        }
      } catch (err) {
        console.error('추천 상품 조회 실패:', err);
        alert('추천 상품을 불러오지 못했습니다. 다시 시도해주세요.');
        return;
      }
    }

    setShowStartChallengeRecommend(false);
    setShowStartChallengeProduct(true);
    localStorage.setItem('currentScreen', 'startChallengeProduct');
  };

  const handleStartChallengeProductBack = () => {
    setShowStartChallengeProduct(false);
    setShowStartChallengeAge(true);
    localStorage.setItem('currentScreen', 'startChallengeAge');
  };

  const [isStartingChallenge, setIsStartingChallenge] = useState(false);

  const handleStartChallengeProductConfirm = async (productId: number) => {
    // 중복 호출 방지
    if (isStartingChallenge) {
      console.log('이미 챌린지 시작 중...');
      return;
    }

    setIsStartingChallenge(true);
    console.log('상품 선택 완료 - 선택한 상품 ID:', productId);

    // 선택한 상품 저장
    const product = allProducts.find(p => p.productId === productId);
    if (product) {
      setSelectedProduct(product);
      // localStorage에도 상품 정보 저장 (새로고침 후 복원용)
      localStorage.setItem('selectedProductName', product.name);
      localStorage.setItem('selectedProductCode', product.code);
    }

    // 챌린지 시작 API 호출
    try {
      const result = await challengeApi.startChallenge({ productId });
      console.log('챌린지 시작 성공:', result);
      setStartChallengeId(result.startChallengeId);
      localStorage.setItem('startChallengeId', String(result.startChallengeId));
      localStorage.setItem('selectedProductId', String(productId));
    } catch (error) {
      console.error('챌린지 시작 실패:', error);
      // 409 Conflict = 이미 진행 중인 챌린지 있음 - 기존 챌린지 정보 조회
      try {
        const status = await challengeApi.getChallengeStatus();
        if (status.startChallengeId) {
          setStartChallengeId(status.startChallengeId);
          localStorage.setItem('startChallengeId', String(status.startChallengeId));
          console.log('기존 챌린지 ID 조회 성공:', status.startChallengeId);
        }
      } catch (statusError) {
        console.error('챌린지 상태 조회 실패:', statusError);
      }
    }

    setShowStartChallengeProduct(false);
    setShowStartChallengeCopyCode(true);
    localStorage.setItem('currentScreen', 'startChallengeCopyCode');
    setIsStartingChallenge(false);
  };

  const handleStartChallengeCopyCodeBack = () => {
    setShowStartChallengeCopyCode(false);
    setShowStartChallengeProduct(true);
    localStorage.setItem('currentScreen', 'startChallengeProduct');
  };

  const handleStartChallengeCopyCodeComplete = () => {
    console.log('매수 완료 - 알림 설정 화면으로');
    setShowStartChallengeCopyCode(false);
    setShowStartChallengeNotify(true);
    localStorage.setItem('currentScreen', 'startChallengeNotify');
  };

  const handleStartChallengeNotifyBack = () => {
    setShowStartChallengeNotify(false);
    setShowStartChallengeCopyCode(true);
    localStorage.setItem('currentScreen', 'startChallengeCopyCode');
  };

  const handleStartChallengeNotifyReselect = () => {
    console.log('재선택 - 상품 선택 화면으로');
    setShowStartChallengeNotify(false);
    setShowStartChallengeProduct(true);
    localStorage.setItem('currentScreen', 'startChallengeProduct');
  };

  const handleStartChallengeNotifyConfirm = (notifyEnabled: boolean) => {
    console.log('알림 설정:', notifyEnabled ? '켜짐' : '꺼짐');
    setShowStartChallengeNotify(false);
    setShowStartChallengeAdult(true);
    localStorage.setItem('currentScreen', 'startChallengeAdult');
  };

  const handleStartChallengeSearchHelp = () => {
    console.log('상품 검색이 안돼요 - 이름 검색 화면으로');
    setShowStartChallengeCopyCode(false);
    setShowStartChallengeSearchName(true);
    localStorage.setItem('currentScreen', 'startChallengeSearchName');
  };

  const handleStartChallengeSearchNameBack = () => {
    setShowStartChallengeSearchName(false);
    setShowStartChallengeCopyCode(true);
    localStorage.setItem('currentScreen', 'startChallengeCopyCode');
  };

  const handleStartChallengeSearchNameComplete = () => {
    console.log('이름 검색 후 매수 완료 - 알림 설정 화면으로');
    setShowStartChallengeSearchName(false);
    setShowStartChallengeNotify(true);
    localStorage.setItem('currentScreen', 'startChallengeNotify');
  };

  const handleStartChallengeOtherRecommend = () => {
    console.log('다른 증권계좌 추천 요청 - 세트 변경됨');
    // 컴포넌트 내부에서 세트 변경 처리, 화면 이동 없음
  };

  const handleStartChallengeCompleteBack = () => {
    setShowStartChallengeComplete(false);
    setShowStartChallengeAdult(true);
    localStorage.setItem('currentScreen', 'startChallengeAdult');
  };

  const handleStartChallengeCompleteConfirm = async () => {
    console.log('스타트 챌린지 완료 - 홈 화면으로');

    // 챌린지 완료 API 호출
    try {
      const challengeId = startChallengeId || Number(localStorage.getItem('startChallengeId'));
      if (challengeId) {
        const result = await challengeApi.completeChallenge(challengeId);
        console.log('챌린지 완료 성공:', result);
      }
    } catch (error) {
      console.error('챌린지 완료 API 실패:', error);
      // 실패해도 완료 처리 진행
    }

    setShowStartChallengeComplete(false);
    setShowStockDetail(true);
    localStorage.setItem('currentScreen', 'stockDetail');
    localStorage.setItem('challengeCompleted', 'true');
  };

  // 알림 토스트 클릭 → 딥링크 라우팅 (연동 비활성화)
  /* const handleToastClick = useCallback((targetType: string, targetId: string) => {
    const screenMap: Record<string, () => void> = {
      CHALLENGE: () => { setShowStartChallenge(true); localStorage.setItem('currentScreen', 'startChallenge'); },
      GUIDE: () => { setShowGuide(true); localStorage.setItem('currentScreen', 'guide'); },
      GUIDE_DETAIL: () => {
        if (targetId) localStorage.setItem('selectedGuideId', targetId);
        setShowGuideDetail(true);
        localStorage.setItem('currentScreen', 'guideDetail');
      },
      NOTIFICATION: () => { setShowNotification(true); localStorage.setItem('currentScreen', 'notification'); },
      HOME: () => { setShowHome(true); localStorage.setItem('currentScreen', 'home'); },
      SETTINGS: () => { setShowSettings(true); localStorage.setItem('currentScreen', 'settings'); },
    };

    const navigate = screenMap[targetType];
    if (navigate) {
      navigate();
    } else {
      // 기본: 알림 목록으로
      setShowNotification(true);
      localStorage.setItem('currentScreen', 'notification');
    }
  }, []); */

  // 체크인 화면 핸들러
  const handleCheckIn = () => {
    console.log('체크인 하기 클릭');
    setShowHomeCheckIn(false);
    setShowFAQ(true);
    localStorage.setItem('currentScreen', 'faq');
  };

  const handleSkipChallenge = () => {
    console.log('스타트 챌린지 건너뛰기 클릭');
    setShowHomeCheckIn(false);
    setShowStockDetail(true);
    localStorage.setItem('currentScreen', 'stockDetail');
    localStorage.setItem('challengeCompleted', 'true');
  };

  // 홈 화면 핸들러
  const handleNotification = () => {
    console.log('알림 클릭');
    setShowHome(false);
    setShowStockDetail(false);
    setShowGuide(false);
    setShowGuideDetail(false);
    setShowSettings(false);
    setShowNotification(true);
    localStorage.setItem('currentScreen', 'notification');
  };

  const handleNotificationBack = () => {
    setShowNotification(false);
    // 이전 화면으로 복귀 (기본: 차트 화면)
    setShowStockDetail(true);
    localStorage.setItem('currentScreen', 'stockDetail');
  };

  const handleNotificationSettings = () => {
    console.log('알림 설정 클릭');
    setShowNotification(false);
    setShowNotificationSettings(true);
    localStorage.setItem('currentScreen', 'notificationSettings');
  };

  const handleNotificationSettingsBack = () => {
    setShowNotificationSettings(false);
    // 이전 화면으로 복귀 (설정에서 왔으면 설정으로, 아니면 알림으로)
    if (previousScreen === 'settings') {
      setShowSettings(true);
      localStorage.setItem('currentScreen', 'settings');
      setPreviousScreen(null);
    } else {
      setShowNotification(true);
      localStorage.setItem('currentScreen', 'notification');
    }
  };

  // 설정에서 푸시 알림 클릭 핸들러
  const handlePushNotification = () => {
    console.log('PUSH 알림 설정 클릭');
    setPreviousScreen('settings');
    setShowSettings(false);
    setShowNotificationSettings(true);
    localStorage.setItem('currentScreen', 'notificationSettings');
  };

  const handleNotificationClick = (id: string) => {
    console.log('알림 클릭:', id);
    // TODO: 해당 알림 상세로 이동
  };

  const handleProfile = () => {
    console.log('프로필 클릭');
    setShowProfileCard(true);
  };

  const handleCloseProfileCard = () => {
    setShowProfileCard(false);
  };

  const handleEditProfile = () => {
    setShowProfileCard(false);
    handleProfileEdit();
  };

  const handleTabChange = (tab: 'home' | 'guide' | 'settings') => {
    console.log(`탭 변경: ${tab}`);
    const tendencyCompleted = localStorage.getItem('tendencyCompleted') === 'true';
    const challengeCompleted = localStorage.getItem('challengeCompleted') === 'true';

    // Protected Route: 성향테스트 미완료 시 성향테스트로 리다이렉트
    if (!tendencyCompleted) {
      console.log('성향테스트 미완료 - 성향테스트 화면으로 이동');
      setShowHome(false);
      setShowHomeCheckIn(false);
      setShowStockDetail(false);
      setShowGuide(false);
      setShowSettings(false);
      setShowPersonalityTestIntro(true);
      localStorage.setItem('currentScreen', 'personalityTestIntro');
      return;
    }

    // 모든 화면 상태 초기화
    setShowHome(false);
    setShowHomeCheckIn(false);
    setShowStockDetail(false);
    setShowGuide(false);
    setShowGuideDetail(false);
    setShowSettings(false);

    if (tab === 'home') {
      // 챌린지 완료 여부에 따라 화면 분기
      if (challengeCompleted) {
        setShowStockDetail(true);
        localStorage.setItem('currentScreen', 'stockDetail');
      } else {
        setShowHomeCheckIn(true);
        localStorage.setItem('currentScreen', 'homeCheckIn');
      }
    } else if (tab === 'guide') {
      setShowGuide(true);
      localStorage.setItem('currentScreen', 'guide');
    } else if (tab === 'settings') {
      setShowSettings(true);
      localStorage.setItem('currentScreen', 'settings');
    }
  };

  // 선택한 가이드 ID
  const [selectedGuideId, setSelectedGuideId] = useState<number | null>(null);

  // 가이드 상세 화면 핸들러
  const handleGuideDetail = (guideId: number) => {
    console.log('가이드 상세 보기:', guideId);
    setSelectedGuideId(guideId);
    setShowGuide(false);
    setShowGuideDetail(true);
    localStorage.setItem('currentScreen', 'guideDetail');
  };

  const handleGuideDetailBack = () => {
    setShowGuideDetail(false);
    setShowGuide(true);
    localStorage.setItem('currentScreen', 'guide');
  };

  const handleGuideApply = () => {
    console.log('이벤트 신청하기 클릭');
    // TODO: 이벤트 신청 처리
  };

  // 매수 이력 핸들러
  const fetchPurchaseHistory = useCallback(async () => {
    try {
      const data = await getBuyHistoryList();
      const mapped = data.items.map((item) => ({
        id: String(item.buyHistoryId),
        purchaseDate: item.purchaseDate,
        productName: item.productName,
        productDestination: item.productDestination,
        productCode: item.productCode,
        brokerName: item.brokerName,
        expectedInvestment: item.expectedInvestment,
      }));
      setPurchaseHistoryData(mapped);
    } catch (err) {
      console.error('매수 이력 조회 실패:', err);
    }
  }, []);

  const handlePurchaseHistory = () => {
    console.log('매수 이력 클릭');
    setShowSettings(false);
    setShowPurchaseHistory(true);
    localStorage.setItem('currentScreen', 'purchaseHistory');
    fetchPurchaseHistory();
  };

  const handlePurchaseHistoryBack = () => {
    setShowPurchaseHistory(false);
    setShowSettings(true);
    localStorage.setItem('currentScreen', 'settings');
  };

  const handlePurchaseDelete = async (id: string) => {
    console.log('매수 이력 삭제:', id);
    try {
      await deleteBuyHistory(Number(id));
      setPurchaseHistoryData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('매수 이력 삭제 실패:', err);
      setPurchaseHistoryData(prev => prev.filter(item => item.id !== id));
    }
  };

  // 증권사 설정 핸들러
  const handleBrokerageSettings = () => {
    console.log('증권사 설정 및 연결 클릭');
    setShowSettings(false);
    setShowBrokerageSettings(true);
    localStorage.setItem('currentScreen', 'brokerageSettings');
  };

  const handleBrokerageSettingsBack = () => {
    setShowBrokerageSettings(false);
    setShowSettings(true);
    localStorage.setItem('currentScreen', 'settings');
  };

  const handleBrokerageSelect = (brokerageName: string) => {
    console.log('증권사 선택:', brokerageName);
    setSelectedBrokerage(brokerageName);
    localStorage.setItem('selectedBrokerage', brokerageName);
  };

  // 관심 목록 핸들러
  const handleWishlist = () => {
    console.log('관심 목록 클릭');
    setShowSettings(false);
    setShowWishlist(true);
    localStorage.setItem('currentScreen', 'wishlist');
  };

  const handleWishlistBack = () => {
    setShowWishlist(false);
    setShowSettings(true);
    localStorage.setItem('currentScreen', 'settings');
  };

  const handleWishlistItemClick = (guideId: number) => {
    console.log('관심 목록 아이템 클릭:', guideId);
    // 가이드 상세 페이지로 이동
    setSelectedGuideId(guideId);
    setShowWishlist(false);
    setShowGuideDetail(true);
    localStorage.setItem('currentScreen', 'guideDetail');
  };

  // 나의 도장 핸들러
  const handleMyStamp = () => {
    console.log('나의 도장 클릭');
    setShowSettings(false);
    setShowMyStamp(true);
    localStorage.setItem('currentScreen', 'myStamp');
  };

  const handleMyStampBack = () => {
    setShowMyStamp(false);
    setShowSettings(true);
    localStorage.setItem('currentScreen', 'settings');
  };

  // 회원정보 수정 핸들러
  const handleProfileEdit = () => {
    console.log('회원정보 확인 및 수정 클릭');
    setShowSettings(false);
    setShowProfileEdit(true);
    localStorage.setItem('currentScreen', 'profileEdit');
  };

  const handleProfileEditBack = () => {
    setShowProfileEdit(false);
    setShowSettings(true);
    localStorage.setItem('currentScreen', 'settings');
  };

  const handleNicknameEdit = () => {
    console.log('닉네임 수정 클릭');
    setShowProfileEdit(false);
    setShowNicknameEdit(true);
    localStorage.setItem('currentScreen', 'nicknameEdit');
  };

  const handleNicknameEditBack = () => {
    setShowNicknameEdit(false);
    setShowProfileEdit(true);
    localStorage.setItem('currentScreen', 'profileEdit');
  };

  const handleNicknameEditComplete = (newNickname: string) => {
    console.log('닉네임 변경 완료:', newNickname);
    // TODO: 백엔드 API 호출하여 닉네임 저장
    setShowNicknameEdit(false);
    setShowProfileEdit(true);
    localStorage.setItem('currentScreen', 'profileEdit');
  };

  const handleNameEdit = () => {
    console.log('이름 수정 클릭');
    setShowProfileEdit(false);
    setShowNameEdit(true);
    localStorage.setItem('currentScreen', 'nameEdit');
  };

  const handleNameEditBack = () => {
    setShowNameEdit(false);
    setShowProfileEdit(true);
    localStorage.setItem('currentScreen', 'profileEdit');
  };

  const handleReauthenticate = () => {
    console.log('본인인증 다시하기 클릭');
    // TODO: 본인인증 프로세스 시작
  };

  const handleEmailEdit = () => {
    console.log('대표 이메일 수정 클릭');
    setShowProfileEdit(false);
    setShowEmailEdit(true);
    localStorage.setItem('currentScreen', 'emailEdit');
  };

  const handleEmailEditBack = () => {
    setShowEmailEdit(false);
    setShowProfileEdit(true);
    localStorage.setItem('currentScreen', 'profileEdit');
  };

  const handleAddEmail = () => {
    console.log('이메일 직접 등록하기 클릭');
    // TODO: 이메일 등록 화면으로 이동
  };

  const handleSelectEmail = (id: string) => {
    console.log('이메일 선택:', id);
    // TODO: 대표 이메일 변경 처리
  };

  const handlePasswordChange = () => {
    console.log('비밀번호 변경 클릭');
    setShowProfileEdit(false);
    setShowPasswordChange(true);
    localStorage.setItem('currentScreen', 'passwordChange');
  };

  const handlePasswordChangeBack = () => {
    setShowPasswordChange(false);
    setShowProfileEdit(true);
    localStorage.setItem('currentScreen', 'profileEdit');
  };

  const handlePasswordChangeComplete = (newPassword: string) => {
    console.log('비밀번호 변경 완료:', newPassword);
    // TODO: 비밀번호 변경 API 호출
    setShowPasswordChange(false);
    setShowProfileEdit(true);
    localStorage.setItem('currentScreen', 'profileEdit');
  };

  const handleProfileImageChange = () => {
    console.log('프로필 이미지 변경 클릭');
    // TODO: 이미지 선택 모달 또는 화면으로 이동
  };

  const handleLinkedAccount = () => {
    console.log('연결된 소셜 계정 클릭');
    setShowProfileEdit(false);
    setShowLinkedAccount(true);
    localStorage.setItem('currentScreen', 'linkedAccount');
  };

  const handleLinkedAccountBack = () => {
    setShowLinkedAccount(false);
    setShowProfileEdit(true);
    localStorage.setItem('currentScreen', 'profileEdit');
  };

  const handleDisconnectAccount = (provider: 'naver' | 'google' | 'kakao' | 'apple' | 'email' | null) => {
    console.log('소셜 계정 해지:', provider);
    // TODO: 소셜 계정 해지 API 호출
  };

  const handleLanguage = () => {
    console.log('앱 언어 클릭');
    setShowProfileEdit(false);
    setShowLanguage(true);
    localStorage.setItem('currentScreen', 'language');
  };

  const handleLanguageBack = () => {
    setShowLanguage(false);
    setShowProfileEdit(true);
    localStorage.setItem('currentScreen', 'profileEdit');
  };

  const handleLanguageComplete = (language: string) => {
    console.log('언어 선택 완료:', language);
    localStorage.setItem('appLanguage', language);
    setShowLanguage(false);
    setShowProfileEdit(true);
    localStorage.setItem('currentScreen', 'profileEdit');
  };

  // 성향테스트 재검사 핸들러
  const handleTendencyTest = () => {
    console.log('성향테스트 확인 및 재검사 클릭');
    setPreviousScreen('settings');
    setShowSettings(false);
    setShowPersonalityRetest(true);
    localStorage.setItem('currentScreen', 'personalityRetest');
  };

  const handlePersonalityRetestBack = () => {
    setShowPersonalityRetest(false);
    setShowSettings(true);
    localStorage.setItem('currentScreen', 'settings');
    setPreviousScreen(null);
  };

  const handlePersonalityRetestStart = () => {
    console.log('성향 재검사 시작');
    setShowPersonalityRetest(false);
    setShowPersonalityTestQuestion(true);
    localStorage.setItem('currentScreen', 'personalityTestQuestion');
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    console.log('로그아웃 버튼 클릭');
    setShowLogoutModal(true);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const handleLogoutConfirm = () => {
    console.log('로그아웃 확인');
    setShowLogoutModal(false);
    // 로그아웃 시간 저장
    const logoutTime = new Date().toISOString();
    // 사용자별 데이터 모두 삭제
    localStorage.clear();
    localStorage.setItem('lastLogoutTime', logoutTime);
    // 모든 화면 상태 초기화
    setShowSettings(false);
    setShowStockDetail(false);
    setShowGuide(false);
    setShowHome(false);
    // React 상태도 초기화
    setUserInfo(null);
    setStartChallengeId(null);
    setChallengeStatus(null);
    setAllProducts([]);
    setRecommendedProduct(null);
    setSelectedProduct(null);
    setSelectedBrokerage('');
    setInvestmentType('');
    // 로그인 화면으로 이동
    setShowLogin(true);
    localStorage.setItem('currentScreen', 'login');
  };

  // 회원 탈퇴 핸들러
  const handleWithdraw = () => {
    console.log('회원 탈퇴 버튼 클릭');
    setShowWithdrawModal(true);
  };

  const handleWithdrawCancel = () => {
    setShowWithdrawModal(false);
  };

  const handleWithdrawConfirm = () => {
    console.log('회원 탈퇴 확인');
    setShowWithdrawModal(false);
    // 모든 로컬 스토리지 데이터 삭제
    localStorage.clear();
    // 모든 화면 상태 초기화
    setShowSettings(false);
    setShowStockDetail(false);
    setShowGuide(false);
    setShowHome(false);
    // 로그인 화면으로 이동
    setShowLogin(true);
    localStorage.setItem('currentScreen', 'login');
  };

  return (
    <>
      {/* 스플래시 화면 */}
      {showSplash && (
        <div
          className={`w-full h-screen transition-opacity duration-500 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <SplashScreen />
        </div>
      )}

      {/* 온보딩 화면 */}
      {showOnboarding && (
        <div className="w-full h-screen animate-fadeIn">
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        </div>
      )}

      {/* 로그인 화면 */}
      {showLogin && (
        <div className="w-full h-screen animate-fadeIn">
          <LoginScreen
            onEmailLogin={handleEmailLogin}
            onSocialLogin={handleSocialLogin}
            onSignup={handleSignup}
          />
        </div>
      )}

      {/* 이메일 로그인 화면 */}
      {showEmailLogin && (
        <div className="w-full h-screen animate-fadeIn">
          <EmailLoginScreen
            onBack={handleEmailLoginBack}
            onLogin={handleEmailLoginSubmit}
            onSocialLogin={handleSocialLogin}
            onFindAccount={handleFindAccount}
            onSignup={handleSignup}
          />
        </div>
      )}

      {/* 회원가입 이름 입력 화면 */}
      {showSignupName && (
        <div className="w-full h-screen animate-fadeIn">
          <SignupNameScreen
            onBack={handleSignupNameBack}
            onNext={handleSignupNameNext}
          />
        </div>
      )}

      {/* 회원가입 이메일/비밀번호 설정 화면 */}
      {showSignupEmailPassword && (
        <div className="w-full h-screen animate-fadeIn">
          <SignupEmailPasswordScreen
            onBack={handleSignupEmailPasswordBack}
            onNext={handleSignupEmailPasswordNext}
            userName={signupName}
          />
        </div>
      )}

      {/* 성향 테스트 시작 화면 */}
      {showPersonalityTestIntro && (
        <div className="w-full h-screen animate-fadeIn">
          <PersonalityTestIntroScreen
            onBack={handlePersonalityTestIntroBack}
            onStart={handlePersonalityTestStart}
            userName={homeNickname || userInfo?.nickname || signupName || '기비'}
          />
        </div>
      )}

      {/* 성향 테스트 질문 화면 */}
      {showPersonalityTestQuestion && (
        <div className="w-full h-screen animate-fadeIn">
          <PersonalityTestQuestionScreen
            onBack={handlePersonalityTestQuestionBack}
            onComplete={handlePersonalityTestComplete}
          />
        </div>
      )}

      {/* 성향 테스트 분석 중 화면 */}
      {showPersonalityTestAnalyzing && (
        <div className="w-full h-screen animate-fadeIn">
          <PersonalityTestAnalyzingScreen
            onBack={handlePersonalityTestAnalyzingBack}
            onNext={handlePersonalityTestAnalyzingNext}
            userName="기비"
          />
        </div>
      )}

      {/* 성향 테스트 결과 화면 */}
      {showPersonalityTestResult && (
        <div className="w-full h-screen animate-fadeIn">
          <PersonalityTestResultScreen
            onBack={handlePersonalityTestResultBack}
            onNext={handlePersonalityTestResultNext}
            userName={homeNickname || userInfo?.nickname || signupName || '기비'}
            resultData={tendencyResult || undefined}
          />
        </div>
      )}

      {/* 스타트 챌린지 화면 */}
      {showStartChallenge && (
        <div className="w-full h-screen animate-fadeIn">
          <StartChallengeScreen
            onBack={handleStartChallengeBack}
            onNext={handleStartChallengeNext}
            onNoAccount={handleNoAccount}
          />
        </div>
      )}

      {/* 스타트 챌린지 나이 확인 화면 */}
      {showStartChallengeAge && (
        <div className="w-full h-screen animate-fadeIn">
          <StartChallengeAgeScreen
            onBack={handleStartChallengeAgeBack}
            onNo={handleStartChallengeAgeNo}
            onYes={handleStartChallengeAgeYes}
          />
        </div>
      )}

      {/* 스타트 챌린지 청소년 화면 */}
      {showStartChallengeYouth && (
        <div className="w-full h-screen animate-fadeIn">
          <StartChallengeYouthScreen
            onBack={handleStartChallengeYouthBack}
            onReselect={handleStartChallengeYouthReselect}
            onConfirm={handleStartChallengeYouthConfirm}
          />
        </div>
      )}

      {/* 스타트 챌린지 성인 화면 */}
      {showStartChallengeAdult && (
        <div className="w-full h-screen animate-fadeIn">
          <StartChallengeAdultScreen
            onBack={handleStartChallengeAdultBack}
            onConfirm={handleStartChallengeAdultConfirm}
          />
        </div>
      )}

      {/* 스타트 챌린지 추천 화면 */}
      {showStartChallengeRecommend && (
        <div className="w-full h-screen animate-fadeIn">
          <StartChallengeRecommendScreen
            onBack={handleStartChallengeRecommendBack}
            onReselect={handleStartChallengeRecommendReselect}
            onConfirm={handleStartChallengeRecommendConfirm}
            onOtherRecommend={handleStartChallengeOtherRecommend}
            userName="기비"
          />
        </div>
      )}

      {/* 스타트 챌린지 상품 추천 화면 */}
      {showStartChallengeProduct && (
        <div className="w-full h-screen animate-fadeIn">
          <StartChallengeProductScreen
            onBack={handleStartChallengeProductBack}
            onConfirm={handleStartChallengeProductConfirm}
            userName={homeNickname || userInfo?.nickname || '기비'}
            products={allProducts}
          />
        </div>
      )}

      {/* 스타트 챌린지 코드 복사 화면 */}
      {showStartChallengeCopyCode && (
        <div className="w-full h-screen animate-fadeIn">
          <StartChallengeCopyCodeScreen
            onBack={handleStartChallengeCopyCodeBack}
            onSearchHelp={handleStartChallengeSearchHelp}
            onComplete={handleStartChallengeCopyCodeComplete}
            product={selectedProduct ? {
              destination: selectedProduct.name,
              productName: investmentType || '펀드형',
              shortDescription: selectedProduct.tagline,
              productCode: selectedProduct.code,
            } : undefined}
          />
        </div>
      )}

      {/* 스타트 챌린지 알림 설정 화면 */}
      {showStartChallengeNotify && (
        <div className="w-full h-screen animate-fadeIn">
          <StartChallengeNotifyScreen
            onBack={handleStartChallengeNotifyBack}
            onReselect={handleStartChallengeNotifyReselect}
            onConfirm={handleStartChallengeNotifyConfirm}
            product={selectedProduct ? {
              destination: selectedProduct.name,
              productName: investmentType || '펀드형',
              shortDescription: selectedProduct.tagline,
            } : undefined}
          />
        </div>
      )}

      {/* 스타트 챌린지 이름 검색 화면 */}
      {showStartChallengeSearchName && (
        <div className="w-full h-screen animate-fadeIn">
          <StartChallengeSearchNameScreen
            onBack={handleStartChallengeSearchNameBack}
            onComplete={handleStartChallengeSearchNameComplete}
            product={selectedProduct ? {
              destination: selectedProduct.name,
              productName: investmentType || '펀드형',
              shortDescription: selectedProduct.tagline,
            } : undefined}
          />
        </div>
      )}

      {/* 스타트 챌린지 완료 화면 */}
      {showStartChallengeComplete && (
        <div className="w-full h-screen animate-fadeIn">
          <StartChallengeCompleteScreen
            onBack={handleStartChallengeCompleteBack}
            onConfirm={handleStartChallengeCompleteConfirm}
          />
        </div>
      )}

      {/* 홈 체크인 화면 (성향 테스트 후 첫 화면) */}
      {showHomeCheckIn && (
        <div className="w-full h-screen animate-fadeIn">
          <HomeCheckInScreen
            onNotification={handleNotification}
            onProfile={handleProfile}
            onTabChange={handleTabChange}
            onCheckIn={handleCheckIn}
            onSkipChallenge={handleSkipChallenge}
            userName={homeNickname || userInfo?.nickname || '기비'}
            expectedInvestment="50,000원"
            destination={recommendedProduct?.name || '미국 기술주'}
          />
        </div>
      )}

      {/* 홈 화면 */}
      {showHome && (
        <div className="w-full h-screen animate-fadeIn">
          <HomeScreen
            onNotification={handleNotification}
            onProfile={handleProfile}
            onTabChange={handleTabChange}
            userName={homeNickname || userInfo?.nickname || '기비'}
            stockCode={selectedProduct?.code || recommendedProduct?.code}
            startPoint={selectedProduct?.code || recommendedProduct?.code}
            destination={investmentType || '미국 기술주'}
            etfName={selectedProduct?.name || recommendedProduct?.name}
            brokerageAccount={selectedBrokerage || undefined}
            avgReturn={selectedProduct?.rateAvg ? `${selectedProduct.rateAvg}%` : recommendedProduct?.rateAvg ? `${recommendedProduct.rateAvg}%` : undefined}
          />
        </div>
      )}

      {/* 주식 상세 화면 */}
      {showStockDetail && (
        <div className="w-full h-screen animate-fadeIn">
          <StockDetailScreen
            onNotification={handleNotification}
            onProfile={handleProfile}
            onTabChange={handleTabChange}
            userName={homeNickname || userInfo?.nickname || '기비'}
            product={selectedProduct || recommendedProduct || undefined}
            brokerage={selectedBrokerage || undefined}
            category={investmentType || undefined}
          />
        </div>
      )}

      {/* 가이드 화면 */}
      {showGuide && (
        <div className="w-full h-screen animate-fadeIn">
          <GuideScreen
            onTabChange={handleTabChange}
            onDetailClick={handleGuideDetail}
          />
        </div>
      )}

      {/* 가이드 상세 화면 */}
      {showGuideDetail && (
        <div className="w-full h-screen animate-fadeIn">
          <GuideDetailScreen
            guideId={selectedGuideId || undefined}
            onBack={handleGuideDetailBack}
            onApply={handleGuideApply}
          />
        </div>
      )}

      {/* 알림 화면 */}
      {showNotification && (
        <div className="w-full h-screen animate-fadeIn">
          <NotificationScreen
            onBack={handleNotificationBack}
            onSettings={handleNotificationSettings}
            onNotificationClick={handleNotificationClick}
          />
        </div>
      )}

      {/* 알림 설정 화면 */}
      {showNotificationSettings && (
        <div className="w-full h-screen animate-fadeIn">
          <NotificationSettingsScreen
            onBack={handleNotificationSettingsBack}
            onTabChange={handleTabChange}
          />
        </div>
      )}

      {/* 설정 화면 */}
      {showSettings && (
        <div className="w-full h-screen animate-fadeIn">
          <SettingsScreen
            onNotification={handleNotification}
            onProfile={handleProfile}
            onTabChange={handleTabChange}
            onPurchaseHistory={handlePurchaseHistory}
            onBrokerageSettings={handleBrokerageSettings}
            onTendencyTest={handleTendencyTest}
            onPushNotification={handlePushNotification}
            onLogout={handleLogout}
            onWithdraw={handleWithdraw}
            onWishlist={handleWishlist}
            onMyStamp={handleMyStamp}
            onProfileEdit={handleProfileEdit}
            onTerms={() => window.open('https://www.notion.so/2d704a205af780328594eaecaee4fe78', '_blank')}
            userName={homeNickname || userInfo?.nickname || '기비'}
            productCode={selectedProduct?.code || recommendedProduct?.code}
            productName={selectedProduct?.name || recommendedProduct?.name}
            productDestination={investmentType || '펀드형'}
            brokerName={selectedBrokerage || '토스증권'}
          />
        </div>
      )}

      {/* 매수 이력 화면 */}
      {showPurchaseHistory && (
        <div className="w-full h-screen animate-fadeIn">
          <PurchaseHistoryScreen
            onBack={handlePurchaseHistoryBack}
            onDelete={handlePurchaseDelete}
            purchaseHistory={purchaseHistoryData}
          />
        </div>
      )}

      {/* 증권사 설정 화면 */}
      {showBrokerageSettings && (
        <div className="w-full h-screen animate-fadeIn">
          <BrokerageSettingsScreen
            onBack={handleBrokerageSettingsBack}
            onSelect={handleBrokerageSelect}
            selectedBrokerage={selectedBrokerage}
          />
        </div>
      )}

      {/* 성향 재검사 화면 */}
      {showPersonalityRetest && (
        <div className="w-full h-screen animate-fadeIn">
          <PersonalityRetestScreen
            onBack={handlePersonalityRetestBack}
            onStart={handlePersonalityRetestStart}
            userName={homeNickname || userInfo?.nickname || '기비'}
          />
        </div>
      )}

      {/* 관심 목록 화면 */}
      {showWishlist && (
        <div className="w-full h-screen animate-fadeIn">
          <WishlistScreen
            onBack={handleWishlistBack}
            onItemClick={handleWishlistItemClick}
          />
        </div>
      )}

      {/* 나의 도장 화면 */}
      {showMyStamp && (
        <div className="w-full h-screen animate-fadeIn">
          <MyStampScreen
            onBack={handleMyStampBack}
            stampItems={
              (challengeStatus?.status === 'COMPLETED' || localStorage.getItem('challengeCompleted') === 'true') &&
              (selectedProduct || localStorage.getItem('selectedProductName'))
                ? [{
                    id: String(startChallengeId || challengeStatus?.startChallengeId || localStorage.getItem('startChallengeId') || '1'),
                    name: '스타트 챌린지 완료',
                    date: new Date().toLocaleDateString('ko-KR'),
                    image: firstChallengeStamp,
                  }]
                : []
            }
          />
        </div>
      )}

      {/* 회원정보 수정 화면 */}
      {showProfileEdit && (
        <div className="w-full h-screen animate-fadeIn">
          <ProfileEditScreen
            onBack={handleProfileEditBack}
            onNicknameEdit={handleNicknameEdit}
            onNameEdit={handleNameEdit}
            onEmailEdit={handleEmailEdit}
            onPasswordChange={handlePasswordChange}
            onProfileImageChange={handleProfileImageChange}
            onLinkedAccount={handleLinkedAccount}
            onLanguage={handleLanguage}
          />
        </div>
      )}

      {/* 닉네임 변경 화면 */}
      {showNicknameEdit && (
        <div className="w-full h-screen animate-fadeIn">
          <NicknameEditScreen
            onBack={handleNicknameEditBack}
            onComplete={handleNicknameEditComplete}
            currentNickname={homeNickname || userInfo?.nickname || 'GIVY'}
          />
        </div>
      )}

      {/* 이름 확인/수정 화면 */}
      {showNameEdit && (
        <div className="w-full h-screen animate-fadeIn">
          <NameScreen
            onBack={handleNameEditBack}
            onReauthenticate={handleReauthenticate}
          />
        </div>
      )}

      {/* 대표 이메일 변경 화면 */}
      {showEmailEdit && (
        <div className="w-full h-screen animate-fadeIn">
          <EmailEditScreen
            onBack={handleEmailEditBack}
            onAddEmail={handleAddEmail}
            onSelectEmail={handleSelectEmail}
            userEmail={userInfo?.email}
          />
        </div>
      )}

      {/* 비밀번호 변경 화면 */}
      {showPasswordChange && (
        <div className="w-full h-screen animate-fadeIn">
          <PasswordChangeScreen
            onBack={handlePasswordChangeBack}
            onComplete={handlePasswordChangeComplete}
          />
        </div>
      )}

      {/* 연결된 소셜 계정 화면 */}
      {showLinkedAccount && (
        <div className="w-full h-screen animate-fadeIn">
          <LinkedAccountScreen
            onBack={handleLinkedAccountBack}
            onDisconnect={handleDisconnectAccount}
          />
        </div>
      )}

      {/* 앱 언어 화면 */}
      {showLanguage && (
        <div className="w-full h-screen animate-fadeIn">
          <LanguageScreen
            onBack={handleLanguageBack}
            onComplete={handleLanguageComplete}
          />
        </div>
      )}

      {/* 로딩 화면 (카드 있음) */}
      {showLoading && (
        <div className="w-full h-screen animate-fadeIn">
          <LoadingScreen withCard={true} />
        </div>
      )}

      {/* 로딩 화면 (카드 없음) */}
      {showLoadingNoCard && (
        <div className="w-full h-screen animate-fadeIn">
          <LoadingScreen withCard={false} />
        </div>
      )}

      {/* F&Q 화면 */}
      {showFAQ && (
        <div className="w-full h-screen animate-fadeIn">
          <FAQScreen
            onBack={() => {
              setShowFAQ(false);
              setShowHomeCheckIn(true);
              localStorage.setItem('currentScreen', 'homeCheckIn');
            }}
            onStartChallenge={() => {
              setShowFAQ(false);
              setShowStartChallenge(true);
              localStorage.setItem('currentScreen', 'startChallenge');
              localStorage.setItem('challengeCompleted', 'false');
            }}
            userName={homeNickname || userInfo?.nickname || '기비'}
          />
        </div>
      )}

      {/* 프로필 카드 모달 */}
      {showProfileCard && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={handleCloseProfileCard}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <UserProfileCard
              personality={tendencyResult ? {
                riskTolerance: tendencyResult.riskTendency?.label || undefined,
                investmentPeriod: tendencyResult.liquidityTendency?.label || undefined,
                spendingHabit: tendencyResult.spendingTendency?.label || undefined,
                financialAffinity: tendencyResult.financialFamiliarity?.label || undefined,
              } : null}
              profile={{
                userName: (() => {
                  const name = (homeNickname?.trim() || userInfo?.nickname?.trim()) || '기비';
                  console.log('[ProfileCard] userName:', name, '| homeNickname:', homeNickname, '| userInfo?.nickname:', userInfo?.nickname);
                  return name;
                })(),
                userHandle: userInfo?.email ? `@${userInfo.email.split('@')[0]}` : '@givy',
              }}
              stamps={
                (challengeStatus?.status === 'COMPLETED' || localStorage.getItem('challengeCompleted') === 'true') &&
                (selectedProduct || localStorage.getItem('selectedProductName'))
                  ? [{
                      id: String(startChallengeId || challengeStatus?.startChallengeId || localStorage.getItem('startChallengeId') || '1'),
                      productName: selectedProduct?.name || localStorage.getItem('selectedProductName') || '상품',
                      productCode: selectedProduct?.code || localStorage.getItem('selectedProductCode') || '',
                      completedAt: new Date().toLocaleDateString('ko-KR'),
                    }]
                  : []
              }
              onEditProfile={handleEditProfile}
            />
          </div>
        </div>
      )}

      {/* 로그아웃 모달 */}
      {showLogoutModal && (
        <LogoutModal
          onCancel={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
        />
      )}

      {/* 회원 탈퇴 모달 */}
      {showWithdrawModal && (
        <WithdrawModal
          onCancel={handleWithdrawCancel}
          onConfirm={handleWithdrawConfirm}
          userName="기비"
        />
      )}

      {/* Fade-in 애니메이션 정의 */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
      `}</style>

      {/* 알림 토스트 (연동 비활성화) */}
      {/* {toasts.map((toast) => (
        <NotificationToast
          key={toast.id}
          title={toast.title}
          body={toast.body}
          targetType={toast.targetType}
          targetId={toast.targetId}
          onClose={() => removeToast(toast.id)}
          onClick={handleToastClick}
        />
      ))} */}
    </>
  );
}

export default App;
