<script setup lang="ts">
import { site, waLink } from '#shared/data/site'

const root = ref<HTMLElement>()
const video = ref<HTMLVideoElement>()
const { $motion } = useNuxtApp()

onMounted(() => {
  const m = $motion as any
  // Em conexão lenta ou economia de dados, fica só o pôster.
  const conn = (navigator as any).connection
  if (video.value && !(conn?.saveData || /2g/.test(conn?.effectiveType || ''))) {
    video.value.play().catch(() => {})
  }
  if (!m?.enabled || !root.value) return
  const { gsap } = m
  const ctx = gsap.context(() => {
    const st = { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to('.hero-copy', { yPercent: -14, opacity: 0.2, ease: 'none', scrollTrigger: st })
    gsap.to('.hero-media', { yPercent: 10, ease: 'none', scrollTrigger: st })
    gsap.to('.hero-media video, .hero-media img', { scale: 1.12, ease: 'none', scrollTrigger: st })
    gsap.to('.hero-ring', { rotate: 120, ease: 'none', scrollTrigger: st })
  }, root.value)
  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section ref="root" class="hero theme-dark" aria-labelledby="hero-title">
    <div class="hero-grid container">
      <div class="hero-copy">
        <h1 id="hero-title">
          <span class="eyebrow intro" style="--d: 0">Salão de beleza em Jurerê Internacional</span>
          <span class="display hero-title">
            <span class="line-mask"><span style="--d: 120">Beleza que</span></span>
            <span class="line-mask"><span style="--d: 240">parece <em>sua.</em></span></span>
          </span>
        </h1>

        <p class="lead hero-lead intro" style="--d: 480">
          Mechas, morena iluminada, corte, make e unhas na Rua das Algas. Antes de qualquer química, a gente senta,
          olha o histórico do seu cabelo e conversa. Só depois começa.
        </p>

        <div class="hero-cta intro" style="--d: 620">
          <a class="btn btn--gold btn--lg" :href="waLink('Oi! Vim pelo site e quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener" data-cta="hero">
            <Icon name="whatsapp" /> Agendar pelo WhatsApp
          </a>
          <a class="link-line" href="#resultados">Ver resultados <Icon name="arrow-down" /></a>
        </div>

        <a class="hero-rating intro" style="--d: 760" :href="site.googleReviews" target="_blank" rel="noopener">
          <span class="stars" aria-hidden="true"><Icon v-for="i in 5" :key="i" name="star" /></span>
          <span><strong>{{ site.rating.display }}</strong> no Google · {{ site.rating.count }} avaliações</span>
        </a>
      </div>

      <div class="hero-media-wrap">
        <div class="hero-ring intro-fade" style="--d: 300" aria-hidden="true" />
        <figure class="hero-media frame arch intro-mask" style="--d: 200">
          <video
            ref="video"
            src="/video/hero-morena-iluminada.mp4"
            poster="/video/hero-morena-iluminada.webp"
            muted
            loop
            playsinline
            preload="metadata"
            aria-label="Cliente com morena iluminada em tons quentes no salão Jurerê Beauté"
          />
          <figcaption class="hero-caption caps">Morena iluminada · por Bárbara Oliveira</figcaption>
        </figure>
        <p class="hero-badge intro" style="--d: 900">
          <span class="num">Kérastase</span>
          <span class="caps">salão autorizado</span>
        </p>
      </div>
    </div>

    <div class="hero-strip container intro-fade" style="--d: 900">
      <span><Icon name="pin" /> {{ site.address.street }}, Jurerê Internacional</span>
      <span><Icon name="clock" /> {{ site.hours.label }}</span>
      <span class="hide-sm"><Icon name="sparkle" /> Kérastase · Keune · Truss</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  padding-top: calc(var(--header-h) + clamp(24px, 6vh, 72px));
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background:
    radial-gradient(120% 80% at 85% 20%, rgba(201, 161, 90, 0.14), transparent 60%),
    radial-gradient(80% 60% at 0% 100%, rgba(201, 161, 90, 0.06), transparent 60%),
    var(--noir);
}

.hero-grid {
  flex: 1;
  display: grid;
  gap: 48px;
  align-items: center;
}

@media (min-width: 960px) {
  .hero-grid {
    grid-template-columns: 1.15fr 0.85fr;
    gap: clamp(40px, 6vw, 96px);
  }
}

.hero-copy {
  display: grid;
  gap: 28px;
  justify-items: start;
}

h1 {
  display: grid;
  gap: 22px;
  font-weight: 400;
}

.hero-title {
  display: block;
  font-size: var(--step-5);
  line-height: 0.94;
}

.hero-title em {
  padding-right: 0.06em;
}

.hero-lead {
  color: rgba(245, 239, 230, 0.78);
  max-width: 44ch;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px 28px;
}

.hero-rating {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 0.92rem;
  color: rgba(245, 239, 230, 0.8);
  padding: 10px 16px 10px 12px;
  border: 1px solid var(--line-dark);
  border-radius: 999px;
  transition: border-color 0.3s, color 0.3s;
}

.hero-rating:hover {
  border-color: var(--gold);
  color: var(--ivory);
}

.hero-rating strong {
  font-weight: 500;
  color: var(--ivory);
}

.hero-media-wrap {
  position: relative;
  justify-self: center;
  width: min(100%, 440px);
}

@media (min-width: 960px) {
  .hero-media-wrap {
    justify-self: end;
  }
}

.hero-media {
  aspect-ratio: 9 / 13.5;
  margin: 0;
  background: var(--graphite);
  box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.8);
}

.hero-media video {
  transform-origin: center 30%;
}

.hero-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 40px 20px 18px;
  font-size: 0.62rem;
  color: rgba(245, 239, 230, 0.86);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.55));
  text-align: center;
}

.hero-ring {
  position: absolute;
  left: 50%;
  top: 0;
  width: 128%;
  aspect-ratio: 1;
  translate: -50% -14%;
  border-radius: 50%;
  border: 1px solid rgba(226, 189, 114, 0.55);
  pointer-events: none;
}

.hero-ring::before {
  content: '';
  position: absolute;
  inset: 14px;
  border-radius: 50%;
  border: 1px solid rgba(226, 189, 114, 0.18);
}

.hero-ring::after {
  content: '';
  position: absolute;
  top: 50%;
  left: -4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gold-hi);
  box-shadow: 0 0 24px 4px rgba(226, 189, 114, 0.5);
}

.hero-badge {
  position: absolute;
  left: -18px;
  bottom: 12%;
  display: grid;
  gap: 4px;
  padding: 16px 20px;
  background: var(--ivory);
  color: var(--ink);
  border-radius: var(--radius);
  box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.6);
}

.hero-badge .num {
  font-size: 1.35rem;
  line-height: 1;
}

.hero-badge .caps {
  font-size: 0.58rem;
  color: var(--gold-deep);
}

@media (min-width: 960px) {
  .hero-badge {
    left: -48px;
  }
}

.hero-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 32px;
  justify-content: space-between;
  margin-top: 56px;
  padding-top: 20px;
  border-top: 1px solid var(--line-dark);
  font-size: 0.82rem;
  color: rgba(245, 239, 230, 0.7);
}

.hero-strip span {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.hero-strip :deep(.icon) {
  color: var(--gold);
}

@media (max-width: 640px) {
  .hide-sm {
    display: none !important;
  }

  .hero-strip {
    margin-top: 40px;
  }
}
</style>
