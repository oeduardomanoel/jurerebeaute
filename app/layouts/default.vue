<template>
  <div class="shell">
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <SiteHeader />
    <main id="conteudo">
      <slot />
    </main>
    <SiteFooter />
    <MobileBar />
  </div>
</template>
