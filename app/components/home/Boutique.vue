<script setup lang="ts">
import { waLink } from '#shared/data/site'
</script>

<template>
  <section class="boutique section theme-dark" aria-labelledby="boutique-title">
    <div class="container bq-grid">
      <div class="bq-media">
        <figure class="bq-img frame arch" v-reveal="'clip'">
          <Pic name="colorista-keune-produtos" alt="Colorista do Jurerê Beauté com produtos Keune na prateleira do salão" sizes="(min-width: 960px) 34vw, 86vw" />
        </figure>
        <figure class="bq-img-sm frame" v-parallax="-18">
          <Pic name="keune-velvet-smooth" alt="Produto Keune Velvet Smooth em destaque no salão" sizes="(min-width: 960px) 14vw, 36vw" />
        </figure>
      </div>

      <div class="bq-copy">
        <p class="eyebrow">Salão autorizado Kérastase</p>
        <h2 id="boutique-title" class="h2" v-reveal>Kérastase original, <em>com preço de internet.</em></h2>
        <div class="prose" v-reveal>
          <p>
            Os produtos que a gente usa no lavatório ficam à venda na recepção, originais e com preço equivalente ao da internet.
            Você não corre risco de levar falsificado e ainda sai com a indicação de quem acabou de ver o seu cabelo.
          </p>
          <p>Além da Kérastase, trabalhamos com Keune e Truss.</p>
        </div>

        <blockquote class="bq-quote" v-reveal>
          <p>“A IA pode ser uma ótima aliada na hora de buscar informações. Mas ela não conhece o seu cabelo de verdade.”</p>
          <footer class="caps">Post da nossa colorista no Instagram</footer>
        </blockquote>

        <ul class="bq-brands" aria-label="Marcas">
          <li>Kérastase</li>
          <li>Keune</li>
          <li>Truss</li>
        </ul>

        <a class="link-line bq-link" :href="waLink('Oi! Queria uma indicação de produto Kérastase/Keune para o meu cabelo.')" target="_blank" rel="noopener">
          Pedir indicação de produto <Icon name="arrow" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bq-grid {
  display: grid;
  gap: 64px;
  align-items: center;
}

@media (min-width: 960px) {
  .bq-grid {
    grid-template-columns: 0.9fr 1fr;
    gap: clamp(56px, 8vw, 140px);
  }
}

.bq-media {
  position: relative;
  padding-right: 18%;
}

.bq-img {
  margin: 0;
  aspect-ratio: 3 / 4;
}

.bq-img-sm {
  position: absolute;
  right: 0;
  bottom: -8%;
  width: 38%;
  aspect-ratio: 3 / 4;
  margin: 0;
  border-radius: var(--radius);
  border: 6px solid var(--noir);
}

.bq-copy {
  display: grid;
  gap: 28px;
  justify-items: start;
}

.bq-copy .prose {
  color: rgba(245, 239, 230, 0.8);
}

.bq-quote {
  padding: 28px 0 0;
  border-top: 1px solid var(--line-dark);
  display: grid;
  gap: 14px;
}

.bq-quote p {
  font-family: var(--f-display);
  font-style: italic;
  font-size: var(--step-2);
  line-height: 1.25;
  color: var(--gold-hi);
  max-width: 28ch;
}

.bq-quote footer {
  font-size: 0.6rem;
  color: var(--muted-dark);
}

.bq-brands {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.bq-brands li {
  font-family: var(--f-caps);
  font-size: 0.78rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  padding: 10px 18px;
  border: 1px solid var(--line-dark);
  border-radius: 999px;
  transition: border-color 0.3s, color 0.3s;
}

.bq-brands li:hover {
  border-color: var(--gold);
  color: var(--gold-hi);
}

.bq-link {
  color: var(--gold-hi);
}
</style>
