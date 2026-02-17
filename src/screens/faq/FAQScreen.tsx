import { useState, useEffect, useRef } from 'react';
import coinProfile from '../../assets/images/png/img_charater_coin_profile.png';

interface FAQScreenProps {
  onBack?: () => void;
  onStartChallenge?: () => void;
  userName?: string;
}

interface ChatMessage {
  id: number;
  type: 'bot' | 'user';
  text: string;
}

const faqData = [
  {
    question: '계좌가 없는데 진행할 수 있나요?',
    answer:
      '걱정 마세요!\n가장 쉽고 빠르게 만드는 \'3분 계좌 개설 꿀팁\'을 알려드려요.\n신분증만 있으면 지금 바로 만들고 시작할 수 있어요!',
  },
  {
    question: '완료하면 보상이 있나요?',
    answer:
      '그럼요!\n챌린지를 성공하면 \'집사 노트\'와 \'가이드\'가 선물로 열려요.\n그리고 내 자산이 쑥쑥 자라나는\n\'미래 대시보드\'도 바로 확인할 수 있어요!',
  },
  {
    question: '스타트 챌린지가 뭐에요?',
    answer:
      '메이트님을 위한 \'맞춤형 첫 투자 미션\'이에요.\n복잡한 과정은 싹 빼고,\n\'무엇을, 어떻게\' 해야 하는지만 딱 짚어 드릴게요.\n즐거운 도전을 시작해 볼까요?',
  },
  {
    question: '얼마나 소요되나요?',
    answer:
      '딱 5분이면 충분해요!\n복잡한 절차는 제가 다 뺐거든요.\n출퇴근길이나 자기 전에 가볍게 \'성공\'만 챙겨가세요.',
  },
  {
    question: '초보자도 할 수 있나요?',
    answer:
      '당연하죠!\n기비는 금융 초보 메이트님을 위해 준비했어요.\n어려운 용어 하나 없이, 그냥 따라만 하면 무조건 성공하도록\n아주 쉽게 알려드릴게요.',
  },
];

// 타이핑 애니메이션 컴포넌트
function TypingText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      indexRef.current++;
      if (indexRef.current <= text.length) {
        setDisplayed(text.slice(0, indexRef.current));
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, 15);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <p
      style={{
        fontFamily: 'Pretendard',
        fontSize: '13px',
        fontWeight: 500,
        lineHeight: 1.57,
        letterSpacing: '-0.14px',
        color: '#252525',
        margin: 0,
        whiteSpace: 'pre-line',
      }}
    >
      {displayed}
    </p>
  );
}

function FAQScreen({ onBack, onStartChallenge, userName }: FAQScreenProps) {
  const displayName = userName || localStorage.getItem('cachedNickname') || '기비';
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      type: 'bot',
      text: `안녕하세요, ${displayName} 님!\n스타트 챌린지를 시작하기 전에 궁금한 점을 알려드릴게요.\n하단의 질문들을 눌러보세요!`,
    },
  ]);
  const [askedQuestions, setAskedQuestions] = useState<Set<number>>(new Set());
  const [messageId, setMessageId] = useState(1);
  const [isTyping, setIsTyping] = useState(true); // 초기 메시지도 타이핑
  const [typingMsgId, setTypingMsgId] = useState(0);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuestion = (index: number) => {
    if (askedQuestions.has(index) || isTyping) return;

    const faq = faqData[index];
    const newAsked = new Set(askedQuestions);
    newAsked.add(index);

    const userMsg: ChatMessage = { id: messageId, type: 'user', text: faq.question };
    const botMsg: ChatMessage = { id: messageId + 1, type: 'bot', text: faq.answer };

    const newMessages: ChatMessage[] = [userMsg, botMsg];

    if (newAsked.size === faqData.length) {
      newMessages.push({ id: messageId + 2, type: 'bot', text: '이제 시작해볼까요?' });
      setTypingMsgId(messageId + 2);
      setMessageId(messageId + 3);
    } else {
      setTypingMsgId(messageId + 1);
      setMessageId(messageId + 2);
    }

    setMessages((prev) => [...prev, ...newMessages]);
    setAskedQuestions(newAsked);
    setIsTyping(true);
  };

  const handleTypingComplete = () => {
    setIsTyping(false);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        maxWidth: '402px',
        margin: '0 auto',
        position: 'relative',
        overflowX: 'hidden',
        backgroundColor: '#EDEEF2',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '23px 24px',
          backgroundColor: '#EDEEF2',
        }}
      >
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            left: '24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="#252525"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span
          style={{
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 'bold',
            lineHeight: 1.57,
            letterSpacing: '-0.14px',
            textAlign: 'center',
            color: '#252525',
          }}
        >
          F&Q
        </span>
      </div>

      {/* 채팅 영역 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 24px 16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {messages.map((msg) =>
          msg.type === 'bot' ? (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '16px' }}>
              {/* 캐릭터 프로필 */}
              <img
                src={coinProfile}
                alt=""
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  marginBottom: '12px',
                }}
              />
              {/* 말풍선 + 꼬리 */}
              <div style={{ position: 'relative', marginLeft: '8px', overflow: 'visible' }}>
                {/* 말풍선 꼬리 */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    left: '6px',
                    width: '16px',
                    height: '10px',
                    backgroundColor: '#D9D9D9',
                    borderRadius: '2px',
                    transform: 'rotate(45deg)',
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    maxWidth: '330px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#D9D9D9',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {msg.id === typingMsgId && isTyping ? (
                    <TypingText text={msg.text} onComplete={handleTypingComplete} />
                  ) : (
                    <p
                      style={{
                        fontFamily: 'Pretendard',
                        fontSize: '13px',
                        fontWeight: 500,
                        lineHeight: 1.57,
                        letterSpacing: '-0.14px',
                        color: '#252525',
                        margin: 0,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {msg.text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '16px' }}>
              {/* 유저 이름 */}
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: '-0.12px',
                  color: '#6f6f6f',
                  marginBottom: '12px',
                }}
              >
                {displayName} 님 (나)
              </span>
              {/* 유저 말풍선 + 꼬리 */}
              <div style={{ position: 'relative', marginRight: '8px', overflow: 'visible' }}>
                {/* 말풍선 꼬리 */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '6px',
                    width: '16px',
                    height: '10px',
                    backgroundColor: '#7681FC',
                    borderRadius: '2px',
                    transform: 'rotate(-45deg)',
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    maxWidth: '280px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#7681FC',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Pretendard',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: 1.57,
                      letterSpacing: '-0.14px',
                      color: '#FFFFFF',
                      margin: 0,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {msg.text}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
        <div ref={chatEndRef} />
      </div>

      {/* 하단 질문 버튼 + 스타트 챌린지 */}
      <div
        style={{
          padding: '12px 24px 24px 24px',
          backgroundColor: '#EDEEF2',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        {/* 질문 버튼들 (2줄 가로 스크롤) */}
        <div
          className="faq-scroll"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '16px',
            overflowX: 'auto',
            overflowY: 'hidden',
            paddingBottom: '8px',
          }}
        >
          {/* 1행: 질문1, 질문3 */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[0, 1].map((index) => {
              const faq = faqData[index];
              const isAsked = askedQuestions.has(index);
              return (
                <button
                  key={index}
                  onClick={() => handleQuestion(index)}
                  style={{
                    padding: '3px 16px',
                    borderRadius: '40px',
                    border: isAsked ? 'solid 1px #d9d9d9' : 'none',
                    backgroundColor: isAsked ? 'transparent' : '#d9d9d9',
                    cursor: isAsked || isTyping ? 'default' : 'pointer',
                    fontFamily: 'Pretendard',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    lineHeight: 1.57,
                    letterSpacing: '-0.14px',
                    color: '#666',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {faq.question}
                </button>
              );
            })}
          </div>
          {/* 2행: 질문2, 질문4, 질문5 */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[2, 3, 4].map((index) => {
              const faq = faqData[index];
              const isAsked = askedQuestions.has(index);
              return (
                <button
                  key={index}
                  onClick={() => handleQuestion(index)}
                  style={{
                    padding: '3px 16px',
                    borderRadius: '40px',
                    border: isAsked ? 'solid 1px #d9d9d9' : 'none',
                    backgroundColor: isAsked ? 'transparent' : '#d9d9d9',
                    cursor: isAsked || isTyping ? 'default' : 'pointer',
                    fontFamily: 'Pretendard',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    lineHeight: 1.57,
                    letterSpacing: '-0.14px',
                    color: '#666',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {faq.question}
                </button>
              );
            })}
          </div>
        </div>
        <style>{`
          .faq-scroll::-webkit-scrollbar {
            height: 4px;
          }
          .faq-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .faq-scroll::-webkit-scrollbar-thumb {
            background: #c6c6c6;
            border-radius: 4px;
          }
          .faq-scroll::-webkit-scrollbar-thumb:hover {
            background: #a0a0a0;
          }
        `}</style>

        {/* 스타트 챌린지 시작하기 버튼 */}
        <button
          onClick={onStartChallenge}
          style={{
            width: '100%',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#545fe8',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: 1.5,
            letterSpacing: '-0.16px',
            color: '#FFFFFF',
          }}
        >
          스타트 챌린지 시작하기
        </button>
      </div>
    </div>
  );
}

export default FAQScreen;
