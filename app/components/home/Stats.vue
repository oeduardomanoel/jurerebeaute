<script setup lang="ts">
import { site } from '#shared/data/site'

const stats = [
  { value: 5, decimals: 1, suffix: '', label: 'de nota no Google', note: 'a nota máxima' },
  { value: site.rating.count, decimals: 0, suffix: '', label: 'clientes avaliaram', note: 'e a média não caiu' },
  { value: 7.6, decimals: 1, suffix: ' mil', label: 'acompanham no Instagram', note: site.instagramHandle },
  { value: 3, decimals: 0, suffix: '', label: 'marcas profissionais', note: site.brands.join(' · ') },
]

const root = ref<HTMLElement>()
const { $motion } = useNuxtApp()
const fmt = (n: number, d: number) => n.toFixed(d).replace('.', ',')

onMounted(() => {
  const m = $motion as any
  if (!m?.enabled || !root.value) return
  const els = root.value.querySelectorAll<HTMLElement>('[data-count]')
  els.forEach((el) => {
    const end = Number(el.dataset.count)
    const d = Number(el.dataset.decimals)
    const obj = { v: 0 }
    m.gsap.to(obj, {
      v: end,
      duration: 2,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = fmt(obj.v, d)),
    })
  })
})
</script>

<template>
  <section ref="root" class="stats" aria-label="O Jurerê Beauté em números">
    <div class="container">
      <dl class="stats-grid" v-reveal="'stagger'">
        <div v-for="s in stats" :key="s.label" class="stat">
          <dt class="sr-only">{{ s.label }}</dt>
          <dd>
            <span class="stat-num num"><span :data-count="s.value" :data-decimals="s.decimals">{{ fmt(s.value, s.decimals) }}</span>{{ s.suffix }}</span>
            <span class="stat-label">{{ s.label }}</span>
            <span class="stat-note caps">{{ s.note }}</span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.stats {
  padding-bottom: clamp(72px, 10vw, 140px);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid var(--line);
}

@media (min-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat {
  padding: 32px 20px 28px 0;
  border-bottom: 1px solid var(--line);
}

.stat + .stat {
  padding-left: 20px;
  border-left: 1px solid var(--line);
}

@media (max-width: 899px) {
  .stat:nth-child(3) {
    padding-left: 0;
    border-left: 0;
  }
}

.stat dd {
  display: grid;
  gap: 8px;
}

.stat-num {
  font-size: clamp(2.8rem, 2rem + 3vw, 4.6rem);
  line-height: 1;
  color: var(--ink);
}

.stat-label {
  font-size: 0.98rem;
}

.stat-note {
  font-size: 0.6rem;
  color: var(--gold-deep);
}
</style>
