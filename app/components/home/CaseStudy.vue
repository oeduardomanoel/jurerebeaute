<script setup lang="ts">
import { waLink } from '#shared/data/site'

const steps = [
  { label: 'O pedido', text: 'O dourado estava bonito, mas precisava de mais naturalidade e menos amarelo.' },
  { label: 'O que fizemos', text: 'Abrimos a raiz e criamos mechas estratégicas para conectar o crescimento ao comprimento, sem aquela diferença marcada de tons.' },
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
  <section class="case section theme-bone" aria-labelledby="caso-title">
    <div class="container case-grid">
      <figure class="case-media frame" v-reveal="'clip'">
        <video
          ref="video"
          src="/video/caso-dourado-natural.mp4"
          poster="/video/caso-dourado-natural.webp"
          muted
          loop
          playsinline
          preload="none"
          aria-label="Loiro dourado com mechas e raiz natural, resultado no Jurerê Beauté"
        />
        <figcaption class="case-tag caps">Caso real · Loiro</figcaption>
      </figure>

      <div class="case-copy">
        <p class="eyebrow">Antes de mexer, a gente entende</p>
        <h2 id="caso-title" class="h2" v-reveal>Nem todo loiro precisa <em>de mais pó.</em></h2>
        <p class="lead muted" v-reveal>
          Às vezes precisa de menos. Esse é um caso que saiu daqui e conta bem como a gente pensa.
        </p>

        <ol class="case-steps" v-reveal="'stagger'">
          <li v-for="(s, i) in steps" :key="s.label">
            <span class="num case-n">0{{ i + 1 }}</span>
            <div>
              <h3 class="caps case-label">{{ s.label }}</h3>
              <p>{{ s.text }}</p>
            </div>
          </li>
        </ol>

        <div class="case-cta" v-reveal>
          <a class="btn btn--ink" :href="waLink('Oi! Meu loiro está pedindo um novo equilíbrio. Posso mandar uma foto para avaliação?')" target="_blank" rel="noopener" data-cta="case">
            <Icon name="whatsapp" /> Mandar foto do meu cabelo
          </a>
          <NuxtLink to="/servicos/mechas-e-loiros" class="link-line">Mechas e loiros <Icon name="arrow" /></NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.case-grid {
  display: grid;
  gap: 56px;
  align-items: center;
}

@media (min-width: 960px) {
  .case-grid {
    grid-template-columns: 0.8fr 1fr;
    gap: clamp(48px, 7vw, 120px);
  }
}

.case-media {
  margin: 0;
  aspect-ratio: 9 / 14;
  border-radius: var(--radius);
  width: min(100%, 460px);
  justify-self: center;
}

.case-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 8px 14px;
  background: var(--ivory);
  border-radius: 999px;
  font-size: 0.58rem;
  color: var(--gold-deep);
}

.case-copy {
  display: grid;
  gap: 24px;
  justify-items: start;
}

.case-steps {
  display: grid;
  width: 100%;
  margin-top: 16px;
  border-top: 1px solid var(--line);
}

.case-steps li {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 16px;
  padding: 24px 0;
  border-bottom: 1px solid var(--line);
}

.case-n {
  font-size: 1.4rem;
  color: var(--gold-deep);
  line-height: 1.2;
}

.case-label {
  font-weight: 400;
  font-size: 0.66rem;
  color: var(--muted);
  margin-bottom: 6px;
}

.case-steps p {
  font-family: var(--f-display);
  font-size: var(--step-1);
  line-height: 1.35;
}

.case-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px 28px;
  margin-top: 16px;
}
</style>
