/**
 * Logo - GIVY 로고 컴포넌트
 * PNG 이미지 사용
 */

import logoImage from '../../assets/images/png/img_logo_givy_symbol.png';

interface LogoProps {
  width?: string;
  height?: string;
}

function Logo({ width = '27.7px', height = '25.4px' }: LogoProps) {
  return (
    <img
      src={logoImage}
      alt="GIVY"
      style={{
        width,
        height,
        objectFit: 'contain',
      }}
    />
  );
}

export default Logo;
