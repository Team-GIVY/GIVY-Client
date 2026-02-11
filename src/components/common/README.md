# CharacterImage 컴포넌트

캐릭터 이미지를 표시하는 재사용 가능한 컴포넌트입니다.
이미지가 없을 경우 점선 테두리의 placeholder를 표시합니다.

## 사용 방법

### 기본 사용 (Placeholder)

```tsx
import CharacterImage from './components/CharacterImage';

<CharacterImage
  shape="circle"
  color="#FFC857"
/>
```

### 이미지와 함께 사용

**방법 1: URL 경로 사용**
```tsx
<CharacterImage
  shape="rectangle"
  color="#4CAF50"
  imagePath="/assets/character1.png"
  alt="캐릭터 1"
/>
```

**방법 2: SVG 파일 import (추천)**
```tsx
// 파일 상단에 import
import character1 from './assets/character1.svg';

// 컴포넌트 사용
<CharacterImage
  shape="circle"
  color="#FFC857"
  imagePath={character1}
  alt="캐릭터 1"
/>
```

### 커스텀 크기 사용

```tsx
<CharacterImage
  shape="rectangle"
  color="#FF6B6B"
  width="200px"
  height="250px"
  imagePath="/assets/character2.png"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `shape` | `'circle' \| 'rectangle'` | ✅ | - | 캐릭터 형태 |
| `color` | `string` | ✅ | - | 테두리 색상 (hex) |
| `imagePath` | `string` | ❌ | - | 이미지 경로 |
| `width` | `string` | ❌ | circle: 183.3px<br/>rectangle: 150px | 너비 |
| `height` | `string` | ❌ | circle: 183.3px<br/>rectangle: 220px | 높이 |
| `alt` | `string` | ❌ | 'Character' | 이미지 alt 텍스트 |

## 예시: OnboardingScreen에서 사용

```tsx
const pages = [
  {
    title: '복잡한 시작을\n기비가 도와드려요',
    description: '...',
    characterColor: '#FFC857',
    characterShape: 'circle',
    imagePath: '/assets/character1.svg' // 이미지 추가 시
  }
];

// 렌더링
<CharacterImage
  shape={currentPageData.characterShape}
  color={currentPageData.characterColor}
  imagePath={currentPageData.imagePath}
/>
```

## 이미지 파일 준비

1. **SVG 파일 사용 (추천)**
   - `givy/src/assets/` 폴더에 SVG 파일 저장
   - import 해서 사용: `import character1 from './assets/character1.svg'`

2. **PNG/JPG 파일 사용**
   - `givy/public/assets/` 폴더에 이미지 저장
   - 경로: `/assets/character1.png`

3. **React 컴포넌트로 사용 (SVG)**
   - import: `import { ReactComponent as Character1 } from './assets/character1.svg'`
   - 이 경우 CharacterImage 컴포넌트를 수정해서 React 컴포넌트도 받을 수 있도록 확장 필요
