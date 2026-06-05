import Hero from '@/components/sections/Hero'
import WhyShanghai from '@/components/sections/WhyShanghai'
import HowItWorks from '@/components/sections/HowItWorks'
import ProcessFlow from '@/components/sections/ProcessFlow'
import TreatmentAreas from '@/components/sections/TreatmentAreas'
import CareTeam from '@/components/sections/CareTeam'
import Pricing from '@/components/sections/Pricing'
import LatestInsights from '@/components/sections/LatestInsights'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyShanghai />
      <HowItWorks />
      <ProcessFlow />
      <TreatmentAreas />
      <CareTeam />
      <Pricing />
      <LatestInsights />
      <FAQ />
      <Contact />
    </>
  )
}
