import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import heroBg from '../assets/hero-bg.png'
import chevronRight from '../assets/icons/chevron-right.svg'
import objectLogo from '../assets/icons/object.png'
import Dashboard from './Dashboard'

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
      <div className="relative ml-[14px] mr-[13px] mt-[13px] h-[964px] overflow-hidden rounded-2xl">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/15" />

        {/* Navigation — Figma node 14:7977, 96px tall, content inset 106/107px. */}
        <nav
          ref={navRef}
          className="absolute inset-x-0 top-0 z-30 flex h-[96px] items-center justify-between pl-[106px] pr-[107px]"
        >
          <a href="#" className="flex items-center gap-[9px]">
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#cbfc58] px-1 py-2">
              <img src={objectLogo} alt="" className="h-full w-full object-contain" />
            </span>
            <span className="font-satoshi text-[23px] leading-none text-white">CashPilot AI</span>
          </a>

          {/* Page links — block center sits 22px left of card center in Figma. */}
          <div className="absolute left-[calc(50%-22px)] top-1/2 h-[21px] w-[318px] -translate-x-1/2 -translate-y-1/2 font-satoshi text-[14px] leading-[1.5] text-white [text-shadow:0px_1px_3px_rgba(3,10,26,0.8)]">
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

          <div className="relative h-[52px] w-[212px]">
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
        </nav>

        {/* Hero content — headline top at y=211 inside the card (Figma 14:7970 at y=155 + 56). */}
        <div className="relative z-10 flex flex-col items-center pt-[211px]">
          <h1
            ref={headlineRef}
            className="font-recoleta font-medium text-[66px] leading-[1.08] text-white text-center max-w-[658px]"
          >
            <span className="block">Know your cash.</span>
            <span className="block text-[rgba(255,255,255,0.85)]">Plan your next move.</span>
          </h1>

          <p
            ref={descRef}
            className="font-satoshi text-[18px] leading-[1.5] tracking-[-0.27px] text-white text-center max-w-[787px] mt-[24px]"
          >
            See what&rsquo;s coming, understand what needs attention, and act with confidence.
            Your dashboard, AI chat, and Telegram&mdash;all working from the same financial picture.
          </p>

          <div ref={actionsRef} className="flex gap-[18.5px] mt-[24px]">
            {/* Primary CTA */}
            <button className="flex items-center gap-[10px] h-[52px] px-5 rounded-[10px] bg-[#cbfc58] hover:bg-[#b8e845] transition-colors cursor-pointer">
              <span className="font-satoshi text-[16px] leading-[1.7] text-black">
                Explore the dashboard
              </span>
              <img src={chevronRight} alt="" className="h-4 w-4" />
            </button>

            {/* Secondary CTA */}
            <button className="flex items-center justify-center h-[50px] w-[190px] rounded-[10px] border border-[rgba(255,255,255,0.46)] bg-[rgba(255,255,255,0.22)] hover:bg-[rgba(255,255,255,0.3)] transition-colors cursor-pointer">
              <span className="font-satoshi text-[16px] leading-[1.7] text-[#fcfdfb]">
                See how it works
              </span>
            </button>
          </div>

          <p
            ref={taglineRef}
            className="font-satoshi text-[12px] leading-[1.5] text-[#201e34] mt-[24px]"
          >
            Clear forecasts · Actionable alerts · You approve the next step
          </p>
        </div>

        {/* Dashboard mockup — Figma: 1200×676 at (107,628); the card clips it at 964,
            so only the top 336px of the mockup is visible. */}
        <div className="absolute left-1/2 top-[628px] z-20 w-[1200px] -translate-x-1/2">
          <div ref={dashboardRef}>
            <Dashboard />
          </div>
        </div>
      </div>
    </section>
  )
}
