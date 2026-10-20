import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import card1 from '../assets/icons/sec7/card1.png'
import card2 from '../assets/icons/sec7/card2.png'
import card3 from '../assets/icons/sec7/card3.png'
import card4 from '../assets/icons/sec7/card4.png'

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

      // The track is 2010px wide; viewport shows ~1440px, so ~570px of travel.
      // Pin the section and scrub the track leftward as the user scrolls.
      const travel = 2010 - 1440 + 60 // extra breathing room at the end

      gsap.to(trackRef.current, {
        x: -travel,
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
          className="mx-auto flex w-[548px] flex-col items-center gap-[30px] pt-[284px] text-center"
        >
          <p
            data-reveal-head
            className="w-full font-satoshi text-[18px] leading-[1.5] tracking-[-0.27px] text-[#4c4e4a]"
          >
            SEE THE RISKS BEFORE THEY GROW
          </p>
          <h2
            data-reveal-head
            className="w-full font-satoshi text-[46px] leading-[1.18] tracking-[-2px] text-[#191c19]"
          >
            Know What Needs Your
            <br />
            Attention
          </h2>
        </div>

        {/* Horizontal track — Figma 14:8319 at (0,238), 2010×518. */}
        <div data-track-wrap className="relative mt-[73px] h-[518px] overflow-hidden">
          <div
            ref={trackRef}
            className="absolute left-0 top-0 flex h-[518px] w-[2010px] items-center gap-[30px]"
          >
            {CARDS.map((card, i) => (
              <div
                key={i}
                className="relative h-[518px] w-[480px] shrink-0 overflow-hidden rounded-[3px]"
              >
                <img src={card.src} alt="" className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-black/45" />

                {/* Gradient label block — Figma gradient + Recoleta 52px. */}
                <div
                  className="absolute bottom-0 left-0 h-[159px] w-[480px]"
                  style={{
                    backgroundImage:
                      'linear-gradient(0.919deg, rgba(0,0,0,0.77) 2.37%, rgba(0,0,0,0) 97.78%)',
                  }}
                >
                  <p
                    className="absolute left-[calc(50%-192px)] top-[44px] w-[335px] font-recoleta text-[52px] font-medium leading-[1.38] tracking-[-0.52px] text-white"
                    style={{ width: card.w }}
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
