import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import invoiceBg from '../assets/icons/sec6/invoice-bg.png'
import donutBg from '../assets/icons/sec6/donut-bg.png'
import searchIcon from '../assets/icons/sec6/search.svg'
import arrowUp from '../assets/icons/sec6/arrow-up.svg'
import donutRing from '../assets/icons/sec6/donut-ring.svg'

gsap.registerPlugin(ScrollTrigger)

const INVOICES = [
  { customer: 'Noor Retail', id: 'INV-1042', amount: '$85,000', due: 'May 25, 2026', status: 'Overdue' },
  { customer: 'Meghna Foods', id: 'INV-1048', amount: '$60,000', due: 'May 28, 2026', status: 'Overdue' },
  { customer: 'Rafiq Stores', id: 'INV-1051', amount: '$40,000', due: 'Jun 12, 2026', status: 'Pending' },
]

const COLUMNS = ['Amount', 'Due date', 'Status', 'Follow-up']

const QUOTE = '”Beware of little expenses; a small leak will sink a great ship.”'

/** Four-tile bento — Figma 52:18080 at page (108,5376), 1213×1046. */
export default function Invoices() {
  const sectionRef = useRef<HTMLElement>(null)
  const totalRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>('[data-bento-row]')
      const rowTwo = rows[1]

      // Left cards slide in from the left edge, right cards from the right
      // edge, tied to scroll as each row comes into view.
      rows.forEach((row) => {
        const [left, right] = gsap.utils.toArray<HTMLElement>('[data-tile]', row)
        if (!left || !right) return

        gsap.fromTo(
          left,
          { x: -220 },
          {
            x: 0,
            ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top bottom', end: 'top 40%', scrub: 0.7 },
          },
        )
        gsap.fromTo(
          right,
          { x: 220 },
          {
            x: 0,
            ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top bottom', end: 'top 40%', scrub: 0.7 },
          },
        )
      })

      gsap.set('[data-invoice-list]', { autoAlpha: 0, x: -18 })
      gsap.set('[data-quote-word]', { opacity: 0.16 })
      gsap.set('[data-attr]', { autoAlpha: 0, y: 14 })
      gsap.set('[data-donut-copy]', { autoAlpha: 0, y: 16 })
      gsap.set('[data-badge]', { autoAlpha: 0, scale: 0.6 })
      gsap.set('[data-donut-ring]', { autoAlpha: 0, scale: 0.85 })
      gsap.set('[data-donut-tail]', { autoAlpha: 0, y: 10 })

      // Invoice rows slide in behind the first tile.
      gsap.to('[data-invoice-list]', {
        autoAlpha: 1,
        x: 0,
        duration: 0.65,
        ease: 'power3.out',
        delay: 0.55,
        scrollTrigger: { trigger: '[data-bento]', start: 'top 80%', once: true },
      })

      // Background photography drifts for depth while the grid is in view.
      // Start offset upward so the drift never exposes the tile's top edge.
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((img) => {
        gsap.fromTo(
          img,
          { y: -img.offsetHeight * 0.05 },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-bento]',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      // Quote reveals word by word as it scrolls through.
      gsap.to('[data-quote-word]', {
        opacity: 1,
        ease: 'none',
        stagger: 0.35,
        scrollTrigger: {
          trigger: rowTwo,
          start: 'top 78%',
          end: 'bottom 62%',
          scrub: true,
        },
      })

      gsap.to('[data-attr]', {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: rowTwo, start: 'top 52%', once: true },
      })

      // Donut: the lime ring draws itself, the total counts up, the badge pops.
      const donutTl = gsap.timeline({
        scrollTrigger: { trigger: rowTwo, start: 'top 38%', once: true },
      })

      donutTl
        .to('[data-donut-ring]', { autoAlpha: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 0)
        .to('[data-donut-copy]', { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.55)
        .to('[data-badge]', { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2.2)' }, 0.8)
        .to('[data-donut-tail]', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.95)

      const counter = { v: 0 }
      donutTl.to(
        counter,
        {
          v: 94127,
          duration: 1.3,
          ease: 'power2.out',
          onUpdate: () => {
            if (totalRef.current) {
              totalRef.current.textContent = `$${Math.round(counter.v).toLocaleString('en-US')}`
            }
          },
        },
        0.45,
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full overflow-x-clip bg-[#f7f6f4]">
      <div className="mx-auto w-[1213px] max-w-[calc(100%-64px)] pt-[385px]">
        {/* Figma 52:18080 is 1213 wide, but the two rows split it differently:
            top 593 + 28 + 592, bottom 506 + 28 + 679. A CSS grid would force one
            column template on both rows, so each row is its own flex line. */}
        <div data-bento className="flex h-[1046px] flex-col gap-[28px]">
          <div data-bento-row className="flex h-[509px] gap-[28px]">
          {/* Tile 1 — invoices over photography. Figma 14:8247. */}
          <div data-tile className="relative w-[593px] overflow-hidden rounded-[3px]">
            <div
              data-parallax
              className="absolute left-0 top-0 h-[635.476px] w-[1399.627px] overflow-hidden rounded-[3px]"
            >
              <img
                src={invoiceBg}
                alt=""
                className="absolute left-[-40.83%] top-[-9.36%] h-[103.49%] w-[99.99%] max-w-none"
              />
            </div>
            <div className="absolute inset-0 rounded-[3px] bg-black/10" />

            {/* Invoice panel — Figma 14:8249, 470×335 centred. */}
            <div className="absolute left-1/2 top-1/2 h-[335px] w-[470px] -translate-x-1/2 -translate-y-1/2 overflow-clip rounded-[12px] bg-white">
              <div className="absolute left-[26px] top-[22px] flex items-center gap-[88px]">
                <p className="w-[87px] font-recoleta text-[24px] leading-[1.5] text-[#191c19]">Invoices</p>
                <div className="relative h-[38px] w-[251px] overflow-clip rounded-[7px] border border-[#e8eae3]">
                  <img src={searchIcon} alt="" className="absolute left-[9px] top-[9px] size-[15px]" />
                  <p className="absolute left-[32px] top-[9px] whitespace-nowrap font-satoshi text-[12px] leading-[1.5] text-[#73776f]">
                    Search invoice or customer
                  </p>
                </div>
              </div>

              <div className="absolute left-0 top-[88px] flex h-[41px] w-[470px] items-center justify-center gap-[75px] bg-[#f9faf7]">
                {COLUMNS.map((column) => (
                  <span
                    key={column}
                    className="font-satoshi text-[11px] leading-[1.5] text-[#73776f]"
                  >
                    {column}
                  </span>
                ))}
              </div>

              <div data-invoice-list className="absolute left-[18px] top-[146px] flex items-center gap-[51px]">
                <div className="flex w-[88px] flex-col gap-[23px]">
                  {INVOICES.map((invoice) => (
                    <div key={invoice.id} className="flex w-full flex-col gap-[3px]">
                      <span className="font-satoshi text-[13px] leading-[1.5] text-[#191c19]">
                        {invoice.customer}
                      </span>
                      <span className="font-satoshi text-[11px] leading-[1.5] text-[#73776f]">
                        {invoice.id}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex w-[59px] flex-col gap-[39px]">
                  {INVOICES.map((invoice) => (
                    <span
                      key={invoice.id}
                      className="font-satoshi text-[14px] font-medium leading-[1.5] text-[#191c19]"
                    >
                      {invoice.amount}
                    </span>
                  ))}
                </div>

                <div className="flex w-[77px] flex-col gap-[41px]">
                  {INVOICES.map((invoice) => (
                    <span
                      key={invoice.id}
                      className="font-satoshi text-[12px] leading-[1.5] text-[#191c19]"
                    >
                      {invoice.due}
                    </span>
                  ))}
                </div>

                <div className="flex w-[65px] flex-col gap-[32px]">
                  {INVOICES.map((invoice) => (
                    <span
                      key={invoice.id}
                      className={`flex h-[27px] w-full items-center rounded-[6px] pl-[10px] font-satoshi text-[11px] font-medium leading-[1.5] ${
                        invoice.status === 'Overdue'
                          ? 'bg-[#fff0ea] text-[#d97454]'
                          : 'bg-[#f3f5ef] text-[#73776f]'
                      }`}
                    >
                      {invoice.status}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tile 2 — copy. Figma 14:8294. */}
          <div data-tile className="relative w-[592px] overflow-hidden rounded-[3px] bg-white">
            <div className="absolute left-[49px] top-1/2 flex w-[494px] -translate-y-1/2 flex-col gap-[38px]">
              <h3 className="font-recoleta text-[36px] leading-[1.16] text-[#191c19]">
                Follow up on invoices.
                <br />
                Not on spreadsheets.
              </h3>
              <p className="font-recoleta text-[32px] leading-[1.5] tracking-[-0.8px] text-[#73776f]">
                Find an invoice, see who owes you, and prepare the right follow-up. Keep the
                customer, amount, due date, and payment status together.
              </p>
            </div>
          </div>

          </div>

          {/* Bottom row — 506px quote + 679px donut (different split than top row). */}
          <div data-bento-row className="flex h-[509px] gap-[28px]">
          {/* Tile 3 — quote. Figma 14:8298. */}
          <div
            data-quote
            data-tile
            className="relative w-[506px] overflow-hidden rounded-[3px] bg-[#333] text-center"
          >
            <p className="absolute left-1/2 top-[123px] w-[378px] -translate-x-1/2 font-recoleta text-[45px] leading-[1.47] tracking-[-0.2px] text-white">
              {QUOTE.split(' ').map((word, i, all) => (
                <span key={`${word}-${i}`}>
                  <span data-quote-word className="inline-block">
                    {word}
                  </span>
                  {i < all.length - 1 ? ' ' : null}
                </span>
              ))}
            </p>
            <p
              data-attr
              className="absolute left-1/2 top-[447px] -translate-x-1/2 whitespace-nowrap font-recoleta text-[24px] leading-[1.47] tracking-[-0.2px] text-[#bbb4b4]"
            >
              – Benjamin Franklin
            </p>
          </div>

          {/* Tile 4 — donut over photography. Figma 14:8301. */}
          <div data-tile className="relative w-[679px] overflow-hidden rounded-[3px]">
            <div className="absolute left-[-28px] top-0 h-[586px] w-[899px]">
              <img
                data-parallax
                src={donutBg}
                alt=""
                className="size-full rounded-[3px] object-cover"
              />
            </div>

            {/* Chart frame — Figma 14:8303 at (103,102); card sits at +56 inside it. */}
            <div data-donut className="absolute left-[159px] top-[102px] h-[360px] w-[352px]">
              <div className="absolute inset-0 overflow-clip rounded-[24px] bg-white shadow-[inset_0px_-4px_0px_0px_rgba(0,0,0,0.15)]">
                <img
                  data-donut-ring
                  src={donutRing}
                  alt=""
                  className="absolute left-[55px] top-[78px] size-[242px]"
                  aria-hidden
                />

                <div className="absolute left-1/2 top-[144px] flex -translate-x-1/2 flex-col items-center gap-[6px]">
                  <p
                    data-donut-copy
                    className="whitespace-nowrap font-satoshi text-[32px] font-medium leading-[1.4] tracking-[0.5px] text-[#0a0915]"
                  >
                    <span ref={totalRef}>$94,127</span>
                  </p>
                  <div className="flex flex-col items-center gap-[4px]">
                    <div
                      data-badge
                      className="flex items-center rounded-full border border-[#ff9f9d] bg-white px-[12px] py-[3px]"
                    >
                      <img src={arrowUp} alt="" className="size-[18px] -scale-y-100" />
                      <span className="font-satoshi text-[18px] leading-[1.8] tracking-[-0.4px] text-[#fb3b52]">
                        21%
                      </span>
                    </div>
                    <p
                      data-donut-tail
                      className="whitespace-nowrap font-satoshi text-[16px] leading-[1.7] tracking-[-0.4px] text-[#52525a]"
                    >
                      vs last month
                    </p>
                  </div>
                </div>

                <p
                  data-donut-footer
                  className="absolute left-1/2 top-[286px] -translate-x-1/2 whitespace-nowrap font-satoshi text-[16px] leading-[1.7] tracking-[-0.4px] text-[#0a0915]"
                >
                  increased 12% from last month
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
