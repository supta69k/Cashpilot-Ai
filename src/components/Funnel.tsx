import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import funnelBand from '../assets/icons/sec5/funnel.svg'
import cashIcon from '../assets/icons/sec5/cash.svg'

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
      gsap.set('[data-stat]', { autoAlpha: 0, y: 18 })
      gsap.set('[data-grid-line]', { scaleY: 0, transformOrigin: 'top center' })
      gsap.set('[data-title-icon]', { autoAlpha: 0, scale: 0.7, rotate: -35 })
      gsap.set('[data-band-badge]', { autoAlpha: 0, y: 10 })
      gsap.set('[data-band]', { clipPath: 'inset(0% 100% 0% 0%)' })
      gsap.set('[data-scan]', { autoAlpha: 0 })

      gsap.to('[data-reveal-head]', {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-head]', start: 'top 82%', once: true },
      })

      // The panel slides up, lines drop in, then the numbers count up.
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

      // Count each figure up from zero.
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

      // The band wipes in as the panel scrolls through, with its markers
      // appearing just behind the wipe edge.
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f7f6f4]">
      <div className="mx-auto w-full max-w-[1440px]">
        <div
          data-panel
          className="relative mx-auto mt-[120px] h-auto w-[calc(100%-32px)] max-w-[1224px] overflow-hidden rounded-[5px] bg-white px-5 pb-8 pt-10 sm:mt-[200px] lg:mt-[357px] lg:h-[787px] lg:w-[1224px] lg:p-0"
        >
          {/* Heading — Figma 14:8200 at card (338,88), 548×111. */}
          <div
            data-head
            className="relative mx-auto flex w-full max-w-[548px] flex-col items-center gap-[18px] text-center lg:absolute lg:left-1/2 lg:top-[88px] lg:w-[548px] lg:-translate-x-1/2 lg:gap-[30px]"
          >
            <p
              data-reveal-head
              className="w-full font-satoshi text-[18px] leading-[1.5] tracking-[-0.27px] text-[#4c4e4a]"
            >
              LOOK BEYOND TODAY&rsquo;S BALANCE
            </p>
            <h2
              data-reveal-head
              className="w-full font-satoshi text-[clamp(28px,4.4vw,46px)] leading-[1.18] tracking-[-2px] text-[#191c19]"
            >
              See the dip before you&rsquo;re in it.
            </h2>
          </div>

          {/* Chart panel — Figma 14:8203 at card (48,265), 1128×524. */}
          <div className="relative mt-8 w-full rounded-[7px] bg-[#f7f6f4] p-4 lg:absolute lg:left-[48px] lg:top-[265px] lg:mt-0 lg:h-[524px] lg:w-[1128px] lg:p-0">
            {/* Title row — Figma 14:8236. */}
            <div className="relative flex h-auto w-full items-center gap-3 lg:absolute lg:left-[32px] lg:top-[24px] lg:h-[43px] lg:w-[1064px] lg:gap-0">
              <div
                data-title-icon
                className="flex size-[40px] items-center justify-center rounded-[8px] border border-[rgba(51,51,51,0.2)] bg-[#f9faf7] lg:absolute lg:left-0 lg:top-[2px]"
              >
                <img src={cashIcon} alt="" className="size-[20px]" />
              </div>
              <p className="whitespace-nowrap font-recoleta text-[20px] leading-[1.5] tracking-[-1px] text-[#333] lg:absolute lg:left-[60px] lg:top-[2px] lg:text-[24px]">
                Cash-flow Funnel Analytics
              </p>
            </div>

            {/* Compact figures for phones — the desktop chart is unreadable at
                phone widths, so the numbers get their own readable grid. */}
            <div className="mt-5 lg:hidden">
              <div className="grid grid-cols-3 gap-x-3 gap-y-5">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-satoshi text-[11px] leading-[1.4] tracking-[-0.2px] text-[#7a7b8f]">
                      {stat.label}
                    </p>
                    <p className="mt-1 font-recoleta text-[22px] font-medium leading-[1.2] tracking-[-1px] text-[#333]">
                      {stat.display}
                    </p>
                  </div>
                ))}
              </div>
              <img src={funnelBand} alt="" className="mt-6 w-full" />
            </div>

            {/* Columns + band. */}
            <div data-chart className="absolute inset-0 hidden lg:block">
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
          </div>
        </div>
      </div>
    </section>
  )
}
