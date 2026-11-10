<script setup lang="ts">
import { site, waLink } from '#shared/data/site'
import { services } from '#shared/data/services'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="ft dark" data-hide-bar>
    <div class="container">
      <div class="ft-top">
        <NuxtLink to="/" class="ft-logo" aria-label="Jurerê Beauté, início">
          <img class="ft-selo" src="/brand/jurere-beaute-selo.webp" width="1024" height="1024" alt="" loading="lazy" />
          <BrandLogo class="ft-brand" :eager="false" />
        </NuxtLink>
        <p class="ft-bio">{{ site.bio }}.</p>
      </div>

      <div class="ft-grid">
        <div>
          <h2 class="ft-h">Endereço</h2>
          <address>
            <a :href="site.googleMaps" target="_blank" rel="noopener" class="ft-link">
              {{ site.address.street }}<br />Jurerê Internacional<br />Florianópolis, SC · {{ site.address.postalCode }}
            </a>
          </address>
        </div>
        <div>
          <h2 class="ft-h">Horário</h2>
          <p>Terça a sábado<br />9h às 19h</p>
        </div>
        <div>
          <h2 class="ft-h">Contato</h2>
          <ul class="ft-list">
            <li><a :href="waLink('Oi! Vim pelo site e quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener" class="ft-link"><Icon name="whatsapp" /> {{ site.phoneDisplay }}</a></li>
            <li><a :href="site.instagram" target="_blank" rel="noopener" class="ft-link"><Icon name="instagram" /> {{ site.instagramHandle }}</a></li>
            <li><a :href="site.googleReviews" target="_blank" rel="noopener" class="ft-link"><Icon name="star" /> {{ site.rating.display }} no Google</a></li>
          </ul>
        </div>
        <div>
          <h2 class="ft-h">Serviços</h2>
          <ul class="ft-list">
            <li v-for="s in services" :key="s.slug"><NuxtLink :to="`/servicos/${s.slug}`" class="ft-link">{{ s.name }}</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="ft-bottom">
        <p>© {{ year }} {{ site.legalName }}. Fotos e vídeos do Instagram do salão.</p>
        <p><NuxtLink to="/privacidade" class="ft-link">Privacidade</NuxtLink> · <a href="/llms.txt" class="ft-link">llms.txt</a></p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ft {
  padding: clamp(80px, 10vw, 128px) 0 max(120px, env(safe-area-inset-bottom));
  border-top: 1px solid var(--line-dark);
}

@media (min-width: 900px) {
  .ft {
    padding-bottom: 40px;
  }
}

.ft-top {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 56px;
  border-bottom: 1px solid var(--line-dark);
}

.ft-logo {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  color: var(--gold);
}

.ft-selo {
  width: 96px;
  height: 96px;
  transition: transform 1.2s var(--ease);
}

.ft-logo:hover .ft-selo {
  transform: rotate(-12deg);
}

.ft-brand {
  font-size: clamp(36px, 3vw, 48px);
}

.ft-bio {
  font-family: var(--f-display);
  font-size: clamp(1.5rem, 1.2rem + 1.4vw, 2.4rem);
  color: var(--gold-hi);
}

.ft-grid {
  display: grid;
  gap: 40px 32px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding-block: 56px;
  line-height: 1.75;
}

.ft-h {
  margin-bottom: 14px;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold);
}

address {
  font-style: normal;
}

.ft-list {
  display: grid;
  gap: 4px;
}

.ft-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: color 0.3s;
}

.ft-link:hover {
  color: var(--gold-hi);
}

.ft-link :deep(.icon) {
  color: var(--gold);
}

.ft-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  padding-top: 28px;
  border-top: 1px solid var(--line-dark);
  font-size: 0.875rem;
  color: var(--muted-dark);
}
</style>
