/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

module.exports = {
  cleanDistDir: false,
  webpack: (config, { isServer }) => {
    // Add WebAssembly support
    if (!isServer) {
      config.experiments.asyncWebAssembly = true;
      config.module.rules.push({
        test: /\.wasm$/,
        type: "webassembly/async",
      });
    }
    return config;
  },
};
