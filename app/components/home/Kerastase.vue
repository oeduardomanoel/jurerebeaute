<script setup lang="ts">
import { waLink } from '#shared/data/site'
</script>

<template>
  <section class="kr section sand" aria-labelledby="kr-title">
    <div class="container kr-grid">
      <div class="kr-copy">
        <p class="label">Salão autorizado Kérastase</p>
        <h2 id="kr-title" class="h2" v-reveal>Kérastase original, <em>com preço de internet.</em></h2>
        <div class="prose" v-reveal>
          <p>O Jurerê Beauté é salão autorizado Kérastase: oferece apenas produtos originais, com preço equivalente ao da internet.</p>
          <p>Também tem Keune e Truss. Na avaliação de uma cliente no Google: “Produtos TRUSS com preço ótimo!!”</p>
        </div>
        <blockquote class="kr-quote" v-reveal>
          <p>“A IA pode ser uma ótima aliada na hora de buscar informações e descobrir possibilidades para cuidar dos cabelos. Mas ela não conhece o seu cabelo de verdade.”</p>
          <footer>Post da colorista no Instagram do salão</footer>
        </blockquote>
        <div class="kr-brands" v-reveal="'stagger'">
          <span class="chip">Kérastase</span><span class="chip">Keune</span><span class="chip">Truss</span>
        </div>
        <a class="link kr-link" :href="waLink('Oi! Queria uma indicação de produto para o meu cabelo.')" target="_blank" rel="noopener">Pedir indicação de produto <Icon name="arrow" /></a>
      </div>
      <div class="kr-media">
        <figure class="kr-a frame" v-reveal="'clip'"><Pic name="colorista-keune-produtos" alt="Colorista do salão com produtos Keune na prateleira" sizes="(min-width: 960px) 32vw, 80vw" /></figure>
        <figure v-parallax="-16" class="kr-b frame"><Pic name="keune-velvet-smooth" alt="Keune Velvet Smooth em destaque no salão" sizes="(min-width: 960px) 16vw, 40vw" /></figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.kr-grid {
  display: grid;
  gap: 64px;
  align-items: center;
}

@media (min-width: 960px) {
  .kr-grid {
    grid-template-columns: 1fr 0.9fr;
    gap: clamp(48px, 7vw, 120px);
  }
}

.kr-copy {
  display: grid;
  gap: 26px;
  justify-items: start;
}

.kr-quote {
  display: grid;
  gap: 12px;
  padding: 26px 28px;
  border-left: 3px solid var(--gold);
  background: var(--ivory);
  border-radius: 0 var(--radius) var(--radius) 0;
}

.kr-quote p {
  font-family: var(--f-display);
  font-size: var(--t-lead);
  line-height: 1.4;
}

.kr-quote footer {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--muted);
}

.kr-brands {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.kr-brands .chip {
  background: var(--ivory);
  transition: transform 0.4s var(--ease), border-color 0.3s;
}

.kr-brands .chip:hover {
  transform: translateY(-2px);
  border-color: var(--gold);
}

.kr-link {
  color: var(--gold-text);
}

.kr-media {
  position: relative;
  padding-right: 16%;
}

.kr-a {
  margin: 0;
  aspect-ratio: 3 / 4;
  border-radius: 999px 999px 22px 22px;
}

.kr-b {
  position: absolute;
  right: 0;
  bottom: -6%;
  width: 40%;
  aspect-ratio: 3 / 4;
  margin: 0;
  border: 6px solid var(--ivory-2);
}
</style>
