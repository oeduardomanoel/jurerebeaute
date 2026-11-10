<script setup lang="ts">
import { reviews } from '#shared/data/content'
import { site } from '#shared/data/site'
const half = Math.ceil(reviews.length / 2)
const rows = [reviews.slice(0, half), reviews.slice(half)]
</script>

<template>
  <section id="avaliacoes" class="rv section dark" aria-labelledby="rv-title">
    <div class="container rv-head">
      <div class="rv-score" v-reveal>
        <span class="rv-num">{{ site.rating.display }}</span>
        <span class="stars" aria-hidden="true"><Icon v-for="i in 5" :key="i" name="star" /></span>
      </div>
      <div class="rv-copy">
        <p class="label">Avaliações do Google</p>
        <h2 id="rv-title" class="h2" v-reveal>{{ site.rating.count }} avaliações. <em>As palavras são das clientes.</em></h2>
        <a class="btn rv-btn" :href="site.googleReviews" target="_blank" rel="noopener" v-reveal>Ler todas no Google <Icon name="arrow-up-right" /></a>
      </div>
    </div>

    <div class="rv-rows" aria-label="Avaliações de clientes no Google">
      <div v-for="(row, r) in rows" :key="r" class="rv-row" :class="{ rev: r === 1 }">
        <div class="rv-track">
          <ul v-for="n in 2" :key="n" class="rv-group" :aria-hidden="n === 2 ? 'true' : undefined">
            <li v-for="rv in row" :key="`${n}-${rv.author}`" class="rv-card">
              <span class="stars" aria-label="5 estrelas"><Icon v-for="i in 5" :key="i" name="star" /></span>
              <blockquote><p>{{ rv.text }}</p></blockquote>
              <p class="rv-who"><strong>{{ rv.author }}</strong><span>{{ rv.service }}</span></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rv {
  overflow: hidden;
}

.rv-head {
  display: grid;
  gap: 32px;
  margin-bottom: clamp(48px, 6vw, 80px);
  align-items: end;
}

@media (min-width: 900px) {
  .rv-head {
    grid-template-columns: auto 1fr;
    gap: 72px;
  }
}

.rv-score {
  display: grid;
  justify-items: start;
  gap: 8px;
}

.rv-num {
  font-family: var(--f-display);
  font-size: clamp(6rem, 4rem + 8vw, 11rem);
  line-height: 0.85;
  color: var(--gold-hi);
}

.rv-score .stars svg {
  width: 26px;
  height: 26px;
}

.rv-copy {
  display: grid;
  gap: 20px;
  justify-items: start;
}

.rv-btn {
  color: var(--ivory);
  border-color: var(--line-dark);
}

.rv-rows {
  display: grid;
  gap: 18px;
}

.rv-row {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
}

.rv-track {
  display: flex;
  width: max-content;
  animation: marquee 95s linear infinite;
}

.rev .rv-track {
  animation-direction: reverse;
  animation-duration: 115s;
}

.rv-row:hover .rv-track,
.rv-row:focus-within .rv-track {
  animation-play-state: paused;
}

.rv-group {
  display: flex;
  gap: 18px;
  padding-right: 18px;
}

.rv-card {
  width: min(84vw, 420px);
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;
  border-radius: 18px;
  background: var(--noir-2);
  border: 1px solid var(--line-dark);
  transition: border-color 0.35s, transform 0.5s var(--ease);
}

.rv-card:hover {
  border-color: var(--gold);
  transform: translateY(-4px);
}

.rv-card blockquote {
  flex: 1;
}

.rv-card blockquote p {
  font-size: 1.0625rem;
  line-height: 1.6;
}

.rv-who {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid var(--line-dark);
  font-size: 0.9375rem;
}

.rv-who span {
  color: var(--gold);
  font-weight: 600;
}

@media (prefers-reduced-motion: reduce) {
  .rv-row {
    overflow-x: auto;
    mask-image: none;
  }

  .rv-track {
    animation: none;
  }
}
</style>
