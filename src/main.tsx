import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import AppTest from './App-test.tsx' // 테스트용

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <AppTest /> */} {/* 테스트하려면 위의 <App />을 주석처리하고 이 줄의 주석 해제 */}
  </StrictMode>,
)
