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

      // Pinned horizontal scrub — works on all screen sizes.
      // The track width minus the viewport gives horizontal travel distance.
      gsap.to(trackRef.current, {
        x: () => -Math.max(0, (trackRef.current?.scrollWidth ?? 0) - window.innerWidth + 60),
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-track-wrap]',
          start: 'top 12%',
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
          className="mx-auto flex w-[548px] max-w-[calc(100%-40px)] flex-col items-center gap-[18px] pt-[140px] text-center sm:gap-[30px] sm:pt-[190px] lg:pt-[284px]"
        >
          <p
            data-reveal-head
            className="w-full font-satoshi text-[18px] leading-[1.5] tracking-[-0.27px] text-[#4c4e4a]"
          >
            SEE THE RISKS BEFORE THEY GROW
          </p>
          <h2
            data-reveal-head
            className="w-full font-satoshi text-[clamp(30px,5vw,46px)] leading-[1.18] tracking-[-2px] text-[#191c19]"
          >
            Know What Needs Your
            <br />
            Attention
          </h2>
        </div>

        {/* Horizontal track — Figma 14:8319 at (0,238), 2010×518. */}
        <div
          data-track-wrap
          className="relative mt-[44px] h-[360px] overflow-hidden sm:h-[430px] lg:mt-[73px] lg:h-[518px]"
        >
          <div
            ref={trackRef}
            className="absolute left-0 top-0 flex h-[360px] w-max items-center gap-4 px-5 sm:h-[430px] sm:gap-6 lg:h-[518px] lg:gap-[30px] lg:px-0"
          >
            {CARDS.map((card) => (
              <div
                key={card.label}
                data-risk-card
                className="relative h-[360px] w-[280px] shrink-0 overflow-hidden rounded-[3px] sm:h-[430px] sm:w-[340px] lg:h-[518px] lg:w-[480px]"
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
        </div>
      </div>
    </section>
  )
}
