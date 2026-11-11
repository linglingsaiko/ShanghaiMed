/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/medical-records/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.sandbox.paypal.com https://www.paypal.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://www.sandbox.paypal.com https://www.paypal.com https://www.paypalobjects.com",
              "connect-src 'self' https://www.sandbox.paypal.com https://www.paypal.com",
              "frame-src https://www.sandbox.paypal.com https://www.paypal.com",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
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