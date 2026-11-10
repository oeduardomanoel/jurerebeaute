<script setup lang="ts">
// O sistema da taste-skill (assets/system.css, motion, layout e moments) carregado como arquivos simples,
// na ordem do starter. O Nuxt gera o HTML; a interação fica com os scripts do kit (routeRules noScripts).
const route = useRoute()
const home = computed(() => route.path === '/')

useHead({
  htmlAttrs: {
    'lang': 'pt-BR',
    'data-type': 'place',
    'data-radius': 'soft',
    'data-buttons': 'arrow',
    'data-motion': '',
  },
  meta: [
    { name: 'site-kind', content: 'other' },
    { name: 'page-type', content: 'place' },
    { name: 'page-kind', content: 'place' },
  ],
  link: [
    { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/newsreader-normal-latin.woff2', crossorigin: '' },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/hanken-grotesk-normal-latin.woff2', crossorigin: '' },
    { rel: 'stylesheet', href: '/assets/system.css' },
    { rel: 'stylesheet', href: '/assets/ui/cards.css' },
    { rel: 'stylesheet', href: '/assets/motion/motion.css' },
    { rel: 'stylesheet', href: '/assets/layout/layout.css' },
    { rel: 'stylesheet', href: '/assets/page.css' },
    { rel: 'modulepreload', href: '/assets/moments/moments.js' },
    { rel: 'modulepreload', href: '/assets/moments/lib.js' },
  ],
  script: [
    { innerHTML: "document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)", tagPosition: 'head' },
    { innerHTML: "document.documentElement.classList.add('mo-js');setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)", tagPosition: 'head' },
    { type: 'module', src: '/assets/system.js', tagPosition: 'bodyClose' },
    { type: 'module', src: '/assets/motion/motion.js', tagPosition: 'bodyClose' },
    { type: 'module', src: '/assets/layout/layout.js', tagPosition: 'bodyClose' },
    { type: 'module', src: '/assets/site.js', tagPosition: 'bodyClose' },
  ],
})
</script>

<template>
  <SiteHeader :home="home" />
  <main id="top">
    <slot />
  </main>
  <SiteFooter />
  <MobileBar />
</template>
