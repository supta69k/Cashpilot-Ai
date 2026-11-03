import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import funnelBand from '../assets/icons/sec5/funnel.svg'
import cashIcon from '../assets/icons/sec5/cash.svg'
import FitScale from './FitScale'

gsap.registerPlugin(ScrollTrigger)

/** Stat columns above the band — Figma 14:8205/14:8214/14:8217/14:8220/14:8223/14:8226. */
const STATS = [
  { label: 'Opening', value: 0.48, decimals: 2, suffix: 'M', left: 48, display: '0.48M' },
  { label: 'Inflows', value: 0.62, decimals: 2, suffix: 'M', left: 216, display: '0.62M' },
  { label: 'Outflows', value: -74, decimals: 0, suffix: 'K', left: 384, display: '-74K' },
  { label: 'Reserve', value: 1, decimals: 0, suffix: 'K', left: 552, display: '1K' },
  { label: 'Projected low', value: 80, decimals: 0, suffix: 'K', left: 720, display: '80K' },
  { label: 'Below', value: 20, decimals: 0, suffix: 'K', left: 888, display: '20K' },
]

const GRID_LINES = [32, 200, 368, 536, 704, 872]

/** Percentage markers that ride the top edge of the band. */
const BANDS = [
  { label: '100%', left: 152, top: 203 },
  { label: '75%', left: 329, top: 231 },
  { label: '50%', left: 497, top: 258 },
  { label: '25%', left: 671, top: 274 },
  { label: '5%', left: 834, top: 284 },
  { label: '0%', left: 1073, top: 284 },
]

/** "Cash-flow Funnel Analytics" — Figma 14:8198 at page (108,4204), 1224×787. */
export default function Funnel() {
  const sectionRef = useRef<HTMLElement>(null)
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-reveal-head]', { autoAlpha: 0, y: 28 })
      gsap.set('[data-panel]', { autoAlpha: 0, y: 48 })
      gsap.set('[data-title-icon]', { autoAlpha: 0, scale: 0.7, rotate: -35 })

      gsap.to('[data-reveal-head]', {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-head]', start: 'top 82%', once: true },
      })

      const mm = gsap.matchMedia()

      // Desktop (>= 1024px): full Figma chart with vertical gridlines, counters, and scanline wipe.
      mm.add('(min-width: 1024px)', () => {
        gsap.set('[data-stat]', { autoAlpha: 0, y: 18 })
        gsap.set('[data-grid-line]', { scaleY: 0, transformOrigin: 'top center' })
        gsap.set('[data-band-badge]', { autoAlpha: 0, y: 10 })
        gsap.set('[data-band]', { clipPath: 'inset(0% 100% 0% 0%)' })
        gsap.set('[data-scan]', { autoAlpha: 0 })

        const panelTl = gsap.timeline({
          scrollTrigger: { trigger: '[data-panel]', start: 'top 78%', once: true },
        })

        panelTl
          .to('[data-panel]', { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out' })
          .to(
            '[data-title-icon]',
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(1.7)' },
            '-=0.7',
          )
          .to(
            '[data-grid-line]',
            { scaleY: 1, duration: 1.1, stagger: 0.06, ease: 'power2.out' },
            '-=0.45',
          )
          .to(
            '[data-stat]',
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
            '-=0.85',
          )

        STATS.forEach((stat, i) => {
          const node = valueRefs.current[i]
          if (!node) return
          const counter = { v: 0 }
          panelTl.to(
            counter,
            {
              v: stat.value,
              duration: 1.15,
              ease: 'power2.out',
              onUpdate: () => {
                node.textContent = `${counter.v.toFixed(stat.decimals)}${stat.suffix}`
              },
              onComplete: () => {
                node.textContent = stat.display
              },
            },
            `<${i === 0 ? '' : '+0.07'}`,
          )
        })

        const scanTl = gsap.timeline({
          scrollTrigger: {
            trigger: '[data-chart]',
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.8,
          },
        })

        scanTl
          .to('[data-band]', { clipPath: 'inset(0% 0% 0% 0%)', duration: 3, ease: 'none' }, 0)
          .to('[data-scan]', { autoAlpha: 1, duration: 0.25 }, 0)
          .to('[data-scan]', { x: 1064, duration: 3, ease: 'none' }, 0)
          .to('[data-scan]', { autoAlpha: 0, duration: 0.3 }, 2.7)
          .to(
            '[data-band-badge]',
            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.42, ease: 'power2.out' },
            0.25,
          )
      })

      // Mobile / Tablet (< 1024px): staggered stat reveal and smooth funnel wipe.
      mm.add('(max-width: 1023px)', () => {
        gsap.set('[data-mobile-stat]', { autoAlpha: 0, y: 14 })
        gsap.set('[data-mobile-band]', { clipPath: 'inset(0% 100% 0% 0%)' })

        const mobileTl = gsap.timeline({
          scrollTrigger: { trigger: '[data-panel]', start: 'top 82%', once: true },
        })

        mobileTl
          .to('[data-panel]', { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' })
          .to(
            '[data-title-icon]',
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.65, ease: 'back.out(1.7)' },
            '-=0.6',
          )
          .to(
            '[data-mobile-stat]',
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' },
            '-=0.45',
          )

        gsap.to('[data-mobile-band]', {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-mobile-band]',
            start: 'top 90%',
            end: 'top 50%',
            scrub: 0.8,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f7f6f4]">
      <div className="mx-auto w-full max-w-[1440px]">
        <div
          data-panel
          className="relative mx-auto mt-[110px] h-auto w-[calc(100%-32px)] max-w-[1224px] overflow-hidden rounded-[5px] bg-white px-4 pb-6 pt-9 sm:mt-[180px] sm:w-[calc(100%-48px)] sm:px-8 sm:pb-10 sm:pt-12 lg:mt-[357px] lg:px-6 lg:pb-0 lg:pt-[88px] xl:px-[48px]"
        >
          {/* Heading — Figma 14:8200 at card (338,88), 548×111. */}
          <div
            data-head
            className="relative mx-auto flex w-full max-w-[548px] flex-col items-center gap-[18px] text-center lg:gap-[30px]"
          >
            <p
              data-reveal-head
              className="w-full font-satoshi text-[15px] leading-[1.5] tracking-[-0.27px] text-[#4c4e4a] sm:text-[18px]"
            >
              LOOK BEYOND TODAY&rsquo;S BALANCE
            </p>
            <h2
              data-reveal-head
              className="w-full font-satoshi text-[clamp(27px,4.4vw,46px)] leading-[1.18] tracking-[-0.043em] text-[#191c19]"
            >
              See the dip before you&rsquo;re in it.
            </h2>
          </div>

          {/* Compact figures for phones/tablets (< 1024px) */}
          <div className="relative mt-7 w-full rounded-[7px] bg-[#f7f6f4] p-4 sm:mt-9 sm:p-6 lg:hidden">
            <div className="flex items-center gap-3">
              <div
                data-title-icon
                className="flex size-[38px] shrink-0 items-center justify-center rounded-[8px] border border-[rgba(51,51,51,0.2)] bg-[#f9faf7] sm:size-[40px]"
              >
                <img src={cashIcon} alt="" className="size-[19px] sm:size-[20px]" />
              </div>
              <p className="font-recoleta text-[18px] leading-[1.4] tracking-[-0.8px] text-[#333] sm:text-[22px]">
                Cash-flow Funnel Analytics
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-x-2.5 gap-y-5 sm:gap-x-6 sm:gap-y-6">
              {STATS.map((stat) => (
                <div key={stat.label} data-mobile-stat className="min-w-0">
                  <p className="truncate font-satoshi text-[10.5px] leading-[1.4] tracking-[-0.2px] text-[#7a7b8f] sm:text-[13px]">
                    {stat.label}
                  </p>
                  <p className="mt-1 font-recoleta text-[19px] font-medium leading-[1.2] tracking-[-0.8px] text-[#333] min-[375px]:text-[22px] sm:text-[28px]">
                    {stat.display}
                  </p>
                </div>
              ))}
            </div>
            <img data-mobile-band src={funnelBand} alt="" className="mt-6 w-full" />
          </div>

          {/* Desktop Chart panel (>= 1024px) — Figma 14:8203 at card (48,265), 1128×524.
              Scales proportionally on 1024px–1271px laptops and locks 1:1 at 1272px+. */}
          <div className="mt-[66px] hidden w-full lg:block">
            <FitScale width={1128} height={524}>
              <div data-chart className="relative h-[524px] w-[1128px] rounded-[7px] bg-[#f7f6f4]">
                {/* Title row — Figma 14:8236. */}
                <div className="absolute left-[32px] top-[24px] h-[43px] w-[1064px]">
                  <div
                    data-title-icon
                    className="absolute left-0 top-[2px] flex size-[40px] items-center justify-center rounded-[8px] border border-[rgba(51,51,51,0.2)] bg-[#f9faf7]"
                  >
                    <img src={cashIcon} alt="" className="size-[20px]" />
                  </div>
                  <p className="absolute left-[60px] top-[2px] whitespace-nowrap font-recoleta text-[24px] leading-[1.5] tracking-[-1px] text-[#333]">
                    Cash-flow Funnel Analytics
                  </p>
                </div>

                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    data-stat
                    className="absolute top-[112px] h-[80px] w-[104px]"
                    style={{ left: stat.left }}
                  >
                    <p className="absolute left-0 top-0 whitespace-nowrap font-satoshi text-[16px] leading-[1.7] tracking-[-0.4px] text-[#7a7b8f]">
                      {stat.label}
                    </p>
                    <span
                      ref={(node) => {
                        valueRefs.current[i] = node
                      }}
                      className="absolute left-0 top-[35px] whitespace-nowrap font-recoleta text-[32px] font-medium leading-[1.4] tracking-[-1.5px] text-[#333]"
                    >
                      {stat.display}
                    </span>
                  </div>
                ))}

                {GRID_LINES.map((left) => (
                  <div
                    key={left}
                    data-grid-line
                    className="absolute top-[117px] h-[388px] w-px bg-[#52525a] opacity-20"
                    style={{ left }}
                  />
                ))}

                {/* Funnel band — Figma 14:8235 at panel (32,217), 1064×288. */}
                <div data-band className="absolute left-[32px] top-[217px] h-[288px] w-[1064px]">
                  <img src={funnelBand} alt="" className="size-full" />
                </div>

                {/* Wipe edge that travels with the band reveal. */}
                <div
                  data-scan
                  className="pointer-events-none absolute left-[32px] top-[217px] h-[288px] w-[2px] bg-gradient-to-b from-[#1e322d]/0 via-[#60d184]/80 to-[#dbfe7a]/0"
                />

                {BANDS.map((band) => (
                  <p
                    key={band.label}
                    data-band-badge
                    className="absolute font-inter text-[16px] leading-[1.7] tracking-[-0.4px] text-[#7a7b8f]"
                    style={{ left: band.left, top: band.top }}
                  >
                    {band.label}
                  </p>
                ))}
              </div>
            </FitScale>
          </div>
        </div>
      </div>
    </section>
  )
}
