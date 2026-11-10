<script setup lang="ts">
import { services } from '#shared/data/services'
import { site, waLink } from '#shared/data/site'

const props = defineProps<{ preselect?: string }>()

const options = [...services.map((s) => ({ id: s.slug, label: s.name })), { id: 'sobrancelha', label: 'Sobrancelha ou depilação' }]
const days = ['Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Qualquer dia']
const periods = ['Manhã', 'Tarde', 'Tanto faz']

const picked = ref<string[]>(props.preselect ? [props.preselect] : [])
const day = ref('Qualquer dia')
const period = ref('Tanto faz')
const name = ref('')

const toggle = (id: string) => (picked.value = picked.value.includes(id) ? picked.value.filter((x) => x !== id) : [...picked.value, id])

const message = computed(() => {
  const hi = name.value.trim() ? `Oi! Aqui é ${name.value.trim()}.` : 'Oi!'
  const list = picked.value.length ? picked.value.map((id) => `• ${options.find((o) => o.id === id)?.label}`).join('\n') : '• Quero uma avaliação'
  return [`${hi} Quero agendar no Jurerê Beauté:`, list, '', `Melhor dia: ${day.value.toLowerCase()}`, `Período: ${period.value.toLowerCase()}`].join('\n')
})

// "Aberto agora" calculado no horário de Florianópolis, só no navegador.
const status = ref('')
const today = ref<number | null>(null)
onMounted(() => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((x) => [x.type, x.value]))
  const d = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday!)
  const h = +p.hour! + +p.minute! / 60
  today.value = d
  const open = (site.hours.openDays as readonly number[]).includes(d)
  if (open && h >= 9 && h < 19) status.value = 'Aberto agora, até as 19h'
  else {
    const names = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
    let k = open && h < 9 ? 0 : 1
    while (!(site.hours.openDays as readonly number[]).includes((d + k) % 7)) k++
    status.value = `Fechado agora, abre ${k === 0 ? 'hoje' : k === 1 ? 'amanhã' : names[(d + k) % 7]} às 9h`
  }
})
const week = [
  { d: 2, l: 'Terça' }, { d: 3, l: 'Quarta' }, { d: 4, l: 'Quinta' }, { d: 5, l: 'Sexta' }, { d: 6, l: 'Sábado' }, { d: 0, l: 'Domingo' }, { d: 1, l: 'Segunda' },
]
const isOpenDay = (d: number) => (site.hours.openDays as readonly number[]).includes(d)
</script>

<template>
  <section id="agendar" class="ag section dark" aria-labelledby="ag-title" data-hide-bar>
    <div class="container ag-grid">
      <div class="ag-form">
        <p class="label">Agendamento</p>
        <h2 id="ag-title" class="h2" v-reveal>Monte o pedido. <em>A recepção responde no WhatsApp.</em></h2>

        <fieldset>
          <legend>1. O que você quer fazer?</legend>
          <div class="chips">
            <button v-for="o in options" :key="o.id" type="button" class="pick" :class="{ on: picked.includes(o.id) }" :aria-pressed="picked.includes(o.id)" @click="toggle(o.id)">{{ o.label }}</button>
          </div>
        </fieldset>
        <fieldset>
          <legend>2. Melhor dia</legend>
          <div class="chips">
            <button v-for="d in days" :key="d" type="button" class="pick" :class="{ on: day === d }" :aria-pressed="day === d" @click="day = d">{{ d }}</button>
          </div>
        </fieldset>
        <fieldset>
          <legend>3. Período</legend>
          <div class="chips">
            <button v-for="p in periods" :key="p" type="button" class="pick" :class="{ on: period === p }" :aria-pressed="period === p" @click="period = p">{{ p }}</button>
          </div>
        </fieldset>
        <label class="field">
          <span>Seu nome</span>
          <input v-model="name" type="text" name="nome" autocomplete="given-name" placeholder="Como podemos te chamar?" />
        </label>

        <div class="bubble" aria-live="polite">{{ message }}</div>
        <a class="btn btn--gold btn--lg ag-send" :href="waLink(message)" target="_blank" rel="noopener" data-cta="agendar"><Icon name="whatsapp" /> Enviar no WhatsApp</a>
        <p class="ag-note muted">Abre o WhatsApp com a mensagem pronta. Nada sai sem você tocar em enviar.</p>
      </div>

      <aside id="visita" class="ag-visit" aria-labelledby="vs-title">
        <figure class="ag-photo frame" v-reveal="'clip'">
          <Pic name="loiro-processo-tonalizacao" alt="Cliente na cadeira do salão durante a coloração do loiro" sizes="(min-width: 960px) 40vw, 92vw" />
        </figure>
        <div class="ag-card">
          <h2 id="vs-title" class="h3">Rua das Algas, 389</h2>
          <p>Sala 01, Jurerê Internacional, Florianópolis, SC</p>
          <p v-if="status" class="ag-status"><i :class="{ open: status.startsWith('Aberto') }" /> {{ status }}</p>
          <dl class="ag-hours">
            <div v-for="w in week" :key="w.d" :class="{ today: today === w.d, closed: !isOpenDay(w.d) }">
              <dt>{{ w.l }}<span v-if="today === w.d"> · hoje</span></dt>
              <dd>{{ isOpenDay(w.d) ? '9h às 19h' : 'Fechado' }}</dd>
            </div>
          </dl>
          <div class="ag-actions">
            <a class="btn" :href="site.directions" target="_blank" rel="noopener" data-cta="rota"><Icon name="pin" /> Traçar rota</a>
            <a class="link" :href="`tel:${site.phone.replace(/[\s-]/g, '')}`"><Icon name="phone" /> {{ site.phoneDisplay }}</a>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.ag-grid {
  display: grid;
  gap: 64px;
}

@media (min-width: 1024px) {
  .ag-grid {
    grid-template-columns: 1.1fr 0.9fr;
    gap: clamp(48px, 6vw, 100px);
    align-items: start;
  }

  .ag-visit {
    position: sticky;
    top: calc(var(--header-h) + 32px);
  }
}

.ag-form {
  display: grid;
  gap: 30px;
}

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

legend {
  margin-bottom: 14px;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gold);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pick {
  min-height: 46px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1.5px solid var(--line-dark);
  font-size: 0.9875rem;
  font-weight: 600;
  color: rgba(245, 241, 234, 0.92);
  transition: background 0.35s var(--ease), border-color 0.3s, color 0.3s, transform 0.3s var(--ease);
}

.pick:hover {
  border-color: var(--gold);
  transform: translateY(-2px);
}

.pick.on {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--noir);
}

.field {
  display: grid;
  gap: 10px;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gold);
}

.field input {
  min-height: 54px;
  padding: 0 18px;
  border-radius: 12px;
  border: 1.5px solid var(--line-dark);
  background: transparent;
  font-size: 17px;
  letter-spacing: 0;
  text-transform: none;
  font-weight: 500;
  color: var(--ivory);
}

.field input::placeholder {
  color: rgba(245, 241, 234, 0.45);
}

.field input:focus {
  outline: none;
  border-color: var(--gold);
}

.bubble {
  justify-self: start;
  max-width: 100%;
  padding: 16px 20px;
  border-radius: 18px 18px 18px 4px;
  background: #1f3a2f;
  color: #eaf4ee;
  font-size: 0.9875rem;
  line-height: 1.55;
  white-space: pre-line;
}

.ag-send {
  width: 100%;
}

.ag-note {
  margin-top: -14px;
  font-size: 0.875rem;
  text-align: center;
}

.ag-visit {
  display: grid;
  gap: 0;
  border-radius: 22px;
  overflow: hidden;
  background: var(--ivory);
  color: var(--ink);
}

.ag-photo {
  margin: 0;
  aspect-ratio: 4 / 3;
  border-radius: 0;
}

.ag-card {
  display: grid;
  gap: 12px;
  padding: clamp(24px, 3vw, 36px);
}

.ag-status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
}

.ag-status i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #b5524a;
}

.ag-status i.open {
  background: #3f8f5f;
  box-shadow: 0 0 0 4px rgba(63, 143, 95, 0.2);
}

.ag-hours {
  margin-top: 6px;
  border-top: 1px solid var(--line);
}

.ag-hours div {
  display: flex;
  justify-content: space-between;
  padding: 9px 0;
  border-bottom: 1px solid var(--line);
  font-size: 0.9875rem;
}

.ag-hours .closed {
  color: var(--muted);
}

.ag-hours .today {
  font-weight: 700;
}

.ag-hours dt span {
  color: var(--gold-text);
}

.ag-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 24px;
  margin-top: 10px;
}

.ag-actions .btn {
  --fill: var(--ink);
}

.ag-actions .btn:hover {
  color: var(--ivory);
  border-color: var(--ink);
}
</style>
