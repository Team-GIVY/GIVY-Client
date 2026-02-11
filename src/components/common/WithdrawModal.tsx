/**
 * WithdrawModal - 회원 탈퇴 확인 모달
 * example.css 스펙 참고
 */

import { useState } from 'react';

interface WithdrawModalProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  userName?: string;
}

function WithdrawModal({ onCancel, onConfirm, userName = '기비' }: WithdrawModalProps) {
  const [inputValue, setInputValue] = useState('');
  const confirmText = `${userName}회원탈퇴`;
  const isConfirmEnabled = inputValue === confirmText;

  return (
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
      onClick={onCancel}
    >
      {/* 모달 프레임 */}
      <div
        style={{
          width: '345px',
          height: '400px',
          padding: '12px 0 22.4px',
          borderRadius: '12px',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 제목 */}
        <span
          style={{
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: 1.5,
            letterSpacing: '-0.16px',
            textAlign: 'center',
            color: '#393939',
            marginTop: '2.2px',
          }}
        >
          회원 탈퇴
        </span>

        {/* 질문 메시지 */}
        <span
          style={{
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1.57,
            letterSpacing: '-0.14px',
            textAlign: 'center',
            color: '#515152',
            marginTop: '12px',
          }}
        >
          정말 탈퇴 하시겠습니까?
        </span>

        {/* 경고 텍스트 */}
        <div
          style={{
            display: 'flex',
            padding: '5px 16px 0 16px',
            marginTop: '5px',
          }}
        >
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontWeight: 'normal',
              lineHeight: 1.5,
              letterSpacing: '-0.12px',
              color: '#8d8d8d',
              marginRight: '8px',
            }}
          >
            •
          </span>
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontWeight: 'normal',
              lineHeight: 1.5,
              letterSpacing: '-0.12px',
              textAlign: 'left',
              color: '#8d8d8d',
              flex: 1,
            }}
          >
            회원이 탈퇴할 경우, 개인정보처리방침에 따라 회원 정보를 보유하는 경우를 제외하고는 해지 즉시 회원의 모든 데이터 (투자 기록, 챌린지 내역, 획득한 리워드 등)는 소멸되며 복구할 수 없습니다.
          </span>
        </div>

        {/* 확인 문구 입력 안내 박스 */}
        <div
          style={{
            width: '314px',
            height: '50px',
            margin: '20px auto 8px',
            padding: '13px 16px',
            borderRadius: '12px',
            border: 'solid 1px #e0e0e0',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 500,
              color: '#393939',
            }}
          >
            {confirmText}
          </span>
        </div>

        {/* 입력 필드 */}
        <div
          style={{
            width: '314px',
            height: '50px',
            margin: '0 auto',
            borderRadius: '12px',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="위의 문구를 똑같이 입력해주세요"
            style={{
              width: '100%',
              height: '100%',
              padding: '13px 16px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: 'transparent',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'normal',
              textAlign: 'center',
              color: '#393939',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* 버튼 영역 */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: 'auto',
            paddingLeft: '14px',
            paddingRight: '13px',
          }}
        >
          {/* 아니요 버튼 */}
          <button
            onClick={onCancel}
            style={{
              width: '70px',
              height: '58.8px',
              borderRadius: '12px',
              backgroundColor: '#c6c6c6',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            아니요
          </button>

          {/* 탈퇴 버튼 */}
          <button
            onClick={isConfirmEnabled ? onConfirm : undefined}
            style={{
              width: '240px',
              height: '58.8px',
              borderRadius: '12px',
              backgroundColor: isConfirmEnabled ? '#7681fc' : '#c6c6c6',
              border: 'none',
              cursor: isConfirmEnabled ? 'pointer' : 'not-allowed',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#fff',
              transition: 'background-color 0.2s ease',
            }}
          >
            탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}

export default WithdrawModal;
