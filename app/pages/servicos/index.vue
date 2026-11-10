<script setup lang="ts">
import { services } from '#shared/data/services'
import { waLink } from '#shared/data/site'

useSeo({
  title: 'Serviços do Jurerê Beauté: cabelo, maquiagem e unhas em Jurerê Internacional',
  description: 'Mechas, morena iluminada, corte, mega hair, tratamentos Kérastase e Keune, penteado, maquiagem e unhas na Rua das Algas, 389, Jurerê Internacional.',
  path: '/servicos',
})
const base = useSiteUrl()
useJsonLd([
  salonSchema(),
  breadcrumbSchema([{ name: 'Início', path: '/' }, { name: 'Serviços', path: '/servicos' }]),
  { '@type': 'ItemList', name: 'Serviços do Jurerê Beauté', itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${base}/servicos/${s.slug}`, name: s.name })) },
])
const first = services.slice(0, 4)
const second = services.slice(4)
</script>

<template>
  <section class="hero hero--split" data-enter aria-labelledby="hero-h">
    <div class="wrap">
      <div class="hero-text grid hero-split">
        <div class="hero-copy span-6">
          <h1 id="hero-h">Serviços de cabelo, maquiagem e unhas em Jurerê</h1>
          <p class="t-lead">Sete serviços na Rua das Algas, 389. O valor sai depois da avaliação do seu cabelo, com hora marcada de terça a sábado.</p>
          <div class="btn-row">
            <a class="btn btn--primary" :href="waLink('Oi! Quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener" data-cta="servicos-hero">Agendar pelo WhatsApp<svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path class="m-arrow__stem" d="M1 6h8" /><path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" /></svg></a>
          </div>
        </div>
        <div class="hero-visual frame frame--photo span-6 start-7">
          <Pic class="frame__img" name="mechas-efeito-natural-1" alt="Mechas com efeito natural, a colorista arrumando o cabelo da cliente" eager sizes="(min-width: 1024px) 628px, 92vw" />
        </div>
      </div>
    </div>
  </section>

  <section id="cabelo" class="section" aria-labelledby="cabelo-h">
    <div class="wrap">
      <div class="section-head"><h2 id="cabelo-h">Cor, corte e comprimento</h2></div>
      <div class="grid">
        <a v-for="s in first" :key="s.slug" class="tile span-3" :href="`/servicos/${s.slug}`">
          <span class="tile__media"><Pic :name="s.image" :alt="s.name" sizes="(min-width: 1024px) 282px, 46vw" /></span>
          <span class="tile__head"><span class="t-card">{{ s.name }}</span></span>
          <span class="t-small muted">{{ s.card }}</span>
        </a>
      </div>
    </div>
  </section>

  <section id="cuidado" class="section" aria-labelledby="cuidado-h">
    <div class="wrap">
      <div class="section-head"><h2 id="cuidado-h">Tratamento, produção e unhas</h2></div>
      <div class="grid">
        <a v-for="s in second" :key="s.slug" class="tile span-4" :href="`/servicos/${s.slug}`">
          <span class="tile__media"><Pic :name="s.image" :alt="s.name" sizes="(min-width: 1024px) 384px, 92vw" /></span>
          <span class="tile__head"><span class="t-card">{{ s.name }}</span></span>
          <span class="t-small muted">{{ s.card }}</span>
        </a>
      </div>
    </div>
  </section>
</template>
