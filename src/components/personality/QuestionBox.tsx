interface QuestionBoxProps {
  questionNumber: number;
  questionText: string;
}

function QuestionBox({ questionNumber, questionText }: QuestionBoxProps) {
  return (
    <div
      className="question-box-wrapper"
      style={{ marginLeft: '32px', marginRight: '32px', marginBottom: '84px' }}
    >
      <div
        className="question-number"
        style={{
          fontFamily: 'Pretendard',
          fontSize: '28px',
          fontWeight: 800,
          lineHeight: '1.36',
          letterSpacing: '-0.28px',
          color: '#393939',
          marginBottom: '16px'
        }}
      >
        {String(questionNumber).padStart(2, '0')}
      </div>
      <h2
        className="question-text"
        style={{
          fontFamily: 'Pretendard',
          fontSize: '20px',
          fontWeight: 800,
          lineHeight: '1.36',
          letterSpacing: '-0.28px',
          color: '#393939',
          margin: 0
        }}
      >
        {questionText.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            {index < questionText.split('\n').length - 1 && <br />}
          </span>
        ))}
      </h2>
    </div>
  );
}

export default QuestionBox;
