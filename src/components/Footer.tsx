import footerImg from '../assets/icons/footer/footer-img.webp'
import object1 from '../assets/icons/object.webp'
import line from '../assets/icons/footer/line.svg'
import fb from '../assets/icons/footer/fb.svg'
import twitter from '../assets/icons/footer/twitter.svg'
import instagram from '../assets/icons/footer/instagram.svg'

const PAGES = ['Features', 'Pricing', 'Affiliate Program', 'Press Kit']
const REFERENCE = ['Features', 'Pricing', 'Affiliate Program', 'Press Kit']
const UTILITIES = ['Features', 'Pricing', 'Affiliate Program', 'Press Kit']

/** Footer — Figma 58:18143 at page (-101,9790), 1597×1280. */
export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#f7f6f4] pt-[100px] sm:pt-[150px] lg:pt-[197px]">
      {/* Footer container — Figma 14:8414 at (101,0), 1440×539. */}
      <div className="relative mx-auto w-full">
        <div className="mx-auto w-full max-w-[1184px] px-5 sm:px-8 min-[1248px]:px-0">
          {/* Top content row — Figma 14:8431. */}
          <div className="flex flex-col items-start justify-between gap-12 pt-[40px] sm:pt-[60px] lg:flex-row lg:gap-12 lg:pt-[107.5px]">
            {/* Brand + tagline — Figma 14:8454. */}
            <div className="w-full max-w-[301.48px]">
              <div className="flex items-center gap-[9px]">
                <div className="flex size-[32px] items-center justify-center overflow-hidden rounded-[9px] bg-[#cbfc58] px-[4px] py-[8px]">
                  <img src={object1} alt="" className="h-[96.57%] w-[99.08%]" />
                </div>
                <span className="font-satoshi text-[23px] font-medium leading-none text-[#191c19]">
                  CashPilot AI
                </span>
              </div>
              <p className="mt-[28px] font-satoshi text-[16px] leading-[1.5] text-[#1e1a1c] sm:mt-[42px]">
                In the new era of technology we look a in the future with certainty and pride to for
                our company and.
              </p>
            </div>

            {/* Three link columns — Figma 14:8432. */}
            <div className="grid w-full grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:flex lg:w-auto lg:gap-14 xl:gap-[103.94px]">
              {/* Pages */}
              <div>
                <p className="font-satoshi text-[16px] font-medium text-[#7e8083]">Pages</p>
                <ul className="mt-[20px] flex flex-col gap-[16px] font-satoshi text-[16px] text-[#1e1a1c] sm:mt-[26px] sm:gap-[20px]">
                  {PAGES.map((label) => (
                    <li key={label}>
                      <a href="#" className="hover:underline">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reference Page */}
              <div>
                <p className="font-satoshi text-[16px] font-medium text-[#7e8083]">Reference Page</p>
                <ul className="mt-[20px] flex flex-col gap-[16px] font-satoshi text-[16px] text-[#1e1a1c] sm:mt-[26px] sm:gap-[20px]">
                  {REFERENCE.map((label) => (
                    <li key={label}>
                      <a href="#" className="hover:underline">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Utilities */}
              <div>
                <p className="font-satoshi text-[16px] font-medium text-[#7e8083]">Utilities</p>
                <ul className="mt-[20px] flex flex-col gap-[16px] font-satoshi text-[16px] text-[#1e1a1c] sm:mt-[26px] sm:gap-[20px]">
                  {UTILITIES.map((label) => (
                    <li key={label}>
                      <a href="#" className="hover:underline">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Divider line — Figma 14:8418. */}
          <div className="mt-[44px] h-px w-full bg-[#d2d5d8] lg:mt-[67px]">
            <img src={line} alt="" className="h-px w-full" />
          </div>

          {/* Bottom bar — Figma 14:8419. 65px gap above the 212px hill strip on desktop = 277px total. */}
          <div className="flex flex-col items-start justify-between gap-6 pb-[44px] pt-[24.5px] font-satoshi text-[14px] text-[#1e1a1c] sm:flex-row sm:items-center sm:gap-0 sm:pb-[56px] lg:pb-[65px]">
            <span>Copyright © 2026 CashPilot. All Rights Reserved</span>

            {/* Social icons — Figma 14:8421. */}
            <div className="flex items-center gap-[15px]">
              <a href="#" aria-label="Facebook">
                <img src={fb} alt="" className="size-[40px]" />
              </a>
              <a href="#" aria-label="Twitter">
                <img src={twitter} alt="" className="size-[40px]" />
              </a>
              <a href="#" aria-label="Instagram">
                <img src={instagram} alt="" className="size-[40px]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer hill strip — Figma 73:106 (1440×212) with rotated artwork 73:107 (1514.9×693.85, 7.84°).
          Both outer stage and inner rotated artwork share locked proportional aspect ratios, so at
          every viewport width (320px phones, 768px tablets, 1280px–1440px laptops, 1920px–4K monitors)
          the top crest stays smoothly uncut (~7% below top) and the bottom valleys stay solid green
          edge-to-edge without ever dipping below the bottom or overlapping the copyright bar. */}
      <div className="pointer-events-none relative w-full overflow-hidden">
        <div className="relative left-1/2 aspect-[1440/212] w-[165%] -translate-x-1/2 overflow-hidden sm:w-[125%] md:w-full">
          <div className="absolute left-1/2 top-0 aspect-[1514.9/693.85] w-[108%] -translate-x-1/2 -translate-y-[12.8%] rotate-[7.84deg]">
            <img
              src={footerImg}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full max-w-none"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
