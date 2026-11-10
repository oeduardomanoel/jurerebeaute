<script setup lang="ts">
// Frase do próprio salão, de uma legenda do Instagram (@jurere.beaute).
const text = 'No Jurerê Beauté, realçamos a sua beleza sem transformar quem você é. Nosso propósito é valorizar a sua essência, com leveza, sofisticação e naturalidade.'
const words = text.split(' ')

const root = ref<HTMLElement>()
const { $motion } = useNuxtApp()
onMounted(() => {
  const m = $motion as any
  if (!m?.enabled || !root.value) return
  const ctx = m.gsap.context(() => {
    m.gsap.fromTo('.mf-w', { opacity: 0.15 }, { opacity: 1, stagger: 0.06, ease: 'none', scrollTrigger: { trigger: '.mf-text', start: 'top 80%', end: 'bottom 45%', scrub: true } })
  }, root.value)
  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section ref="root" class="mf section" aria-labelledby="mf-title">
    <div class="container mf-grid">
      <div class="mf-side">
        <h2 id="mf-title" class="label">Nas palavras do salão</h2>
        <figure v-parallax="12" class="mf-img frame">
          <Pic name="sorriso-cliente-cabelo-hidratado" alt="Cliente sorrindo com o cabelo castanho brilhante" sizes="(min-width: 960px) 20vw, 50vw" />
        </figure>
      </div>
      <div class="mf-main">
        <p class="mf-text"><span v-for="(w, i) in words" :key="i" class="mf-w">{{ i < words.length - 1 ? `${w} ` : w }}</span></p>
        <p class="mf-src muted" v-reveal>Legenda do Instagram @jurere.beaute</p>
      </div>
      <figure v-parallax="-14" class="mf-img mf-img-b frame">
        <Pic name="maquiagem-coque-atemporal" alt="Cliente com coque baixo e maquiagem leve" sizes="(min-width: 960px) 18vw, 50vw" />
      </figure>
    </div>
  </section>
</template>

<style scoped>
.mf-grid {
  display: grid;
  gap: 40px;
}

@media (min-width: 960px) {
  .mf-grid {
    grid-template-columns: 0.3fr 1fr 0.26fr;
    gap: clamp(32px, 4vw, 72px);
    align-items: start;
  }
}

.mf-side .label {
  white-space: nowrap;
}

.mf-side {
  display: grid;
  gap: 36px;
}

.mf-text {
  font-family: var(--f-display);
  font-size: clamp(2rem, 1.3rem + 3vw, 4.2rem);
  line-height: 1.12;
  text-wrap: pretty;
}

.mf-src {
  margin-top: 28px;
  font-size: 0.9375rem;
  font-weight: 600;
}

.mf-img {
  aspect-ratio: 3 / 4;
  margin: 0;
}

.mf-side .mf-img {
  width: min(60%, 260px);
}

.mf-img-b {
  display: none;
}

@media (min-width: 960px) {
  .mf-side .mf-img {
    width: 100%;
  }

  .mf-img-b {
    display: block;
    margin-top: 45%;
    border-radius: 999px 999px var(--radius) var(--radius);
  }
}
</style>
