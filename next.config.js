const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

module.exports = withStoreConfig({
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@medusajs/product"],
  },
  features: store.features,
  reactStrictMode: true,
  images: {
    domains: [
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      "https://yzdev-f878f26a0f77.herokuapp.com",
      "yzdev.s3.eu-west-3.amazonaws.com",
      "iili.io",
      "medusa-server-testing.s3.amazonaws.com",
    ],
  },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
