import BlogPageComponent from './BlogPageComponent'

export default function BlogPage({ searchParams }: { searchParams: { page?: string; category?: string; tag?: string; search?: string } }) {
  return <BlogPageComponent searchParams={searchParams} />
}

export function generateMetadata() {
  return {
    title: 'Blog | ShanghaiMed - Healthcare in Shanghai',
    description: 'Discover articles about healthcare in Shanghai, medical tourism, wellness, and preventive medicine.',
    keywords: ['Shanghai healthcare', 'medical tourism', 'health checkup', 'China medical', 'international patients'],
  }
}
