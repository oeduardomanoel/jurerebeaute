<script setup lang="ts">
import { team } from '#shared/data/content'
</script>

<template>
  <section class="team section" aria-labelledby="equipe-title">
    <div class="container tm-grid">
      <header class="tm-head">
        <p class="eyebrow">Equipe</p>
        <h2 id="equipe-title" class="h2" v-reveal>Gente que as clientes <em>chamam pelo nome.</em></h2>
        <p class="muted" v-reveal>
          Cada nome aqui aparece nas avaliações do Google ou nos créditos do nosso Instagram. Tem preferida? É só pedir na hora de
          agendar.
        </p>
      </header>

      <ul class="tm-list" v-reveal="'stagger'">
        <li v-for="p in team" :key="p.name" class="tm-item">
          <component :is="p.ig ? 'a' : 'div'" :href="p.ig ? `https://www.instagram.com/${p.ig}/` : undefined" :target="p.ig ? '_blank' : undefined" :rel="p.ig ? 'noopener' : undefined" class="tm-link">
            <span class="tm-name">{{ p.name }}</span>
            <span class="tm-role caps">{{ p.role }}</span>
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
    top: calc(var(--header-h) + 48px);
  }
}

.tm-head {
  display: grid;
  gap: 24px;
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

.tm-item {
  border-bottom: 1px solid var(--line);
}

.tm-link {
  position: relative;
  display: grid;
  gap: 4px;
  padding: 22px 36px 22px 0;
}

.tm-name {
  font-family: var(--f-display);
  font-size: 1.7rem;
  line-height: 1.1;
  transition: color 0.3s, transform 0.6s var(--ease);
}

.tm-role {
  font-size: 0.58rem;
  color: var(--muted);
}

.tm-ig {
  position: absolute;
  right: 4px;
  top: 50%;
  translate: 0 -50%;
  color: var(--gold-deep);
  opacity: 0.5;
  transition: opacity 0.3s, transform 0.5s var(--ease);
}

a.tm-link:hover .tm-name {
  color: var(--gold-deep);
  font-style: italic;
  transform: translateX(6px);
}

a.tm-link:hover .tm-ig {
  opacity: 1;
  transform: scale(1.15);
}
</style>
