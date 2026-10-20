import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RoutineCardOne, RoutineCardThree, RoutineCardTwo } from './RoutineCards'

gsap.registerPlugin(ScrollTrigger)

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

      // The three routine cards form a deck: cards 02 and 03 peek out from under
      // card 01 in Figma. Scrolling peels the deck one card at a time.
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]')
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
        .to(cards[1], { y: -106, duration: 1 }, 0)
        .to(cards[2], { y: -90, duration: 1 }, 0)

      // 02 out, 03 takes the front slot.
      tl.to({}, { duration: 0.3 })
      tl.to(cards[1], { yPercent: -105, duration: 1 })
        .to(cards[2], { y: -196, duration: 1 }, '<')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f7f6f4]">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Heading — Figma 14:7993 at frame (349,0), 548×111. */}
        <div
          data-head
          className="mx-auto flex w-[548px] flex-col items-center gap-[30px] pt-[284px] text-center"
        >
          <p
            data-reveal-head
            className="w-full font-satoshi text-[18px] leading-[1.5] tracking-[-0.27px] text-[#4c4e4a]"
          >
            FROM NUMBERS TO NEXT STEPS
          </p>
          <h2
            data-reveal-head
            className="w-full font-satoshi text-[46px] leading-[1.18] tracking-[-2px] text-[#191c19]"
          >
            A clearer routine, step by step.
          </h2>
        </div>

        {/* Deck — Figma 47:240 at frame (0,238), 1246×736. */}
        <div className="mt-[127px] pl-[100px]">
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
