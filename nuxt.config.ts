// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],
  css: ['~/assets/css/main.css'],
  
  // ADD THIS BLOCK
  image: {
    domains: [
      'cdn.discordapp.com'
    ]
  },
  
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      commitSha: process.env.CF_PAGES_COMMIT_SHA || 'N/A'
    }
  },
})
