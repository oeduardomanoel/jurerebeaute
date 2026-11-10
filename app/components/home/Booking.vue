<script setup lang="ts">
import { services } from '#shared/data/services'
import { site, waLink } from '#shared/data/site'

const props = defineProps<{ preselect?: string }>()

const options = [...services.map((s) => ({ id: s.slug, label: s.name })), { id: 'outro', label: 'Sobrancelha ou depilação' }]
const days = ['Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Qualquer dia']
const periods = ['Manhã', 'Tarde', 'Tanto faz']

const picked = ref<string[]>(props.preselect ? [props.preselect] : [])
const day = ref('Qualquer dia')
const period = ref('Tanto faz')
const name = ref('')
const note = ref('')

function toggle(id: string) {
  picked.value = picked.value.includes(id) ? picked.value.filter((x) => x !== id) : [...picked.value, id]
}

const message = computed(() => {
  const who = name.value.trim() ? `Oi! Aqui é ${name.value.trim()}.` : 'Oi!'
  const list = picked.value.length
    ? picked.value.map((id) => `• ${options.find((o) => o.id === id)?.label}`).join('\n')
    : '• Ainda não sei, quero uma avaliação'
  const when = day.value === 'Qualquer dia' ? 'qualquer dia' : day.value.toLowerCase()
  const lines = [
    `${who} Quero agendar no Jurerê Beauté:`,
    list,
    '',
    `Melhor dia: ${when}`,
    `Período: ${period.value.toLowerCase()}`,
  ]
  if (note.value.trim()) lines.push(`Obs.: ${note.value.trim()}`)
  return lines.join('\n')
})

const href = computed(() => waLink(message.value))
</script>

<template>
  <section id="agendar" class="booking section theme-dark" aria-labelledby="agendar-title" data-hide-mobilebar>
    <div class="bk-ring" aria-hidden="true" />
    <div class="container bk-grid">
      <header class="bk-head">
        <p class="eyebrow">Agendamento</p>
        <h2 id="agendar-title" class="h2" v-reveal>Monte o pedido. <em>A gente responde no WhatsApp.</em></h2>
        <p class="muted" v-reveal>
          Escolha o que quer fazer e quando prefere vir. A mensagem sai pronta, é só enviar. A recepção confirma o horário com você.
        </p>
        <ul class="bk-facts">
          <li><Icon name="clock" /> {{ site.hours.label }}</li>
          <li><Icon name="pin" /> {{ site.address.street }}</li>
          <li><Icon name="phone" /> {{ site.phoneDisplay }}</li>
        </ul>
      </header>

      <form class="bk-form" @submit.prevent>
        <fieldset>
          <legend class="caps">1. O que você quer fazer?</legend>
          <div class="chips">
            <button
              v-for="o in options"
              :key="o.id"
              type="button"
              class="chip"
              :class="{ on: picked.includes(o.id) }"
              :aria-pressed="picked.includes(o.id)"
              @click="toggle(o.id)"
            >
              <span class="chip-dot" aria-hidden="true" />{{ o.label }}
            </button>
          </div>
        </fieldset>

        <fieldset>
          <legend class="caps">2. Melhor dia</legend>
          <div class="chips">
            <button v-for="d in days" :key="d" type="button" class="chip" :class="{ on: day === d }" :aria-pressed="day === d" @click="day = d">{{ d }}</button>
          </div>
        </fieldset>

        <fieldset>
          <legend class="caps">3. Período</legend>
          <div class="chips">
            <button v-for="p in periods" :key="p" type="button" class="chip" :class="{ on: period === p }" :aria-pressed="period === p" @click="period = p">{{ p }}</button>
          </div>
        </fieldset>

        <div class="bk-fields">
          <label class="field">
            <span class="caps">Seu nome</span>
            <input v-model="name" type="text" name="nome" autocomplete="given-name" placeholder="Como podemos te chamar?" />
          </label>
          <label class="field">
            <span class="caps">Observação <span class="muted">(opcional)</span></span>
            <input v-model="note" type="text" name="obs" placeholder="Ex.: é para um casamento no dia 12" />
          </label>
        </div>

        <div class="bk-preview" aria-live="polite">
          <span class="caps bk-preview-label">Sua mensagem</span>
          <p class="bubble">{{ message }}</p>
        </div>

        <a class="btn btn--gold btn--lg bk-send" :href="href" target="_blank" rel="noopener" data-cta="booking">
          <Icon name="whatsapp" /> Enviar no WhatsApp
        </a>
        <p class="bk-note muted">Abre o WhatsApp com a mensagem pronta. Nada é enviado sem você tocar em enviar.</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.booking {
  overflow: hidden;
}

.bk-ring {
  position: absolute;
  left: -30vw;
  top: -20vw;
  width: 80vw;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid var(--line-dark);
  pointer-events: none;
}

.bk-ring::after {
  content: '';
  position: absolute;
  inset: 24px;
  border-radius: 50%;
  border: 1px solid rgba(226, 189, 114, 0.08);
}

.bk-grid {
  position: relative;
  display: grid;
  gap: 56px;
}

@media (min-width: 1024px) {
  .bk-grid {
    grid-template-columns: 0.85fr 1.15fr;
    gap: clamp(48px, 6vw, 110px);
    align-items: start;
  }

  .bk-head {
    position: sticky;
    top: calc(var(--header-h) + 48px);
  }
}

.bk-head {
  display: grid;
  gap: 24px;
}

.bk-head p.muted {
  max-width: 42ch;
}

.bk-facts {
  display: grid;
  gap: 10px;
  margin-top: 8px;
  font-size: 0.95rem;
}

.bk-facts li {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bk-facts :deep(.icon) {
  color: var(--gold);
}

.bk-form {
  display: grid;
  gap: 32px;
  padding: clamp(24px, 4vw, 48px);
  background: var(--noir-2);
  border: 1px solid var(--line-dark);
  border-radius: var(--radius);
}

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 14px;
}

legend {
  padding: 0;
  margin-bottom: 14px;
  font-size: 0.64rem;
  color: var(--gold);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid var(--line-dark);
  border-radius: 999px;
  font-size: 0.92rem;
  color: rgba(245, 239, 230, 0.85);
  transition: border-color 0.3s, background 0.4s var(--ease), color 0.3s, transform 0.3s var(--ease);
}

.chip:hover {
  border-color: var(--gold);
  color: var(--ivory);
}

.chip:active {
  transform: scale(0.97);
}

.chip.on {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--noir);
}

.chip-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid currentColor;
  transition: background 0.3s;
}

.chip.on .chip-dot {
  background: var(--noir);
  border-color: var(--noir);
}

.bk-fields {
  display: grid;
  gap: 16px;
}

@media (min-width: 640px) {
  .bk-fields {
    grid-template-columns: 1fr 1fr;
  }
}

.field {
  display: grid;
  gap: 10px;
}

.field .caps {
  font-size: 0.6rem;
  color: var(--gold);
}

.field input {
  width: 100%;
  min-height: 50px;
  padding: 0 16px;
  font: inherit;
  font-size: 16px;
  color: var(--ivory);
  background: transparent;
  border: 1px solid var(--line-dark);
  border-radius: var(--radius);
  transition: border-color 0.3s;
}

.field input::placeholder {
  color: rgba(245, 239, 230, 0.35);
}

.field input:focus {
  outline: none;
  border-color: var(--gold);
}

.bk-preview {
  display: grid;
  gap: 10px;
}

.bk-preview-label {
  font-size: 0.6rem;
  color: var(--muted-dark);
}

.bubble {
  position: relative;
  justify-self: end;
  max-width: 100%;
  padding: 14px 18px;
  background: #1f3a2f;
  color: #e9f3ee;
  border-radius: 14px 14px 2px 14px;
  font-size: 0.92rem;
  line-height: 1.5;
  white-space: pre-line;
}

.bk-send {
  width: 100%;
}

.bk-note {
  font-size: 0.8rem;
  text-align: center;
  margin-top: -18px;
}
</style>
