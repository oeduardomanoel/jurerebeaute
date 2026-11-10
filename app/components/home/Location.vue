<script setup lang="ts">
import { site } from '#shared/data/site'

const week = [
  { d: 2, label: 'Terça' },
  { d: 3, label: 'Quarta' },
  { d: 4, label: 'Quinta' },
  { d: 5, label: 'Sexta' },
  { d: 6, label: 'Sábado' },
  { d: 0, label: 'Domingo' },
  { d: 1, label: 'Segunda' },
]

const today = ref<number | null>(null)
const openNow = ref<boolean | null>(null)

onMounted(() => {
  // Hora de Florianópolis, independente de onde a pessoa está.
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date())
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.find((p) => p.type === 'weekday')!.value)
  const h = Number(parts.find((p) => p.type === 'hour')!.value) % 24
  const m = Number(parts.find((p) => p.type === 'minute')!.value)
  today.value = wd
  const mins = h * 60 + m
  openNow.value = (site.hours.openDays as readonly number[]).includes(wd) && mins >= 9 * 60 && mins < 19 * 60
})

const mapOn = ref(false)
const directions = `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}&destination_place_id=${site.placeId}`
const waze = `https://waze.com/ul?ll=${site.geo.lat},${site.geo.lng}&navigate=yes`
const embed = `https://maps.google.com/maps?q=${encodeURIComponent('Jurerê Beauté, Rua das Algas 389, Jurerê Internacional, Florianópolis')}&ll=${site.geo.lat},${site.geo.lng}&z=16&output=embed`
</script>

<template>
  <section id="onde-estamos" class="location section theme-bone" aria-labelledby="local-title">
    <div class="container lc-grid">
      <div class="lc-copy">
        <p class="eyebrow">Onde estamos</p>
        <h2 id="local-title" class="h2" v-reveal>Rua das Algas, 389. <em>Sala 01.</em></h2>
        <p class="lead muted" v-reveal>
          No coração de Jurerê Internacional, em Florianópolis. Tem rampa de acesso e é fácil de estacionar na rua.
        </p>

        <div class="lc-status" v-if="openNow !== null">
          <span class="dot" :class="{ open: openNow }" />
          {{ openNow ? 'Aberto agora' : 'Fechado agora' }} · {{ site.hours.short }}
        </div>

        <dl class="lc-hours">
          <div v-for="w in week" :key="w.d" :class="{ today: today === w.d, closed: !(site.hours.openDays as readonly number[]).includes(w.d) }">
            <dt>{{ w.label }}<span v-if="today === w.d" class="caps lc-today">hoje</span></dt>
            <dd>{{ (site.hours.openDays as readonly number[]).includes(w.d) ? '9h às 19h' : 'Fechado' }}</dd>
          </div>
        </dl>

        <div class="lc-actions">
          <a class="btn btn--ink" :href="directions" target="_blank" rel="noopener"><Icon name="pin" /> Como chegar</a>
          <a class="link-line" :href="waze" target="_blank" rel="noopener">Abrir no Waze <Icon name="arrow-up-right" /></a>
        </div>
      </div>

      <div class="lc-map frame" v-reveal="'clip'">
        <iframe
          v-if="mapOn"
          :src="embed"
          title="Mapa do Jurerê Beauté em Jurerê Internacional"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        />
        <button v-else type="button" class="lc-facade" @click="mapOn = true">
          <svg class="lc-lines" viewBox="0 0 400 400" aria-hidden="true">
            <g fill="none" stroke="currentColor" stroke-width="1">
              <path d="M-20 260 C 80 240, 160 300, 420 210" />
              <path d="M-20 120 L 420 170" />
              <path d="M150 -20 L 190 420" />
              <path d="M300 -20 C 280 120, 330 260, 290 420" />
              <path d="M-20 330 L 420 360" opacity=".5" />
              <path d="M60 -20 L 90 420" opacity=".5" />
            </g>
            <text x="20" y="112" class="lc-street">Rua das Algas</text>
            <text x="236" y="236" class="lc-street">Av. dos Búzios</text>
          </svg>
          <span class="lc-pin">
            <Monogram />
          </span>
          <span class="lc-load caps">Carregar mapa</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lc-grid {
  display: grid;
  gap: 56px;
  align-items: center;
}

@media (min-width: 960px) {
  .lc-grid {
    grid-template-columns: 1fr 1fr;
    gap: clamp(48px, 7vw, 120px);
  }
}

.lc-copy {
  display: grid;
  gap: 24px;
  justify-items: start;
}

.lc-status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #b5524a;
}

.dot.open {
  background: #4f9a6d;
  box-shadow: 0 0 0 4px rgba(79, 154, 109, 0.18);
}

.lc-hours {
  width: 100%;
  max-width: 420px;
  border-top: 1px solid var(--line);
}

.lc-hours div {
  display: flex;
  justify-content: space-between;
  padding: 11px 0;
  border-bottom: 1px solid var(--line);
  font-size: 0.96rem;
}

.lc-hours .closed {
  color: var(--muted);
}

.lc-hours .today {
  font-weight: 500;
}

.lc-today {
  margin-left: 10px;
  font-size: 0.56rem;
  color: var(--gold-deep);
}

.lc-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px 28px;
  margin-top: 8px;
}

.lc-map {
  aspect-ratio: 1;
  border-radius: 999px 999px var(--radius) var(--radius);
  background: var(--noir);
}

.lc-map iframe {
  width: 100%;
  height: 100%;
  border: 0;
  filter: grayscale(0.4) contrast(1.05);
}

.lc-facade {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--line-dark);
  background: radial-gradient(60% 60% at 50% 55%, rgba(201, 161, 90, 0.16), transparent 70%), var(--noir);
}

.lc-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: rgba(226, 189, 114, 0.35);
}

.lc-street {
  fill: rgba(226, 189, 114, 0.55);
  font-family: var(--f-caps);
  font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.lc-pin {
  position: relative;
  display: grid;
  place-items: center;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  border: 1px solid var(--gold);
  color: var(--gold);
  font-size: 44px;
  background: var(--noir);
  box-shadow: 0 0 0 10px rgba(201, 161, 90, 0.08), 0 0 0 22px rgba(201, 161, 90, 0.04);
  transition: transform 0.6s var(--ease);
}

.lc-facade:hover .lc-pin {
  transform: scale(1.08);
}

.lc-load {
  position: absolute;
  bottom: 14%;
  color: var(--ivory);
  font-size: 0.64rem;
  padding: 10px 18px;
  border: 1px solid var(--line-dark);
  border-radius: 999px;
  transition: border-color 0.3s, background 0.3s;
}

.lc-facade:hover .lc-load {
  border-color: var(--gold);
  background: rgba(201, 161, 90, 0.12);
}
</style>
