import { useEffect, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import card1 from '../assets/icons/sec7/card1.webp'
import card2 from '../assets/icons/sec7/card2.webp'
import card3 from '../assets/icons/sec7/card3.webp'
import card4 from '../assets/icons/sec7/card4.webp'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { src: card1, label: 'Cash Shortfall', w: 335 },
  { src: card2, label: 'Unusual Expense', w: 401 },
  { src: card3, label: 'Upcoming Payment', w: 432 },
  { src: card4, label: 'Overdue Invoices', w: 401 },
]

/** "Know What Needs Your Attention" — Figma 57:18099 at page (0,6680), 2010×756. */
export default function RiskCards() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-reveal-head]', { autoAlpha: 0, y: 28 })

      gsap.to('[data-reveal-head]', {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-head]', start: 'top 82%', once: true },
      })

      // Pinned horizontal scrub — works on all screen sizes (laptops, big monitors, mobile).
      // Track already includes responsive left/right padding so scrollWidth - wrap.clientWidth
      // lands Card 4 cleanly inside the right edge on every viewport from 320px to 4K.
      gsap.to(trackRef.current, {
        x: () => {
          const track = trackRef.current
          if (!track) return 0
          const wrap = track.parentElement || track
          return -Math.max(0, track.scrollWidth - wrap.clientWidth)
        },
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-track-wrap]',
          start: () => (window.innerHeight < 680 ? 'top 8%' : 'top 12%'),
          end: '+=1600',
          scrub: 1,
          pin: '[data-track-wrap]',
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f7f6f4]">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Heading — Figma 14:8244 at (446,6680), 548×165, centered on 1440. */}
        <div
          data-head
          className="mx-auto flex w-[548px] max-w-[calc(100%-32px)] flex-col items-center gap-[18px] pt-[120px] text-center sm:max-w-[calc(100%-40px)] sm:gap-[30px] sm:pt-[180px] lg:pt-[284px]"
        >
          <p
            data-reveal-head
            className="w-full font-satoshi text-[15px] leading-[1.5] tracking-[-0.27px] text-[#4c4e4a] sm:text-[18px]"
          >
            SEE THE RISKS BEFORE THEY GROW
          </p>
          <h2
            data-reveal-head
            className="w-full font-satoshi text-[clamp(28px,5vw,46px)] leading-[1.18] tracking-[-0.043em] text-[#191c19]"
          >
            Know What Needs Your
            <br />
            Attention
          </h2>
        </div>
      </div>

      {/* Horizontal track — Figma 14:8319 at (0,238), 2010×518.
          The pinned wrapper is full-width; the visible window inside it is inset on both sides so
          the cards slide through a framed viewport, with a soft blur + fade on each edge so cards
          dissolve smoothly instead of being hard-cut. The track's own side padding equals the fade
          width, so the first/last card rest fully clear of the blurred zone. */}
      <div
        data-track-wrap
        className="relative mt-[44px] h-[360px] w-full [--fade:24px] [--inset:12px] sm:h-[430px] sm:[--fade:36px] sm:[--inset:20px] lg:mt-[73px] lg:h-[518px] lg:[--fade:64px] lg:[--inset:32px]"
      >
        <div className="relative mx-auto h-full w-[calc(100%_-_2*var(--inset))] max-w-[1600px] overflow-hidden rounded-[6px]">
          <div
            ref={trackRef}
            className="absolute left-0 top-0 flex h-full w-max items-center gap-4 px-[var(--fade)] sm:gap-6 lg:gap-[30px]"
          >
            {CARDS.map((card) => (
              <div
                key={card.label}
                data-risk-card
                className="relative h-[360px] w-[min(280px,calc(100vw_-_2*var(--inset)_-_2*var(--fade)))] shrink-0 overflow-hidden rounded-[3px] sm:h-[430px] sm:w-[340px] lg:h-[518px] lg:w-[480px]"
              >
                <img
                  src={card.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-black/45" />

                {/* Gradient label block — Figma gradient + Recoleta 52px. */}
                <div
                  className="absolute bottom-0 left-0 h-[160px] w-full lg:h-[200px] lg:w-[480px]"
                  style={{
                    backgroundImage:
                      'linear-gradient(0.919deg, rgba(0,0,0,0.77) 2.37%, rgba(0,0,0,0) 97.78%)',
                  }}
                >
                  <p
                    className="absolute left-6 top-6 w-[80%] font-recoleta text-[26px] font-medium leading-[1.2] tracking-[-0.3px] text-white sm:text-[32px] lg:left-[calc(50%-192px)] lg:top-[28px] lg:w-[var(--label-w)] lg:text-[52px] lg:leading-[1.38] lg:tracking-[-0.52px]"
                    style={{ '--label-w': `${card.w}px` } as CSSProperties}
                  >
                    {card.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Soft edge blur + fade — left and right. */}
          {(['left', 'right'] as const).map((side) => {
            const dir = side === 'left' ? 'to right' : 'to left'
            return (
              <div key={side} aria-hidden className={`pointer-events-none absolute inset-y-0 z-10 w-[var(--fade)] ${side === 'left' ? 'left-0' : 'right-0'}`}>
                <div
                  className="absolute inset-0 backdrop-blur-[10px]"
                  style={{
                    WebkitMaskImage: `linear-gradient(${dir}, #000 0%, rgba(0,0,0,0.6) 50%, transparent 100%)`,
                    maskImage: `linear-gradient(${dir}, #000 0%, rgba(0,0,0,0.6) 50%, transparent 100%)`,
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(${dir}, #f7f6f4 0%, rgba(247,246,244,0.75) 35%, rgba(247,246,244,0) 100%)`,
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
