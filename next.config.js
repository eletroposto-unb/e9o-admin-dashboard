/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
        {
            source: '/',
            destination: '/login',
            basePath: false,
            permanent: false
        }
    ]
  }
}

module.exports = nextConfig
