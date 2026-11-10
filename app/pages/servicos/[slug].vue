<script setup lang="ts">
import { serviceBySlug } from '#shared/data/services'
import { site, waLink } from '#shared/data/site'

const route = useRoute()
const found = serviceBySlug(String(route.params.slug))
if (!found) throw createError({ statusCode: 404, statusMessage: 'Serviço não encontrado', fatal: true })
const s = found!
const related = s.related.map((r) => serviceBySlug(r)!).filter(Boolean)
const base = useSiteUrl()

useSeo({ title: s.seoTitle, description: s.seoDescription, path: `/servicos/${s.slug}`, image: `/images/${s.image}-1080.webp`, imageAlt: s.title })
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
    areaServed: [{ '@type': 'Place', name: 'Jurerê Internacional' }, { '@type': 'City', name: 'Florianópolis' }],
  },
  breadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Serviços', path: '/servicos' },
    { name: s.name, path: `/servicos/${s.slug}` },
  ]),
  ...(s.faq.length ? [faqSchema(s.faq)] : []),
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
  <article>
    <header class="sh dark">
      <div class="container sh-grid">
        <div class="sh-copy">
          <nav class="sh-crumbs intro" aria-label="Você está em">
            <NuxtLink to="/">Início</NuxtLink><span aria-hidden="true">/</span><NuxtLink to="/servicos">Serviços</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">{{ s.name }}</span>
          </nav>
          <p class="label intro" style="--d: 60">{{ s.index }} · {{ s.kicker }}</p>
          <h1 class="sh-title"><span class="line-mask"><span style="--d: 120">{{ s.title }}</span></span></h1>
          <p class="lead sh-lead intro" style="--d: 360">{{ s.lead }}</p>
          <div class="sh-cta intro" style="--d: 480">
            <a class="btn btn--gold btn--lg" :href="waLink(s.wa)" target="_blank" rel="noopener" data-cta="service-hero"><Icon name="whatsapp" /> Agendar pelo WhatsApp</a>
            <a class="sh-rating" :href="site.googleReviews" target="_blank" rel="noopener"><span class="stars" aria-hidden="true"><Icon v-for="i in 5" :key="i" name="star" /></span> {{ site.rating.display }} no Google</a>
          </div>
        </div>
        <figure class="sh-img frame intro" style="--d: 200">
          <Pic :name="s.image" :alt="s.title" eager sizes="(min-width: 960px) 38vw, 92vw" />
        </figure>
      </div>
    </header>

    <section class="section">
      <div class="container sb-grid">
        <div class="sb-text">
          <p class="label">No salão</p>
          <div class="prose sb-prose" v-reveal>
            <p v-for="(p, i) in s.body" :key="i">{{ p }}</p>
          </div>
          <ul class="sb-facts" v-reveal="'stagger'">
            <li v-for="f in s.facts" :key="f" class="chip"><Icon name="sparkle" /> {{ f }}</li>
          </ul>
        </div>
        <figure class="sb-media frame" v-reveal="'clip'">
          <video v-if="s.video" ref="video" :src="s.video.src" :poster="s.video.poster" muted loop playsinline preload="none" :aria-label="`${s.name} no Jurerê Beauté`" />
          <Pic v-else :name="s.gallery[0]!" :alt="`${s.name} no Jurerê Beauté`" sizes="(min-width: 960px) 34vw, 92vw" />
        </figure>
      </div>
    </section>

    <section class="section dark">
      <div class="container">
        <header class="sg-head">
          <p class="label">Do Instagram do salão</p>
          <h2 class="h2" v-reveal>{{ s.name }}, <em>feito aqui.</em></h2>
        </header>
        <ul class="sg-grid">
          <li v-for="(g, i) in s.gallery" :key="g" :class="`g${i % 3}`">
            <a :href="site.instagram" target="_blank" rel="noopener" class="sg-item zoom" v-reveal="{ type: 'clip', delay: (i % 3) * 0.08 }">
              <span class="frame sg-frame"><Pic :name="g" :alt="`${s.name}: foto de cliente do salão`" sizes="(min-width: 960px) 30vw, 46vw" /></span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <section v-if="s.quotes.length" class="section sand">
      <div class="container">
        <p class="label">Avaliações do Google</p>
        <div class="sq-grid" v-reveal="'stagger'">
          <figure v-for="q in s.quotes" :key="q.author" class="sq">
            <span class="stars" aria-hidden="true"><Icon v-for="i in 5" :key="i" name="star" /></span>
            <blockquote><p>“{{ q.text }}”</p></blockquote>
            <figcaption>{{ q.author }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section v-if="s.faq.length" class="section">
      <div class="container sf-grid">
        <header class="sf-head">
          <p class="label">Dúvidas</p>
          <h2 class="h2" v-reveal>Sobre {{ s.name.toLowerCase() }}</h2>
        </header>
        <FaqList :items="s.faq" />
      </div>
    </section>

    <HomeAgenda :preselect="s.slug" />

    <section class="section">
      <div class="container">
        <header class="sr-head">
          <p class="label">Combina com</p>
          <h2 class="h2">Outros serviços</h2>
        </header>
        <ul class="sr-grid" v-reveal="'stagger'">
          <li v-for="r in related" :key="r.slug">
            <NuxtLink :to="`/servicos/${r.slug}`" class="sr-card zoom">
              <span class="frame sr-img"><Pic :name="r.image" :alt="r.name" sizes="(min-width: 960px) 28vw, 90vw" /></span>
              <span class="h3 sr-name">{{ r.name }} <Icon name="arrow-up-right" /></span>
              <span class="muted">{{ r.card }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <FinalCta :message="s.wa" />
  </article>
</template>

<style scoped>
.sh {
  padding: calc(var(--header-h) + clamp(32px, 6vw, 72px)) 0 clamp(64px, 8vw, 110px);
  background: radial-gradient(90% 70% at 90% 10%, rgba(233, 176, 76, 0.14), transparent 60%), var(--noir);
}

.sh-grid {
  display: grid;
  gap: 48px;
  align-items: center;
}

@media (min-width: 960px) {
  .sh-grid {
    grid-template-columns: 1.15fr 0.85fr;
    gap: clamp(48px, 7vw, 120px);
  }
}

.sh-copy {
  display: grid;
  gap: 22px;
  justify-items: start;
}

.sh-crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.875rem;
  color: var(--muted-dark);
}

.sh-crumbs a:hover {
  color: var(--gold-hi);
}

.sh-title {
  font-family: var(--f-display);
  font-weight: 400;
  font-size: clamp(2.6rem, 1.8rem + 4vw, 5.4rem);
  line-height: 1.02;
  text-wrap: balance;
}

.sh-lead {
  color: rgba(245, 241, 234, 0.88);
  max-width: 44ch;
}

.sh-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 24px;
}

.sh-rating {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
}

.sh-img {
  margin: 0;
  aspect-ratio: 3 / 4;
  width: min(100%, 460px);
  justify-self: center;
  border-radius: 999px 999px 22px 22px;
}

.sb-grid {
  display: grid;
  gap: 56px;
}

@media (min-width: 960px) {
  .sb-grid {
    grid-template-columns: 1.1fr 0.9fr;
    gap: clamp(48px, 8vw, 140px);
    align-items: start;
  }
}

.sb-text {
  display: grid;
  gap: 26px;
}

.sb-prose p:first-child {
  font-family: var(--f-display);
  font-size: clamp(1.5rem, 1.2rem + 1vw, 2.1rem);
  line-height: 1.3;
}

.sb-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.sb-facts .chip {
  background: #fff;
}

.sb-facts :deep(.icon) {
  color: var(--gold-text);
  width: 16px;
  height: 16px;
}

.sb-media {
  margin: 0;
  aspect-ratio: 9 / 14;
  width: min(100%, 420px);
  justify-self: center;
  border-radius: 22px;
}

.sg-head,
.sf-head,
.sr-head {
  display: grid;
  gap: 18px;
  margin-bottom: clamp(40px, 6vw, 72px);
}

.sg-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (min-width: 960px) {
  .sg-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .sg-grid .g1 {
    margin-top: 64px;
  }
}

.sg-item {
  display: block;
}

.sg-frame {
  display: block;
  aspect-ratio: 3 / 4;
  border-radius: 16px;
}

.sg-grid .g2 .sg-frame {
  border-radius: 999px 999px 16px 16px;
}

.sq-grid {
  display: grid;
  gap: 20px;
  margin-top: 28px;
}

@media (min-width: 900px) {
  .sq-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

.sq {
  display: grid;
  gap: 16px;
  align-content: start;
  padding: 30px;
  border-radius: 18px;
  background: var(--ivory);
  border: 1px solid var(--line);
  transition: transform 0.5s var(--ease), border-color 0.3s;
}

.sq:hover {
  transform: translateY(-4px);
  border-color: var(--gold);
}

.sq blockquote p {
  font-family: var(--f-display);
  font-size: var(--t-lead);
  line-height: 1.4;
}

.sq figcaption {
  font-weight: 700;
  color: var(--muted);
}

.sf-grid {
  display: grid;
  gap: 40px;
}

@media (min-width: 960px) {
  .sf-grid {
    grid-template-columns: 0.8fr 1.2fr;
    gap: clamp(48px, 7vw, 120px);
  }
}

.sr-grid {
  display: grid;
  gap: 40px 24px;
}

@media (min-width: 760px) {
  .sr-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.sr-card {
  display: grid;
  gap: 14px;
}

.sr-img {
  display: block;
  aspect-ratio: 4 / 5;
  border-radius: 18px;
}

.sr-name {
  display: flex;
  align-items: center;
  gap: 10px;
  transition: color 0.3s;
}

.sr-name :deep(.icon) {
  color: var(--gold-text);
  transition: transform 0.45s var(--ease);
}

.sr-card:hover .sr-name {
  color: var(--gold-text);
}

.sr-card:hover .sr-name :deep(.icon) {
  transform: translate(3px, -3px);
}
</style>
