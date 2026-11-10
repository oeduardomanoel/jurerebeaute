<script setup lang="ts">
import { waLink } from '#shared/data/site'

// nav-split (dealt): as palavras à esquerda, o nome no meio, o botão principal à direita.
// O menu do celular e o estado do botão ficam com o system.js do kit.
const props = withDefaults(defineProps<{ home?: boolean }>(), { home: true })
const base = computed(() => (props.home ? '' : '/'))
const nav = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Trabalhos', href: '#trabalhos' },
  { label: 'Perguntas', href: '/perguntas', abs: true },
  { label: 'Visita', href: '#visit' },
]
</script>

<template>
  <header class="nav nav--split">
    <div class="wrap nav__bar">
      <a class="skip-link" href="#top">Pular para o conteúdo</a>
      <a class="nav__logo" href="/" aria-label="Jurerê Beauté, início"><Monogram class="jb" />Jurerê Beauté</a>
      <nav class="nav__links" aria-label="Principal">
        <div v-for="item in nav" :key="item.href" class="nav__item">
          <a class="nav__link" :href="item.abs ? item.href : base + item.href">{{ item.label }}</a>
        </div>
      </nav>
      <div class="nav__actions">
        <a class="btn btn--primary" :href="waLink('Oi! Quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener" data-cta="nav">Agendar pelo WhatsApp</a>
      </div>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg>
      </button>
    </div>
  </header>
</template>
