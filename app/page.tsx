import Hero from '@/components/sections/Hero'
import WhyShanghai from '@/components/sections/WhyShanghai'
import HowItWorks from '@/components/sections/HowItWorks'
import TreatmentAreas from '@/components/sections/TreatmentAreas'
import CareTeam from '@/components/sections/CareTeam'
import PatientStories from '@/components/sections/PatientStories'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyShanghai />
      <HowItWorks />
      <TreatmentAreas />
      <CareTeam />
      <PatientStories />
      <FAQ />
      <Contact />
    </>
  )
}
