<script setup lang="ts">
import { faqs } from '#shared/data/content'

useSeo({
  title: 'Perguntas sobre o Jurerê Beauté: horário, agendamento, preço e marcas',
  description: 'Horário, agendamento, preço de mechas, marcas Kérastase e Keune e atendimento a turistas no salão Jurerê Beauté, em Jurerê Internacional.',
  path: '/perguntas',
})
useJsonLd([
  salonSchema(),
  breadcrumbSchema([{ name: 'Início', path: '/' }, { name: 'Perguntas', path: '/perguntas' }]),
  faqSchema(faqs),
])
</script>

<template>
  <section id="perguntas" class="section" style="--h: 2" aria-labelledby="perguntas-h">
    <div class="wrap grid grid--top">
      <div class="span-6 stack-6">
        <div class="section-head">
          <h1 id="perguntas-h">Perguntas sobre horário, preço e marcas</h1>
          <p class="t-lead">Outra dúvida? A recepção responde no WhatsApp, de terça a sábado.</p>
        </div>
        <figure class="pl-photo" style="--pl-r: .8">
          <Pic name="colorista-keune-produtos" alt="Colorista do salão com os produtos Keune na prateleira" sizes="(min-width: 1024px) 588px, 92vw" />
        </figure>
      </div>
      <div class="faq span-6 start-7">
        <div v-for="f in faqs" :key="f.q" class="faq__item">
          <h2>{{ f.q }}</h2>
          <p>{{ f.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
