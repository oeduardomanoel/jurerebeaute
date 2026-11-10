<script setup lang="ts">
import { gallery } from '#shared/data/content'
import { site } from '#shared/data/site'

const root = ref<HTMLElement>()
const track = ref<HTMLElement>()
const { $motion } = useNuxtApp()

// Desktop: a seção fica presa e a galeria anda na horizontal conforme o scroll.
// Celular: carrossel nativo com scroll-snap (mais leve e natural no dedo).
onMounted(() => {
  const m = $motion as any
  if (!m?.enabled || !root.value || !track.value) return
  const mm = m.gsap.matchMedia()
  mm.add('(min-width: 960px)', () => {
    const distance = () => track.value!.scrollWidth - window.innerWidth + 80
    const tween = m.gsap.to(track.value, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    })
    m.gsap.utils.toArray('.gl-card img').forEach((img: any) => {
      m.gsap.fromTo(img, { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: { trigger: img.closest('.gl-card'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
    })
  })
  onBeforeUnmount(() => mm.revert())
})
</script>

<template>
  <section id="resultados" ref="root" class="gallery theme-dark" aria-labelledby="resultados-title">
    <div class="gl-inner">
      <header class="gl-head container">
        <p class="eyebrow">Resultados</p>
        <h2 id="resultados-title" class="h2">Saiu daqui. <em>Foto de cliente.</em></h2>
        <p class="muted gl-sub">Nada de banco de imagem. Tudo é trabalho da equipe, direto do nosso Instagram.</p>
      </header>

      <div class="gl-scroller" data-lenis-prevent-touch>
        <ul ref="track" class="gl-track">
          <li v-for="(g, i) in gallery" :key="g.image" class="gl-card" :class="`h${i % 3}`">
            <NuxtLink :to="`/servicos/${g.service}`" class="gl-link zoom">
              <span class="gl-frame frame">
                <Pic :name="g.image" :alt="g.title" sizes="(min-width: 960px) 26vw, 72vw" />
              </span>
              <span class="gl-meta">
                <span class="num gl-i">{{ String(i + 1).padStart(2, '0') }}</span>
                <span>
                  <span class="gl-title">{{ g.title }}</span>
                  <span v-if="g.credit" class="gl-credit caps">{{ g.credit }}</span>
                </span>
              </span>
            </NuxtLink>
          </li>
          <li class="gl-card gl-end">
            <a :href="site.instagram" target="_blank" rel="noopener" class="gl-end-link">
              <Icon name="instagram" class="gl-end-icon" />
              <span class="h3">Tem muito mais no <em>{{ site.instagramHandle }}</em></span>
              <span class="link-line">Abrir Instagram <Icon name="arrow-up-right" /></span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  overflow: hidden;
  padding-block: clamp(88px, 10vw, 120px);
}

@media (min-width: 960px) {
  .gallery {
    height: 100vh;
    padding-block: 0;
  }

  .gl-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
  }
}

.gl-head {
  display: grid;
  gap: 16px;
  margin-bottom: 40px;
}

@media (min-width: 960px) {
  .gl-head {
    grid-template-columns: 1fr auto;
    align-items: end;
    margin-bottom: 0;
  }

  .gl-head .eyebrow {
    grid-column: 1 / -1;
  }

  .gl-sub {
    max-width: 34ch;
    text-align: right;
  }
}

.gl-scroller {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.gl-scroller::-webkit-scrollbar {
  display: none;
}

@media (min-width: 960px) {
  .gl-scroller {
    overflow: visible;
  }
}

.gl-track {
  display: flex;
  gap: 18px;
  padding-inline: var(--gutter);
  width: max-content;
  align-items: flex-start;
}

.gl-card {
  width: 72vw;
  max-width: 340px;
  scroll-snap-align: center;
  flex: none;
}

@media (min-width: 960px) {
  .gl-track {
    gap: 28px;
    align-items: center;
  }

  .gl-card {
    width: clamp(260px, 22vw, 340px);
    max-width: none;
  }

  .gl-card.h1 {
    margin-top: 8vh;
  }

  .gl-card.h2 {
    margin-top: -6vh;
  }
}

.gl-link {
  display: grid;
  gap: 14px;
}

.gl-frame {
  aspect-ratio: 3 / 4;
  border-radius: var(--radius);
  background: var(--graphite);
}

.gl-card.h1 .gl-frame {
  border-radius: 999px 999px var(--radius) var(--radius);
}

@media (min-width: 960px) {
  .gl-frame {
    max-height: 56vh;
    width: 100%;
  }

  .gl-frame img {
    width: 112%;
    max-width: none;
    margin-left: -6%;
  }
}

.gl-meta {
  display: flex;
  gap: 14px;
  align-items: baseline;
}

.gl-i {
  color: var(--gold);
  font-size: 0.95rem;
}

.gl-title {
  display: block;
  font-family: var(--f-display);
  font-size: 1.15rem;
  line-height: 1.25;
  transition: color 0.3s;
}

.gl-link:hover .gl-title {
  color: var(--gold-hi);
}

.gl-credit {
  display: block;
  margin-top: 4px;
  font-size: 0.56rem;
  color: var(--muted-dark);
}

.gl-end {
  align-self: stretch;
}

.gl-end-link {
  height: 100%;
  min-height: 320px;
  display: grid;
  align-content: center;
  justify-items: start;
  gap: 20px;
  padding: 36px;
  border: 1px solid var(--line-dark);
  border-radius: var(--radius);
  transition: border-color 0.4s, background 0.4s;
}

.gl-end-link:hover {
  border-color: var(--gold);
  background: rgba(201, 161, 90, 0.06);
}

.gl-end-icon {
  width: 36px;
  height: 36px;
  color: var(--gold);
}
</style>
