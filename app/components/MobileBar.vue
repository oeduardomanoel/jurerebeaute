<script setup lang="ts">
import { waLink } from '#shared/data/site'
// A barra fixa do celular (obrigatória num place). O system.js mostra e esconde.
</script>

<template>
  <nav class="actionbar" aria-label="Ações rápidas">
    <a class="btn btn--primary" :href="waLink('Oi! Quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener" data-cta="actionbar">Agendar pelo WhatsApp</a>
  </nav>
</template>
