import { useState } from 'react';

/**
 * SignupNameScreen - 회원가입 이름 입력 화면
 * 사용자가 본명이 아닌 편한 이름을 입력할 수 있는 화면
 * example.css 스펙 정확히 준수
 */

interface SignupNameScreenProps {
  onBack?: () => void;
  onNext?: (name: string) => void;
}

function SignupNameScreen({ onBack, onNext }: SignupNameScreenProps) {
  const [name, setName] = useState('');

  const handleNext = () => {
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    console.log('입력한 이름:', name);
    onNext?.(name);
  };

  const isNameValid = name.trim().length > 0;

  return (
    <div
      className="w-full h-screen max-w-[402px] max-h-[874px] mx-auto relative overflow-x-hidden overflow-y-auto"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      {/* 뒤로가기 버튼 - width: 24px, height: 24px, margin: 23px 124px 0 24px */}
      <button
        onClick={onBack}
        style={{
          width: '24px',
          height: '24px',
          margin: '23px 124px 0 24px',
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

      {/* 메인 컨텐츠 */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '96px' }}>
        {/* 제목 - font-size: 20px, font-weight: bold, line-height: 1.6, letter-spacing: -0.2px, color: #545fe8 */}
        <h1
          style={{
            fontFamily: 'Pretendard',
            fontSize: '20px',
            fontWeight: 'bold',
            lineHeight: '1.6',
            letterSpacing: '-0.2px',
            textAlign: 'left',
            color: '#545FE8',
            marginBottom: '16px'
          }}
        >
          기비가 어떻게 불러드리면 좋을까요?
        </h1>

        {/* 부제목 - font-size: 14px, font-weight: 500, line-height: 1.57, letter-spacing: -0.14px, color: #8d8d8d */}
        <div style={{ marginBottom: '66px' }}>
          <p
            style={{
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '1.57',
              letterSpacing: '-0.14px',
              textAlign: 'left',
              color: '#8D8D8D',
              marginBottom: '0'
            }}
          >
            본명을 입력하지 않아도 괜찮아요.
          </p>
          <p
            style={{
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '1.57',
              letterSpacing: '-0.14px',
              textAlign: 'left',
              color: '#8D8D8D',
              marginTop: '0'
            }}
          >
            편하게 사용할 이름을 적어주세요!
          </p>
        </div>

        {/* 이름 입력 필드 - width: 345px, height: 60px, padding: 18px 20px, border-radius: 16px, border: solid 1px #c6c6c6, background-color: #f5f5f5 */}
        <div
          style={{
            width: '345px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            padding: '18px 20px',
            borderRadius: '16px',
            border: 'solid 1px #C6C6C6',
            backgroundColor: '#F5F5F5'
          }}
        >
          <input
            type="text"
            placeholder="이름을 입력해 주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'normal',
              lineHeight: '1.57',
              letterSpacing: '-0.14px',
              textAlign: 'left',
              color: '#252525',
              backgroundColor: 'transparent'
            }}
          />
        </div>
      </div>

      {/* 다음으로 버튼 - width: 345px, height: 54px, margin: 363px 24px 8px, border-radius: 12px */}
      <button
        onClick={handleNext}
        disabled={!isNameValid}
        style={{
          position: 'absolute',
          bottom: '8px',
          left: '24px',
          width: '345px',
          height: '54px',
          borderRadius: '12px',
          backgroundColor: isNameValid ? '#545FE8' : '#DEE0FA',
          border: 'none',
          cursor: isNameValid ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span
          style={{
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: '1.5',
            letterSpacing: '-0.16px',
            textAlign: 'center',
            color: isNameValid ? '#FFFFFF' : '#A8A8A8'
          }}
        >
          다음으로
        </span>
      </button>
    </div>
  );
}

export default SignupNameScreen;
