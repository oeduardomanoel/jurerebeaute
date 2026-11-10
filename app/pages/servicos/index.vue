<script setup lang="ts">
import { services } from '#shared/data/services'

useSeo({
  title: 'Serviços do Jurerê Beauté | Cabelo, maquiagem e unhas em Jurerê Internacional',
  description: 'Mechas e loiros, morena iluminada, corte e escova, mega hair, tratamentos Kérastase e Keune, penteado, maquiagem e unhas na Rua das Algas, 389, Jurerê Internacional.',
  path: '/servicos',
})
const base = useSiteUrl()
useJsonLd([
  salonSchema(),
  breadcrumbSchema([{ name: 'Início', path: '/' }, { name: 'Serviços', path: '/servicos' }]),
  { '@type': 'ItemList', name: 'Serviços do Jurerê Beauté', itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${base}/servicos/${s.slug}`, name: s.name })) },
])
</script>

<template>
  <div>
    <header class="sx dark">
      <div class="container sx-in">
        <nav class="sx-crumbs intro" aria-label="Você está em"><NuxtLink to="/">Início</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">Serviços</span></nav>
        <h1 class="sx-title">
          <span class="line-mask"><span style="--d: 100">Serviços do</span></span>
          <span class="line-mask"><span style="--d: 220"><em>Jurerê Beauté</em></span></span>
        </h1>
        <p class="lead intro" style="--d: 400">Cabelo, maquiagem e unhas na Rua das Algas, 389, em Jurerê Internacional. Escolha um serviço para ver fotos, avaliações e perguntas.</p>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <ul class="sx-grid">
          <li v-for="(s, i) in services" :key="s.slug" :class="`c${i % 3}`">
            <NuxtLink :to="`/servicos/${s.slug}`" class="sx-card zoom">
              <span class="frame sx-img" v-reveal="{ type: 'clip', delay: (i % 3) * 0.08 }"><Pic :name="s.image" :alt="s.name" sizes="(min-width: 960px) 30vw, 90vw" /></span>
              <span class="sx-meta"><span class="sx-n">{{ s.index }}</span><span class="label">{{ s.kicker }}</span></span>
              <span class="h3 sx-name">{{ s.name }}</span>
              <span class="muted">{{ s.card }}</span>
              <span class="link">Ver serviço <Icon name="arrow" /></span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <HomeAgenda />
    <FinalCta />
  </div>
</template>

<style scoped>
.sx {
  padding: calc(var(--header-h) + clamp(40px, 7vw, 96px)) 0 clamp(64px, 8vw, 110px);
  background: radial-gradient(90% 70% at 90% 10%, rgba(233, 176, 76, 0.14), transparent 60%), var(--noir);
}

.sx-in {
  display: grid;
  gap: 26px;
}

.sx-crumbs {
  display: flex;
  gap: 10px;
  font-size: 0.875rem;
  color: var(--muted-dark);
}

.sx-title {
  font-family: var(--f-display);
  font-weight: 400;
  font-size: var(--t-h1);
  line-height: 1;
}

.sx-title em {
  font-family: var(--f-script);
  font-style: normal;
  font-size: 1.5em;
  line-height: 0.7;
  color: var(--gold-hi);
}

.sx .lead {
  color: rgba(245, 241, 234, 0.88);
  max-width: 52ch;
}

.sx-grid {
  display: grid;
  gap: 64px 28px;
}

@media (min-width: 760px) {
  .sx-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .sx-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .sx-grid .c1 {
    margin-top: 80px;
  }
}

.sx-card {
  display: grid;
  gap: 12px;
}

.sx-img {
  display: block;
  aspect-ratio: 4 / 5;
  border-radius: 18px;
}

.c1 .sx-img {
  border-radius: 999px 999px 18px 18px;
}

.sx-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 8px;
}

.sx-n {
  font-family: var(--f-display);
  font-weight: 300;
  font-size: 1.25rem;
  color: var(--gold-text);
}

.sx-name {
  transition: color 0.3s;
}

.sx-card:hover .sx-name {
  color: var(--gold-text);
}

.sx-card .link {
  justify-self: start;
}
</style>
