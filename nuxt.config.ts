import { services } from './shared/data/services'
import { site } from './shared/data/site'

const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://jurerebeaute.vercel.app').replace(/\/$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  css: ['~/assets/css/fonts.css', '~/assets/css/main.css'],

  runtimeConfig: {
    public: { siteUrl },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      meta: [
        { name: 'theme-color', content: '#121110' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'geo.region', content: 'BR-SC' },
        { name: 'geo.placename', content: 'Jurerê Internacional, Florianópolis' },
        { name: 'geo.position', content: `${site.geo.lat};${site.geo.lng}` },
        { name: 'ICBM', content: `${site.geo.lat}, ${site.geo.lng}` },
      ],
      link: [
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/allison.woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/montserrat.woff2', crossorigin: '' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'alternate', type: 'text/plain', title: 'llms.txt', href: '/llms.txt' },
      ],
      script: [
        // Liga as animações só com JS e sem "reduzir movimento". Sem JS, todo o conteúdo aparece.
        {
          innerHTML: "(function(d){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.documentElement.classList.add('motion')}}catch(e){}})(document)",
          tagPosition: 'head',
        },
      ],
    },
  },

  routeRules: {
    '/**': { prerender: true },
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/video/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/servicos', ...services.map((s) => `/servicos/${s.slug}`), '/privacidade', '/sitemap.xml', '/robots.txt', '/llms.txt', '/llms-full.txt'],
    },
    compressPublicAssets: true,
  },

  experimental: {
    defaults: { nuxtLink: { trailingSlash: 'remove' } },
  },
})
