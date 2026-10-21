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
    <footer className="relative w-full overflow-hidden bg-[#f7f6f4] pt-[110px] sm:pt-[150px] lg:pt-[197px]">
      {/* Footer image strip — Figma 73:106 pinned to the page bottom, 1440×212.
          The artwork sits in a 1595×894 box (inset -5.4%/-92%) rotated 7.84°,
          with the object (1514.9×693.85) centred, so only the band shows. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[212px] overflow-hidden">
        <div className="absolute left-1/2 top-[-94.9px] h-[693.85px] w-[1514.9px] -translate-x-1/2 rotate-[7.84deg]">
          <img
            src={footerImg}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-[100.3%] w-full max-w-none"
          />
        </div>
      </div>

      {/* Footer container — Figma 14:8414 at (101,0), 1440×539. */}
      <div className="relative mx-auto w-full">
        <div className="mx-auto w-full max-w-[1184px] px-5 sm:px-8 lg:px-0">
          {/* Top content row — Figma 14:8431. */}
          <div className="flex flex-col items-start justify-between gap-12 pt-[60px] lg:flex-row lg:gap-0 lg:pt-[107.5px]">
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
              <p className="mt-[42px] font-satoshi text-[16px] leading-[1.5] text-[#1e1a1c]">
                In the new era of technology we look a in the future with certainty and pride to for
                our company and.
              </p>
            </div>

            {/* Three link columns — Figma 14:8432. */}
            <div className="grid w-full grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:flex lg:w-auto lg:gap-[103.94px]">
              {/* Pages */}
              <div>
                <p className="font-satoshi text-[16px] font-medium text-[#7e8083]">Pages</p>
                <ul className="mt-[26px] flex flex-col gap-[20px] font-satoshi text-[16px] text-[#1e1a1c]">
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
                <ul className="mt-[26px] flex flex-col gap-[20px] font-satoshi text-[16px] text-[#1e1a1c]">
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
                <ul className="mt-[26px] flex flex-col gap-[20px] font-satoshi text-[16px] text-[#1e1a1c]">
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

          {/* Bottom bar — Figma 14:8419. pb keeps the copy clear of the 212px strip. */}
          <div className="flex flex-col items-start justify-between gap-6 pb-[250px] pt-[24.5px] font-satoshi text-[14px] text-[#1e1a1c] sm:flex-row sm:items-center sm:gap-0 lg:pb-[277px]">
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
    </footer>
  )
}
