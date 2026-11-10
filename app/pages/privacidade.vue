<script setup lang="ts">
import { site } from '#shared/data/site'

useSeo({
  title: 'Política de privacidade | Jurerê Beauté',
  description: 'Como o site do Jurerê Beauté trata seus dados: sem cadastro, sem formulário próprio. O agendamento acontece direto no WhatsApp.',
  path: '/privacidade',
})
</script>

<template>
  <div>
    <header class="pv-hero theme-dark">
      <div class="container">
        <p class="eyebrow intro">Transparência</p>
        <h1 class="display pv-title"><span class="line-mask"><span style="--d: 100">Política de privacidade</span></span></h1>
      </div>
    </header>
    <section class="section">
      <div class="container prose pv-body">
        <p>Este site é a vitrine do {{ site.legalName }}, localizado na {{ site.address.full }}.</p>
        <h2 class="h3">Que dados coletamos</h2>
        <p>
          O site não tem cadastro, login nem formulário que envie dados para os nossos servidores. Quando você monta um pedido de
          agendamento, o texto é gerado no seu próprio navegador e só sai dele quando você toca em enviar no WhatsApp.
        </p>
        <h2 class="h3">WhatsApp, Google Maps e Instagram</h2>
        <p>
          Ao abrir o WhatsApp, o mapa ou o Instagram, você passa a usar o serviço dessas empresas, que têm as próprias políticas de
          privacidade. O mapa só é carregado quando você toca em "Carregar mapa".
        </p>
        <h2 class="h3">Medição de audiência</h2>
        <p>
          Podemos usar ferramentas de estatística agregada (como Vercel Analytics) para entender quais páginas são mais visitadas,
          sem identificar você pessoalmente.
        </p>
        <h2 class="h3">Seus direitos (LGPD)</h2>
        <p>
          Você pode pedir informações, correção ou exclusão de dados que tenha compartilhado com o salão, por exemplo no WhatsApp.
          Fale com a gente pelo {{ site.phoneDisplay }}.
        </p>
        <p class="muted">Última atualização: novembro de 2026.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pv-hero {
  padding-top: calc(var(--header-h) + 64px);
  padding-bottom: 72px;
}

.pv-hero .container {
  display: grid;
  gap: 24px;
}

.pv-title {
  font-size: var(--step-4);
}

.pv-body {
  max-width: 760px;
}

.pv-body h2 {
  margin-top: 2em;
  margin-bottom: 0.6em;
}
</style>
