import Hero from '@/components/sections/Hero'
import WhyShanghai from '@/components/sections/WhyShanghai'
import HowItWorks from '@/components/sections/HowItWorks'
import ProcessFlow from '@/components/sections/ProcessFlow'
import TreatmentAreas from '@/components/sections/TreatmentAreas'
import CareTeam from '@/components/sections/CareTeam'
import Pricing from '@/components/sections/Pricing'
import FindDoctor from '@/components/sections/FindDoctor'
import LatestInsights from '@/components/sections/LatestInsights'
import Contact from '@/components/sections/Contact'

export default function LocalizedHomePage() {
  return (
    <>
      <Hero />
      <WhyShanghai />
      <HowItWorks />
      <ProcessFlow />
      <TreatmentAreas />
      <CareTeam />
      <Pricing />
      <FindDoctor />
      <LatestInsights />
      <Contact />
    </>
  )
}
