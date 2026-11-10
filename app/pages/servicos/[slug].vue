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
  faqSchema(s.faq),
])
const strip = s.gallery.slice(0, 4)
</script>

<template>
  <section class="hero hero--split" data-enter aria-labelledby="hero-h">
    <div class="wrap">
      <div class="hero-text grid hero-split">
        <div class="hero-copy span-6">
          <p class="hero-notice"><a class="link" href="/servicos">Serviços</a> do Jurerê Beauté, Rua das Algas, 389</p>
          <h1 id="hero-h">{{ s.title }}</h1>
          <p class="t-lead">{{ s.lead }}</p>
          <div class="btn-row">
            <a class="btn btn--primary" :href="waLink(s.wa)" target="_blank" rel="noopener" data-cta="service-hero">Agendar pelo WhatsApp<svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path class="m-arrow__stem" d="M1 6h8" /><path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" /></svg></a>
          </div>
        </div>
        <div class="hero-visual frame frame--photo span-6 start-7">
          <Pic class="frame__img" :name="s.image" :alt="s.title" eager sizes="(min-width: 1024px) 628px, 92vw" />
        </div>
      </div>
    </div>
  </section>

  <section id="como" class="section" aria-labelledby="como-h">
    <div class="wrap grid grid--top">
      <div class="span-6">
        <div class="section-head">
          <h2 id="como-h">Como a gente faz {{ s.name.toLowerCase() }}</h2>
        </div>
        <div class="prose stack-4">
          <p v-for="(p, i) in s.body" :key="i">{{ p }}</p>
        </div>
        <p class="t-label svc-label">O que entra</p>
        <ul class="rows">
          <li v-for="h in s.highlights" :key="h"><span class="rows__name">{{ h }}</span></li>
        </ul>
      </div>
      <figure class="pl-photo pl-photo--end span-6 start-7" style="--pl-r: .8">
        <Pic :name="s.gallery[0]!" :alt="`${s.name} feito no Jurerê Beauté`" sizes="(min-width: 1024px) 588px, 92vw" />
      </figure>
    </div>
  </section>

  <section id="passos" class="section" aria-labelledby="passos-h">
    <div class="wrap">
      <div class="section-head section-head--split">
        <h2 id="passos-h">Do primeiro contato ao retorno</h2>
        <p>Quatro passos, na ordem em que acontecem.</p>
      </div>
      <ol class="grid svc-steps">
        <li v-for="(st, i) in s.steps" :key="st.title" class="span-3">
          <span class="step-num">{{ i + 1 }}</span>
          <h3>{{ st.title }}</h3>
          <p>{{ st.text }}</p>
        </li>
      </ol>
      <div class="grid svc-strip">
        <a v-for="g in strip" :key="g" class="span-3" :href="site.instagram" target="_blank" rel="noopener"><Pic :name="g" :alt="`${s.name}: trabalho de cliente do salão`" sizes="(min-width: 1024px) 282px, 46vw" /></a>
      </div>
    </div>
  </section>

  <section id="duvidas" class="section" aria-labelledby="duvidas-h">
    <div class="wrap grid grid--top">
      <div class="span-6">
        <div class="section-head">
          <h2 id="duvidas-h">Dúvidas sobre {{ s.name.toLowerCase() }}</h2>
        </div>
        <figure v-if="s.quote" class="quote svc-quote">
          <blockquote>“{{ s.quote.text }}”</blockquote>
          <figcaption>{{ s.quote.author }}</figcaption>
        </figure>
        <p class="svc-related">Combina com: <template v-for="(r, i) in related" :key="r.slug"><a class="link" :href="`/servicos/${r.slug}`">{{ r.name }}</a><span v-if="i < related.length - 1">, </span></template>.</p>
      </div>
      <div class="faq span-6 start-7">
        <div v-for="f in s.faq" :key="f.q" class="faq__item">
          <h3>{{ f.q }}</h3>
          <p>{{ f.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
