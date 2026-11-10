<script setup lang="ts">
import { site, waLink } from '#shared/data/site'
import { services } from '#shared/data/services'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer theme-dark">
    <div class="container">
      <div class="footer-top">
        <NuxtLink to="/" class="footer-brand" aria-label="Jurerê Beauté, página inicial">
          <Logo stacked />
        </NuxtLink>
        <p class="footer-claim">
          Salão de beleza em Jurerê Internacional.<br />
          Cabelo, make e unhas no mesmo endereço.
        </p>
      </div>

      <hr class="hairline" />

      <div class="footer-grid">
        <div>
          <h2 class="caps footer-h">Visite</h2>
          <address>
            <a :href="site.googleMaps" target="_blank" rel="noopener" class="footer-link">
              {{ site.address.street }}<br />
              Jurerê Internacional<br />
              Florianópolis, SC · {{ site.address.postalCode }}
            </a>
          </address>
        </div>
        <div>
          <h2 class="caps footer-h">Horário</h2>
          <p>Terça a sábado<br />9h às 19h</p>
          <p class="muted small">Domingo e segunda: fechado</p>
        </div>
        <div>
          <h2 class="caps footer-h">Fale com a gente</h2>
          <ul class="footer-list">
            <li>
              <a :href="waLink('Oi! Vim pelo site e quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener" class="footer-link"><Icon name="whatsapp" /> {{ site.phoneDisplay }}</a>
            </li>
            <li>
              <a :href="site.instagram" target="_blank" rel="noopener" class="footer-link"><Icon name="instagram" /> {{ site.instagramHandle }}</a>
            </li>
            <li>
              <a :href="site.googleReviews" target="_blank" rel="noopener" class="footer-link"><Icon name="star" /> 5,0 no Google</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="caps footer-h">Serviços</h2>
          <ul class="footer-list">
            <li v-for="s in services" :key="s.slug">
              <NuxtLink :to="`/servicos/${s.slug}`" class="footer-link">{{ s.name }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <hr class="hairline" />

      <div class="footer-bottom">
        <p>© {{ year }} {{ site.legalName }}</p>
        <p>
          <NuxtLink to="/privacidade" class="footer-link">Privacidade</NuxtLink>
          <span aria-hidden="true"> · </span>
          <a href="/llms.txt" class="footer-link">llms.txt</a>
        </p>
      </div>
    </div>
    <div class="footer-word" aria-hidden="true">Jurerê</div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  padding: clamp(72px, 10vw, 128px) 0 max(110px, env(safe-area-inset-bottom));
}

@media (min-width: 900px) {
  .footer {
    padding-bottom: 40px;
  }
}

.footer-top {
  display: grid;
  gap: 32px;
  justify-items: start;
  padding-bottom: 56px;
}

.footer-brand :deep(.logo) {
  align-items: flex-start;
}

.footer-claim {
  font-family: var(--f-display);
  font-size: var(--step-2);
  line-height: 1.25;
  max-width: 24ch;
}

@media (min-width: 900px) {
  .footer-top {
    grid-template-columns: auto 1fr;
    align-items: end;
    gap: 80px;
  }

  .footer-claim {
    justify-self: end;
    text-align: right;
  }
}

.footer-grid {
  display: grid;
  gap: 40px 32px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding-block: 56px;
  font-size: 0.98rem;
  line-height: 1.7;
}

.footer-h {
  color: var(--gold);
  margin-bottom: 16px;
  font-weight: 400;
}

address {
  font-style: normal;
}

.footer-list {
  display: grid;
  gap: 6px;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  opacity: 0.86;
  transition: color 0.3s, opacity 0.3s;
}

.footer-link:hover {
  color: var(--gold-hi);
  opacity: 1;
}

.footer-link :deep(.icon) {
  color: var(--gold);
}

.small {
  font-size: 0.86rem;
  margin-top: 6px;
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  padding-top: 28px;
  font-size: 0.82rem;
  color: var(--muted-dark);
}

.footer-word {
  font-family: var(--f-display);
  font-style: italic;
  font-size: clamp(7rem, 26vw, 24rem);
  line-height: 0.75;
  text-align: center;
  color: transparent;
  -webkit-text-stroke: 1px var(--line-dark);
  margin-top: 48px;
  user-select: none;
  pointer-events: none;
}
</style>
