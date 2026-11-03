import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FitScale from './FitScale'
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

      const mm = gsap.matchMedia()

      // Mobile/tablet (< 1024px): pinned deck peel — same visual effect as the desktop deck.
      mm.add('(max-width: 1023px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-mobile-deck] [data-step]')
        if (cards.length !== 3) return

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: '[data-mobile-deck]',
            start: () => (window.innerHeight < 680 ? 'top 8%' : 'top 16%'),
            end: '+=1200',
            scrub: 1,
            pin: '[data-mobile-deck]',
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // 01 peels up, 02 and 03 shift up one slot.
        tl.to(cards[0], { yPercent: -105, duration: 1 }, 0)
          .to(cards[1], { y: -14, duration: 1 }, 0)
          .to(cards[2], { y: -14, duration: 1 }, 0)

        // 02 peels up, 03 takes the front slot.
        tl.to({}, { duration: 0.3 })
        tl.to(cards[1], { yPercent: -105, duration: 1 })
          .to(cards[2], { y: -28, duration: 1 }, '<')
      })

      // Desktop (>= 1024px): the pinned deck with rich card illustrations, scaled cleanly on laptops.
      mm.add('(min-width: 1024px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-deck] [data-card]')
        if (cards.length !== 3) return

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: '[data-deck-pin]',
            start: () => (window.innerHeight < 720 ? 'top 5%' : 'top 12%'),
            end: '+=1600',
            scrub: 1,
            pin: '[data-deck-pin]',
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
          className="mx-auto flex w-[548px] max-w-[calc(100%-32px)] flex-col items-center gap-[20px] pt-[120px] text-center sm:max-w-[calc(100%-40px)] sm:gap-[30px] sm:pt-[180px] lg:pt-[284px]"
        >
          <p
            data-reveal-head
            className="w-full font-satoshi text-[15px] leading-[1.5] tracking-[-0.27px] text-[#4c4e4a] sm:text-[18px]"
          >
            FROM NUMBERS TO NEXT STEPS
          </p>
          <h2
            data-reveal-head
            className="w-full font-satoshi text-[clamp(28px,5vw,46px)] leading-[1.18] tracking-[-0.043em] text-[#191c19]"
          >
            A clearer routine, step by step.
          </h2>
        </div>

        {/* Stacked deck — phones and portrait tablets (< 1024px) with pin + peel scroll animation. */}
        <div className="mx-auto mt-10 max-w-[540px] px-4 sm:mt-14 sm:px-6 lg:hidden">
          <div
            data-mobile-deck
            className="relative h-[424px] w-full overflow-hidden sm:h-[376px]"
          >
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                data-step
                className="absolute left-0 h-[396px] w-full overflow-hidden rounded-[16px] border-4 px-5 py-6 sm:h-[348px] sm:px-8 sm:py-7"
                style={{
                  backgroundColor: step.background,
                  borderColor: step.border,
                  top: i * 14,
                  zIndex: 30 - i * 10,
                }}
              >
                <span
                  className="block font-recoleta text-[38px] font-medium leading-none tracking-[-1px] sm:text-[42px]"
                  style={{ color: step.color }}
                >
                  {step.number}
                </span>
                <h3
                  className="mt-3 font-recoleta text-[25px] font-medium leading-[1.2] tracking-[-0.5px] sm:text-[31px]"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>
                <ol className="mt-4 flex flex-col gap-3 sm:mt-5">
                  {step.items.map((item, j) => (
                    <li
                      key={item}
                      className="flex gap-[10px] font-satoshi text-[14.5px] leading-[1.45] sm:text-[15.5px] sm:leading-[1.5]"
                      style={{ color: step.muted }}
                    >
                      <span className="shrink-0 opacity-60">{`0${j + 1}.`}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Deck — Figma 47:240 at frame (0,238), 1246×736. Scales proportionally on 1024px–1294px
            laptops and locks to exact Figma 100px inset at 1440px+. */}
        <div className="mx-auto mt-[88px] hidden w-[calc(100%-48px)] max-w-[1246px] lg:block xl:mt-[127px] min-[1440px]:ml-[100px] min-[1440px]:mr-0 min-[1440px]:w-[1246px]">
          <div data-deck-pin className="w-full">
            <FitScale width={1246} height={736}>
              <div data-deck className="relative h-[736px] w-[1246px] overflow-hidden">
                <RoutineCardOne />
                <RoutineCardTwo />
                <RoutineCardThree />
              </div>
            </FitScale>
          </div>
        </div>
      </div>
    </section>
  )
}
