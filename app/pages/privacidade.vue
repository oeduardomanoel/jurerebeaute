<script setup lang="ts">
import { site } from '#shared/data/site'

useSeo({
  title: 'Política de privacidade | Jurerê Beauté',
  description: 'O site do Jurerê Beauté não tem cadastro nem formulário próprio. O agendamento acontece no WhatsApp do salão.',
  path: '/privacidade',
})
</script>

<template>
  <div>
    <header class="pv dark">
      <div class="container">
        <h1 class="pv-title"><span class="line-mask"><span>Política de privacidade</span></span></h1>
      </div>
    </header>
    <section class="section">
      <div class="container prose pv-body">
        <p>Este site é do {{ site.legalName }}, na {{ site.address.full }}.</p>
        <h2 class="h3">Que dados o site coleta</h2>
        <p>O site não tem cadastro, login nem formulário que envie dados para o salão. A mensagem de agendamento é montada no seu navegador e só sai dele quando você toca em enviar no WhatsApp.</p>
        <h2 class="h3">WhatsApp, Google Maps e Instagram</h2>
        <p>Ao abrir o WhatsApp, o mapa ou o Instagram, você passa a usar o serviço dessas empresas, cada uma com a própria política de privacidade.</p>
        <h2 class="h3">Seus direitos pela LGPD</h2>
        <p>Você pode pedir informação, correção ou exclusão dos dados que compartilhou com o salão, por exemplo no WhatsApp {{ site.phoneDisplay }}.</p>
        <p class="muted">Atualizado em novembro de 2026.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pv {
  padding: calc(var(--header-h) + 72px) 0 72px;
}

.pv-title {
  font-family: var(--f-display);
  font-weight: 400;
  font-size: var(--t-h2);
}

.pv-body {
  max-width: 760px;
}

.pv-body h2 {
  margin: 2em 0 0.6em;
}
</style>
