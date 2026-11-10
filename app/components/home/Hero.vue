<script setup lang="ts">
import { site, waLink } from '#shared/data/site'

// Três Reels reais do salão lado a lado. No celular, só o do meio carrega e toca.
const reels = [
  { src: '/video/caso-dourado-natural.mp4', poster: '/video/caso-dourado-natural.webp', label: 'Loiro dourado com mechas, no salão' },
  { src: '/video/hero-morena-iluminada.mp4', poster: '/video/hero-morena-iluminada.webp', label: 'Morena iluminada em tons quentes, no salão' },
  { src: '/video/making-of-make-penteado.mp4', poster: '/video/making-of-make-penteado.webp', label: 'Maquiagem e penteado sendo feitos no salão' },
]

const root = ref<HTMLElement>()
const { $motion } = useNuxtApp()

onMounted(() => {
  const phone = window.matchMedia('(max-width: 767px)').matches
  const conn = (navigator as any).connection
  const save = conn?.saveData || /2g/.test(conn?.effectiveType || '')
  root.value?.querySelectorAll<HTMLVideoElement>('video').forEach((v, i) => {
    if (save || (phone && i !== 1)) return
    v.preload = 'auto'
    v.play().catch(() => {})
  })

  const m = $motion as any
  if (!m?.enabled || !root.value) return
  const { gsap } = m
  const ctx = gsap.context(() => {
    const st = { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to('.hr-col-0', { yPercent: -14, ease: 'none', scrollTrigger: st })
    gsap.to('.hr-col-1', { yPercent: 8, ease: 'none', scrollTrigger: st })
    gsap.to('.hr-col-2', { yPercent: -22, ease: 'none', scrollTrigger: st })
    gsap.to('.hr-copy', { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { ...st, start: 'top top', end: '70% top' } })
  }, root.value)
  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section ref="root" class="hr dark" aria-labelledby="hr-title">
    <div class="hr-wall" aria-hidden="true">
      <div v-for="(r, i) in reels" :key="r.src" class="hr-col" :class="`hr-col-${i}`">
        <video :src="r.src" :poster="r.poster" muted loop playsinline preload="none" :aria-label="r.label" />
      </div>
    </div>
    <div class="hr-shade" aria-hidden="true" />

    <div class="hr-copy container">
      <h1 id="hr-title" class="hr-title">
        <span class="label intro">Salão de beleza em Jurerê Internacional</span>
        <span class="hr-display">
          <span class="line-mask"><span style="--d: 120">Beleza, sofisticação</span></span>
          <span class="line-mask"><span style="--d: 260"><em>&amp;</em> autoestima.</span></span>
        </span>
      </h1>
      <p class="lead hr-lead intro" style="--d: 520">
        Cabelo, maquiagem e unhas na {{ site.address.street }}. {{ site.hours.label }}.
      </p>
      <div class="hr-cta intro" style="--d: 660">
        <a class="btn btn--gold btn--lg" :href="waLink('Oi! Vim pelo site e quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener" data-cta="hero">
          <Icon name="whatsapp" /> Agendar pelo WhatsApp
        </a>
        <a class="link" href="#trabalhos">Ver trabalhos <Icon name="arrow-down" /></a>
      </div>
      <a class="hr-rating intro" style="--d: 800" :href="site.googleReviews" target="_blank" rel="noopener">
        <span class="stars" aria-hidden="true"><Icon v-for="i in 5" :key="i" name="star" /></span>
        <span><strong>{{ site.rating.display }}</strong> no Google · {{ site.rating.count }} avaliações</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.hr {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  padding: calc(var(--header-h) + 48px) 0 clamp(48px, 7vh, 88px);
}

.hr-wall {
  position: absolute;
  inset: -6% 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding-inline: 12px;
}

.hr-col {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  background: var(--graphite);
}

.hr-col-1 {
  margin-top: 6vh;
}

.hr-col video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.92;
}

@media (max-width: 767px) {
  .hr-wall {
    grid-template-columns: 1fr;
    padding: 0;
    gap: 0;
  }

  .hr-col {
    border-radius: 0;
  }

  .hr-col-0,
  .hr-col-2 {
    display: none;
  }

  .hr-col-1 {
    margin-top: 0;
  }
}

.hr-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(18, 17, 16, 0.97) 8%, rgba(18, 17, 16, 0.75) 38%, rgba(18, 17, 16, 0.15) 70%, rgba(18, 17, 16, 0.45) 100%),
    linear-gradient(to right, rgba(18, 17, 16, 0.55), transparent 65%);
}

.hr-copy {
  position: relative;
  display: grid;
  gap: 26px;
  justify-items: start;
}

.hr-title {
  display: grid;
  gap: 20px;
  font-weight: 400;
}

.hr-display {
  display: block;
  font-family: var(--f-display);
  font-size: var(--t-h1);
  line-height: 0.98;
  letter-spacing: -0.015em;
  text-shadow: 0 2px 30px rgba(0, 0, 0, 0.35);
}

.hr-display em {
  font-style: italic;
  color: var(--gold-hi);
}

.hr-lead {
  max-width: 38ch;
  color: rgba(245, 241, 234, 0.9);
}

.hr-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px 28px;
}

.hr-rating {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px 10px 14px;
  border-radius: 999px;
  background: rgba(18, 17, 16, 0.55);
  border: 1px solid var(--line-dark);
  backdrop-filter: blur(8px);
  font-size: 0.9375rem;
  transition: border-color 0.3s, transform 0.4s var(--ease);
}

.hr-rating:hover {
  border-color: var(--gold);
  transform: translateY(-2px);
}

.hr-rating strong {
  font-weight: 800;
}
</style>
