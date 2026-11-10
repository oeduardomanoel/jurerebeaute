<script setup lang="ts">
import { site, waLink } from '#shared/data/site'

// Hero no layout do guia de marca: texto à esquerda, Reel real do salão à direita com arcos dourados.
// O nome do salão já está no logo do cabeçalho, então o título fala da proposta.
const root = ref<HTMLElement>()
const video = ref<HTMLVideoElement>()
const { $motion } = useNuxtApp()

const proofs = [
  { icon: 'star', top: `${site.rating.display} no Google`, bottom: `${site.rating.count} avaliações`, href: site.googleReviews },
  { icon: 'diamond', top: 'Salão autorizado', bottom: 'Kérastase' },
  { icon: 'heart', top: 'Tem cliente que vem', bottom: 'do RS só para cortar' },
]

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
    gsap.to('.hr-media video', { yPercent: 8, scale: 1.06, ease: 'none', scrollTrigger: st })
    gsap.to('.hr-arcs', { rotate: 12, ease: 'none', scrollTrigger: st })
    gsap.to('.hr-copy', { yPercent: -12, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '75% top' } })
  }, root.value)
  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section ref="root" class="hr dark" aria-labelledby="hr-title">
    <svg class="hr-light" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id="hr-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="28" /></filter>
        <linearGradient id="hr-streak" x1="0" x2="1">
          <stop offset="0" stop-color="#e9b04c" stop-opacity="0" />
          <stop offset=".5" stop-color="#e9b04c" stop-opacity=".55" />
          <stop offset="1" stop-color="#e9b04c" stop-opacity="0" />
        </linearGradient>
      </defs>
      <g filter="url(#hr-blur)">
        <path d="M-120 820 C 260 640, 620 760, 980 560" stroke="url(#hr-streak)" stroke-width="46" fill="none" />
        <path d="M-80 900 C 340 760, 700 900, 1100 700" stroke="url(#hr-streak)" stroke-width="22" fill="none" opacity=".6" />
      </g>
    </svg>

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
      <div class="hr-grade" />
    </div>

    <svg class="hr-arcs" viewBox="0 0 600 600" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="hr-arc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f8d488" />
          <stop offset=".55" stop-color="#e9b04c" />
          <stop offset="1" stop-color="#b9801f" />
        </linearGradient>
      </defs>
      <circle class="arc arc-1" cx="300" cy="300" r="290" pathLength="1" />
      <circle class="arc arc-2" cx="300" cy="300" r="262" pathLength="1" />
    </svg>

    <div class="hr-copy container">
      <h1 id="hr-title" class="hr-title">
        <span class="hr-eyebrow intro" style="--d: 60">Salão de beleza em Jurerê Internacional</span>
        <span class="hr-display">
          <span class="line-mask"><span style="--d: 160">Beleza que realça,</span></span>
          <span class="line-mask hr-last"><span style="--d: 280">sem mudar <em>quem você é.</em></span></span>
        </span>
      </h1>

      <p class="hr-lead intro" style="--d: 460">
        Loiro feito com diagnóstico antes da química, Kérastase original e make pronta no horário combinado. Rua das Algas, 389, de terça a sábado.
      </p>

      <div class="hr-cta intro" style="--d: 600">
        <a class="btn btn--gold btn--lg" :href="waLink('Oi! Vim pelo site e quero agendar uma avaliação no Jurerê Beauté.')" target="_blank" rel="noopener" data-cta="hero">
          <Icon name="calendar" /> Agende sua avaliação <Icon name="chevron" class="arrow" />
        </a>
      </div>

      <ul class="hr-proof intro" style="--d: 760">
        <li v-for="p in proofs" :key="p.icon">
          <component :is="p.href ? 'a' : 'span'" class="hr-proof-in" v-bind="p.href ? { href: p.href, target: '_blank', rel: 'noopener' } : {}">
            <Icon :name="p.icon" />
            <span>{{ p.top }} <br />{{ p.bottom }}</span>
          </component>
        </li>
      </ul>
    </div>
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
  isolation: isolate;
  background:
    radial-gradient(60% 55% at 72% 45%, rgba(233, 176, 76, 0.16), transparent 70%),
    radial-gradient(50% 50% at 8% 20%, rgba(233, 176, 76, 0.06), transparent 70%),
    #0c0b0a;
}

/* luz dourada no fundo */
.hr-light {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.55;
  pointer-events: none;
}

/* ---------- mídia ---------- */

.hr-media {
  position: relative;
  height: 52svh;
  min-height: 340px;
  overflow: hidden;
}

.hr-media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 55% 28%;
  filter: sepia(0.18) saturate(1.12) contrast(1.06) brightness(0.9);
  -webkit-mask-image: linear-gradient(to bottom, #000 50%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 50%, transparent 100%);
}

/* tom quente por cima do vídeo, como luz dourada no rosto */
.hr-grade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(12, 11, 10, 0.7), transparent 30%),
    radial-gradient(80% 70% at 60% 40%, rgba(233, 176, 76, 0.18), transparent 70%);
  pointer-events: none;
}

.hr-arcs {
  position: absolute;
  left: 58%;
  top: 27svh;
  z-index: 1;
  width: min(120vw, 560px);
  aspect-ratio: 1;
  translate: -50% -50%;
  pointer-events: none;
  overflow: visible;
}

.arc {
  stroke: url(#hr-arc);
  vector-effect: non-scaling-stroke;
  transform-origin: 300px 300px;
}

.arc-1 {
  stroke-width: 2.5;
  stroke-dasharray: 0.58 0.42;
  transform: rotate(-80deg);
  filter: drop-shadow(0 0 6px rgba(233, 176, 76, 0.9)) drop-shadow(0 0 18px rgba(233, 176, 76, 0.45));
}

.arc-2 {
  stroke-width: 1;
  stroke-opacity: 0.6;
  stroke-dasharray: 0.4 0.6;
  transform: rotate(-60deg);
}

.motion .arc {
  animation: arc-draw 2.2s var(--ease) both 0.3s;
}

.motion .arc-2 {
  animation-delay: 0.55s;
}

@keyframes arc-draw {
  from {
    stroke-dashoffset: 0.58;
    opacity: 0;
  }
}

/* ---------- texto ---------- */

.hr-copy {
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: start;
  gap: 24px;
  margin-top: -10svh;
  padding-bottom: clamp(56px, 9vh, 96px);
}

.hr-title {
  display: grid;
  gap: 20px;
  font-weight: 400;
}

.hr-eyebrow {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  line-height: 1.7;
  text-transform: uppercase;
  color: var(--gold);
}

.hr-display {
  display: block;
  font-family: var(--f-display);
  font-weight: 300;
  font-size: clamp(2.4rem, 1.6rem + 3vw, 4.1rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--ivory);
}

.hr-display em {
  font-family: var(--f-script);
  font-style: normal;
  font-weight: 400;
  font-size: 1.55em;
  line-height: 0.6;
  letter-spacing: 0;
  color: var(--gold);
  background: var(--gold-grad);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-right: 0.08em;
  white-space: nowrap;
}

.hr-last {
  padding-top: 0.12em;
  padding-bottom: 0.2em;
}

.hr-lead {
  max-width: 44ch;
  color: rgba(245, 241, 234, 0.84);
  font-size: 1.0625rem;
  line-height: 1.6;
}

.hr-cta .btn {
  gap: 12px;
}

.hr-cta .btn svg.arrow {
  width: 18px;
  height: 18px;
}

.hr-proof {
  display: flex;
  flex-wrap: wrap;
  gap: 18px 0;
  margin-top: 10px;
}

.hr-proof li {
  display: flex;
}

.hr-proof li + li {
  border-left: 1px solid rgba(233, 176, 76, 0.35);
}

.hr-proof-in {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 2px 22px;
  font-size: 0.875rem;
  line-height: 1.35;
  color: rgba(245, 241, 234, 0.88);
  transition: color 0.3s;
}

.hr-proof li:first-child .hr-proof-in {
  padding-left: 0;
}

.hr-proof-in svg {
  width: 30px;
  height: 30px;
  flex: none;
  color: var(--gold);
  stroke-width: 1.2;
  transition: transform 0.5s var(--ease);
}

a.hr-proof-in:hover {
  color: var(--gold-hi);
}

.hr-proof-in:hover svg {
  transform: scale(1.12) rotate(-6deg);
}

@media (max-width: 559px) {
  .hr-proof {
    display: grid;
    gap: 14px;
  }

  .hr-proof li + li {
    border-left: 0;
  }

  .hr-proof-in {
    padding: 0;
  }

  .hr-proof-in br {
    display: none;
  }

  .hr-proof-in svg {
    width: 24px;
    height: 24px;
  }
}

/* ---------- desktop ---------- */

@media (min-width: 960px) {
  .hr {
    justify-content: center;
  }

  .hr-media {
    position: absolute;
    inset: 0 0 0 auto;
    width: 56%;
    height: auto;
    min-height: 0;
  }

  .hr-media video {
    -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 40%), linear-gradient(to top, transparent 0%, #000 20%);
    mask-image: linear-gradient(to right, transparent 0%, #000 40%), linear-gradient(to top, transparent 0%, #000 20%);
    -webkit-mask-composite: source-in;
    mask-composite: intersect;
  }

  .hr-grade {
    background:
      linear-gradient(to bottom, rgba(12, 11, 10, 0.55), transparent 22%),
      radial-gradient(70% 70% at 55% 45%, rgba(233, 176, 76, 0.16), transparent 70%);
  }

  .hr-arcs {
    left: 77%;
    top: 50%;
    width: min(44vw, 80vh, 760px);
  }

  .hr-copy {
    margin-top: 0;
    padding-top: calc(var(--header-h) + 40px);
    padding-bottom: 72px;
  }

  .hr-eyebrow {
    font-size: 0.75rem;
    letter-spacing: 0.28em;
  }

  .hr-copy > * {
    max-width: 50%;
  }

  .hr-copy > .hr-title,
  .hr-copy > .hr-proof {
    max-width: 760px;
  }
}

@media (min-width: 1280px) {
  .hr-copy > .hr-lead {
    max-width: 44%;
  }
}
</style>
