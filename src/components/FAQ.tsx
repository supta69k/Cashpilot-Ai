import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import faqIcon from '../assets/icons/faq/faq.svg'
import faq1 from '../assets/icons/faq/faq1.svg'
import faq2 from '../assets/icons/faq/faq2.svg'
import faq3 from '../assets/icons/faq/faq3.svg'
import faq4 from '../assets/icons/faq/faq4.svg'
import elements from '../assets/icons/faq/elements.svg'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    q: 'What is this platform?',
    a: "Our platform brings your cash flow, invoices, and financial alerts together in one place. With AI-powered insights and Telegram access, you can anticipate risks and make smarter financial decisions.",
    icon: faqIcon,
    expanded: true,
  },
  {
    q: 'How does the AI financial assistant work?',
    a: 'The AI analyzes your cash movements, flags unusual patterns, predicts shortfalls, and suggests next steps. It surfaces insights on your dashboard and can send summaries or alerts through Telegram.',
    icon: faq1,
    expanded: false,
  },
  {
    q: 'Can I access my finances through Telegram?',
    a: 'Yes. Connect your workspace and the assistant will send daily summaries, overdue alerts, and quick actions you can trigger directly from chat without opening the web app.',
    icon: faq2,
    expanded: false,
  },
  {
    q: 'Can the platform predict cash shortages?',
    a: 'It models your upcoming inflows and outflows, highlights reserve thresholds you set, and warns you when projected balances dip below safe levels days or weeks ahead.',
    icon: faq3,
    expanded: false,
  },
  {
    q: 'Does the AI execute financial actions automatically?',
    a: 'No. It recommends actions and can draft messages or reminders, but you always confirm before any payment, invoice, or notification is sent.',
    icon: faq4,
    expanded: false,
  },
]

/** FAQ section — Figma 14:8335 at page (260,7648), 921×1043. */
export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-reveal-head]', { autoAlpha: 0, y: 28 })
      gsap.set('[data-faq-item]', { autoAlpha: 0, y: 24 })

      gsap.to('[data-reveal-head]', {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-head]', start: 'top 82%', once: true },
      })

      gsap.to('[data-faq-item]', {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-faq-list]', start: 'top 78%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggle = (idx: number) => {
    setOpenIndex(idx === openIndex ? -1 : idx)
  }

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f7f6f4]">
      <div className="mx-auto w-[921px] max-w-[calc(100%-64px)] pt-[357px]">
        {/* Heading — Figma 14:8336 at (141,0), 639×138. */}
        <div
          data-head
          className="mx-auto flex w-[639px] flex-col items-center gap-[30px] text-center"
        >
          <p
            data-reveal-head
            className="w-full font-satoshi text-[24px] leading-[1.7] tracking-[-0.4px] text-[#494f5b]"
          >
            FAQs
          </p>
          <h2
            data-reveal-head
            className="w-full font-recoleta text-[60px] leading-[1.12] tracking-[-2.3px] text-[#191c19]"
          >
            Your Questions Answered
          </h2>
        </div>

        {/* FAQ list — Figma 14:8339 at (0,191), 921×852. */}
        <div data-faq-list className="mt-[53px] flex flex-col gap-[20px]">
          {FAQS.map((item, idx) => {
            const isOpen = idx === openIndex
            return (
              <div
                key={idx}
                data-faq-item
                className={`overflow-hidden rounded-[7.675px] transition-colors duration-200 ${
                  isOpen ? 'bg-[#eff3e6]' : 'bg-[#fcfdf9]'
                }`}
              >
                {/* Question row — Figma 14:8341 / 14:8354 etc, 110.52px tall. */}
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center gap-[49.12px] px-[36.84px] py-[24.56px] text-left"
                >
                  <img src={item.icon} alt="" className="size-[61.4px] shrink-0" />
                  <span className="flex-1 font-satoshi text-[32px] font-medium leading-[1.8] tracking-[-0.614px] text-[#0a0915]">
                    {item.q}
                  </span>
                  <img
                    src={elements}
                    alt=""
                    className={`size-[20px] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Answer panel — only visible when expanded. Figma 14:8352, 194.945px. */}
                <div
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                    isOpen ? 'max-h-[220px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-[36.84px] pb-[30.7px] pt-[10px] font-satoshi text-[26px] leading-[1.8] text-[#52525a]">
                    {item.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
