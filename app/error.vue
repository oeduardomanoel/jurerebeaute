<script setup lang="ts">
import type { NuxtError } from '#app'
import { waLink } from '#shared/data/site'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error?.statusCode === 404)
useHead({ title: is404.value ? 'Página não encontrada: Jurerê Beauté' : 'Erro: Jurerê Beauté', meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <NuxtLayout>
    <section class="section" aria-labelledby="err-h">
      <div class="wrap stack-4">
        <h1 id="err-h">{{ is404 ? 'Essa página não existe' : 'Algo deu errado nesta página' }}</h1>
        <p class="t-lead">O salão continua na Rua das Algas, 389, em Jurerê Internacional.</p>
        <div class="btn-row">
          <a class="btn btn--primary" :href="waLink('Oi! Quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener">Agendar pelo WhatsApp</a>
          <a class="btn btn--secondary" href="/">Ir para o início</a>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
