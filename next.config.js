/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@milkdown/crepe', '@milkdown/core', '@milkdown/preset-commonmark', '@milkdown/theme-nord', '@milkdown/plugin-listener'],
}

module.exports = nextConfig
