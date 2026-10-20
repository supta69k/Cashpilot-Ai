import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './components/Hero'
import FeatureWays from './components/FeatureWays'
import Statement from './components/Statement'
import Routine from './components/Routine'
import Funnel from './components/Funnel'
import Invoices from './components/Invoices'
import RiskCards from './components/RiskCards'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.addEventListener('loadingdone', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      document.fonts?.removeEventListener('loadingdone', refresh)
    }
  }, [])

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#f7f6f4' }}>
      <Hero />
      <FeatureWays />
      <Statement />
      <Routine />
      <Funnel />
      <Invoices />
      <RiskCards />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}

export default App
