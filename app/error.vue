<script setup lang="ts">
import type { NuxtError } from '#app'
import { waLink } from '#shared/data/site'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error?.statusCode === 404)

useHead({ title: is404.value ? 'Página não encontrada | Jurerê Beauté' : 'Algo deu errado | Jurerê Beauté', meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <NuxtLayout>
    <section class="err theme-dark">
      <div class="container err-inner">
        <Monogram class="err-mono" />
        <p class="eyebrow eyebrow--plain">{{ error?.statusCode }}</p>
        <h1 class="display err-title">{{ is404 ? 'Essa página não existe.' : 'Algo saiu do lugar.' }}</h1>
        <p class="lead muted">Mas o salão continua na Rua das Algas, 389. Volte para o início ou chame a gente direto.</p>
        <div class="err-actions">
          <button class="btn" type="button" @click="clearError({ redirect: '/' })">Voltar ao início</button>
          <a class="btn btn--gold" :href="waLink('Oi! Vim pelo site e quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener"><Icon name="whatsapp" /> WhatsApp</a>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.err {
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding-top: var(--header-h);
  text-align: center;
}

.err-inner {
  display: grid;
  justify-items: center;
  gap: 24px;
}

.err-mono {
  font-size: 96px;
  color: var(--gold);
}

.err-title {
  font-size: var(--step-4);
}

.err-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
}
</style>
