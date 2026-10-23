import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import chevronRight from '../assets/icons/chevron-right.svg'
import objectLogo from '../assets/icons/object.webp'
import Dashboard from './Dashboard'
import FitScale from './FitScale'

const NAV_LINKS = [
  { label: 'Product', left: 0 },
  { label: 'How it works', left: 83 },
  { label: 'AI copilot', left: 199 },
  { label: 'FAQ', left: 291 },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // gsap.context scoped to the section; autoAlpha handles visibility too.
    // set() first, then animate to visible — revert() on unmount restores cleanly.
    const ctx = gsap.context(() => {
      gsap.set(navRef.current, { autoAlpha: 0, y: -12 })
      gsap.set(headlineRef.current, { autoAlpha: 0, y: 24 })
      gsap.set(descRef.current, { autoAlpha: 0, y: 20 })
      gsap.set(actionsRef.current, { autoAlpha: 0, y: 20 })
      gsap.set(taglineRef.current, { autoAlpha: 0, y: 16 })
      gsap.set(dashboardRef.current, { autoAlpha: 0, y: 48 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to(navRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0)
        .to(headlineRef.current, { autoAlpha: 1, y: 0, duration: 1 }, 0.15)
        .to(descRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.45)
        .to(actionsRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.6)
        .to(taglineRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.8)
        .to(
          dashboardRef.current,
          { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power2.out' },
          0.55
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f7f6f4]">
      {/* Inset rounded image card — Figma: 1413×964 at page (14,13), so 14px left / 13px right+top. */}
      <div className="relative ml-[14px] mr-[13px] mt-[13px] h-[720px] overflow-hidden rounded-2xl sm:h-[780px] lg:h-[964px]">
        <img
          src="/hero-bg.webp"
          srcSet="/hero-bg-960.webp 960w, /hero-bg.webp 1536w"
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />

        {/* Navigation — Figma node 14:7977, 96px tall, content inset 106/107px. */}
        <nav
          ref={navRef}
          className="absolute inset-x-0 top-0 z-30 flex h-[72px] items-center justify-between px-5 lg:h-[96px] lg:pl-[106px] lg:pr-[107px]"
        >
          <a href="#" className="flex items-center gap-[9px]">
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#cbfc58] px-1 py-2">
              <img src={objectLogo} alt="" className="h-full w-full object-contain" />
            </span>
            <span className="whitespace-nowrap font-satoshi text-[20px] leading-none text-white lg:text-[23px]">
              CashPilot AI
            </span>
          </a>

          {/* Page links — block center sits 22px left of card center in Figma. */}
          <div className="absolute left-[calc(50%-22px)] top-1/2 hidden h-[21px] w-[318px] -translate-x-1/2 -translate-y-1/2 font-satoshi text-[14px] leading-[1.5] text-white [text-shadow:0px_1px_3px_rgba(3,10,26,0.8)] lg:block">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                className="absolute top-0 whitespace-nowrap transition-opacity hover:opacity-70"
                style={{ left: `${link.left}px` }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop actions — exact Figma placement. */}
          <div className="relative hidden h-[52px] w-[212px] lg:block">
            <a
              href="#"
              className="absolute left-0 top-[15.5px] font-satoshi text-[14px] font-medium leading-[1.5] text-[#191c19] transition-opacity hover:opacity-70"
            >
              Log in
            </a>
            <button className="absolute left-[63px] top-0 flex h-[52px] cursor-pointer items-center justify-center gap-[10px] rounded-[10px] bg-[#cbfc58] px-5 py-[14px] transition-colors hover:bg-[#b8e845]">
              <span className="font-satoshi text-[16px] leading-[1.7] text-black">Get started</span>
              <img src={chevronRight} alt="" className="h-4 w-4" />
            </button>
          </div>

          {/* Compact actions — below lg. */}
          <div className="flex items-center gap-2 lg:hidden">
            <a href="#" className="hidden px-2 font-satoshi text-[14px] font-medium text-white sm:block">
              Log in
            </a>
            <button className="hidden h-[42px] cursor-pointer items-center gap-2 rounded-[10px] bg-[#cbfc58] px-4 sm:flex">
              <span className="whitespace-nowrap font-satoshi text-[14px] leading-[1.7] text-black">
                Get started
              </span>
              <img src={chevronRight} alt="" className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex size-[42px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-[10px] border border-white/25 bg-white/10 backdrop-blur-sm"
            >
              <span
                className={`h-px w-[18px] bg-white transition-transform ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`}
              />
              <span className={`h-px w-[18px] bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span
                className={`h-px w-[18px] bg-white transition-transform ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="absolute inset-x-4 top-[80px] z-40 rounded-2xl bg-[#f7f6f4] p-2 shadow-2xl lg:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 font-satoshi text-[16px] text-[#191c19] hover:bg-black/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 font-satoshi text-[16px] font-medium text-[#191c19] hover:bg-black/5"
            >
              Log in
            </a>
          </div>
        )}

        {/* Hero content — headline top at y=211 inside the card (Figma 14:7970 at y=155 + 56). */}
        <div className="relative z-10 flex flex-col items-center px-5 pt-[100px] sm:pt-[150px] lg:px-0 lg:pt-[211px]">
          <h1
            ref={headlineRef}
            className="max-w-[658px] text-center font-recoleta text-[clamp(30px,8vw,66px)] font-medium leading-[1.08] text-white"
          >
            <span className="block">Know your cash.</span>
            <span className="block text-[rgba(255,255,255,0.85)]">Plan your next move.</span>
          </h1>

          <p
            ref={descRef}
            className="mt-[24px] max-w-[787px] text-center font-satoshi text-[clamp(15px,2vw,18px)] leading-[1.5] tracking-[-0.27px] text-white"
          >
            See what&rsquo;s coming, understand what needs attention, and act with confidence.
            Your dashboard, AI chat, and Telegram&mdash;all working from the same financial picture.
          </p>

          <div
            ref={actionsRef}
            className="mt-[24px] flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-[18.5px]"
          >
            {/* Primary CTA */}
            <button className="flex h-[52px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[10px] bg-[#cbfc58] px-5 transition-colors hover:bg-[#b8e845] sm:w-auto">
              <span className="font-satoshi text-[16px] leading-[1.7] text-black">
                Explore the dashboard
              </span>
              <img src={chevronRight} alt="" className="h-4 w-4" />
            </button>

            {/* Secondary CTA */}
            <button className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[10px] border border-[rgba(255,255,255,0.46)] bg-[rgba(255,255,255,0.22)] transition-colors hover:bg-[rgba(255,255,255,0.3)] sm:w-[190px]">
              <span className="font-satoshi text-[16px] leading-[1.7] text-[#fcfdfb]">
                See how it works
              </span>
            </button>
          </div>

          <p
            ref={taglineRef}
            className="mt-[24px] text-center font-satoshi text-[12px] leading-[1.5] text-[#201e34]"
          >
            Clear forecasts · Actionable alerts · You approve the next step
          </p>
        </div>

        {/* Dashboard mockup — responsive native preview on mobile, exact 1200px Figma layout on desktop */}
        <div className="absolute inset-x-0 top-[480px] z-20 sm:top-[530px] lg:top-[628px]">
          <div className="mx-auto w-full max-w-[calc(100%-24px)] sm:max-w-[calc(100%-32px)] lg:w-[1200px] lg:max-w-none">
            <div ref={dashboardRef}>
              {/* Desktop view (>= 1024px): Uses FitScale for exact 1200px Figma layout */}
              <div className="hidden lg:block">
                <FitScale width={1200} height={676}>
                  <Dashboard />
                </FitScale>
              </div>

              {/* Mobile / Tablet view (< 1024px): Fully responsive native dashboard that fits 100% of the screen */}
              <div className="block lg:hidden">
                <Dashboard isMobile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
