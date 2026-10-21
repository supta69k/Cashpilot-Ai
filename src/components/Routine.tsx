import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RoutineCardOne, RoutineCardThree, RoutineCardTwo } from './RoutineCards'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: '01',
    title: 'Bring in your numbers',
    background: '#cbfc58',
    color: '#191c19',
    muted: '#363735',
    border: 'rgba(83,163,72,0.2)',
    items: [
      'Track your current cash balance.',
      'Monitor incoming and outgoing payments.',
      'Keep track of outstanding invoices.',
    ],
  },
  {
    number: '02',
    title: 'Set your cash reserve',
    background: '#692671',
    color: '#ffffff',
    muted: '#ffffff',
    border: '#a14395',
    items: [
      'Set your minimum cash threshold.',
      'Identify potential cash shortages.',
      'Plan ahead for upcoming obligations.',
    ],
  },
  {
    number: '03',
    title: 'Understand & Take Action',
    background: '#03652b',
    color: '#ffffff',
    muted: '#ffffff',
    border: '#259846',
    items: [
      'Forecast cash flow and identify potential risks.',
      'Get AI-powered insights and recommendations.',
      'Access your financial assistant through Telegram.',
    ],
  },
]

/** "A clearer routine, step by step." — Figma 47:3957 at page (100,2873), 1246×974. */
export default function Routine() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-reveal-head]', { autoAlpha: 0, y: 28 })
      gsap.to('[data-reveal-head]', {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-head]', start: 'top 80%', once: true },
      })

      // Stacked step cards on small screens.
      gsap.set('[data-step]', { autoAlpha: 0, y: 32 })
      gsap.to('[data-step]', {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-steps]', start: 'top 82%', once: true },
      })

      // The pinned deck only exists from 1280px up; below that the cards are
      // stacked, so the pin and peel are never built there.
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1280px)', () => {
        // The three routine cards form a deck: cards 02 and 03 peek out from under
        // card 01 in Figma. Scrolling peels the deck one card at a time.
        const cards = gsap.utils.toArray<HTMLElement>('[data-deck] [data-card]')
        if (cards.length !== 3) return

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: '[data-deck]',
            start: 'top 12%',
            end: '+=1600',
            scrub: 1,
            pin: '[data-deck]',
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // 01 out, 02 and 03 move up one slot.
        tl.to(cards[0], { yPercent: -105, duration: 1 }, 0)
          .to(cards[1], { y: -26, duration: 1 }, 0)
          .to(cards[2], { y: -20, duration: 1 }, 0)

        // 02 out, 03 takes the front slot.
        tl.to({}, { duration: 0.3 })
        tl.to(cards[1], { yPercent: -105, duration: 1 })
          .to(cards[2], { y: -46, duration: 1 }, '<')
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f7f6f4]">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Heading — Figma 14:7993 at frame (349,0), 548×111. */}
        <div
          data-head
          className="mx-auto flex w-[548px] max-w-[calc(100%-40px)] flex-col items-center gap-[30px] pt-[140px] text-center sm:pt-[190px] lg:pt-[284px]"
        >
          <p
            data-reveal-head
            className="w-full font-satoshi text-[18px] leading-[1.5] tracking-[-0.27px] text-[#4c4e4a]"
          >
            FROM NUMBERS TO NEXT STEPS
          </p>
          <h2
            data-reveal-head
            className="w-full font-satoshi text-[clamp(30px,5vw,46px)] leading-[1.18] tracking-[-2px] text-[#191c19]"
          >
            A clearer routine, step by step.
          </h2>
        </div>

        {/* Stacked steps — phones and tablets. */}
        <div
          data-steps
          className="mx-auto mt-10 flex max-w-[520px] flex-col gap-5 px-5 sm:mt-14 xl:hidden"
        >
          {STEPS.map((step) => (
            <div
              key={step.number}
              data-step
              className="relative overflow-hidden rounded-[16px] border-4 px-6 py-7 sm:px-8"
              style={{ backgroundColor: step.background, borderColor: step.border }}
            >
              <span
                className="block font-recoleta text-[42px] font-medium leading-none tracking-[-1px]"
                style={{ color: step.color }}
              >
                {step.number}
              </span>
              <h3
                className="mt-3 font-recoleta text-[27px] font-medium leading-[1.2] tracking-[-0.5px] sm:text-[32px]"
                style={{ color: step.color }}
              >
                {step.title}
              </h3>
              <ol className="mt-5 flex flex-col gap-3">
                {step.items.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-[10px] font-satoshi text-[15px] leading-[1.5]"
                    style={{ color: step.muted }}
                  >
                    <span className="shrink-0 opacity-60">{`0${i + 1}.`}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* Deck — Figma 47:240 at frame (0,238), 1246×736. Centred until the frame
            is wide enough to hold the Figma 100px inset. */}
        <div className="mx-auto mt-[127px] hidden w-full max-w-[1246px] xl:block min-[1440px]:max-w-none min-[1440px]:pl-[100px]">
          <div data-deck className="relative h-[736px] w-[1246px] overflow-hidden">
            <RoutineCardOne />
            <RoutineCardTwo />
            <RoutineCardThree />
          </div>
        </div>
      </div>
    </section>
  )
}
