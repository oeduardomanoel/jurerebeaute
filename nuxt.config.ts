import { services } from './shared/data/services'
import { site } from './shared/data/site'

const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://jurerebeaute.com.br').replace(/\/$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  css: ['~/assets/css/fonts.css', '~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      siteUrl,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      titleTemplate: '%s',
      meta: [
        { name: 'theme-color', content: '#14120F' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'geo.region', content: 'BR-SC' },
        { name: 'geo.placename', content: 'Jurerê Internacional, Florianópolis' },
        { name: 'geo.position', content: `${site.geo.lat};${site.geo.lng}` },
        { name: 'ICBM', content: `${site.geo.lat}, ${site.geo.lng}` },
      ],
      link: [
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/bodoni-moda-normal-latin.woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/jost-normal-latin.woff2', crossorigin: '' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'alternate', type: 'text/plain', title: 'llms.txt', href: '/llms.txt' },
      ],
      script: [
        // Liga as animações só quando há JS e o usuário não pediu movimento reduzido.
        // Sem JS, todo o conteúdo aparece normalmente (bom para SEO e acessibilidade).
        {
          innerHTML:
            "(function(d){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.documentElement.classList.add('motion')}}catch(e){}})(document)",
          tagPosition: 'head',
        },
      ],
    },
  },

  routeRules: {
    '/**': { prerender: true },
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/video/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/servicos',
        ...services.map((s) => `/servicos/${s.slug}`),
        '/privacidade',
        '/sitemap.xml',
        '/robots.txt',
        '/llms.txt',
        '/llms-full.txt',
      ],
    },
    compressPublicAssets: true,
  },

  experimental: {
    defaults: {
      nuxtLink: { trailingSlash: 'remove' },
    },
  },

  vite: {
    build: { cssCodeSplit: true },
  },
})
