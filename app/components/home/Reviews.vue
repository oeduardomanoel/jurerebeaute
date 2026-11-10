<script setup lang="ts">
import { reviews } from '#shared/data/content'
import { site } from '#shared/data/site'

const half = Math.ceil(reviews.length / 2)
const rows = [reviews.slice(0, half), reviews.slice(half)]
</script>

<template>
  <section id="avaliacoes" class="reviews section theme-dark" aria-labelledby="avaliacoes-title">
    <div class="container rv-head">
      <p class="eyebrow">Avaliações do Google</p>
      <h2 id="avaliacoes-title" class="h2" v-reveal>
        <span class="num rv-score">{{ site.rating.display }}</span>
        com {{ site.rating.count }} avaliações. <em>As palavras são delas.</em>
      </h2>
      <div class="rv-actions" v-reveal>
        <a class="btn" :href="site.googleReviews" target="_blank" rel="noopener">Ler todas no Google <Icon name="arrow-up-right" /></a>
        <span class="stars" aria-hidden="true"><Icon v-for="i in 5" :key="i" name="star" /></span>
      </div>
    </div>

    <div class="rv-rows" aria-label="Avaliações de clientes">
      <div v-for="(row, r) in rows" :key="r" class="rv-row" :class="{ reverse: r === 1 }">
        <div class="rv-track">
          <template v-for="n in 2" :key="n">
            <ul class="rv-group" :aria-hidden="n === 2 ? 'true' : undefined">
              <li v-for="rv in row" :key="`${n}-${rv.author}`" class="rv-card">
                <figure>
                  <span class="stars" aria-label="5 estrelas"><Icon v-for="i in 5" :key="i" name="star" /></span>
                  <blockquote><p>{{ rv.text }}</p></blockquote>
                  <figcaption>
                    <strong>{{ rv.author }}</strong>
                    <span class="caps">{{ rv.service }}</span>
                  </figcaption>
                </figure>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews {
  overflow: hidden;
}

.rv-head {
  display: grid;
  gap: 28px;
  margin-bottom: clamp(48px, 6vw, 80px);
}

@media (min-width: 960px) {
  .rv-head {
    grid-template-columns: 1fr auto;
    align-items: end;
  }

  .rv-head .eyebrow {
    grid-column: 1 / -1;
  }
}

.rv-head .h2 {
  max-width: 18ch;
}

.rv-score {
  color: var(--gold-hi);
  font-size: 1.25em;
  margin-right: 0.08em;
}

.rv-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.rv-actions .btn {
  border-color: var(--line-dark);
}

.rv-rows {
  display: grid;
  gap: 18px;
}

.rv-row {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}

.rv-track {
  display: flex;
  width: max-content;
  animation: rv-marquee 90s linear infinite;
}

.reverse .rv-track {
  animation-direction: reverse;
  animation-duration: 110s;
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
  width: min(84vw, 400px);
  flex: none;
}

.rv-card figure {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 28px;
  border: 1px solid var(--line-dark);
  border-radius: var(--radius);
  background: var(--noir-2);
  transition: border-color 0.4s, transform 0.6s var(--ease);
}

.rv-card figure:hover {
  border-color: var(--gold);
  transform: translateY(-4px);
}

.rv-card blockquote {
  flex: 1;
}

.rv-card blockquote p {
  font-family: var(--f-display);
  font-size: 1.12rem;
  line-height: 1.45;
}

.rv-card figcaption {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--line-dark);
  font-size: 0.9rem;
}

.rv-card strong {
  font-weight: 500;
}

.rv-card .caps {
  font-size: 0.56rem;
  color: var(--gold);
}

@keyframes rv-marquee {
  to {
    transform: translateX(-50%);
  }
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
