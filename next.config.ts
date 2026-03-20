import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Handle problematic native modules
    config.externals = config.externals || [];
    config.externals.push({
      '@mapbox/node-pre-gyp': 'commonjs @mapbox/node-pre-gyp'
    });

    return config;
  },
};

export default nextConfig;
