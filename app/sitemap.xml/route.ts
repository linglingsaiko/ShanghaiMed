import { getSortedPosts, getCategories } from '@/lib/blog-server'

export async function GET() {
  const posts = getSortedPosts()
  const categories = getCategories()
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shanghaimedhealth.com'
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`
  
  // Static pages
  const staticPages = [
    { path: '/blog', changefreq: 'daily', priority: '0.8' },
    { path: '/research', changefreq: 'weekly', priority: '0.9' },
    { path: '/founder', changefreq: 'monthly', priority: '0.7' },
    { path: '/editorial-policy', changefreq: 'monthly', priority: '0.5' },
    { path: '/how-it-works', changefreq: 'monthly', priority: '0.7' },
    { path: '/treatments', changefreq: 'monthly', priority: '0.7' },
    { path: '/why-shanghai', changefreq: 'monthly', priority: '0.7' },
    { path: '/care-team', changefreq: 'monthly', priority: '0.6' },
    { path: '/contact', changefreq: 'monthly', priority: '0.6' },
    { path: '/faq', changefreq: 'monthly', priority: '0.6' },
    { path: '/patient-stories', changefreq: 'monthly', priority: '0.6' },
  ]
  
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  })
  
  categories.forEach(category => {
    sitemap += `
  <url>
    <loc>${baseUrl}/blog?category=${category.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  })
  
  posts.forEach(post => {
    sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.publishDate).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>`
    
    if (post.featuredImage) {
      sitemap += `
    <image:image>
      <image:loc>${baseUrl}${post.featuredImage}</image:loc>
      <image:caption>${post.title}</image:caption>
    </image:image>`
    }
    
    sitemap += `
  </url>`
  })
  
  sitemap += `
</urlset>`
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
