import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARAGRAPHS = [
  'Manage your cash flow, track invoices, and anticipate financial risks — all in one place.',
  'Your AI assistant turns financial data into clear insights and actionable next steps, on your dashboard or Telegram.',
]

/** Big editorial statement — Figma 14:8086 at page (196,2229), 1048×360. */
export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('[data-word]')

      gsap.set(words, { opacity: 0.14 })
      gsap.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.4,
        scrollTrigger: {
          trigger: '[data-statement]',
          start: 'top 82%',
          end: 'bottom 52%',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f7f6f4]">
      <div
        data-statement
        className="mx-auto w-[1048px] max-w-[calc(100%-64px)] pt-[267px] text-center font-recoleta text-[48px] leading-[1.5] text-black"
      >
        {PARAGRAPHS.map((paragraph) => {
          const words = paragraph.split(' ')
          return (
            <p key={paragraph} className="m-0">
              {words.map((word, i) => (
                <span key={`${word}-${i}`}>
                  <span data-word className="inline-block">
                    {word}
                  </span>
                  {i < words.length - 1 ? ' ' : null}
                </span>
              ))}
            </p>
          )
        })}
      </div>
    </section>
  )
}
