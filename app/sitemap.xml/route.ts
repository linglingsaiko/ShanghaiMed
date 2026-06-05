import { getSortedPosts, getCategories } from '@/lib/blog-server'

export async function GET() {
  const posts = getSortedPosts()
  const categories = getCategories()
  
  const baseUrl = 'https://shanghaimed.com'
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  
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
