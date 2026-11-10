<script setup lang="ts">
import { site, waLink } from '#shared/data/site'

const props = withDefaults(defineProps<{ message?: string; title?: string }>(), {
  message: 'Oi! Vim pelo site e quero agendar um horário no Jurerê Beauté.',
})
</script>

<template>
  <section class="final theme-dark" aria-labelledby="final-title" data-hide-mobilebar>
    <div class="final-ring" aria-hidden="true"><Monogram /></div>
    <div class="container final-inner">
      <p class="eyebrow eyebrow--plain">Terça a sábado, das 9h às 19h</p>
      <h2 id="final-title" class="display final-title" v-reveal="'lines'">
        <span class="line-mask"><span>{{ props.title ? props.title : 'Seu horário está' }}</span></span>
        <span v-if="!props.title" class="line-mask"><span>a uma <em>mensagem.</em></span></span>
      </h2>
      <div class="final-actions" v-reveal>
        <a class="btn btn--gold btn--lg" :href="waLink(props.message)" target="_blank" rel="noopener" data-cta="final">
          <Icon name="whatsapp" /> Chamar no WhatsApp
        </a>
        <a class="link-line" :href="`tel:${site.phone.replace(/\s/g, '')}`">Ou ligue {{ site.phoneDisplay }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.final {
  position: relative;
  overflow: hidden;
  padding-block: clamp(110px, 16vw, 220px);
  text-align: center;
  border-bottom: 1px solid var(--line-dark);
}

.final-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(120vw, 900px);
  aspect-ratio: 1;
  translate: -50% -50%;
  border-radius: 50%;
  border: 1px solid var(--line-dark);
  display: grid;
  place-items: center;
  color: rgba(201, 161, 90, 0.07);
  font-size: min(70vw, 520px);
  pointer-events: none;
}

.final-ring::before {
  content: '';
  position: absolute;
  inset: 18px;
  border-radius: 50%;
  border: 1px solid rgba(226, 189, 114, 0.08);
}

.final-inner {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 32px;
}

.final-title {
  font-size: var(--step-5);
}

.final-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 18px 32px;
}
</style>
