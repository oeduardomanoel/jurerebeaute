<script setup lang="ts">
import { team } from '#shared/data/content'
</script>

<template>
  <section class="tm section" aria-labelledby="tm-title">
    <div class="container tm-grid">
      <header class="tm-head">
        <p class="label">Equipe</p>
        <h2 id="tm-title" class="h2" v-reveal>Quem as clientes <em>chamam pelo nome.</em></h2>
        <p class="muted" v-reveal>Nomes que aparecem nas avaliações do Google e nos créditos do Instagram do salão. Tem preferida? Peça na hora de agendar.</p>
      </header>
      <ul class="tm-list" v-reveal="'stagger'">
        <li v-for="p in team" :key="p.name">
          <component :is="p.ig ? 'a' : 'div'" :href="p.ig ? `https://www.instagram.com/${p.ig}/` : undefined" :target="p.ig ? '_blank' : undefined" :rel="p.ig ? 'noopener' : undefined" class="tm-item">
            <span class="tm-name">{{ p.name }}</span>
            <span class="tm-role">{{ p.role }}</span>
            <Icon v-if="p.ig" name="instagram" class="tm-ig" />
          </component>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.tm-grid {
  display: grid;
  gap: 48px;
}

@media (min-width: 960px) {
  .tm-grid {
    grid-template-columns: 0.8fr 1.2fr;
    gap: clamp(48px, 7vw, 120px);
    align-items: start;
  }

  .tm-head {
    position: sticky;
    top: calc(var(--header-h) + 40px);
  }
}

.tm-head {
  display: grid;
  gap: 22px;
}

.tm-head p.muted {
  max-width: 40ch;
}

.tm-list {
  display: grid;
  border-top: 1px solid var(--line);
}

@media (min-width: 640px) {
  .tm-list {
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
  }
}

.tm-list li {
  border-bottom: 1px solid var(--line);
}

.tm-item {
  position: relative;
  display: grid;
  gap: 2px;
  padding: 20px 40px 20px 0;
}

.tm-name {
  font-family: var(--f-display);
  font-size: 1.75rem;
  line-height: 1.15;
  transition: color 0.3s, transform 0.55s var(--ease);
}

.tm-role {
  font-size: 0.9375rem;
  color: var(--muted);
}

.tm-ig {
  position: absolute;
  right: 4px;
  top: 50%;
  translate: 0 -50%;
  color: var(--gold-text);
  opacity: 0.6;
  transition: opacity 0.3s, transform 0.4s var(--ease);
}

a.tm-item:hover .tm-name {
  color: var(--gold-text);
  transform: translateX(6px);
}

a.tm-item:hover .tm-ig {
  opacity: 1;
  transform: scale(1.15);
}
</style>
