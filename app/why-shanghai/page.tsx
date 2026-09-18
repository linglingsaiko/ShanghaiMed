import type { Metadata } from 'next'
import PageHeading from '@/components/PageHeading'

export const metadata: Metadata = {
  title: 'Why Shanghai - World-Class Medical Destination',
  description:
    'Discover why Shanghai has become a leading destination for international medical tourism. Learn about 47 international insurance direct-payment hospitals, 13 public Grade-A medical institutions, and affordable world-class healthcare.',
}

export default function WhyShanghaiPage() {
  return (
    <PageHeading
      titleKey="pages.whyShanghaiTitle"
      subtitleKey="pages.whyShanghaiSubtitle"
      fallbackTitle="Why Shanghai?"
      fallbackSubtitle="Shanghai has emerged as a premier destination for international patients seeking world-class medical care at accessible prices."
    />
  )
}
