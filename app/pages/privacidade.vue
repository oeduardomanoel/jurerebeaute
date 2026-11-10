<script setup lang="ts">
import { site } from '#shared/data/site'

useSeo({
  title: 'Política de privacidade do site do Jurerê Beauté',
  description: 'O site do Jurerê Beauté não tem cadastro nem formulário próprio. O agendamento acontece no WhatsApp do salão.',
  path: '/privacidade',
})
</script>

<template>
  <section class="section" aria-labelledby="pv-h" style="--h: 2">
    <div class="wrap">
      <div class="measure stack-4">
        <h1 id="pv-h">Política de privacidade</h1>
        <p>Este site é do {{ site.legalName }}, na {{ site.address.full }}.</p>
        <h2>Que dados o site coleta</h2>
        <p>Nenhum cadastro, login ou formulário envia dados para servidores do salão. A mensagem de agendamento é montada no seu navegador e só sai dele quando você toca em enviar no WhatsApp.</p>
        <h2>WhatsApp, Google Maps e Instagram</h2>
        <p>Ao abrir o WhatsApp, o mapa ou o Instagram, você passa a usar o serviço dessas empresas, cada uma com a própria política de privacidade.</p>
        <h2>Medição de audiência</h2>
        <p>O site pode usar estatística agregada (como Vercel Analytics) para saber quais páginas são mais visitadas, sem identificar ninguém.</p>
        <h2>Seus direitos pela LGPD</h2>
        <p>Você pode pedir informação, correção ou exclusão dos dados que compartilhou com o salão, por exemplo no WhatsApp {{ site.phoneDisplay }}.</p>
        <p class="t-small muted">Atualizado em novembro de 2026.</p>
      </div>
    </div>
  </section>
</template>
