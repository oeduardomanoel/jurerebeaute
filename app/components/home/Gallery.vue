<script setup lang="ts">
import { gallery } from '#shared/data/content'
import { site } from '#shared/data/site'

// Três colunas que andam em velocidades diferentes no scroll (desktop). No celular, grade simples.
const cols = [0, 1, 2].map((c) => gallery.filter((_, i) => i % 3 === c))
const root = ref<HTMLElement>()
const { $motion } = useNuxtApp()
onMounted(() => {
  const m = $motion as any
  if (!m?.enabled || !root.value) return
  const mm = m.gsap.matchMedia()
  mm.add('(min-width: 900px)', () => {
    const st = { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: true }
    m.gsap.fromTo('.gl-col-0', { y: 80 }, { y: -120, ease: 'none', scrollTrigger: st })
    m.gsap.fromTo('.gl-col-1', { y: 220 }, { y: -40, ease: 'none', scrollTrigger: st })
    m.gsap.fromTo('.gl-col-2', { y: 40 }, { y: -200, ease: 'none', scrollTrigger: st })
  })
  onBeforeUnmount(() => mm.revert())
})
</script>

<template>
  <section id="trabalhos" ref="root" class="gl section dark" aria-labelledby="gl-title">
    <div class="container">
      <header class="gl-head">
        <p class="label">Trabalhos</p>
        <h2 id="gl-title" class="h2" v-reveal>Saiu do salão, <em>foi pro Instagram.</em></h2>
        <p class="lead muted" v-reveal>Fotos de clientes do Jurerê Beauté, todas do perfil {{ site.instagramHandle }}.</p>
      </header>

      <div class="gl-grid">
        <ul v-for="(col, c) in cols" :key="c" class="gl-col" :class="`gl-col-${c}`">
          <li v-for="g in col" :key="g.image">
            <NuxtLink :to="`/servicos/${g.service}`" class="gl-item zoom">
              <span class="gl-frame frame"><Pic :name="g.image" :alt="g.title" sizes="(min-width: 900px) 30vw, 46vw" /></span>
              <span class="gl-title">{{ g.title }} <Icon name="arrow-up-right" /></span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <p class="gl-more" v-reveal>
        <a class="btn" :href="site.instagram" target="_blank" rel="noopener"><Icon name="instagram" /> Ver mais no Instagram</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.gl {
  overflow: hidden;
}

.gl-head {
  display: grid;
  gap: 20px;
  margin-bottom: clamp(48px, 6vw, 80px);
  max-width: 900px;
}

.gl-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.gl-col {
  display: contents;
}

@media (min-width: 900px) {
  .gl-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    align-items: start;
  }

  .gl-col {
    display: grid;
    gap: 24px;
  }
}

.gl-item {
  position: relative;
  display: block;
}

.gl-frame {
  display: block;
  aspect-ratio: 3 / 4;
  border-radius: 16px;
}

.gl-col-1 li:nth-child(odd) .gl-frame {
  border-radius: 999px 999px 16px 16px;
}

.gl-title {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(18, 17, 16, 0.78);
  backdrop-filter: blur(8px);
  font-size: 0.9375rem;
  font-weight: 700;
  transform: translateY(12px);
  opacity: 0;
  transition: transform 0.5s var(--ease), opacity 0.4s;
}

.gl-title :deep(.icon) {
  color: var(--gold);
}

.gl-item:hover .gl-title,
.gl-item:focus-visible .gl-title {
  transform: none;
  opacity: 1;
}

@media (hover: none) {
  .gl-title {
    opacity: 1;
    transform: none;
    font-size: 0.8125rem;
    padding: 8px 10px;
  }
}

.gl-more {
  margin-top: clamp(48px, 8vw, 120px);
  text-align: center;
}

.gl-more .btn {
  color: var(--ivory);
}
</style>
