import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Prevent mobile address-bar show/hide from recalculating pinned spacers mid-scroll.
ScrollTrigger.config({
  ignoreMobileResize: true,
})

let lenisInstance: Lenis | null = null
let refreshRafId = 0

export function getLenis(): Lenis | null {
  return lenisInstance
}

/**
 * Coalesces multiple layout/font/resize ScrollTrigger refresh calls into
 * a single animation frame to avoid back-to-back full-DOM reflows.
 */
export function requestScrollRefresh(): void {
  if (refreshRafId) return
  refreshRafId = requestAnimationFrame(() => {
    refreshRafId = 0
    ScrollTrigger.refresh()
  })
}

export function scrollToSection(target: string, offset = -24): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.15 })
    return
  }
  const el = document.querySelector(target)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * Lenis smooth scroll wired into GSAP's ticker so ScrollTrigger
 * animations stay perfectly in sync with the smoothed scroll.
 * Call once at app startup.
 */
export function initSmoothScroll(): Lenis {
  if (lenisInstance) return lenisInstance

  const lenis = new Lenis({
    autoRaf: false,
    lerp: 0.09,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    anchors: {
      offset: -24,
      duration: 1.15,
    },
    stopInertiaOnNavigate: true,
    respectReducedMotion: true,
  })

  lenisInstance = lenis

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  return lenis
}
