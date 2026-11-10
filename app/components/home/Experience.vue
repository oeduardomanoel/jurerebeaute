<script setup lang="ts">
// Trechos reais de avaliações do Google, sobre o que acontece além do serviço.
const items = [
  { icon: 'coffee', title: 'O café', quote: 'E o café!!! Hummmm o melhor', who: 'Juliana G.' },
  { icon: 'hourglass', title: 'O horário', quote: 'Ainda terminaram no horário combinado.', who: 'Sara H.' },
  { icon: 'drop', title: 'A massagem Champi', quote: 'Um plus que agrega um valor especial à experiência.', who: 'Silvia U.' },
  { icon: 'chat', title: 'A recepção', quote: 'As recepcionistas são ágeis e organizadas.', who: 'Ana F.' },
  { icon: 'ramp', title: 'O acesso', quote: 'Tem rampa de acesso, estacionamento fácil.', who: 'Vera F.' },
  { icon: 'pin', title: 'Quem vem de longe', quote: 'Sou Argentina e sento ficar como em casa.', who: 'Maria José P.' },
]
const video = ref<HTMLVideoElement>()
let io: IntersectionObserver | null = null
onMounted(() => {
  if (!video.value) return
  io = new IntersectionObserver(([e]) => (e?.isIntersecting ? video.value?.play().catch(() => {}) : video.value?.pause()), { threshold: 0.2 })
  io.observe(video.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section class="ex section" aria-labelledby="ex-title">
    <div class="container">
      <header class="ex-head">
        <p class="label">A experiência</p>
        <h2 id="ex-title" class="h2" v-reveal>O que as clientes contam <em>além do cabelo.</em></h2>
      </header>
      <div class="ex-grid">
        <ul class="ex-list" v-reveal="'stagger'">
          <li v-for="it in items" :key="it.title" class="ex-item">
            <span class="ex-icon"><Icon :name="it.icon" /></span>
            <div>
              <h3 class="ex-t">{{ it.title }}</h3>
              <p class="ex-q">“{{ it.quote }}”</p>
              <p class="ex-w muted">{{ it.who }}, no Google</p>
            </div>
          </li>
        </ul>
        <figure class="ex-bag frame" v-reveal="'clip'">
          <video ref="video" src="/video/sacola-jurere-beaute.mp4" poster="/video/sacola-jurere-beaute.webp" muted loop playsinline preload="none" aria-label="Clientes andando por Jurerê com a sacola do Jurerê Beauté" />
          <figcaption>
            <strong>E a sacola personalizada</strong>
            <span>“Pensadas para levar um pouquinho da nossa essência, do nosso cuidado e da nossa sofisticação para além do salão.” Do Instagram do salão.</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ex-head {
  display: grid;
  gap: 18px;
  margin-bottom: clamp(48px, 6vw, 80px);
  max-width: 900px;
}

.ex-grid {
  display: grid;
  gap: 56px;
}

@media (min-width: 960px) {
  .ex-grid {
    grid-template-columns: 1.25fr 0.75fr;
    gap: clamp(48px, 6vw, 100px);
    align-items: start;
  }
}

.ex-list {
  display: grid;
  gap: 16px;
}

@media (min-width: 640px) {
  .ex-list {
    grid-template-columns: 1fr 1fr;
  }
}

.ex-item {
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 18px;
  padding: 24px;
  border-radius: var(--radius);
  background: #fff;
  border: 1px solid var(--line);
  transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease), border-color 0.3s;
}

.ex-item:hover {
  transform: translateY(-4px);
  border-color: var(--gold);
  box-shadow: 0 22px 40px -26px rgba(26, 24, 21, 0.35);
}

.ex-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--ivory-2);
  color: var(--gold-text);
  transition: background 0.45s var(--ease), color 0.3s, transform 0.6s var(--ease);
}

.ex-icon :deep(.icon) {
  width: 24px;
  height: 24px;
}

.ex-item:hover .ex-icon {
  background: var(--gold);
  color: var(--noir);
  transform: rotate(-10deg);
}

.ex-t {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
}

.ex-q {
  font-family: var(--f-display);
  font-size: 1.3125rem;
  line-height: 1.3;
}

.ex-w {
  margin-top: 8px;
  font-size: 0.875rem;
}

.ex-bag {
  margin: 0;
  aspect-ratio: 9 / 14;
  width: min(100%, 420px);
  justify-self: center;
  border-radius: 22px;
}

.ex-bag figcaption {
  position: absolute;
  inset: auto 0 0;
  display: grid;
  gap: 6px;
  padding: 72px 22px 22px;
  color: var(--ivory);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  font-size: 0.9375rem;
}

.ex-bag strong {
  color: var(--gold-hi);
}
</style>
