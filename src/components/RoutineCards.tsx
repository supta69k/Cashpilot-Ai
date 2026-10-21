import type { ReactNode } from 'react'
import objectLogo from '../assets/icons/object.png'
import circle from '../assets/icons/sec4/circle.svg'
import arrowDrop from '../assets/icons/sec4/arrow-drop.svg'
import gridline from '../assets/icons/sec4/gridline.svg'
import graphH from '../assets/icons/sec4/graph-h.svg'
import graphLine from '../assets/icons/sec4/graph-line.svg'
import miniDash from '../assets/icons/sec4/mini-dash.svg'
import invoiceBg from '../assets/icons/sec4/invoice-bg.svg'
import whiteLinesH from '../assets/icons/sec4/card3-line.svg'
import whiteLinesV from '../assets/icons/sec4/card3-grid.svg'
import dotMatrix from '../assets/icons/sec4/dot-matrix.png'
import plus from '../assets/icons/sec4/plus.svg'
import dotsH from '../assets/icons/sec4/dots-h.svg'
import dotsH2 from '../assets/icons/sec4/dots-h-2.svg'
import dotsH3 from '../assets/icons/sec4/dots-h-3.svg'
import vector160 from '../assets/icons/sec4/vector-160.svg'
import dot5 from '../assets/icons/sec4/dot-5.svg'
import telegramIcon from '../assets/icons/sec4/tg.svg'
import chartDot from '../assets/icons/sec4/chart-dot.svg'
import projected from '../assets/icons/sec4/projected.svg'
import illustration from '../assets/icons/sec4/card3-illo.svg'

type CardShellProps = {
  top: number
  z: number
  background: string
  borderColor: string
  children: ReactNode
}

/** 1240×540 routine card, exactly as framed in Figma (border drawn as an overlay so
 *  children can keep their page-relative coordinates). */
function CardShell({ top, z, background, borderColor, children }: CardShellProps) {
  return (
    <div
      data-card
      style={{ top, zIndex: z }}
      className="absolute left-0 h-[540px] w-[1240px] overflow-hidden rounded-[10px]"
    >
      <div className="absolute inset-0" style={{ backgroundColor: background }} />
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-[10px] border-8"
        style={{ borderColor }}
      />
    </div>
  )
}

function StepCircle({ left, number }: { left: number; number: string }) {
  return (
    <div className="absolute top-[42px] size-[127px]" style={{ left }}>
      <img src={circle} alt="" className="absolute inset-0 size-full" />
      <span className="absolute inset-0 flex items-center justify-center font-recoleta text-[60.96px] font-medium leading-none text-[#191c19]">
        {number}
      </span>
    </div>
  )
}

const STEP_GAPS = [14, 10, 11]

function StepList({
  left,
  color,
  items,
}: {
  left: number
  color: string
  items: string[]
}) {
  return (
    <div
      className="absolute top-[334px] flex flex-col gap-[38px]"
      style={{ left }}
    >
      {items.map((item, i) => (
        <div key={item} className="flex items-center" style={{ gap: STEP_GAPS[i] }}>
          <span
            className="shrink-0 font-satoshi text-[14px] leading-[1.5] tracking-[-0.21px]"
            style={{ color }}
          >
            {`0${i + 1}.`}
          </span>
          {/* Figma keeps every step on a single line, even past the 384px column. */}
          <span
            className="shrink-0 whitespace-nowrap font-satoshi text-[18px] font-medium leading-[1.5] tracking-[-0.27px]"
            style={{ color }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Card 01 — Bring in your numbers                                     */
/* ------------------------------------------------------------------ */

const CASH_BARS = [
  { x: 53.05, top: 0, height: 131.067, color: '#333333', label: '90 days prior' },
  { x: 147.71, top: 42.65, height: 88.418, color: '#cfff92', label: 'Last 90 days' },
  { x: 240.29, top: 29.13, height: 101.941, color: '#333333', label: 'Last 90 days' },
]

const CASH_AXIS = [
  { label: '150k', top: 27.05 },
  { label: '100k', top: 66.578 },
  { label: '50k', top: 106.106 },
  { label: '0', top: 145.634 },
]

const INVOICE_ITEMS = [
  {
    name: 'Linen storage baskets',
    detail: 'Natural – Medium / SKU RT-104',
    amount: '$3,600.00',
    amountX: 148.6,
    nameTop: 55.35,
    detailTop: 64.43,
    amountTop: 59.35,
    detailSize: 4.556,
  },
  {
    name: 'Ceramic planters',
    detail: 'Sage – Set of 2 / SKU RT-208',
    amount: '$2,400.00',
    amountX: 148.6,
    nameTop: 80.39,
    detailTop: 89.46,
    amountTop: 83.35,
    detailSize: 4.556,
  },
  {
    name: 'Freight & handling',
    detail: 'Warehouse delivery – Standard',
    amount: '$180.00',
    amountX: 139.6,
    nameTop: 105.42,
    detailTop: 114.5,
    amountTop: 109.35,
    detailSize: 3.685,
  },
]

export function RoutineCardOne() {
  return (
    <CardShell top={0} z={30} background="#cbfc58" borderColor="rgba(83,163,72,0.2)">
      <StepCircle left={80} number="01" />
      <p className="absolute left-[80px] top-[205px] font-recoleta text-[40px] font-medium leading-[1.5] text-[#191c19]">
        Bring in your numbers
      </p>
      <StepList
        left={72}
        color="#363735"
        items={[
          'Track your current cash balance.',
          'Monitor incoming and outgoing payments.',
          'Keep track of outstanding invoices.',
        ]}
      />

      {/* "Your cash, at a glance" analytics card — Figma 14:8105 */}
      <div className="absolute left-[909.61px] top-[270px] flex w-[360.955px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[24.965px] rounded-[8px] bg-white px-[24.965px] pb-[26.005px] pt-[16.643px]">
        <div className="flex flex-col gap-[8.322px]">
          <div className="flex items-center justify-between">
            <p className="w-[173.923px] font-satoshi text-[16.643px] leading-[1.7] text-[#02140d]">
              Your cash, at a glance
            </p>
            <span className="flex items-center gap-[8.322px] rounded-[16.643px] bg-[#f5f6f4] px-[8.322px] py-[6.241px]">
              <img src={arrowDrop} alt="" className="size-[16.643px]" />
              <span className="font-satoshi text-[12.483px] leading-[14.563px] tracking-[-0.4161px] text-[#98a2b3]">
                16%
              </span>
            </span>
          </div>
          <div className="flex items-center gap-[99.861px] whitespace-nowrap">
            <p className="font-satoshi text-[24.965px] font-medium leading-[1.4] tracking-[-1.0402px] text-[#02140d]">
              204.1K
            </p>
            <p className="font-satoshi text-[12.483px] leading-[1.7] text-[#98a2b3]">
              Total from last 90 days
            </p>
          </div>
        </div>

        {/* Cash chart — Figma 14:8115 */}
        <div className="relative h-[151.872px] w-[311.025px]">
          {CASH_AXIS.map((row) => (
            <div
              key={row.label}
              className="absolute left-0 flex items-center gap-[8.322px]"
              style={{ top: row.top }}
            >
              <span className="w-[24px] font-satoshi text-[12.483px] leading-[14.563px] tracking-[-0.4161px] text-[#98a2b3]">
                {row.label}
              </span>
              <img src={gridline} alt="" className="h-[1.04px] w-[275.658px]" />
            </div>
          ))}

          {CASH_BARS.map((bar, i) => (
            <div
              key={i}
              className="absolute flex w-[65.534px] flex-col items-center gap-[12.483px]"
              style={{ left: bar.x, top: bar.top }}
            >
              <div className="w-full" style={{ height: bar.height, backgroundColor: bar.color }} />
              <span className="w-max whitespace-nowrap font-satoshi text-[12.483px] leading-[14.563px] tracking-[-0.4161px] text-[#98a2b3]">
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Overtime floating card — Figma 14:8140 */}
      <div className="absolute left-[691.07px] top-[420.24px] h-[182.789px] w-[234.749px] -translate-x-1/2 -translate-y-1/2 rotate-[6.58deg] overflow-hidden rounded-[8.011px] bg-white shadow-[0px_3.711px_18.557px_0px_rgba(0,0,0,0.08)]">
        <div className="absolute left-[19.45px] top-[14.85px] flex flex-col leading-[1.7]">
          <p className="w-[196.83px] font-satoshi text-[11.444px] font-bold text-[#0f0f0f]">
            Revenue Overtime
          </p>
          <p className="w-[196.83px] font-satoshi text-[9.155px] tracking-[-0.2861px] text-[#4c4a54] opacity-70">
            Make your database provisioning cloud
          </p>
        </div>

        <div className="absolute left-[19.45px] top-[64.35px] h-[98.987px] w-[196.83px]">
          <img
            src={graphH}
            alt=""
            className="absolute left-[5.72px] top-0 h-[80.105px] w-[183.098px]"
          />
          <img
            src={graphLine}
            alt=""
            className="absolute left-[5.72px] top-[5.15px] h-[52.069px] w-[180.237px]"
          />
          <div className="absolute left-0 top-[88.12px] flex gap-[20.026px] text-center font-satoshi text-[8.011px] leading-[1.7] tracking-[-0.3204px] text-[#4c4a54]">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => (
              <p key={month} className="h-[10.871px] w-[16.021px]">
                {month}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Invoice cluster — Figma 14:8161 */}
      <div className="absolute left-[889px] top-[7px] h-[123.686px] w-[328.357px]">
        <div className="absolute left-0 top-0 h-[123.686px] w-[328.357px] rounded-[8.068px] bg-[#f9faf7]">
          <img
            src={miniDash}
            alt=""
            className="absolute left-1/2 top-[28.24px] h-[21.638px] w-[231.175px] -translate-x-1/2"
          />
        </div>

        <div className="absolute left-[85.4px] top-[45.65px] h-[178.083px] w-[159.025px] drop-shadow-[0px_3px_3.4px_rgba(0,0,0,0.25)]">
          <img
            src={invoiceBg}
            alt=""
            className="absolute left-[0.03px] top-[0.78px] h-[177.302px] w-[158.998px]"
          />

          <p className="absolute left-[8.83px] top-[4.42px] whitespace-nowrap font-recoleta text-[10px] font-medium leading-[1.5] text-[#191c19]">
            Rahman Trading
          </p>
          <p className="absolute left-[8.83px] top-[19.88px] whitespace-nowrap font-satoshi text-[5px] leading-[1.5] text-[#73776f]">
            Thoughtful goods. Lasting partnerships.
          </p>

          <div className="absolute left-1/2 top-[30.35px] h-px w-[142px] -translate-x-1/2 bg-[#063b26]" />
          <div className="absolute left-1/2 top-[148.35px] h-px w-[142px] -translate-x-1/2 bg-[#063b26]" />

          <p className="absolute left-[8.6px] top-[37.35px] whitespace-nowrap font-satoshi text-[8px] leading-[1.5] text-[#73776f]">
            DESCRIPTION
          </p>
          <p className="absolute left-[143.63px] top-[37.45px] -translate-x-full whitespace-nowrap text-right font-satoshi text-[8px] leading-[1.5] text-[#73776f]">
            AMOUNT
          </p>

          {INVOICE_ITEMS.map((item) => (
            <div key={item.name}>
              <p
                className="absolute left-[8.6px] whitespace-nowrap font-satoshi text-[5.467px] font-medium leading-[1.5] text-[#191c19]"
                style={{ top: item.nameTop }}
              >
                {item.name}
              </p>
              <p
                className="absolute left-[8.6px] whitespace-nowrap font-satoshi leading-[1.5] text-[#73776f]"
                style={{ top: item.detailTop, fontSize: item.detailSize }}
              >
                {item.detail}
              </p>
              <p
                className="absolute -translate-x-full whitespace-nowrap text-right font-satoshi text-[8px] font-medium leading-[1.5] text-[rgba(25,28,25,0.8)]"
                style={{ left: item.amountX, top: item.amountTop }}
              >
                {item.amount}
              </p>
            </div>
          ))}

          <p className="absolute left-[8.83px] top-[137.36px] whitespace-nowrap font-satoshi text-[5.086px] leading-[1.5] text-[#73776f]">
            Sales tax (8%)
          </p>
          <p className="absolute left-[109.8px] top-[137.36px] whitespace-nowrap font-satoshi text-[6px] leading-[1.5] text-[#191c19]">
            $494.40
          </p>
          <p className="absolute left-[8.83px] top-[154.07px] whitespace-nowrap font-satoshi text-[5.548px] font-medium leading-[1.5] text-[#191c19]">
            Total (USD)
          </p>
          <p className="absolute left-[107.8px] top-[151.07px] whitespace-nowrap font-satoshi text-[9.247px] font-medium leading-[1.5] text-[#191c19]">
            $6,674.40
          </p>
        </div>
      </div>
    </CardShell>
  )
}

/* ------------------------------------------------------------------ */
/* Card 02 — Set your cash reserve                                     */
/* ------------------------------------------------------------------ */

const CASH_FLOW_DOTS = [
  { left: 10.14, top: 16.9 },
  { left: 47.32, top: 27.04 },
  { left: 84.49, top: 37.18 },
  { left: 121.67, top: 43.94 },
  { left: 158.85, top: 50.69 },
  { left: 196.02, top: 57.45 },
  { left: 233.2, top: 64.21 },
  { left: 270.37, top: 70.97 },
]

const CASH_FLOW_LABELS = [
  { text: 'Today', left: 13.52 },
  { text: '3d', left: 47.32 },
  { text: '6d', left: 84.49 },
  { text: '9d', left: 121.67 },
  { text: '12d', left: 158.85 },
  { text: '15d', left: 196.02 },
  { text: '18d', left: 233.2 },
  { text: '21d', left: 270.37 },
]

export function RoutineCardTwo() {
  return (
    <CardShell top={26} z={20} background="#692671" borderColor="#a14395">
      {/* Faint grid behind the mock */}
      <div className="absolute left-[697px] top-[107.31px] h-[427.658px] w-[432.586px] rounded-[3.224px] bg-white opacity-[0.11]" />
      <img
        src={whiteLinesH}
        alt=""
        className="absolute left-[697px] top-[146.1px] h-[358.182px] w-[432.586px] opacity-[0.14]"
      />
      <div className="absolute left-[732.27px] top-[111.64px] flex h-[422.204px] w-[363.373px] items-center justify-center">
        <img
          src={whiteLinesV}
          alt=""
          className="h-[363.373px] w-[422.204px] rotate-90 opacity-[0.14]"
        />
      </div>

      <StepCircle left={90} number="02" />
      <p className="absolute left-[90px] top-[205px] font-recoleta text-[40px] font-semibold leading-[1.5] text-white">
        Set your cash reserve
      </p>
      <StepList
        left={82}
        color="#ffffff"
        items={[
          'Set your minimum cash threshold.',
          'Identify potential cash shortages.',
          'Plan ahead for upcoming obligations.',
        ]}
      />

      {/* Minimum cash reserve card — Figma 14:7788 */}
      <div className="absolute left-[757.77px] top-[57.41px] h-[287.971px] w-[296.567px] overflow-hidden rounded-[8.596px] bg-white">
        <p className="absolute left-[80.59px] top-[20.42px] whitespace-nowrap font-satoshi text-[34.385px] font-medium leading-[1.5] text-[#191c19]">
          $10,000
        </p>
        <p className="absolute left-[66.62px] top-[77.36px] whitespace-nowrap font-satoshi text-[17.192px] leading-[1.2] tracking-[-0.3438px] text-[#4f514d]">
          Minimum cash reserve
        </p>

        <div className="absolute left-0 top-[135.47px] h-[138.245px] w-[296.567px]">
          <p className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap font-satoshi text-[11.829px] font-medium leading-[1.5] text-[#191c19]">
            Cash flow
          </p>

          <div className="absolute left-0 top-[15.97px] h-[111.529px] w-[296.567px] bg-white">
            {[20.28, 40.56, 60.83, 81.11].map((top) => (
              <div
                key={top}
                className="absolute left-[13.52px] h-[0.845px] w-[280.514px] bg-[#ececec]"
                style={{ top }}
              />
            ))}
            <div
              className="absolute left-[13.52px] top-[45.06px] h-[0.845px] w-[280.514px]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to right, #a14295 0 2px, transparent 2px 5px)',
              }}
            />

            {CASH_FLOW_DOTS.map((dot) => (
              <img
                key={`${dot.left}-${dot.top}`}
                src={chartDot}
                alt=""
                className="absolute size-[6.759px]"
                style={{ left: dot.left, top: dot.top }}
              />
            ))}

            {CASH_FLOW_LABELS.map((label) => (
              <p
                key={label.text}
                className="absolute top-[92.94px] whitespace-nowrap font-satoshi text-[10.139px] font-medium leading-[1.4] text-[#6b7280]"
                style={{ left: label.left }}
              >
                {label.text}
              </p>
            ))}

            <img
              src={projected}
              alt=""
              className="absolute left-[13.52px] top-[20.28px] h-[54.075px] w-[260.235px]"
            />
          </div>
        </div>
      </div>

      {/* Reserve progress card — Figma 14:7816 */}
      <div className="absolute left-[738.43px] top-[365.79px] h-[70.918px] w-[341.697px] overflow-hidden rounded-[10.745px] bg-white">
        <div className="absolute left-1/2 top-1/2 flex w-[303.014px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[7.717px]">
          <div className="flex w-full items-center justify-between whitespace-nowrap font-satoshi text-[13.504px] font-medium leading-[1.5]">
            <p className="text-[#6b7280]">Reserve progress</p>
            <p className="text-[#191c19]">72%</p>
          </div>
          <div className="h-[9.646px] w-full overflow-hidden rounded-[963.628px] bg-[#d2c6d1]">
            <div className="h-full w-[248.865px] rounded-[963.628px] bg-[#a14295]" />
          </div>
        </div>
      </div>
    </CardShell>
  )
}

/* ------------------------------------------------------------------ */
/* Card 03 — Understand & Take Action                                  */
/* ------------------------------------------------------------------ */

const THINGS = [
  { top: 4.7, left: 4.75, rotate: 4.58, dot: '#09df5b', label: 'Invoice Overdue', width: 190.041, plusIcon: plus, dotsIcon: dotsH },
  { top: 51.93, left: 7.04, rotate: -2.42, dot: '#fe5b25', label: 'Receipts missing', width: 190.875, plusIcon: plus, dotsIcon: dotsH2 },
  { top: 91.95, left: 3.66, rotate: 3.36, dot: '#0b0707', label: 'Payment due Friday', width: 186.863, plusIcon: plus, dotsIcon: dotsH3 },
]

export function RoutineCardThree() {
  return (
    <CardShell top={46} z={10} background="#03652b" borderColor="#259846">
      <img
        src={dotMatrix}
        alt=""
        className="pointer-events-none absolute left-[664px] top-[43px] h-[469px] w-[756px] object-cover"
      />

      <StepCircle left={90} number="03" />
      <p className="absolute left-[90px] top-[205px] font-recoleta text-[40px] font-semibold leading-[1.5] text-white">
        Understand &amp; Take Action
      </p>
      <StepList
        left={90}
        color="#ffffff"
        items={[
          'Forecast cash flow and identify potential risks.',
          'Get AI-powered insights and recommendations.',
          'Access your financial assistant through Telegram.',
        ]}
      />

      {/* "3 things this weak" mock — Figma 47:17823 */}
      <div className="absolute left-[732px] top-[141px] h-[269px] w-[239px] overflow-hidden rounded-[9px] bg-[#53a348]">
        <p className="absolute left-[6px] top-[7px] whitespace-nowrap font-satoshi text-[10px] font-medium leading-[1.31] tracking-[0.1px] text-white">
          Text Block
        </p>

        <div className="absolute left-[6px] top-[23px] h-[240px] w-[228px] overflow-hidden rounded-[8px] bg-white">
          <p className="absolute left-[11px] top-[15px] whitespace-nowrap font-satoshi text-[18px] font-medium leading-[1.31] tracking-[0.18px] text-black">
            3 things this weak
          </p>

          <div className="absolute left-[13px] top-[63px] h-[135px] w-[201.326px] overflow-hidden">
            {[4.7, 54.59, 99.78].map((top) => (
              <div
                key={top}
                className="absolute left-1/2 h-[29.935px] w-[196.63px] -translate-x-1/2 rounded-[4.696px] border-[0.88px] border-dashed border-[rgba(59,59,59,0.12)]"
                style={{ top }}
              />
            ))}

            {THINGS.map((thing) => (
              <div
                key={thing.label}
                className="absolute"
                style={{ left: thing.left, top: thing.top, transform: `rotate(${thing.rotate}deg)` }}
              >
                <div
                  className="rounded-[4.696px] bg-[#f5f1ed] p-[7.043px]"
                  style={{ width: thing.width }}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-[4.696px]">
                      <div
                        className="size-[7.043px] shrink-0 rounded-full"
                        style={{ backgroundColor: thing.dot }}
                      />
                      <p className="whitespace-nowrap font-satoshi text-[9.391px] font-medium leading-[1.7] text-[#18181b]">
                        {thing.label}
                      </p>
                    </div>
                    <div className="flex items-center gap-[4.696px]">
                      <img src={thing.plusIcon} alt="" className="size-[9.391px]" />
                      <img src={thing.dotsIcon} alt="" className="size-[9.391px]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attention bar — Figma 47:17856 */}
      <div className="absolute left-[724px] top-[34px] h-[58px] w-[239px] overflow-hidden rounded-[5px] border-2 border-[#53a348] bg-white">
        <div className="absolute left-1/2 top-1/2 flex w-[220px] -translate-x-1/2 -translate-y-1/2 items-center justify-between">
          <div className="flex w-[32px] flex-col items-start overflow-hidden rounded-[9px] bg-[#cbfc58] px-[4px] py-[8px]">
            <div className="relative aspect-[61/40] w-full">
              <img
                src={objectLogo}
                alt=""
                className="absolute left-[0.86%] top-[1.16%] h-[96.57%] w-[99.08%] max-w-none"
              />
            </div>
          </div>
          <p className="w-[174px] font-satoshi text-[13px] font-medium leading-[1.31] tracking-[-0.13px] text-black">
            Whats Needs my attention this week ?
          </p>
        </div>
      </div>

      <img
        src={vector160}
        alt=""
        className="absolute left-[842px] top-[93.5px] h-[40.5px] w-px"
      />
      <img src={dot5} alt="" className="absolute left-[840px] top-[89.08px] size-[5px]" />
      <img src={dot5} alt="" className="absolute left-[840px] top-[130.92px] size-[5px]" />

      {/* Telegram chip — Figma 47:17864 */}
      <div className="absolute left-[1059px] top-[348px] h-[71px] w-[141px] overflow-hidden rounded-[7px] bg-[#53a348]">
        <div className="absolute left-1/2 top-[15px] h-[52px] w-[133px] -translate-x-1/2 overflow-hidden rounded-[6px] bg-white">
          <div className="absolute left-1/2 top-1/2 flex h-[42px] w-[122px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[10px] bg-[#333]">
            <div className="flex items-center gap-[6px]">
              <img src={telegramIcon} alt="" className="size-[22px]" />
              <p className="whitespace-nowrap font-satoshi text-[18px] leading-[1.31] tracking-[-0.18px] text-white">
                Telegram
              </p>
            </div>
          </div>
        </div>
      </div>
      <img src={dot5} alt="" className="absolute left-[1057.5px] top-[380.5px] size-[5px]" />

      <img
        src={illustration}
        alt=""
        className="absolute left-[961.5px] top-[266px] h-[117.5px] w-[97.5px]"
      />
    </CardShell>
  )
}
