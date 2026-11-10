<script setup lang="ts">
const text =
  'A gente não quer que você saia daqui parecendo outra pessoa. Quer que perguntem o que você fez de diferente, e você não saiba explicar direito. É luz onde o rosto pede, corte que cai sozinho, unha que dura. É você, só que mais.'
const words = text.split(' ')

const root = ref<HTMLElement>()
const { $motion } = useNuxtApp()

onMounted(() => {
  const m = $motion as any
  if (!m?.enabled || !root.value) return
  const { gsap } = m
  const ctx = gsap.context(() => {
    gsap.fromTo(
      '.mf-word',
      { opacity: 0.14 },
      {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: '.mf-text', start: 'top 78%', end: 'bottom 45%', scrub: true },
      },
    )
  }, root.value)
  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section ref="root" class="manifesto section" aria-labelledby="manifesto-title">
    <div class="container mf-grid">
      <div class="mf-side">
        <h2 id="manifesto-title" class="eyebrow">O jeito da casa</h2>
        <figure v-parallax="14" class="mf-img mf-img-a frame">
          <Pic name="sorriso-cliente-cabelo-hidratado" alt="Cliente sorrindo com cabelo castanho hidratado e brilhante" sizes="(min-width: 960px) 18vw, 40vw" />
        </figure>
      </div>

      <div class="mf-main">
        <p class="mf-text display">
          <span v-for="(w, i) in words" :key="i" class="mf-word">{{ i < words.length - 1 ? `${w} ` : w }}</span>
        </p>
        <div class="mf-sign" v-reveal>
          <Monogram class="mf-mono" />
          <p>
            <span class="caps">Jurerê Beauté</span>
            <span class="muted">Rua das Algas, 389 · Jurerê Internacional</span>
          </p>
        </div>
      </div>

      <figure v-parallax="-16" class="mf-img mf-img-b frame">
        <Pic name="maquiagem-coque-atemporal" alt="Cliente com coque baixo e maquiagem leve feita no Jurerê Beauté" sizes="(min-width: 960px) 16vw, 40vw" />
      </figure>
    </div>
  </section>
</template>

<style scoped>
.manifesto {
  overflow: hidden;
}

.mf-grid {
  display: grid;
  gap: 40px;
  position: relative;
}

@media (min-width: 960px) {
  .mf-grid {
    grid-template-columns: 0.32fr 1fr 0.26fr;
    gap: clamp(32px, 4vw, 72px);
    align-items: start;
  }
}

.mf-side .eyebrow {
  white-space: nowrap;
}

.mf-side {
  display: grid;
  gap: 40px;
  align-content: start;
}

.mf-text {
  font-size: clamp(1.9rem, 1.3rem + 2.6vw, 3.9rem);
  line-height: 1.14;
  letter-spacing: -0.015em;
  text-wrap: pretty;
}

.mf-word {
  transition: color 0.3s;
}

.mf-sign {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 48px;
}

.mf-sign p {
  display: grid;
  gap: 4px;
  font-size: 0.9rem;
}

.mf-mono {
  font-size: 54px;
  color: var(--gold-deep);
}

.mf-img {
  margin: 0;
  border-radius: var(--radius);
  aspect-ratio: 3 / 4;
}

.mf-img-a {
  width: min(70%, 260px);
}

.mf-img-b {
  display: none;
}

@media (min-width: 960px) {
  .mf-img-a {
    width: 100%;
  }

  .mf-img-b {
    display: block;
    margin-top: 40%;
    border-radius: 999px 999px var(--radius) var(--radius);
  }
}
</style>
