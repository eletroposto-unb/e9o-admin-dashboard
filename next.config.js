/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
