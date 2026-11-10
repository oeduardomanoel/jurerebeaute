<script setup lang="ts">
import { services } from '#shared/data/services'
import { waLink } from '#shared/data/site'

const root = ref<HTMLElement>()
const preview = ref<HTMLElement>()
const active = ref<string | null>(null)
const { $motion } = useNuxtApp()

// Foto que segue o cursor sobre a lista (só em telas com mouse).
let xTo: any, yTo: any
onMounted(() => {
  const m = $motion as any
  if (!m || !preview.value || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  xTo = m.gsap.quickTo(preview.value, 'x', { duration: 0.55, ease: 'power3' })
  yTo = m.gsap.quickTo(preview.value, 'y', { duration: 0.55, ease: 'power3' })
})
function move(e: MouseEvent) {
  if (!xTo || !root.value) return
  const r = root.value.getBoundingClientRect()
  xTo(e.clientX - r.left)
  yTo(e.clientY - r.top)
}
</script>

<template>
  <section id="servicos" ref="root" class="sv section dark" aria-labelledby="sv-title" @mousemove="move" @mouseleave="active = null">
    <div class="container">
      <header class="sv-head">
        <p class="label">Serviços</p>
        <h2 id="sv-title" class="h2" v-reveal>Cabelo, make e unhas <em>no mesmo endereço.</em></h2>
        <p class="lead muted" v-reveal>Sete serviços na Rua das Algas. Toque em um para ver fotos, avaliações e perguntas.</p>
      </header>

      <ol class="sv-list" v-reveal="'stagger'">
        <li v-for="s in services" :key="s.slug" :class="{ dim: active && active !== s.slug }" @mouseenter="active = s.slug">
          <NuxtLink :to="`/servicos/${s.slug}`" class="sv-row">
            <span class="sv-i">{{ s.index }}</span>
            <span class="sv-thumb frame"><Pic :name="s.image" :alt="s.name" sizes="80px" /></span>
            <span class="sv-name">{{ s.name }}</span>
            <span class="sv-card">{{ s.card }}</span>
            <span class="sv-go" aria-hidden="true"><Icon name="arrow-up-right" /></span>
          </NuxtLink>
        </li>
      </ol>

      <p class="sv-foot muted" v-reveal>
        Sobrancelha e depilação também.
        <a class="link" :href="waLink('Oi! Queria saber sobre sobrancelha/depilação no Jurerê Beauté.')" target="_blank" rel="noopener">Perguntar no WhatsApp <Icon name="arrow" /></a>
      </p>
    </div>

    <div ref="preview" class="sv-preview" :class="{ on: !!active }" aria-hidden="true">
      <div class="sv-preview-in">
        <Pic v-for="s in services" :key="s.slug" :name="s.image" alt="" sizes="300px" :class="{ show: active === s.slug }" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.sv {
  overflow: hidden;
}

.sv-head {
  display: grid;
  gap: 22px;
  margin-bottom: clamp(48px, 6vw, 88px);
}

@media (min-width: 960px) {
  .sv-head {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: end;
  }

  .sv-head .label {
    grid-column: 1 / -1;
  }

  .sv-head .lead {
    justify-self: end;
  }
}

.sv-list {
  border-top: 1px solid var(--line-dark);
}

.sv-list li {
  border-bottom: 1px solid var(--line-dark);
}

.sv-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'i name go' 'thumb card card';
  align-items: center;
  gap: 10px 18px;
  padding: 26px 0;
  transition: opacity 0.45s var(--ease);
}

li.dim .sv-row {
  opacity: 0.35;
}

.sv-i {
  grid-area: i;
  font-family: var(--f-display);
  font-style: italic;
  color: var(--gold);
  min-width: 2.2em;
}

.sv-thumb {
  grid-area: thumb;
  width: 64px;
  height: 80px;
  border-radius: 10px;
  align-self: start;
}

.sv-name {
  grid-area: name;
  font-family: var(--f-display);
  font-size: clamp(1.9rem, 1.3rem + 2.6vw, 3.6rem);
  line-height: 1.05;
  transition: transform 0.6s var(--ease), color 0.35s;
}

.sv-card {
  grid-area: card;
  color: var(--muted-dark);
  max-width: 44ch;
}

.sv-go {
  grid-area: go;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1.5px solid var(--line-dark);
  color: var(--gold);
  transition: background 0.45s var(--ease), color 0.3s, transform 0.55s var(--ease), border-color 0.3s;
}

.sv-row:hover .sv-name,
.sv-row:focus-visible .sv-name {
  color: var(--gold-hi);
  transform: translateX(12px);
}

.sv-row:hover .sv-go,
.sv-row:focus-visible .sv-go {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--noir);
  transform: rotate(45deg);
}

@media (min-width: 960px) {
  .sv-row {
    grid-template-columns: 4rem 1.25fr 1fr 52px;
    grid-template-areas: 'i name card go';
    gap: 32px;
    padding: 30px 0;
  }

  .sv-thumb {
    display: none;
  }
}

.sv-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 24px;
  margin-top: 36px;
}

.sv-foot .link {
  color: var(--gold-hi);
}

.sv-preview {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  width: 250px;
  aspect-ratio: 4 / 5;
  margin: -160px 0 0 -125px;
  pointer-events: none;
  display: none;
}

@media (hover: hover) and (pointer: fine) and (min-width: 960px) {
  .sv-preview {
    display: block;
  }
}

.sv-preview-in {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 999px 999px 18px 18px;
  transform: scale(0.4) rotate(-6deg);
  opacity: 0;
  transition: transform 0.6s var(--ease), opacity 0.35s;
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.7);
}

.sv-preview.on .sv-preview-in {
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
  transition: opacity 0.45s, transform 0.85s var(--ease);
}

.sv-preview img.show {
  opacity: 1;
  transform: none;
}
</style>
