<script setup lang="ts">
import { services } from '#shared/data/services'
import { waLink } from '#shared/data/site'

const root = ref<HTMLElement>()
const preview = ref<HTMLElement>()
const active = ref<string | null>(null)
const { $motion } = useNuxtApp()

// Prévia flutuante que segue o cursor (só em telas com mouse).
let xTo: any, yTo: any
onMounted(() => {
  const m = $motion as any
  if (!m || !preview.value || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  xTo = m.gsap.quickTo(preview.value, 'x', { duration: 0.6, ease: 'power3' })
  yTo = m.gsap.quickTo(preview.value, 'y', { duration: 0.6, ease: 'power3' })
})

function move(e: MouseEvent) {
  if (!xTo || !root.value) return
  const r = root.value.getBoundingClientRect()
  xTo(e.clientX - r.left)
  yTo(e.clientY - r.top)
}
</script>

<template>
  <section id="servicos" ref="root" class="services section theme-dark" aria-labelledby="servicos-title" @mousemove="move" @mouseleave="active = null">
    <div class="container">
      <header class="sv-head">
        <p class="eyebrow">Serviços</p>
        <h2 id="servicos-title" class="h2" v-reveal>Do fio à unha, <em>no mesmo endereço.</em></h2>
        <p class="lead muted" v-reveal="{ delay: 0.1 }">
          Sete frentes, uma equipe que conversa entre si. Dá para fazer cor, corte e unha no mesmo dia, sem trocar de salão e sem
          explicar tudo de novo.
        </p>
      </header>

      <ol class="sv-list" v-reveal="'stagger'">
        <li v-for="s in services" :key="s.slug" class="sv-item" :class="{ dim: active && active !== s.slug }" @mouseenter="active = s.slug">
          <NuxtLink :to="`/servicos/${s.slug}`" class="sv-link">
            <span class="sv-index num">{{ s.index }}</span>
            <span class="sv-thumb frame">
              <Pic :name="s.image" :alt="s.name" sizes="96px" />
            </span>
            <span class="sv-name">{{ s.name }}</span>
            <span class="sv-card">{{ s.card }}</span>
            <span class="sv-kicker caps">{{ s.kicker }}</span>
            <span class="sv-arrow" aria-hidden="true"><Icon name="arrow-up-right" /></span>
          </NuxtLink>
        </li>
      </ol>

      <p class="sv-foot muted" v-reveal>
        Sobrancelha e depilação também.
        <a class="link-line" :href="waLink('Oi! Queria saber sobre sobrancelha/depilação no Jurerê Beauté.')" target="_blank" rel="noopener">Perguntar no WhatsApp <Icon name="arrow" /></a>
      </p>
    </div>

    <div ref="preview" class="sv-preview" :class="{ on: !!active }" aria-hidden="true">
      <div class="sv-preview-inner">
        <Pic v-for="s in services" :key="s.slug" :name="s.image" alt="" sizes="300px" :class="{ show: active === s.slug }" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  position: relative;
  overflow: hidden;
}

.sv-head {
  display: grid;
  gap: 24px;
  margin-bottom: clamp(48px, 7vw, 96px);
}

@media (min-width: 960px) {
  .sv-head {
    grid-template-columns: 1fr 1fr;
    align-items: end;
  }

  .sv-head .eyebrow {
    grid-column: 1 / -1;
  }

  .sv-head .lead {
    justify-self: end;
  }
}

.sv-list {
  border-top: 1px solid var(--line-dark);
}

.sv-item {
  border-bottom: 1px solid var(--line-dark);
}

.sv-item .sv-link {
  transition: opacity 0.5s var(--ease);
}

.sv-item.dim .sv-link {
  opacity: 0.38;
}

.sv-link {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    'idx name arrow'
    'thumb card card';
  align-items: center;
  gap: 8px 20px;
  padding: 26px 0;
}

.sv-index {
  grid-area: idx;
  font-size: 1rem;
  color: var(--gold);
  min-width: 2.2em;
}

.sv-thumb {
  grid-area: thumb;
  width: 56px;
  height: 72px;
  border-radius: 999px 999px 3px 3px;
  align-self: start;
}

.sv-name {
  grid-area: name;
  font-family: var(--f-display);
  font-size: clamp(1.9rem, 1.2rem + 3vw, 4rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
  transition: transform 0.7s var(--ease), color 0.4s;
}

.sv-card {
  grid-area: card;
  color: var(--muted-dark);
  font-size: 0.98rem;
  max-width: 46ch;
}

.sv-kicker {
  display: none;
  color: var(--gold);
  font-size: 0.62rem;
}

.sv-arrow {
  grid-area: arrow;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--line-dark);
  color: var(--gold);
  transition: background 0.5s var(--ease), color 0.4s, transform 0.6s var(--ease), border-color 0.4s;
}

.sv-link:hover .sv-name,
.sv-link:focus-visible .sv-name {
  color: var(--gold-hi);
  font-style: italic;
  transform: translateX(12px);
}

.sv-link:hover .sv-arrow,
.sv-link:focus-visible .sv-arrow {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--noir);
  transform: rotate(45deg);
}

@media (min-width: 960px) {
  .sv-link {
    grid-template-columns: 4rem 1.3fr 1fr 7rem 48px;
    grid-template-areas: 'idx name card kicker arrow';
    gap: 32px;
    padding: 34px 0;
  }

  .sv-thumb {
    display: none;
  }

  .sv-kicker {
    display: block;
    text-align: right;
  }
}

.sv-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 24px;
  margin-top: 40px;
}

.sv-foot .link-line {
  color: var(--gold-hi);
}

/* prévia flutuante */
.sv-preview {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  width: 260px;
  aspect-ratio: 3 / 4;
  margin: -170px 0 0 -130px;
  pointer-events: none;
  display: none;
}

@media (hover: hover) and (pointer: fine) and (min-width: 960px) {
  .sv-preview {
    display: block;
  }
}

.sv-preview-inner {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 999px 999px 4px 4px;
  transform: scale(0.4) rotate(-6deg);
  opacity: 0;
  transition: transform 0.7s var(--ease), opacity 0.4s;
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.7);
}

.sv-preview.on .sv-preview-inner {
  transform: none;
  opacity: 1;
}

.sv-preview img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.15);
  transition: opacity 0.5s, transform 0.9s var(--ease);
}

.sv-preview img.show {
  opacity: 1;
  transform: none;
}
</style>
