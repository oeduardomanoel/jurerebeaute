<script setup lang="ts">
import type { NuxtError } from '#app'
import { waLink } from '#shared/data/site'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error?.statusCode === 404)
useHead({ title: is404.value ? 'Página não encontrada | Jurerê Beauté' : 'Erro | Jurerê Beauté', meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <NuxtLayout>
    <section class="er dark">
      <div class="container er-in">
        <img class="er-mono" src="/brand/jurere-beaute-selo.webp" width="1024" height="1024" alt="Logo do Jurerê Beauté" />
        <h1 class="er-title">{{ is404 ? 'Essa página não existe.' : 'Algo deu errado.' }}</h1>
        <p class="lead muted">O salão continua na Rua das Algas, 389, em Jurerê Internacional.</p>
        <div class="er-actions">
          <button class="btn" type="button" @click="clearError({ redirect: '/' })">Voltar ao início</button>
          <a class="btn btn--gold" :href="waLink('Oi! Vim pelo site e quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener"><Icon name="whatsapp" /> WhatsApp</a>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.er {
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding-top: var(--header-h);
  text-align: center;
}

.er-in {
  display: grid;
  justify-items: center;
  gap: 24px;
}

.er-mono {
  width: 140px;
  height: 140px;
}

.er-title {
  font-family: var(--f-display);
  font-weight: 400;
  font-size: var(--t-h2);
}

.er-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
}
</style>
