import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import objectLogo from '../assets/icons/object.webp'
import arrowDown from '../assets/icons/sec2/arrow-down.svg'
import arrowDropDown from '../assets/icons/sec2/icon-arrow-drop-down.svg'
import addPhotoIcon from '../assets/icons/sec2/icon-add-photo.svg'
import addVideoIcon from '../assets/icons/sec2/icon-add-video.svg'
import iphoneFrame from '../assets/icons/sec2/iphone-frame.webp'
import statusLeft from '../assets/icons/sec2/status-left.svg'
import statusRight from '../assets/icons/sec2/status-right.svg'
import FitScale from './FitScale'

gsap.registerPlugin(ScrollTrigger)

const BARS = [
  { month: 'Jan', height: 147.297, color: '#191c19' },
  { month: 'Feb', height: 91.685, color: '#191c19' },
  { month: 'Mar', height: 147.297, color: '#191c19' },
  { month: 'Apr', height: 199.903, color: '#333333' },
  { month: 'May', height: 91.685, color: '#333333' },
  { month: 'Jun', height: 147.297, color: '#333333' },
]

export default function FeatureWays() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-reveal-head]', { autoAlpha: 0, y: 28 })
      gsap.set('[data-card]', { autoAlpha: 0, y: 56 })
      gsap.set('[data-bar]', { scaleY: 0, transformOrigin: 'bottom center' })
      gsap.set('[data-phone]', { autoAlpha: 0, y: 40 })

      const headTl = gsap.timeline({
        scrollTrigger: { trigger: '[data-head]', start: 'top 80%', once: true },
      })
      headTl.to('[data-reveal-head]', {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      })

      const mm = gsap.matchMedia()

      // Desktop: all 3 cards are side-by-side, so stagger them off one trigger.
      mm.add('(min-width: 1024px)', () => {
        gsap.to('[data-card]', {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-cards]', start: 'top 82%', once: true },
        })
      })

      // Mobile/tablet: cards are stacked vertically, so each card gets its own
      // ScrollTrigger so it animates in when *it* enters the viewport.
      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-card]').forEach((card) => {
          gsap.to(card, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          })
        })
      })

      gsap.to('[data-bar]', {
        scaleY: 1,
        duration: 1,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-cards]', start: 'top 78%', once: true },
        delay: 0.35,
      })

      gsap.to('[data-phone]', {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-cards]', start: 'top 78%', once: true },
        delay: 0.3,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f7f6f4]">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Heading block — Figma 14:7990 at page (460,1088), 520×156. */}
        <div
          data-head
          className="mx-auto flex w-[520px] max-w-[calc(100%-40px)] flex-col items-center gap-[21px] pt-[72px] text-center sm:pt-[96px] lg:pt-[111px]"
        >
          <p
            data-reveal-head
            className="w-full font-satoshi text-[18px] leading-[1.5] tracking-[-0.27px] text-[#4c4e4a]"
          >
            ONE AGENT. THREE WAYS IN.
          </p>
          <h2
            data-reveal-head
            className="w-full font-satoshi text-[clamp(30px,5vw,46px)] leading-[1.18] tracking-[-2px] text-[#191c19]"
          >
            Same financial picture.
            <br />
            Wherever you work.
          </h2>
        </div>

        {/* Three staggered cards — Figma 14:7996 at page (98,1363), 1236×599. */}
        <div
          data-cards
          className="relative mt-[56px] flex w-full flex-col items-center gap-6 px-5 sm:mt-[80px] sm:grid sm:grid-cols-2 sm:justify-items-center lg:mt-[119px] lg:ml-[98px] lg:block lg:h-[599px] lg:w-[1236px] lg:px-0"
        >
          <div data-card className="w-full max-w-[380px] lg:absolute lg:left-0 lg:top-[148px] lg:w-[380px] lg:max-w-none">
            <FitScale width={380} height={451}>
              <GlimpseCard />
            </FitScale>
          </div>
          <div data-card className="w-full max-w-[380px] lg:absolute lg:left-[428px] lg:top-[70px] lg:w-[380px] lg:max-w-none">
            <FitScale width={380} height={451}>
              <ChatCard />
            </FitScale>
          </div>
          <div data-card className="w-full max-w-[380px] sm:col-span-2 lg:absolute lg:left-[856px] lg:top-0 lg:w-[380px] lg:max-w-none">
            <FitScale width={380} height={451}>
              <PhoneCard />
            </FitScale>
          </div>
        </div>
      </div>
    </section>
  )
}

function GlimpseCard() {
  return (
    <div
      className="relative h-[451px] w-[380px] overflow-hidden bg-white"
    >
      <div className="absolute left-[46px] top-[29px] flex w-[296px] flex-col gap-[16px]">
        <h3 className="font-recoleta text-[32px] leading-[1.15] tracking-[-0.64px] text-[#191c19]">
          Your finances, at a glance
        </h3>
        <p className="font-satoshi text-[15px] leading-[1.34] tracking-[-0.045px] text-[#73776f]">
          Your balances, forecast, invoices, and alerts in one calm workspace.
        </p>
      </div>

      {/* Graph — Figma 14:7998 at card (48,203), 284×247.97, columns bottom-aligned. */}
      <div className="absolute left-1/2 top-[203px] flex -translate-x-1/2 items-end gap-[16px]">
        {BARS.map((bar) => (
          <div key={bar.month} className="flex w-[34px] flex-col items-center">
            <div
              data-bar
              className="w-full bg-[#333]"
              style={{ height: `${bar.height}px` }}
            />
            <span
              className="mt-[12.07px] block w-full text-center font-satoshi text-[14px] leading-[1.7] tracking-[-0.3px]"
              style={{ color: bar.color }}
            >
              {bar.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChatCard() {
  return (
    <div
      className="relative h-[451px] w-[380px] overflow-hidden bg-white"
    >
      <div className="absolute left-[20px] top-[25px] flex w-[339px] flex-col gap-[16px]">
        <h3 className="font-recoleta text-[32px] leading-[1.15] tracking-[-0.64px] text-[#191c19]">
          Ask. Understand. Decide.
        </h3>
        <p className="font-satoshi text-[15px] leading-[1.34] tracking-[-0.045px] text-[#73776f]">
          Get clear answers and actionable financial insights.
        </p>
      </div>

      {/* Chat composer mock — Figma 14:8021 at card (21,175), 336×257, p-18. */}
      <div className="absolute left-[21px] top-[175px] flex h-[257px] w-[336px] flex-col gap-[16px] bg-white p-[18px]">
        <div className="flex flex-col gap-[15px]">
          <div className="flex flex-col gap-[14px]">
            <div className="flex w-[300px] items-start justify-between">
              <span className="font-satoshi text-[16px] font-medium leading-[1.7] text-[#4d4d4d]">
                CashPilot Ai
              </span>
              <span className="flex h-[28px] items-center gap-[8px] rounded-[3px] bg-[#f5f6f4] px-[8px] py-[6px]">
                <img src={arrowDropDown} alt="" className="h-4 w-4" />
                <span className="font-satoshi text-[12px] leading-[14px] tracking-[-0.4px] text-[#98a2b3]">
                  Choose
                </span>
              </span>
            </div>

            <div className="flex items-center gap-[16px]">
              <span className="font-satoshi text-[12px] leading-[1.7] text-[#02140d]">Media</span>
              <span className="flex items-center gap-[8px]">
                <span className="flex h-[28px] items-center gap-[8px] rounded-[3px] bg-[#f5f6f4] px-[8px] py-[6px]">
                  <img src={addPhotoIcon} alt="" className="h-4 w-4" />
                  <span className="font-satoshi text-[12px] leading-[14px] tracking-[-0.4px] text-[#98a2b3]">
                    Add photo
                  </span>
                </span>
                <span className="flex h-[28px] items-center gap-[8px] rounded-[3px] bg-[#f5f6f4] px-[8px] py-[6px]">
                  <img src={addVideoIcon} alt="" className="h-4 w-4" />
                  <span className="font-satoshi text-[12px] leading-[14px] tracking-[-0.4px] text-[#98a2b3]">
                    Add video
                  </span>
                </span>
              </span>
            </div>
          </div>

          <div className="relative h-[68px] w-[300px] overflow-hidden rounded-[4px] border-[0.5px] border-solid border-[#dbdcda]">
            <p className="absolute left-[16.5px] top-[28.5px] font-satoshi text-[10px] font-light leading-[1.45] text-[#98a2b3]">
              Make sense of my numbers.
            </p>
          </div>
        </div>

        <button className="flex h-[52px] w-[300px] cursor-pointer items-center justify-center rounded-[4px] bg-[#333] px-[24px] py-[12px] transition-colors hover:bg-[#222]">
          <span className="font-satoshi text-[16px] leading-[1.7] text-white">Ask Our Chatbot</span>
        </button>
      </div>
    </div>
  )
}

function PhoneCard() {
  return (
    <div
      className="relative h-[451px] w-[380px] overflow-hidden bg-[#cbfc58]"
    >
      <div className="absolute left-[30px] top-[19px] flex w-[321px] flex-col gap-[16px]">
        <h3 className="font-recoleta text-[32px] leading-[1.15] tracking-[-0.64px] text-[#191c19]">
          Your finances on the go
        </h3>
        <p className="font-satoshi text-[15px] leading-[1.32] tracking-[-0.045px] text-[#50564a]">
          Check cash flow and review actions from Telegram.
        </p>
      </div>

      {/* iPhone mock — Figma 14:8049 at card (59,181), 262.66×537 (clipped at card bottom). */}
      <div data-phone className="absolute left-[59px] top-[181px] h-[537px] w-[262.663px]">
        <div className="absolute left-[11.573px] top-[10.416px] h-[270.815px] w-[239.567px] overflow-hidden rounded-t-[30.091px] bg-[#f9faf7]">
          {/* Status bar + header row */}
          <img
            src={statusLeft}
            alt=""
            className="absolute left-[23.146px] top-[13.888px] h-[9.44px] w-[23.203px]"
          />
          <img
            src={statusRight}
            alt=""
            className="absolute left-[163.24px] top-[14.016px] h-[9.184px] w-[53.996px]"
          />

          <div className="absolute left-[12.73px] top-[37.03px] size-[20.832px] rotate-90">
            <img src={arrowDown} alt="" className="size-full" />
          </div>

          <div className="absolute left-[43.978px] top-[35.877px] flex items-center gap-[6.944px]">
            <span className="flex h-[19.509px] w-[19.67px] items-center justify-center rounded-[5.532px] bg-[#cbfc58] px-[2.459px] py-[4.918px]">
              <img src={objectLogo} alt="" className="w-full" />
            </span>
            <span className="whitespace-nowrap font-recoleta text-[13.888px] leading-[1.7] text-black">
              Cashpilot Assistant
            </span>
          </div>

          {/* Conversation */}
          <div className="absolute left-[2.314px] top-[67.125px] h-[203.69px] w-[234.938px] overflow-hidden bg-[#f1f1ef]">
            <div className="absolute left-1/2 top-[21.989px] flex h-[28.933px] w-[153.346px] -translate-x-1/2 items-center justify-center rounded-[5.787px] bg-[#333]">
              <span className="text-center font-satoshi text-[9.403px] leading-[1.2] tracking-[-0.2893px] text-white">
                Show me my overdue invoices
              </span>
            </div>

            <div className="absolute left-1/2 top-[65.968px] h-[76.384px] w-[207.864px] -translate-x-1/2 rounded-[8.765px] bg-white">
              <p className="absolute left-[7.51px] top-[11.27px] w-[193px] font-satoshi text-[8.139px] font-medium leading-[1.7] tracking-[-0.2504px] text-[#333]">
                You have 3 overdue invoices totaling $3,321.59.
                <span className="mt-[0.5px] block">
                  <span className="inline-block w-[12.2px]">•</span>
                  INV-1042 &ndash; $1,458.89 (12 days)
                </span>
                <span className="block">
                  <span className="inline-block w-[12.2px]">•</span>
                  INV-1076 &ndash; $1,215.07 (8 days)
                </span>
                <span className="block">
                  <span className="inline-block w-[12.2px]">•</span>
                  INV-1091 &ndash; $647.63 (5 days)
                </span>
              </p>
            </div>

            <div className="absolute left-1/2 top-[153.006px] flex -translate-x-1/2 gap-[12.549px]">
              <span className="flex h-[23.549px] w-[97.885px] items-center justify-center rounded-[3.765px] bg-[#3c88d5]">
                <span className="whitespace-nowrap font-satoshi text-[9.412px] leading-[1.2] tracking-[-0.3765px] text-white">
                  Prepare reminders
                </span>
              </span>
              <span className="flex h-[23.549px] w-[97.885px] items-center justify-center rounded-[3.765px] bg-white">
                <span className="whitespace-nowrap font-satoshi text-[9.412px] leading-[1.2] tracking-[-0.3765px] text-[#191c19]">
                  View Invoices
                </span>
              </span>
            </div>
          </div>
        </div>

        <img
          src={iphoneFrame}
          alt=""
          className="pointer-events-none absolute left-0 top-[2px] h-[537px] w-[262.663px] object-cover"
        />
      </div>
    </div>
  )
}
