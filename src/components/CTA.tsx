import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import vector from '../assets/icons/cta/vector.svg'
import elements from '../assets/icons/cta/elements.svg'

gsap.registerPlugin(ScrollTrigger)

/** CTA section — Figma 14:8398 at page (0,8929), 1440×722. */
export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-reveal-cta]', { autoAlpha: 0, y: 32 })
      gsap.set('[data-cta-btn]', { autoAlpha: 0, scale: 0.92 })

      gsap.to('[data-reveal-cta]', {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-cta]', start: 'top 78%', once: true },
      })

      gsap.to('[data-cta-btn]', {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.8)',
        delay: 0.45,
        scrollTrigger: { trigger: '[data-cta]', start: 'top 78%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative mt-[238px] w-full bg-white pt-[80px] pb-[81px]"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Lime card — Figma 14:8399 centered in the 1440×722 frame, 1224×561. */}
        <div
          data-cta
          className="relative mx-auto h-[561px] w-[1224px] overflow-hidden rounded-[3px] bg-[#cbfc58]"
        >
          {/* Decorative vector blob — Figma 14:8400: 565² at top 56.51% / bottom -57.22%. */}
          <div className="pointer-events-none absolute bottom-[-57.22%] left-[calc(50%+0.5px)] top-[56.51%] w-[565px] -translate-x-1/2">
            <img src={vector} alt="" className="absolute inset-0 size-full max-w-none" />
          </div>

          {/* Content block — Figma 14:8401 at center. */}
          <div className="absolute left-1/2 top-1/2 flex w-[818px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[56px] text-center">
            <div className="flex flex-col items-center gap-[24px]">
              <h2
                data-reveal-cta
                className="whitespace-nowrap font-recoleta text-[64px] leading-[1.25] tracking-[-2.5px] text-black"
              >
                Take Control of Your Cash Flow
              </h2>
              <p
                data-reveal-cta
                className="w-[807px] font-satoshi text-[20px] leading-[1.7] tracking-[-0.5px] text-[#0a0d0b]"
              >
                Get a clearer picture of your finances, anticipate what&rsquo;s coming next, and
                make smarter decisions with your AI financial assistant.
              </p>
            </div>

            {/* Button — Figma 14:8406, pill with icon. */}
            <a
              href="#"
              data-cta-btn
              className="group flex h-[56px] items-center gap-[16px] rounded-[44px] border border-[#c9cccf] bg-[#0a0d0b] pl-[20px] pr-[8px] text-white transition hover:bg-black"
            >
              <span className="font-satoshi text-[16px] leading-[1.6] tracking-[-0.5px]">Get Started</span>
              <span
                className="flex size-[40px] items-center justify-center rounded-[24px] border border-black"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg, rgba(242, 242, 242, 0.2) 33.75%, rgba(215, 215, 215, 0.2) 100%), linear-gradient(90deg, #fff 0%, #fff 100%)',
                }}
              >
                <img
                  src={elements}
                  alt=""
                  className="h-[16px] w-[10px] -scale-x-100 -rotate-90 transition group-hover:translate-x-[1px]"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
