const config = require('./developer.json')
const siteTitle = `${config.name} | ${config.role}`

export default defineNuxtConfig({
  compatibilityDate: '2025-02-28',
  devtools: { enabled: true },
  target: 'static',
  app: {
    baseURL: '/', // For custom domain
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: siteTitle,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Personal Portfolio of Pradip Dhungana.' },
        { hid: 'og:title', property: 'og:title', content: siteTitle },
        { hid: 'og:description', property: 'og:description', content: 'Personal Portfolio of Pradip Dhungana.' },
        { hid: 'og:image', property: 'og:image', content: '/demo-share.jpg' },
        { hid: 'og:url', property: 'og:url', content: 'https://dhunganapradip.com.np/' },
        { name: 'theme-color', content: '#010C15' },
      ],
      link: [
        { rel: 'manifest', href: '/pwa/manifest.json' },
        { rel: 'apple-touch-icon', href: '/pwa/icons/apple-touch-icon.png' },
      ],
    },
  },
  nitro: {
    prerender: {
      failOnError: false // Allow generation despite 404s
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  components: {
    dirs: [
      '~/components',
    ],
  },
  tailwindcss: {
    cssPath: '~/assets/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: true,
    injectPosition: 0,
    viewer: false,
  },
  runtimeConfig: {
    apiSecret: '123',
    public: {
      apiBase: '/api',
    },
  },
})