<script setup lang="ts">
const details = [
  { icon: 'coffee', title: 'O café', quote: 'E o café!!! Hummmm o melhor', who: 'Juliana G.' },
  { icon: 'hourglass', title: 'O horário', quote: 'Terminaram no horário combinado.', who: 'Sara H.' },
  { icon: 'drop', title: 'A massagem Champi', quote: 'Um plus que agrega um valor especial à experiência.', who: 'Silvia U.' },
  { icon: 'chat', title: 'A recepção', quote: 'As recepcionistas são ágeis e organizadas.', who: 'Ana F.' },
  { icon: 'ramp', title: 'O acesso', quote: 'Tem rampa de acesso, estacionamento fácil.', who: 'Vera F.' },
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
  <section class="details section" aria-labelledby="detalhes-title">
    <div class="container">
      <header class="dt-head">
        <p class="eyebrow">A experiência</p>
        <h2 id="detalhes-title" class="h2" v-reveal>O que as clientes comentam <em>sem a gente pedir.</em></h2>
      </header>

      <div class="dt-grid">
        <ul class="dt-list" v-reveal="'stagger'">
          <li v-for="d in details" :key="d.title" class="dt-item">
            <span class="dt-icon"><Icon :name="d.icon" /></span>
            <div>
              <h3 class="caps dt-title">{{ d.title }}</h3>
              <p class="dt-quote">“{{ d.quote }}”</p>
              <p class="dt-who muted">{{ d.who }}, no Google</p>
            </div>
          </li>
        </ul>

        <figure class="dt-bag frame arch" v-reveal="'clip'">
          <video
            ref="video"
            src="/video/sacola-jurere-beaute.mp4"
            poster="/video/sacola-jurere-beaute.webp"
            muted
            loop
            playsinline
            preload="none"
            aria-label="Clientes caminhando por Jurerê com a sacola personalizada do Jurerê Beauté"
          />
          <figcaption>
            <span class="caps">E a sacola</span>
            <span>Pensada para levar um pouco da casa com você, até a próxima visita.</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dt-head {
  display: grid;
  gap: 20px;
  margin-bottom: clamp(48px, 6vw, 80px);
  max-width: 900px;
}

.dt-grid {
  display: grid;
  gap: 56px;
}

@media (min-width: 960px) {
  .dt-grid {
    grid-template-columns: 1.2fr 0.8fr;
    gap: clamp(48px, 7vw, 120px);
    align-items: start;
  }
}

.dt-list {
  display: grid;
  border-top: 1px solid var(--line);
}

@media (min-width: 640px) {
  .dt-list {
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
  }
}

.dt-item {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 18px;
  padding: 28px 0;
  border-bottom: 1px solid var(--line);
}

.dt-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--line);
  color: var(--gold-deep);
  transition: background 0.5s var(--ease), color 0.4s, border-color 0.4s, transform 0.6s var(--ease);
}

.dt-icon :deep(.icon) {
  width: 22px;
  height: 22px;
}

.dt-item:hover .dt-icon {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--noir);
  transform: rotate(-8deg);
}

.dt-title {
  font-weight: 400;
  font-size: 0.66rem;
  color: var(--muted);
  margin-bottom: 8px;
}

.dt-quote {
  font-family: var(--f-display);
  font-size: 1.3rem;
  line-height: 1.3;
}

.dt-who {
  font-size: 0.82rem;
  margin-top: 8px;
}

.dt-bag {
  margin: 0;
  aspect-ratio: 9 / 14;
  width: min(100%, 420px);
  justify-self: center;
  background: var(--graphite);
}

.dt-bag figcaption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  gap: 6px;
  padding: 64px 24px 24px;
  color: var(--ivory);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  font-size: 0.95rem;
}

.dt-bag figcaption .caps {
  color: var(--gold-hi);
  font-size: 0.62rem;
}
</style>
