import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { initSmoothScroll } from './lib/scroll.ts'
import './index.css'

// Smooth scroll is initialized once at startup, outside React's lifecycle,
// so StrictMode double-mounting never creates duplicate instances.
const lenis = initSmoothScroll()
;(window as unknown as { __lenis: typeof lenis }).__lenis = lenis

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
