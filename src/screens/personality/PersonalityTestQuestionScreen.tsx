import { useState } from 'react';
import { ProgressBar, QuestionBox, OptionCard } from '../../components/personality';
import { tendencyApi } from '../../api';
import type { TendencyResultDTO } from '../../api/types';

interface Question {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
}

interface PersonalityTestQuestionScreenProps {
  onBack?: () => void;
  onComplete?: (answers: Record<number, string>, result?: TendencyResultDTO) => void;
}

function PersonalityTestQuestionScreen({ onBack, onComplete }: PersonalityTestQuestionScreenProps) {
  const totalSteps = 8;
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: '놀이 공원에 간다면\n꼭 타고 싶은 기구는 무엇인가요?',
      options: [
        { id: 'A', text: '편안하게 즐기는 회전목마' },
        { id: 'B', text: '스릴이 살짝 느껴지는 바이킹' },
        { id: 'C', text: '짜릿함이 최고인 T익스프레스' }
      ]
    },
    {
      id: 2,
      question: '5만원이 1년 뒤에 변한다면\n어떻게 가장 마음이 편한가요?',
      options: [
        { id: 'A', text: '최고 5만 3천 원이 되거나, 최저 4만 9천 원 되기' },
        { id: 'B', text: '최고 6만 원이 되거나, 최저 4만 5천 원 되기' },
        { id: 'C', text: '최고 8만 원이 되거나, 최저 3만 5천 원 되기' }
      ]
    },
    {
      id: 3,
      question: '산신령이 나타나 돈을 준다고 해요.\n당신의 선택은?',
      options: [
        { id: 'A', text: '지금 바로 100만 원 받기' },
        { id: 'B', text: '5년 뒤에 200만 원 받기' }
      ]
    },
    {
      id: 4,
      question: '이 돈을 모아서 가장 하고 싶은 것은\n무엇에 가까나요?',
      options: [
        { id: 'A', text: '1~2년 안에 사고 싶은 신상 아이템 구매' },
        { id: 'B', text: '3~5년 뒤 떠날 멋진 해외여행' },
        { id: 'C', text: '언젠가를 위한 든든한 목돈 마련' }
      ]
    },
    {
      id: 5,
      question: '갑자기 100만 원의 보너스가 생긴다면\n무엇을 할건가요?',
      options: [
        { id: 'A', text: '평소 갖고 싶었던 운동화, 가방 등 사기' },
        { id: 'B', text: '일단 무슨 일이 생길지 모르니 저축하기' },
        { id: 'C', text: '절반은 쓰고, 절반은 저축하기' }
      ]
    },
    {
      id: 6,
      question: '월급날, 통장에 찍힌 월급을 보면\n가장 먼저 드는 생각은 무엇인가요?',
      options: [
        { id: 'A', text: '"이번 달 카드값이랑 월세 내고 나면..."' },
        { id: 'B', text: '"여기서 얼마를 남겨서 모을 수 있을까?"' },
        { id: 'C', text: '둘 다 생각이 들 것 같다' }
      ]
    },
    {
      id: 7,
      question: '만약 지금, 3년 후를 위해 10만원으로\n무언가 시작해야 한다면 ?',
      options: [
        { id: 'A', text: '일단 안전하게 은행 예/적금에 넣기' },
        { id: 'B', text: '손해는 싫지만 은행 이자보다 높았으면... 전문가가 알아서 해주는 펀드하기' },
        { id: 'C', text: '경험 삼아, 삼성전자나 애플 같은 유명한 주식(혹은 ETF)을 직접 사기' }
      ]
    },
    {
      id: 8,
      question: '아래 단어 중, 지금 가장 마음이\n편안해지는 단어를 골라주세요',
      options: [
        { id: 'A', text: '안전, 차곡차곡, 원금보장' },
        { id: 'B', text: '전문가, 안정추구, 분산투자' },
        { id: 'C', text: '성장, 수익, 경험, 주식' }
      ]
    }
  ];

  const currentQuestion = questions[currentStep - 1];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = async () => {
    if (selectedOption) {
      const newAnswers = { ...answers, [currentQuestion.id]: selectedOption };
      setAnswers(newAnswers);

      if (currentStep < totalSteps) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        // 다음 질문의 이미 저장된 답변 가져오기 (있으면 표시)
        setSelectedOption(newAnswers[questions[nextStep - 1].id] || null);
      } else {
        // 모든 질문 완료 - API 호출
        setIsSubmitting(true);
        try {
          // 답변을 배열로 변환 (1~8번 순서대로)
          const surveyAnswers = questions.map((q) => newAnswers[q.id] || '');
          console.log('[PersonalityTest] submitTendency 호출:', surveyAnswers);
          const result = await tendencyApi.submitTendency({ survey: surveyAnswers });
          console.log('[PersonalityTest] submitTendency 성공:', result);

          // 추천 이력 생성
          try {
            console.log('[PersonalityTest] createRecommendations 호출');
            const recResult = await tendencyApi.createRecommendations();
            console.log('[PersonalityTest] createRecommendations 성공:', recResult);
          } catch (recErr) {
            console.error('[PersonalityTest] createRecommendations 실패:', recErr);
            // 추천 이력 생성 실패해도 계속 진행
          }

          onComplete?.(newAnswers, result);
        } catch (err) {
          console.error('투자 성향 제출 실패:', err);
          // API 실패해도 일단 완료 처리 (localStorage에 저장)
          localStorage.setItem('tendencyCompleted', 'true');
          onComplete?.(newAnswers);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setSelectedOption(answers[questions[prevStep - 1].id] || null);
    } else {
      onBack?.();
    }
  };

  const isLastStep = currentStep === totalSteps;

  return (
    <div
      className="test-page-container"
      style={{
        width: '100%',
        height: '100vh',
        maxWidth: '402px',
        maxHeight: '874px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#F5F5F5'
      }}
    >
      {/* 헤더 */}
      <header
        className="test-header"
        style={{ position: 'relative', height: '69px' }}
      >
        <button
          className="back-button"
          onClick={handleBack}
          style={{
            width: '24px',
            height: '24px',
            margin: '23px 116px 0 24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            color: '#252525',
            padding: 0
          }}
        >
          ←
        </button>
        <h1
          className="test-title"
          style={{
            width: '64px',
            height: '22px',
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 'bold',
            lineHeight: '1.57',
            letterSpacing: '-0.14px',
            textAlign: 'center',
            color: '#252525',
            position: 'absolute',
            top: '23px',
            left: '50%',
            transform: 'translateX(-50%)',
            margin: 0
          }}
        >
          성향 테스트
        </h1>
      </header>

      {/* 진행바 */}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {/* 질문 박스 */}
      <QuestionBox
        questionNumber={currentStep}
        questionText={currentQuestion.question}
      />

      {/* 선택지 리스트 */}
      <div
        className="options-list"
        style={{ marginLeft: '24px', marginRight: '24px' }}
      >
        {currentQuestion.options.map((option, index) => (
          <OptionCard
            key={option.id}
            optionId={option.id}
            optionText={option.text}
            isSelected={selectedOption === option.id}
            onSelect={() => handleOptionSelect(option.id)}
            isLast={index === currentQuestion.options.length - 1}
          />
        ))}
      </div>

      {/* 다음 버튼 */}
      <button
        className={`next-button ${selectedOption ? 'next-button-active' : 'next-button-disabled'}`}
        onClick={handleNext}
        disabled={!selectedOption || isSubmitting}
        style={{
          position: 'absolute',
          bottom: '8px',
          left: '24px',
          width: '345px',
          height: '54px',
          borderRadius: '12px',
          backgroundColor: selectedOption && !isSubmitting ? '#545FE8' : '#DEE0FA',
          border: 'none',
          cursor: selectedOption && !isSubmitting ? 'pointer' : 'not-allowed',
          fontFamily: 'Pretendard',
          fontSize: '16px',
          fontWeight: 'bold',
          lineHeight: '1.5',
          letterSpacing: '-0.16px',
          color: selectedOption && !isSubmitting ? '#FFFFFF' : '#A8A8A8'
        }}
      >
        {isSubmitting ? '분석 중...' : isLastStep ? '성향 결과 보러가기' : '다음으로'}
      </button>
    </div>
  );
}

export default PersonalityTestQuestionScreen;
