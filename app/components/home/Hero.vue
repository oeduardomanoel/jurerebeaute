<script setup lang="ts">
import { site, waLink } from '#shared/data/site'

// Hero no padrão do guia de marca: nome grande à esquerda, Reel real do salão à direita com arcos dourados.
const root = ref<HTMLElement>()
const video = ref<HTMLVideoElement>()
const { $motion } = useNuxtApp()

onMounted(() => {
  const conn = (navigator as any).connection
  const save = conn?.saveData || /2g/.test(conn?.effectiveType || '')
  if (video.value && !save) {
    video.value.preload = 'auto'
    video.value.play().catch(() => {})
  }

  const m = $motion as any
  if (!m?.enabled || !root.value) return
  const { gsap } = m
  const ctx = gsap.context(() => {
    const st = { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to('.hr-media video', { yPercent: 10, scale: 1.08, ease: 'none', scrollTrigger: st })
    gsap.to('.hr-arcs', { rotate: 14, ease: 'none', scrollTrigger: st })
    gsap.to('.hr-copy', { yPercent: -14, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '75% top' } })
  }, root.value)
  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section ref="root" class="hr dark" aria-labelledby="hr-title">
    <div class="hr-media" aria-hidden="true">
      <video
        ref="video"
        src="/video/hero-morena-iluminada.mp4"
        poster="/video/hero-morena-iluminada.webp"
        muted
        loop
        playsinline
        preload="none"
      />
      <svg class="hr-arcs" viewBox="0 0 600 600" fill="none">
        <circle class="arc arc-1" cx="300" cy="300" r="292" pathLength="1" />
        <circle class="arc arc-2" cx="300" cy="300" r="250" pathLength="1" />
        <circle class="arc arc-3" cx="300" cy="300" r="208" pathLength="1" />
      </svg>
    </div>

    <div class="hr-copy container">
      <p class="hr-eyebrow intro" style="--d: 60">{{ site.bio }}</p>

      <h1 id="hr-title" class="hr-title">
        <span class="hr-jurere intro" style="--d: 160">Jurerê</span>
        <span class="hr-beaute intro" style="--d: 300">Beauté</span>
        <span class="hr-tag intro" style="--d: 420">Salão de beleza em Jurerê Internacional</span>
      </h1>

      <p class="hr-lead intro" style="--d: 540">
        Cabelo, maquiagem e unhas na {{ site.address.street }}. {{ site.hours.label }}.
      </p>

      <div class="hr-cta intro" style="--d: 660">
        <a class="btn btn--gold btn--lg" :href="waLink('Oi! Vim pelo site e quero agendar uma avaliação no Jurerê Beauté.')" target="_blank" rel="noopener" data-cta="hero">
          Agende sua avaliação <Icon name="arrow" class="arrow" />
        </a>
        <a class="hr-rating" :href="site.googleReviews" target="_blank" rel="noopener">
          <span class="stars" aria-hidden="true"><Icon v-for="i in 5" :key="i" name="star" /></span>
          <span><strong>{{ site.rating.display }}</strong> no Google · {{ site.rating.count }} avaliações</span>
        </a>
      </div>
    </div>

    <a class="hr-scroll intro" style="--d: 900" href="#trabalhos" aria-label="Ver trabalhos">
      <span>Ver trabalhos</span><Icon name="arrow-down" />
    </a>
  </section>
</template>

<style scoped>
.hr {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  background: radial-gradient(70% 60% at 20% 30%, rgba(212, 168, 83, 0.08), transparent 70%), var(--noir);
}

/* ---------- mídia ---------- */

.hr-media {
  position: relative;
  height: 50svh;
  min-height: 340px;
  overflow: hidden;
}

.hr-media::after {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 140px;
  background: linear-gradient(to bottom, rgba(18, 17, 16, 0.7), transparent);
  pointer-events: none;
}

.hr-media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 30%;
  -webkit-mask-image: linear-gradient(to bottom, #000 55%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 55%, transparent 100%);
}

.hr-arcs {
  position: absolute;
  left: 50%;
  top: 46%;
  width: min(118vw, 560px);
  aspect-ratio: 1;
  translate: -50% -50%;
  pointer-events: none;
  overflow: visible;
}

.arc {
  stroke: var(--gold);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
  stroke-dasharray: 0.62 0.38;
  transform-origin: 300px 300px;
}

.arc-1 {
  stroke-opacity: 0.85;
  transform: rotate(-110deg);
}

.arc-2 {
  stroke-opacity: 0.55;
  stroke-dasharray: 0.42 0.58;
  transform: rotate(60deg);
}

.arc-3 {
  stroke-opacity: 0.35;
  stroke-dasharray: 0.3 0.7;
  transform: rotate(160deg);
}

.motion .arc {
  animation: arc-draw 2.2s var(--ease) both;
}

.motion .arc-2 {
  animation-delay: 0.25s;
}

.motion .arc-3 {
  animation-delay: 0.5s;
}

@keyframes arc-draw {
  from {
    stroke-dashoffset: 0.62;
    opacity: 0;
  }
}

/* ---------- texto ---------- */

.hr-copy {
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: start;
  gap: 22px;
  margin-top: -14svh;
  padding-bottom: clamp(72px, 10vh, 110px);
}

.hr-eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
}

.hr-title {
  display: grid;
  justify-items: start;
  font-weight: 400;
}

.hr-jurere {
  font-family: var(--f-script);
  font-size: clamp(6rem, 3.6rem + 12vw, 13.5rem);
  line-height: 0.82;
  color: var(--ivory);
  margin-left: -0.04em;
  padding-top: 0.08em;
}

.hr-beaute {
  font-family: var(--f-body);
  font-weight: 300;
  font-size: clamp(1.5rem, 1rem + 2.4vw, 3.1rem);
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: var(--gold-hi);
  margin-top: 0.1em;
  padding-left: 0.2em;
}

.hr-tag {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 22px;
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--ivory);
}

.hr-tag::before {
  content: '';
  width: 40px;
  height: 1px;
  background: var(--gold);
}

.hr-lead {
  max-width: 40ch;
  color: rgba(245, 241, 234, 0.82);
  font-size: 1.0625rem;
  line-height: 1.6;
}

.hr-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 22px;
  margin-top: 6px;
}

.hr-cta .btn svg.arrow {
  width: 18px;
  height: 18px;
}

.hr-rating {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px 10px 14px;
  border-radius: 999px;
  border: 1px solid var(--line-dark);
  font-size: 0.875rem;
  white-space: nowrap;
  transition: border-color 0.3s, transform 0.4s var(--ease);
}

.hr-rating:hover {
  border-color: var(--gold);
  transform: translateY(-2px);
}

.hr-rating strong {
  font-weight: 700;
}

.hr-scroll {
  display: none;
}

/* ---------- desktop ---------- */

@media (min-width: 960px) {
  .hr {
    justify-content: center;
  }

  .hr-media {
    position: absolute;
    inset: 0 0 0 auto;
    width: 54%;
    height: auto;
    min-height: 0;
  }

  .hr-media video {
    -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 38%), linear-gradient(to top, transparent 0%, #000 22%);
    mask-image: linear-gradient(to right, transparent 0%, #000 38%), linear-gradient(to top, transparent 0%, #000 22%);
    -webkit-mask-composite: source-in;
    mask-composite: intersect;
  }

  .hr-arcs {
    left: 34%;
    top: 52%;
    width: min(62vw, 92vh, 880px);
  }

  .hr-copy {
    margin-top: 0;
    padding-top: calc(var(--header-h) + 40px);
    padding-bottom: 96px;
  }

  .hr-media::after {
    display: none;
  }

  .hr-eyebrow {
    letter-spacing: 0.32em;
  }

  .hr-copy > * {
    max-width: 46%;
  }

  .hr-title {
    max-width: none;
  }

  .hr-scroll {
    position: absolute;
    left: 50%;
    bottom: 28px;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    translate: -50% 0;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--muted-dark);
    transition: color 0.3s;
  }

  .hr-scroll svg {
    width: 16px;
    height: 16px;
    animation: nudge 2.4s var(--ease) infinite;
  }

  .hr-scroll:hover {
    color: var(--gold-hi);
  }
}

@keyframes nudge {
  50% {
    transform: translateY(5px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hr-scroll svg {
    animation: none;
  }
}
</style>
