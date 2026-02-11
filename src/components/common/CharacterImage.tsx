/**
 * CharacterImage - 캐릭터 이미지 컴포넌트
 * 이미지 경로가 제공되면 이미지를 표시하고, 없으면 placeholder를 표시
 *
 * @param shape - 캐릭터 형태 ('circle' | 'rectangle')
 * @param color - 테두리 색상 (hex color)
 * @param imagePath - 이미지 경로 (선택적, SVG 파일 import 또는 URL)
 * @param width - 너비 (기본값: circle 183.3px, rectangle 150px)
 * @param height - 높이 (기본값: circle 183.3px, rectangle 220px)
 */

interface CharacterImageProps {
  shape: 'circle' | 'rectangle';
  color: string;
  imagePath?: string;
  width?: string;
  height?: string;
  alt?: string;
}

function CharacterImage({
  shape,
  color,
  imagePath,
  width,
  height,
  alt = 'Character'
}: CharacterImageProps) {
  // 기본 크기 설정
  const defaultWidth = shape === 'circle' ? '183.3px' : '150px';
  const defaultHeight = shape === 'circle' ? '183.3px' : '220px';

  const finalWidth = width || defaultWidth;
  const finalHeight = height || defaultHeight;

  return (
    <div
      style={{
        width: finalWidth,
        height: finalHeight,
        borderRadius: shape === 'circle' ? '50%' : '16px',
        border: imagePath ? 'none' : '4px dashed',
        borderColor: imagePath ? 'transparent' : color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: imagePath ? 'transparent' : '#F9F9F9',
        overflow: 'hidden'
      }}
    >
      {imagePath ? (
        // 이미지가 제공된 경우
        <img
          src={imagePath}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      ) : (
        // Placeholder
        <span style={{ color: '#999', fontSize: '14px' }}>
          Character Area
        </span>
      )}
    </div>
  );
}

export default CharacterImage;
