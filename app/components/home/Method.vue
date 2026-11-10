<script setup lang="ts">
const steps = [
  {
    title: 'Você chama no WhatsApp',
    text: 'Conta o que quer fazer, manda uma foto se tiver. A recepção encontra o horário e o profissional certo para você.',
    note: '“Liguei em vários salões e esse foi o que melhor me atendeu desde o agendamento.” Bruna F.',
  },
  {
    title: 'Avaliação antes da química',
    text: 'Histórico do cabelo, base, porosidade, rotina. É aqui que a gente decide a técnica, o produto e quantas sessões fazem sentido.',
    note: 'Diagnóstico, histórico químico e colorimetria vêm antes de qualquer produto.',
  },
  {
    title: 'O serviço, sem correria',
    text: 'Café na mão, massagem capilar Champi na lavagem e o tempo que o seu cabelo precisa. E o horário combinado é cumprido.',
    note: '“Terminaram no horário combinado. Nota 1000!” Sara H.',
  },
  {
    title: 'Ritual de continuidade',
    text: 'Você sai sabendo o que usar em casa e quando voltar. Não para corrigir, mas para manter o que ficou bonito.',
    note: 'Indicação feita por quem viu o seu cabelo de perto, não pelo algoritmo.',
  },
]

const root = ref<HTMLElement>()
const { $motion } = useNuxtApp()
onMounted(() => {
  const m = $motion as any
  if (!m?.enabled || !root.value) return
  const ctx = m.gsap.context(() => {
    m.gsap.fromTo('.mt-progress i', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.mt-steps', start: 'top 60%', end: 'bottom 60%', scrub: true } })
    m.gsap.utils.toArray('.mt-step').forEach((el: any) => {
      m.ScrollTrigger.create({ trigger: el, start: 'top 62%', end: 'bottom 62%', toggleClass: 'is-active' })
    })
  }, root.value)
  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section id="como-funciona" ref="root" class="method section" aria-labelledby="metodo-title">
    <div class="container mt-grid">
      <header class="mt-head">
        <p class="eyebrow">Como funciona</p>
        <h2 id="metodo-title" class="h2">Do primeiro oi <em>até o retorno.</em></h2>
        <p class="lead muted">Quatro passos. Nenhum deles é pular direto para a tinta.</p>
      </header>

      <div class="mt-steps">
        <div class="mt-progress" aria-hidden="true"><i /></div>
        <ol>
          <li v-for="(s, i) in steps" :key="s.title" class="mt-step">
            <span class="mt-n num">{{ i + 1 }}</span>
            <div class="mt-body">
              <h3 class="h3">{{ s.title }}</h3>
              <p>{{ s.text }}</p>
              <p class="mt-note">{{ s.note }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mt-grid {
  display: grid;
  gap: 56px;
}

@media (min-width: 960px) {
  .mt-grid {
    grid-template-columns: 0.85fr 1fr;
    gap: clamp(48px, 7vw, 120px);
    align-items: start;
  }

  .mt-head {
    position: sticky;
    top: calc(var(--header-h) + 48px);
  }
}

.mt-head {
  display: grid;
  gap: 24px;
}

.mt-steps {
  position: relative;
  padding-left: 32px;
}

.mt-progress {
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: var(--line);
}

.mt-progress i {
  position: absolute;
  inset: 0;
  background: var(--gold);
  transform-origin: top;
}

.mt-step {
  display: grid;
  grid-template-columns: 3.4rem 1fr;
  gap: 12px;
  padding: 28px 0 44px;
  opacity: 0.55;
  transition: opacity 0.6s var(--ease);
}

.mt-step.is-active,
.mt-step:hover {
  opacity: 1;
}

.mt-n {
  font-size: 2.6rem;
  line-height: 0.9;
  color: var(--gold-deep);
}

.mt-body {
  display: grid;
  gap: 12px;
}

.mt-body p {
  max-width: 46ch;
}

.mt-note {
  margin-top: 4px;
  padding-left: 14px;
  border-left: 1px solid var(--gold);
  font-size: 0.9rem;
  color: var(--muted);
  font-style: italic;
}
</style>
