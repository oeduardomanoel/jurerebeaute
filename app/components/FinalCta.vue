<script setup lang="ts">
import { site, waLink } from '#shared/data/site'
withDefaults(defineProps<{ message?: string }>(), { message: 'Oi! Vim pelo site e quero agendar um horário no Jurerê Beauté.' })
</script>

<template>
  <section class="fc dark" aria-labelledby="fc-title" data-hide-bar>
    <div class="fc-ring" aria-hidden="true" />
    <div class="container fc-in">
      <img class="fc-selo" src="/brand/jurere-beaute-selo.webp" width="1024" height="1024" alt="Logo do Jurerê Beauté" loading="lazy" v-reveal="{ y: 30 }" />
      <p class="label">{{ site.hours.label }}</p>
      <h2 id="fc-title" class="fc-title" v-reveal="{ y: 60 }">Seu horário está<br />a uma <em>mensagem.</em></h2>
      <div class="fc-actions" v-reveal>
        <a class="btn btn--gold btn--lg" :href="waLink(message)" target="_blank" rel="noopener" data-cta="final"><Icon name="whatsapp" /> Chamar no WhatsApp</a>
        <a class="link" :href="`tel:${site.phone.replace(/[\s-]/g, '')}`">Ou ligue {{ site.phoneDisplay }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fc {
  position: relative;
  overflow: hidden;
  padding-block: clamp(120px, 16vw, 220px);
  text-align: center;
}

.fc-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(120vw, 880px);
  aspect-ratio: 1;
  translate: -50% -50%;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1.5px solid var(--line-dark);
  pointer-events: none;
}

.fc-ring::before {
  content: '';
  position: absolute;
  inset: 22px;
  border-radius: 50%;
  border: 1px solid rgba(230, 194, 122, 0.1);
}

.fc-selo {
  width: clamp(120px, 14vw, 180px);
  height: auto;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
}

.fc-in {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 30px;
}

.fc-title {
  font-family: var(--f-display);
  font-weight: 400;
  font-size: var(--t-h1);
  line-height: 1;
}

.fc-title em {
  font-style: italic;
  color: var(--gold-hi);
}

.fc-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 18px 32px;
}
</style>
