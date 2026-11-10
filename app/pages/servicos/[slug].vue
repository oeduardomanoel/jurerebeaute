<script setup lang="ts">
import { serviceBySlug, services } from '#shared/data/services'
import { site, waLink } from '#shared/data/site'

const route = useRoute()
const service = serviceBySlug(String(route.params.slug))
if (!service) {
  throw createError({ statusCode: 404, statusMessage: 'Serviço não encontrado', fatal: true })
}
const s = service!
const related = s.related.map((r) => serviceBySlug(r)!).filter(Boolean)
const base = useSiteUrl()

useSeo({
  title: s.seoTitle,
  description: s.seoDescription,
  path: `/servicos/${s.slug}`,
  image: `/images/${s.image}-1080.webp`,
  imageAlt: s.title,
})

useJsonLd([
  salonSchema(),
  {
    '@type': 'Service',
    '@id': `${base}/servicos/${s.slug}#servico`,
    name: s.name,
    serviceType: s.name,
    description: s.seoDescription,
    url: `${base}/servicos/${s.slug}`,
    image: `${base}/images/${s.image}-1080.webp`,
    provider: { '@id': `${base}/#salao` },
    areaServed: [
      { '@type': 'Place', name: 'Jurerê Internacional' },
      { '@type': 'City', name: 'Florianópolis' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: s.name,
      itemListElement: s.highlights.map((h) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: h } })),
    },
  },
  breadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Serviços', path: '/servicos' },
    { name: s.name, path: `/servicos/${s.slug}` },
  ]),
  faqSchema(s.faq),
])

const video = ref<HTMLVideoElement>()
let io: IntersectionObserver | null = null
onMounted(() => {
  if (!video.value) return
  io = new IntersectionObserver(([e]) => (e?.isIntersecting ? video.value?.play().catch(() => {}) : video.value?.pause()), { threshold: 0.2 })
  io.observe(video.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <article class="svc">
    <header class="svc-hero theme-dark">
      <div class="container svc-hero-grid">
        <div class="svc-hero-copy">
          <nav class="crumbs caps intro" aria-label="Você está em">
            <NuxtLink to="/">Início</NuxtLink>
            <span aria-hidden="true">/</span>
            <NuxtLink to="/servicos">Serviços</NuxtLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{{ s.name }}</span>
          </nav>
          <p class="eyebrow intro" style="--d: 80">{{ s.index }} · {{ s.kicker }}</p>
          <h1 class="display svc-title">
            <span class="line-mask"><span style="--d: 140">{{ s.title }}</span></span>
          </h1>
          <p class="lead svc-lead intro" style="--d: 380">{{ s.lead }}</p>
          <div class="svc-cta intro" style="--d: 500">
            <a class="btn btn--gold btn--lg" :href="waLink(s.wa)" target="_blank" rel="noopener" data-cta="service-hero">
              <Icon name="whatsapp" /> Agendar avaliação
            </a>
            <a class="hero-rating" :href="site.googleReviews" target="_blank" rel="noopener">
              <span class="stars" aria-hidden="true"><Icon v-for="i in 5" :key="i" name="star" /></span>
              {{ site.rating.display }} · {{ site.rating.count }} avaliações
            </a>
          </div>
        </div>
        <figure class="svc-hero-img frame arch intro-mask" style="--d: 120">
          <Pic :name="s.image" :alt="s.title" eager sizes="(min-width: 960px) 36vw, 90vw" />
        </figure>
      </div>
    </header>

    <section class="section svc-body">
      <div class="container svc-body-grid">
        <div class="svc-text">
          <p class="eyebrow">Como a gente faz</p>
          <div class="prose svc-prose" v-reveal>
            <p v-for="(p, i) in s.body" :key="i">{{ p }}</p>
          </div>
          <ul class="svc-highlights" v-reveal="'stagger'">
            <li v-for="h in s.highlights" :key="h"><Icon name="sparkle" /> {{ h }}</li>
          </ul>
        </div>

        <aside class="svc-aside">
          <figure v-if="s.video" class="svc-video frame" v-reveal="'clip'">
            <video ref="video" :src="s.video.src" :poster="s.video.poster" muted loop playsinline preload="none" :aria-label="s.video.caption" />
            <figcaption class="caps">{{ s.video.caption }}</figcaption>
          </figure>
          <figure v-else class="svc-video frame" v-reveal="'clip'">
            <Pic :name="s.gallery[0]!" :alt="`${s.name} no Jurerê Beauté`" sizes="(min-width: 960px) 30vw, 90vw" />
          </figure>
        </aside>
      </div>
    </section>

    <section class="section theme-bone svc-steps-sec" aria-labelledby="passos-title">
      <div class="container">
        <header class="svc-steps-head">
          <p class="eyebrow">Passo a passo</p>
          <h2 id="passos-title" class="h2" v-reveal>Do jeito que <em>acontece aqui.</em></h2>
        </header>
        <ol class="svc-steps" v-reveal="'stagger'">
          <li v-for="(st, i) in s.steps" :key="st.title">
            <span class="num svc-step-n">0{{ i + 1 }}</span>
            <h3 class="h3">{{ st.title }}</h3>
            <p class="muted">{{ st.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="section svc-gallery-sec" aria-labelledby="galeria-title">
      <div class="container">
        <header class="svc-gal-head">
          <p class="eyebrow">Resultados</p>
          <h2 id="galeria-title" class="h2" v-reveal>{{ s.name }}. <em>Saiu daqui.</em></h2>
        </header>
        <ul class="svc-gal">
          <li v-for="(g, i) in s.gallery" :key="g" class="zoom" :class="`g${i % 4}`">
            <figure class="frame" v-reveal="{ type: 'clip', delay: (i % 3) * 0.08 }">
              <Pic :name="g" :alt="`${s.name}: resultado de cliente no Jurerê Beauté`" sizes="(min-width: 960px) 30vw, 46vw" />
            </figure>
          </li>
        </ul>
      </div>
    </section>

    <section v-if="s.quote" class="section theme-dark svc-quote-sec">
      <div class="container">
        <figure class="svc-quote" v-reveal>
          <span class="stars" aria-hidden="true"><Icon v-for="i in 5" :key="i" name="star" /></span>
          <blockquote>
            <p>“{{ s.quote.text }}”</p>
          </blockquote>
          <figcaption class="caps">{{ s.quote.author }}</figcaption>
        </figure>
      </div>
    </section>

    <section class="section svc-faq" aria-labelledby="svc-faq-title">
      <div class="container svc-faq-grid">
        <header>
          <p class="eyebrow">Dúvidas</p>
          <h2 id="svc-faq-title" class="h2" v-reveal>Sobre {{ s.name.toLowerCase() }}</h2>
        </header>
        <FaqList :items="s.faq" />
      </div>
    </section>

    <HomeBooking :preselect="s.slug" />

    <section class="section svc-related" aria-labelledby="rel-title">
      <div class="container">
        <header class="svc-rel-head">
          <p class="eyebrow">Combina com</p>
          <h2 id="rel-title" class="h2">Outros serviços</h2>
        </header>
        <ul class="svc-rel" v-reveal="'stagger'">
          <li v-for="r in related" :key="r.slug">
            <NuxtLink :to="`/servicos/${r.slug}`" class="rel-card zoom">
              <span class="rel-img frame arch"><Pic :name="r.image" :alt="r.name" sizes="(min-width: 960px) 26vw, 80vw" /></span>
              <span class="rel-meta">
                <span class="num rel-n">{{ r.index }}</span>
                <span class="h3 rel-name">{{ r.name }}</span>
              </span>
              <span class="muted rel-card-text">{{ r.card }}</span>
            </NuxtLink>
          </li>
        </ul>
        <p class="svc-all"><NuxtLink to="/servicos" class="link-line">Ver todos os {{ services.length }} serviços <Icon name="arrow" /></NuxtLink></p>
      </div>
    </section>

    <FinalCta :message="s.wa" />
  </article>
</template>

<style scoped>
.svc-hero {
  padding-top: calc(var(--header-h) + clamp(32px, 6vw, 72px));
  padding-bottom: clamp(64px, 8vw, 110px);
  background:
    radial-gradient(90% 70% at 90% 10%, rgba(201, 161, 90, 0.14), transparent 60%),
    var(--noir);
}

.svc-hero-grid {
  display: grid;
  gap: 48px;
  align-items: center;
}

@media (min-width: 960px) {
  .svc-hero-grid {
    grid-template-columns: 1.2fr 0.8fr;
    gap: clamp(48px, 7vw, 120px);
  }
}

.svc-hero-copy {
  display: grid;
  gap: 24px;
  justify-items: start;
}

.crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.6rem;
  color: var(--muted-dark);
}

.crumbs a:hover {
  color: var(--gold-hi);
}

.svc-title {
  font-size: clamp(2.6rem, 1.8rem + 4vw, 5.6rem);
  line-height: 1;
  text-wrap: balance;
}

.svc-lead {
  color: rgba(245, 239, 230, 0.8);
  max-width: 46ch;
}

.svc-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 24px;
}

.hero-rating {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  color: rgba(245, 239, 230, 0.8);
}

.svc-hero-img {
  margin: 0;
  aspect-ratio: 3 / 4;
  width: min(100%, 440px);
  justify-self: center;
}

.svc-body-grid {
  display: grid;
  gap: 56px;
}

@media (min-width: 960px) {
  .svc-body-grid {
    grid-template-columns: 1.1fr 0.9fr;
    gap: clamp(48px, 8vw, 140px);
    align-items: start;
  }
}

.svc-text {
  display: grid;
  gap: 28px;
}

.svc-prose p:first-child {
  font-family: var(--f-display);
  font-size: var(--step-2);
  line-height: 1.3;
}

.svc-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.svc-highlights li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.9rem;
}

.svc-highlights :deep(.icon) {
  color: var(--gold-deep);
  width: 14px;
  height: 14px;
}

.svc-video {
  margin: 0;
  aspect-ratio: 9 / 14;
  border-radius: var(--radius);
  width: min(100%, 420px);
  justify-self: center;
}

.svc-video figcaption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 48px 20px 18px;
  font-size: 0.58rem;
  color: var(--ivory);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
}

.svc-steps-head,
.svc-gal-head,
.svc-rel-head {
  display: grid;
  gap: 20px;
  margin-bottom: clamp(40px, 6vw, 72px);
}

.svc-steps {
  display: grid;
  gap: 0;
  border-top: 1px solid var(--line);
}

@media (min-width: 760px) {
  .svc-steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .svc-steps {
    grid-template-columns: repeat(4, 1fr);
  }
}

.svc-steps li {
  display: grid;
  gap: 12px;
  align-content: start;
  padding: 32px 24px 40px 0;
  border-bottom: 1px solid var(--line);
}

@media (min-width: 1100px) {
  .svc-steps li + li {
    padding-left: 24px;
    border-left: 1px solid var(--line);
  }
}

.svc-step-n {
  font-size: 1.6rem;
  color: var(--gold-deep);
}

.svc-gal {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (min-width: 960px) {
  .svc-gal {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .svc-gal .g1 {
    margin-top: 64px;
  }
}

.svc-gal figure {
  margin: 0;
  aspect-ratio: 3 / 4;
  border-radius: var(--radius);
}

.svc-gal .g2 figure {
  border-radius: 999px 999px var(--radius) var(--radius);
}

.svc-quote {
  display: grid;
  justify-items: center;
  gap: 28px;
  text-align: center;
  max-width: 920px;
  margin-inline: auto;
}

.svc-quote p {
  font-family: var(--f-display);
  font-size: var(--step-3);
  line-height: 1.22;
  text-wrap: balance;
}

.svc-quote figcaption {
  color: var(--gold);
  font-size: 0.64rem;
}

.svc-faq-grid {
  display: grid;
  gap: 40px;
}

@media (min-width: 960px) {
  .svc-faq-grid {
    grid-template-columns: 0.8fr 1.2fr;
    gap: clamp(48px, 7vw, 120px);
  }
}

.svc-faq-grid header {
  display: grid;
  gap: 20px;
  align-content: start;
}

.svc-rel {
  display: grid;
  gap: 40px 24px;
}

@media (min-width: 760px) {
  .svc-rel {
    grid-template-columns: repeat(3, 1fr);
  }
}

.rel-card {
  display: grid;
  gap: 16px;
}

.rel-img {
  aspect-ratio: 4 / 5;
}

.rel-meta {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.rel-n {
  color: var(--gold-deep);
}

.rel-name {
  transition: color 0.3s;
}

.rel-card:hover .rel-name {
  color: var(--gold-deep);
  font-style: italic;
}

.rel-card-text {
  font-size: 0.94rem;
}

.svc-all {
  margin-top: 48px;
}
</style>
