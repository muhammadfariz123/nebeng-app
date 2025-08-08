import type { NextConfig } from "next"
import { NextConfig as NextConfigType } from "next"
import { join } from "path"

const nextConfig: NextConfigType = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default nextConfig
