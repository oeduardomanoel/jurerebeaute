<script setup lang="ts">
import { waLink } from '#shared/data/site'

// Caso real, texto da legenda do Reel no Instagram do salão.
const steps = [
  { label: 'O pedido', text: 'O dourado estava bonito, mas precisava de mais naturalidade e menos amarelo.' },
  { label: 'O que foi feito', text: 'Abrimos a raiz e criamos mechas estratégicas para conectar o crescimento ao comprimento, sem deixar o cabelo com aquela diferença marcada de tons.' },
  { label: 'O resultado', text: 'Um dourado natural, sofisticado e cheio de dimensão.' },
]

const video = ref<HTMLVideoElement>()
let io: IntersectionObserver | null = null
onMounted(() => {
  if (!video.value) return
  io = new IntersectionObserver(([e]) => (e?.isIntersecting ? video.value?.play().catch(() => {}) : video.value?.pause()), { threshold: 0.25 })
  io.observe(video.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section class="cs section" aria-labelledby="cs-title">
    <div class="container cs-grid">
      <figure class="cs-media frame" v-reveal="'clip'">
        <video ref="video" src="/video/caso-dourado-natural.mp4" poster="/video/caso-dourado-natural.webp" muted loop playsinline preload="none" aria-label="Loiro dourado com mechas e raiz natural, feito no Jurerê Beauté" />
        <span class="cs-tag">Caso real do Instagram</span>
      </figure>

      <div class="cs-copy">
        <p class="label">Antes de mexer, a gente entende</p>
        <h2 id="cs-title" class="h2" v-reveal>Um loiro que pedia <em>menos amarelo.</em></h2>
        <ol class="cs-steps" v-reveal="'stagger'">
          <li v-for="(s, i) in steps" :key="s.label">
            <span class="cs-n">0{{ i + 1 }}</span>
            <div>
              <h3 class="cs-label">{{ s.label }}</h3>
              <p>{{ s.text }}</p>
            </div>
          </li>
        </ol>
        <div class="cs-cta" v-reveal>
          <a class="btn btn--ink" :href="waLink('Oi! Meu loiro está pedindo um novo equilíbrio. Posso mandar uma foto?')" target="_blank" rel="noopener" data-cta="case"><Icon name="whatsapp" /> Mandar foto do meu cabelo</a>
          <NuxtLink to="/servicos/mechas-e-loiros" class="link">Mechas e loiros <Icon name="arrow" /></NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cs-grid {
  display: grid;
  gap: 56px;
  align-items: center;
}

@media (min-width: 960px) {
  .cs-grid {
    grid-template-columns: 0.8fr 1fr;
    gap: clamp(48px, 7vw, 120px);
  }
}

.cs-media {
  margin: 0;
  aspect-ratio: 9 / 14;
  width: min(100%, 460px);
  justify-self: center;
  border-radius: 22px;
}

.cs-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--ivory);
  color: var(--ink);
  font-size: 0.8125rem;
  font-weight: 700;
}

.cs-copy {
  display: grid;
  gap: 26px;
  justify-items: start;
}

.cs-steps {
  width: 100%;
  border-top: 1px solid var(--line);
}

.cs-steps li {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 16px;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
}

.cs-n {
  font-family: var(--f-display);
  font-weight: 300;
  font-size: 1.5rem;
  color: var(--gold-text);
  line-height: 1.2;
}

.cs-label {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
}

.cs-steps p {
  font-size: var(--t-lead);
  line-height: 1.45;
}

.cs-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px 28px;
  margin-top: 8px;
}
</style>
