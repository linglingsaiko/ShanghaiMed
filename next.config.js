/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // English lives on the root paths (/); send /en links to the English site
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
      // Patient stories page redirects to blog category (stories live inside the blog module)
      { source: '/patient-stories', destination: '/blog?category=patient-stories', permanent: true },
      { source: '/:lang/patient-stories', destination: '/:lang/blog?category=patient-stories', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'trae-api-cn.mchost.guru',
      },
    ],
  },
}

module.exports = nextConfig