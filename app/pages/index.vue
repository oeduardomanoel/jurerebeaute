<script setup lang="ts">
import { faqs } from '#shared/data/content'
import { site } from '#shared/data/site'

useSeo({
  title: 'Jurerê Beauté | Salão de Beleza em Jurerê Internacional, Florianópolis',
  description:
    'Mechas, morena iluminada, corte, mega hair, Kérastase, penteado, maquiagem e unhas na Rua das Algas, 389. Salão nota 5,0 no Google em Jurerê Internacional. Agende pelo WhatsApp.',
  path: '/',
})

useHead({
  link: [{ rel: 'preload', as: 'image', href: '/video/hero-morena-iluminada.webp', fetchpriority: 'high' }],
})

useJsonLd([
  salonSchema(),
  websiteSchema(),
  faqSchema(faqs),
  {
    '@type': 'WebPage',
    '@id': `${useSiteUrl()}/#home`,
    url: `${useSiteUrl()}/`,
    name: 'Jurerê Beauté, salão de beleza em Jurerê Internacional',
    inLanguage: 'pt-BR',
    isPartOf: { '@id': `${useSiteUrl()}/#site` },
    about: { '@id': `${useSiteUrl()}/#salao` },
    primaryImageOfPage: `${useSiteUrl()}/og/jurere-beaute.jpg`,
  },
])

const ticker = ['Mechas', 'Morena iluminada', 'Corte', 'Kérastase', 'Escova', 'Mega hair', 'Penteado', 'Maquiagem', 'Unhas em gel', 'Keune']
</script>

<template>
  <div>
    <HomeHero />
    <Ticker :items="ticker" />
    <HomeManifesto />
    <HomeStats />
    <HomeServices />
    <HomeCaseStudy />
    <HomeGallery />
    <HomeMethod />
    <HomeBoutique />
    <HomeDetails />
    <HomeReviews />
    <HomeTeam />
    <HomeBooking />
    <HomeLocation />

    <section id="perguntas" class="section faq-sec" aria-labelledby="faq-title">
      <div class="container faq-grid">
        <header class="faq-head">
          <p class="eyebrow">Perguntas frequentes</p>
          <h2 id="faq-title" class="h2" v-reveal>Antes de <em>marcar.</em></h2>
          <p class="muted">
            Não achou a sua? Manda no WhatsApp {{ site.phoneDisplay }}. A recepção responde de terça a sábado.
          </p>
        </header>
        <FaqList :items="faqs" />
      </div>
    </section>

    <FinalCta />
  </div>
</template>

<style scoped>
.faq-grid {
  display: grid;
  gap: 48px;
}

@media (min-width: 960px) {
  .faq-grid {
    grid-template-columns: 0.8fr 1.2fr;
    gap: clamp(48px, 7vw, 120px);
    align-items: start;
  }

  .faq-head {
    position: sticky;
    top: calc(var(--header-h) + 48px);
  }
}

.faq-head {
  display: grid;
  gap: 24px;
}

.faq-head p.muted {
  max-width: 36ch;
}
</style>
