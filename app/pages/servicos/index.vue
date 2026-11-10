<script setup lang="ts">
import { services } from '#shared/data/services'

useSeo({
  title: 'Serviços | Jurerê Beauté, salão em Jurerê Internacional',
  description:
    'Mechas e loiros, morena iluminada, corte e escova, mega hair, tratamentos Kérastase e Keune, penteado, maquiagem e unhas em Jurerê Internacional, Florianópolis.',
  path: '/servicos',
})

const base = useSiteUrl()
useJsonLd([
  salonSchema(),
  breadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Serviços', path: '/servicos' },
  ]),
  {
    '@type': 'ItemList',
    name: 'Serviços do Jurerê Beauté',
    itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${base}/servicos/${s.slug}`, name: s.name })),
  },
])
</script>

<template>
  <div>
    <header class="sx-hero theme-dark">
      <div class="container sx-hero-inner">
        <nav class="crumbs caps intro" aria-label="Você está em">
          <NuxtLink to="/">Início</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">Serviços</span>
        </nav>
        <h1 class="display sx-title">
          <span class="line-mask"><span style="--d: 100">Serviços do</span></span>
          <span class="line-mask"><span style="--d: 220"><em>Jurerê Beauté</em></span></span>
        </h1>
        <p class="lead intro" style="--d: 400">
          Cabelo, make e unhas em Jurerê Internacional. Escolha um serviço para ver como funciona, resultados e dúvidas comuns.
        </p>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <ul class="sx-grid">
          <li v-for="(s, i) in services" :key="s.slug" :class="`c${i % 3}`">
            <NuxtLink :to="`/servicos/${s.slug}`" class="sx-card zoom">
              <span class="sx-img frame" v-reveal="{ type: 'clip', delay: (i % 3) * 0.08 }">
                <Pic :name="s.image" :alt="s.name" sizes="(min-width: 960px) 30vw, 90vw" />
              </span>
              <span class="sx-meta">
                <span class="num sx-n">{{ s.index }}</span>
                <span class="caps sx-k">{{ s.kicker }}</span>
              </span>
              <span class="h3 sx-name">{{ s.name }}</span>
              <span class="muted">{{ s.card }}</span>
              <span class="link-line">Ver serviço <Icon name="arrow" /></span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <HomeBooking />
    <FinalCta />
  </div>
</template>

<style scoped>
.sx-hero {
  padding-top: calc(var(--header-h) + clamp(40px, 7vw, 96px));
  padding-bottom: clamp(64px, 8vw, 110px);
  background:
    radial-gradient(90% 70% at 90% 10%, rgba(201, 161, 90, 0.14), transparent 60%),
    var(--noir);
}

.sx-hero-inner {
  display: grid;
  gap: 28px;
}

.crumbs {
  display: flex;
  gap: 10px;
  font-size: 0.6rem;
  color: var(--muted-dark);
}

.sx-title {
  font-size: var(--step-5);
}

.sx-hero .lead {
  color: rgba(245, 239, 230, 0.8);
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
  gap: 14px;
}

.sx-img {
  aspect-ratio: 4 / 5;
  border-radius: var(--radius);
}

.c1 .sx-img {
  border-radius: 999px 999px var(--radius) var(--radius);
}

.sx-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 8px;
}

.sx-n {
  color: var(--gold-deep);
  font-size: 1.2rem;
}

.sx-k {
  font-size: 0.6rem;
  color: var(--muted);
}

.sx-name {
  font-size: var(--step-3);
  transition: color 0.3s;
}

.sx-card:hover .sx-name {
  color: var(--gold-deep);
  font-style: italic;
}

.sx-card .link-line {
  justify-self: start;
  margin-top: 6px;
}
</style>
