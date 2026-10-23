import windowControls from '../assets/icons/window-controls.svg'
import lockKeyhole from '../assets/icons/lock-keyhole.svg'
import layoutDashboard from '../assets/icons/layout-dashboard.svg'
import chartNoAxes from '../assets/icons/chart-no-axes.svg'
import fileText from '../assets/icons/file-text.svg'
import bell from '../assets/icons/bell.svg'
import sparkles from '../assets/icons/sparkles.svg'
import sparkles1 from '../assets/icons/sparkles-1.svg'
import history from '../assets/icons/history.svg'
import objectLogo from '../assets/icons/object.webp'
import plotArea from '../assets/icons/plot-area.svg'

const NAV_ITEMS = [
  { icon: layoutDashboard, label: 'Overview', active: true },
  { icon: chartNoAxes, label: 'Cash flow' },
  { icon: fileText, label: 'Invoices' },
  { icon: bell, label: 'Alerts' },
  { icon: sparkles, label: 'AI copilot' },
  { icon: history, label: 'Activity log' },
]

const METRICS = [
  { label: 'Current cash balance', sub: 'Available today', value: '$48,000', pct: '+ 22.4%', positive: true },
  { label: 'Expected incoming', sub: 'Next 30 days', value: '$64,000', pct: '+ 12.4%', positive: false },
  { label: 'Upcoming outgoing', sub: 'Next 30 days', value: '$83,000', pct: '+ 22.4%', positive: true },
]

const SUMMARY = [
  { label: 'Projected minimum', value: '$648.04 · Jun 9' },
  { label: 'Overdue receivables', value: '$1,498.58 · 3 invoices' },
  { label: 'Active financial alerts', value: '4 · Prioritized for you' },
]

export default function Dashboard({ isMobile = false }: { isMobile?: boolean }) {
  if (isMobile) {
    return (
      <div className="dashboard-mockup relative w-full rounded-xl sm:rounded-2xl border border-[#e8eae3] bg-white shadow-[0px_20px_60px_0px_rgba(36,50,33,0.08)] overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center h-8 sm:h-9 bg-[#f3f5ef] px-3 sm:px-4 relative">
          <img src={windowControls} alt="" className="h-[6px] sm:h-[7px] w-[26px] sm:w-[31px]" />
          <span className="absolute left-1/2 -translate-x-1/2 font-satoshi text-[9px] sm:text-[10px] text-[#73776f] leading-[1.5]">
            app.cashpilot.ai / overview
          </span>
          <img src={lockKeyhole} alt="" className="absolute right-3 h-2.5 w-2.5 sm:h-3 sm:w-3" />
        </div>

        {/* Dashboard content */}
        <div className="bg-[#fcfdfb] p-3 sm:p-5">
          {/* Top brand & assistant row */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#e8eae3]/60">
            <div className="flex items-center gap-1.5">
              <img src={objectLogo} alt="CashPilot" className="h-[12px] w-[18px] object-contain" />
              <span className="font-satoshi font-medium text-[12px] sm:text-[14px] text-[#191c19]">
                CashPilot AI
              </span>
              <span className="text-[10px] text-[#73776f] hidden sm:inline">· Rahman Trading</span>
            </div>
            <div className="flex items-center gap-1 h-[26px] sm:h-[30px] rounded-[6px] bg-[#cbfc58] px-2 sm:px-2.5">
              <img src={sparkles1} alt="" className="size-3 sm:size-3.5" />
              <span className="font-satoshi font-medium text-[10px] sm:text-[11px] text-[#191c19]">
                Ask CashPilot
              </span>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h2 className="font-recoleta text-[17px] sm:text-[22px] text-[#191c19] leading-tight">
              Your cash, at a glance
            </h2>
            <p className="font-satoshi text-[10px] sm:text-[11px] text-[#73776f] leading-[1.4] mt-0.5">
              Monday, 1 June 2026 · Illustrative workspace
            </p>
          </div>

          {/* Metrics: 3-column clean segmented grid */}
          <div className="grid grid-cols-3 mt-3 border border-[#e8eae3] rounded-[8px] sm:rounded-[10px] overflow-hidden bg-white divide-x divide-[#e8eae3]">
            {METRICS.map((m, i) => (
              <div key={m.label} className="p-2 sm:p-3 bg-white flex flex-col justify-between">
                <p className="font-satoshi text-[9px] sm:text-[11px] text-[#73776f] leading-[1.3] truncate">
                  {m.label}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5 mt-1 sm:mt-1.5">
                  <span
                    className={`font-satoshi ${
                      i === 0 ? 'font-normal' : 'font-medium'
                    } text-[14px] sm:text-[20px] text-[#191c19] leading-tight`}
                  >
                    {m.value}
                  </span>
                  <span
                    className={`inline-flex items-center justify-center w-fit px-1 py-0.5 rounded-[4px] text-[7.5px] sm:text-[9px] font-satoshi ${
                      m.positive
                        ? 'bg-[rgba(83,163,72,0.2)] border-[0.6px] border-[#87cd5a] text-[#87cd5a]'
                        : 'bg-[rgba(217,116,84,0.2)] border-[0.6px] border-[#fd805f] text-[#fd805f]'
                    }`}
                  >
                    {m.pct}
                  </span>
                </div>
                <p className="font-satoshi text-[8px] sm:text-[9.5px] text-[#73776f] leading-[1.3] mt-1 sm:mt-2 truncate">
                  {m.sub}
                </p>
              </div>
            ))}
          </div>

          {/* 30-day forecast preview */}
          <div className="mt-3 bg-white border border-[#e8eae3] rounded-[8px] sm:rounded-[10px] p-2.5 sm:p-3.5">
            <div className="flex items-center justify-between">
              <p className="font-satoshi text-[11px] sm:text-[13px] text-[#191c19] leading-[1.4] font-medium">
                30-day cash-flow forecast
              </p>
              <span className="inline-flex items-center h-[20px] sm:h-[24px] rounded-md bg-[#f3f5ef] px-1.5 sm:px-2 font-satoshi font-medium text-[9px] sm:text-[10px] text-[#73776f]">
                June 2026
              </span>
            </div>
            <div className="flex gap-3 font-satoshi text-[9px] sm:text-[10px] leading-[1.4] mt-1.5">
              <span className="text-[#53a348]">● Projected balance</span>
              <span className="text-[#73776f]">- - Reserve $810.04</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-mockup relative w-full rounded-2xl border border-[#e8eae3] bg-white shadow-[0px_20px_60px_0px_rgba(36,50,33,0.08)] overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center h-9 bg-[#f3f5ef] px-4 relative">
        <img src={windowControls} alt="" className="h-[7px] w-[31px]" />
        <span className="absolute left-1/2 -translate-x-1/2 font-satoshi text-[10px] text-[#73776f] leading-[1.5]">
          app.cashpilot.ai / overview
        </span>
        <img src={lockKeyhole} alt="" className="absolute right-3 h-3 w-3" />
      </div>

      {/* Application */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[180px] shrink-0 border-r border-[#e8eae3] py-[18px] pl-[18px] pr-[18px] flex flex-col">
          {/* App identity */}
          <div className="flex items-center gap-[7px]">
            <img src={objectLogo} alt="CashPilot" className="h-[12.46px] w-[19px] object-contain" />
            <span className="font-satoshi font-medium text-[15px] text-[#191c19] leading-[1.5] whitespace-nowrap">
              CashPilot AI
            </span>
          </div>

          {/* Navigation */}
          <nav className="mt-[28px] flex flex-col gap-[6px]">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className={`flex items-center h-[35px] rounded-md px-[9px] gap-[8px] ${
                  item.active ? 'bg-[#cbfc58]' : 'bg-white'
                }`}
              >
                <img src={item.icon} alt="" className="h-[14px] w-[14px]" />
                <span className="font-satoshi text-[11px] text-[#191c19] leading-[1.5]">
                  {item.label}
                </span>
              </div>
            ))}
          </nav>

          {/* Workspace details */}
          <div className="mt-[28px]">
            <div className="h-px bg-[#e8eae3]" />
            <p className="mt-[9px] font-satoshi text-[10px] text-[#73776f] leading-[1.5] tracking-wider">
              WORKSPACE
            </p>
            <p className="mt-[8px] font-satoshi text-[11px] text-[#191c19] leading-[1.5]">
              Rahman Trading
            </p>
            <div className="mt-[8px] inline-flex items-center h-[27px] rounded-md bg-[#f3f5ef] px-[10px]">
              <span className="font-satoshi font-medium text-[11px] text-[#73776f] leading-[1.5]">
                Owner access
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="flex-1 bg-[#fcfdfb] p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-recoleta text-[23px] text-[#191c19] leading-[1.5]">
                Your cash, at a glance
              </h2>
              <p className="font-satoshi text-[11px] text-[#73776f] leading-[1.5] mt-[5px]">
                Monday, 1 June 2026 · Illustrative workspace
              </p>
            </div>
            <div className="flex items-center gap-[7px] h-[37px] rounded-[7px] bg-[#cbfc58] px-[10px] mt-[9px]">
              <img src={sparkles1} alt="" className="h-[14px] w-[14px]" />
              <span className="font-satoshi font-medium text-[11px] text-[#191c19] leading-[1.5]">
                Ask CashPilot
              </span>
            </div>
          </div>

          {/* Cash overview metrics */}
          <div className="flex mt-[18px] gap-0">
            {METRICS.map((m, i) => (
              <div
                key={m.label}
                className={`flex-1 bg-white border border-[#e8eae3] py-4 px-4 ${
                  i === 0 ? 'rounded-l-[10px]' : i === METRICS.length - 1 ? 'rounded-r-[10px]' : ''
                } ${i > 0 ? '-ml-px' : ''}`}
              >
                <p className="font-satoshi text-[11px] text-[#73776f] leading-[1.5]">{m.label}</p>
                <div className="flex items-center gap-3 mt-[9px]">
                  <span className={`font-satoshi ${i === 0 ? 'font-normal' : 'font-medium'} text-[25px] text-[#191c19] leading-[1.5]`}>
                    {m.value}
                  </span>
                  <span
                    className={`inline-flex items-center justify-center px-[7.2px] py-[1.6px] rounded-[7.2px] text-[9.6px] leading-[1.17] tracking-[-0.096px] font-satoshi ${
                      m.positive
                        ? 'bg-[rgba(83,163,72,0.2)] border-[0.8px] border-[#87cd5a] text-[#87cd5a]'
                        : 'bg-[rgba(217,116,84,0.2)] border-[0.8px] border-[#fd805f] text-[#fd805f]'
                    }`}
                  >
                    {m.pct}
                  </span>
                </div>
                <p className="font-satoshi text-[10px] text-[#73776f] leading-[1.5] mt-[16px]">{m.sub}</p>
              </div>
            ))}
          </div>

          {/* Forecast + Attention row */}
          <div className="flex mt-[18px] gap-4">
            {/* Forecast panel */}
            <div className="flex-[604] bg-white border border-[#e8eae3] rounded-[10px] p-[17px]">
              <div className="flex items-center justify-between">
                <p className="font-satoshi text-[14px] text-[#191c19] leading-[1.5]">
                  30-day cash-flow forecast
                </p>
                <span className="inline-flex items-center h-[27px] rounded-md bg-[#f3f5ef] px-[10px] font-satoshi font-medium text-[11px] text-[#73776f] leading-[1.5]">
                  June 2026
                </span>
              </div>

              <div className="mt-[14px]">
                {/* Legend */}
                <div className="flex gap-[21px] font-satoshi text-[11px] leading-[1.5]">
                  <span className="text-[#53a348]">● Projected balance</span>
                  <span className="text-[#73776f]">- - Reserve $810.04</span>
                </div>

                {/* Chart */}
                <div className="flex mt-[12px]">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between font-satoshi text-[10px] text-[#73776f] leading-[1.5] pr-3 shrink-0 w-[38px]">
                    <span>4.86k</span>
                    <span>3.24k</span>
                    <span>1.62k</span>
                    <span>0</span>
                  </div>
                  {/* Plot area */}
                  <div className="flex-1 relative">
                    <img src={plotArea} alt="" className="w-full h-[158px]" />
                  </div>
                </div>

                {/* X-axis */}
                <div className="flex font-satoshi text-[10px] text-[#73776f] leading-[1.5] mt-[12px] pl-[38px]">
                  <span className="w-[116px]">Jun 1</span>
                  <span className="w-[120px]">Jun 9</span>
                  <span className="w-[124px]">Jun 16</span>
                  <span className="w-[126px]">Jun 23</span>
                  <span>Jun 30</span>
                </div>
              </div>

              {/* Summary */}
              <div className="flex items-center justify-between mt-[14px]">
                <span className="font-satoshi text-[10px] text-[#73776f] leading-[1.5]">
                  Projected closing balance
                </span>
                <span className="font-satoshi text-[13px] text-[#53a348] leading-[1.5]">
                  $2,916.16
                </span>
              </div>
            </div>

            {/* Attention panel */}
            <div className="w-[352px] shrink-0 bg-white border border-[#e8eae3] rounded-[10px] p-[15px]">
              <div className="flex items-center justify-between">
                <p className="font-satoshi text-[13px] text-[#191c19] leading-[1.5]">
                  Needs attention
                </p>
                <span className="inline-flex items-center h-[27px] rounded-md bg-[#fff8dd] px-[10px] font-satoshi font-medium text-[11px] text-[#9b6d1b] leading-[1.5]">
                  4 active
                </span>
              </div>

              <div className="mt-[12px] bg-[rgba(214,255,115,0.22)] rounded-lg p-3">
                <p className="font-satoshi text-[12px] text-[#191c19] leading-[1.5]">
                  Reserve shortfall in 8 days
                </p>
                <p className="font-satoshi text-[10px] text-[#9b6d1b] leading-[1.5] mt-[7px]">
                  Projected minimum: $648.04<br />
                  $162.01 below your reserve.
                </p>
                <p className="font-satoshi text-[10px] text-[#191c19] leading-[1.5] mt-[7px]">
                  Review forecast →
                </p>
              </div>

              <p className="font-satoshi font-medium text-[11px] text-[#191c19] leading-[1.5] mt-[12px]">
                3 overdue invoices
              </p>
              <p className="font-satoshi text-[19px] text-[#191c19] leading-[1.5] mt-[1px]">
                $1,498.58
              </p>
              <p className="font-satoshi text-[10px] text-[#73776f] leading-[1.5] mt-[12px]">
                Prepare customer follow-ups →
              </p>
            </div>
          </div>

          {/* Dashboard summary */}
          <div className="flex mt-[18px] gap-[12px]">
            {SUMMARY.map((s) => (
              <div key={s.label} className="flex-1">
                <p className="font-satoshi text-[10px] text-[#73776f] leading-[1.5]">{s.label}</p>
                <p className="font-satoshi font-medium text-[12px] text-[#191c19] leading-[1.5] mt-[2px]">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
