import { useState } from 'react';

// 매수 이력 아이템 타입
interface PurchaseHistoryItem {
  id: string;
  purchaseDate: string;
  productName: string;
  productDestination: string;
  productCode: string;
  brokerName: string;
  expectedInvestment: string;
}

interface PurchaseHistoryScreenProps {
  onBack?: () => void;
  purchaseHistory?: PurchaseHistoryItem[];
  onDelete?: (id: string) => void;
}

function PurchaseHistoryScreen({
  onBack,
  purchaseHistory = [],
  onDelete,
}: PurchaseHistoryScreenProps) {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const handleNotchClick = (id: string) => {
    // 오른쪽 노치 클릭 시 삭제 버튼 토글
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleDelete = (id: string) => {
    onDelete?.(id);
    setExpandedItemId(null);
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
        overflowY: 'auto',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 헤더 */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '23px 24px 2px 24px',
          backgroundColor: '#F5F5F5',
          position: 'relative',
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
            padding: '4px',
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
          매수 이력
        </span>
      </header>

      {/* 매수 이력 리스트 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {purchaseHistory.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              color: '#a9a9a9',
              marginTop: '40px',
            }}
          >
            매수 이력이 없습니다.
          </p>
        )}
        {purchaseHistory.map((item, index) => {
          const isLatest = index === 0;
          const bgColor = isLatest ? '#7681fc' : '#b0b3b8';

          return (
            <div
              key={item.id}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
              }}
            >
              {/* 삭제 버튼 (노치 클릭 시 슬라이드) */}
              <div
                style={{
                  position: 'absolute',
                  right: expandedItemId === item.id ? 0 : '-119px',
                  top: 0,
                  width: '119px',
                  height: '140px',
                  backgroundColor: '#fa5343',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: '18px',
                  cursor: 'pointer',
                  transition: 'right 0.3s ease',
                }}
                onClick={() => handleDelete(item.id)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 21C6.45 21 5.97934 20.8043 5.588 20.413C5.19667 20.0217 5.00067 19.5507 5 19V6C4.71667 6 4.47934 5.904 4.288 5.712C4.09667 5.52 4.00067 5.28267 4 5C3.99934 4.71733 4.09534 4.48 4.288 4.288C4.48067 4.096 4.718 4 5 4H9C9 3.71667 9.096 3.47933 9.288 3.288C9.48 3.09667 9.71734 3.00067 10 3H14C14.2833 3 14.521 3.096 14.713 3.288C14.905 3.48 15.0007 3.71733 15 4H19C19.2833 4 19.521 4.096 19.713 4.288C19.905 4.48 20.0007 4.71733 20 5C19.9993 5.28267 19.9033 5.52033 19.712 5.713C19.5207 5.90567 19.2833 6.00133 19 6V19C19 19.55 18.8043 20.021 18.413 20.413C18.0217 20.805 17.5507 21.0007 17 21H7ZM10 17C10.2833 17 10.521 16.904 10.713 16.712C10.905 16.52 11.0007 16.2827 11 16V9C11 8.71667 10.904 8.47933 10.712 8.288C10.52 8.09667 10.2827 8.00067 10 8C9.71734 7.99933 9.48 8.09533 9.288 8.288C9.096 8.48067 9 8.718 9 9V16C9 16.2833 9.096 16.521 9.288 16.713C9.48 16.905 9.71734 17.0007 10 17ZM14 17C14.2833 17 14.521 16.904 14.713 16.712C14.905 16.52 15.0007 16.2827 15 16V9C15 8.71667 14.904 8.47933 14.712 8.288C14.52 8.09667 14.2827 8.00067 14 8C13.7173 7.99933 13.48 8.09533 13.288 8.288C13.096 8.48067 13 8.718 13 9V16C13 16.2833 13.096 16.521 13.288 16.713C13.48 16.905 13.7173 17.0007 14 17Z"
                    fill="#FCF3F2"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#FCF3F2',
                  }}
                >
                  삭제
                </span>
              </div>

              {/* 티켓 카드 */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '353px',
                  height: '140px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  transform: expandedItemId === item.id ? 'translateX(-119px)' : 'translateX(0)',
                  transition: 'transform 0.3s ease',
                }}
              >
                {/* 티켓 본체 */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    padding: '14px 32px 18px 18px',
                    borderRadius: '16px',
                    backgroundColor: bgColor,
                    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.04)',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* 매수 날짜 라벨 */}
                  <p
                    style={{
                      margin: '0 0 11px 0',
                      paddingLeft: '32px',
                      fontFamily: 'Pretendard',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      letterSpacing: '-0.12px',
                      color: isLatest ? '#e0e0e0' : '#d5d5d5',
                    }}
                  >
                    {item.purchaseDate}
                  </p>

                  {/* 상품명 행 */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    {/* 비행기 아이콘 (흰색, 우측 90도 회전) */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ marginRight: '8px', transform: 'rotate(90deg)' }}
                    >
                      <path
                        d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                        fill="#ffffff"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: 'Pretendard',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                      }}
                    >
                      {item.productName}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        fontFamily: 'Pretendard',
                        fontSize: '14px',
                        color: isLatest ? '#c6c6c6' : '#d5d5d5',
                        letterSpacing: '2px',
                      }}
                    >
                      ··········
                    </span>
                    <span
                      style={{
                        fontFamily: 'Pretendard',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                      }}
                    >
                      {item.productDestination}
                    </span>
                  </div>

                  {/* 상세 정보 행 */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      paddingLeft: '32px',
                      gap: '8px',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          margin: 0,
                          fontFamily: 'Pretendard',
                          fontSize: '11px',
                          fontWeight: 500,
                          lineHeight: 1.5,
                          letterSpacing: '-0.12px',
                          color: isLatest ? '#a8a8a8' : '#d5d5d5',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        상품코드
                      </p>
                      <p
                        style={{
                          margin: '2px 0 0 0',
                          fontFamily: 'Pretendard',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: '#ffffff',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.productCode}
                      </p>
                    </div>
                    <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
                      <p
                        style={{
                          margin: 0,
                          fontFamily: 'Pretendard',
                          fontSize: '11px',
                          fontWeight: 500,
                          lineHeight: 1.5,
                          letterSpacing: '-0.12px',
                          color: isLatest ? '#a8a8a8' : '#d5d5d5',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        증권계좌
                      </p>
                      <p
                        style={{
                          margin: '2px 0 0 0',
                          fontFamily: 'Pretendard',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: '#ffffff',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.brokerName}
                      </p>
                    </div>
                    <div style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
                      <p
                        style={{
                          margin: 0,
                          fontFamily: 'Pretendard',
                          fontSize: '11px',
                          fontWeight: 500,
                          lineHeight: 1.5,
                          letterSpacing: '-0.12px',
                          color: isLatest ? '#a8a8a8' : '#d5d5d5',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        예상 투자금
                      </p>
                      <p
                        style={{
                          margin: '2px 0 0 0',
                          fontFamily: 'Pretendard',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: '#ffffff',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.expectedInvestment}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 왼쪽 노치 구멍 */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#F5F5F5',
                  }}
                />
                {/* 오른쪽 노치 구멍 (클릭 가능) */}
                <div
                  onClick={() => handleNotchClick(item.id)}
                  style={{
                    position: 'absolute',
                    right: '-10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#F5F5F5',
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PurchaseHistoryScreen;
