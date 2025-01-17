// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxt/fonts',
    "@nuxt/ui",
    "nuxt-vercel-analytics"
  ],
  plugins: [
    { src: "/plugins/localbase.ts", mode: "client" },
    { src: "/plugins/analytics.client.ts", mode: "client" },
  ],
})
