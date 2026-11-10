<script setup lang="ts">
import { faqs } from '#shared/data/content'
import { site } from '#shared/data/site'

useSeo({
  title: 'Jurerê Beauté | Salão de Beleza em Jurerê Internacional, Florianópolis',
  description:
    'Salão de beleza na Rua das Algas, 389, Jurerê Internacional. Mechas, morena iluminada, corte, mega hair, Kérastase, penteado, maquiagem e unhas. Nota 5,0 no Google. Agende pelo WhatsApp.',
  path: '/',
})
useHead({ link: [{ rel: 'preload', as: 'image', href: '/video/hero-morena-iluminada.webp', fetchpriority: 'high' }] })
useJsonLd([salonSchema(), websiteSchema(), faqSchema(faqs)])

const ticker = ['Mechas e loiros', 'Morena iluminada', 'Corte e escova', 'Mega hair', 'Kérastase', 'Penteado', 'Maquiagem', 'Unhas em gel', 'Keune', 'Truss']
</script>

<template>
  <div>
    <HomeHero />
    <Marquee :items="ticker" />
    <HomeManifesto />
    <HomeServices />
    <HomeCaseStudy />
    <HomeGallery />
    <HomeKerastase />
    <HomeExperience />
    <HomeReviews />
    <HomeTeam />
    <HomeAgenda />

    <section id="perguntas" class="section" aria-labelledby="faq-title">
      <div class="container faq-grid">
        <header class="faq-head">
          <p class="label">Perguntas frequentes</p>
          <h2 id="faq-title" class="h2" v-reveal>Antes de <em>marcar.</em></h2>
          <p class="muted">Outra dúvida? A recepção responde no WhatsApp {{ site.phoneDisplay }}.</p>
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
    top: calc(var(--header-h) + 40px);
  }
}

.faq-head {
  display: grid;
  gap: 22px;
}
</style>
