<script setup lang="ts">
const props = withDefaults(defineProps<{ items: string[]; speed?: number; reverse?: boolean }>(), { speed: 40 })
const root = ref<HTMLElement>()
const { $motion } = useNuxtApp()

// A faixa acelera um pouco conforme a velocidade do scroll. Detalhe pequeno, sensação de vida.
onMounted(() => {
  const m = $motion as any
  if (!m?.enabled || !root.value) return
  const track = root.value.querySelector('.ticker-track') as HTMLElement
  const anim = track.getAnimations()[0]
  if (!anim) return
  let rate = 1
  const st = m.ScrollTrigger.create({
    trigger: root.value,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self: any) => {
      rate = 1 + Math.min(Math.abs(self.getVelocity()) / 600, 4)
    },
  })
  const tick = () => {
    anim.playbackRate += (rate - anim.playbackRate) * 0.08
    rate += (1 - rate) * 0.05
  }
  m.gsap.ticker.add(tick)
  onBeforeUnmount(() => {
    st.kill()
    m.gsap.ticker.remove(tick)
  })
})
</script>

<template>
  <div ref="root" class="ticker" :class="{ reverse: props.reverse }" :style="{ '--speed': `${props.speed}s` }">
    <div class="ticker-track">
      <template v-for="n in 2" :key="n">
        <ul class="ticker-group" :aria-hidden="n === 2 ? 'true' : undefined">
          <li v-for="(item, i) in props.items" :key="`${n}-${i}`" :class="i % 2 ? 'alt' : ''">
            {{ item }}<Icon name="sparkle" class="ticker-dot" />
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style scoped>
.ticker {
  overflow: hidden;
  border-block: 1px solid var(--line-dark);
  padding-block: 22px;
  background: var(--noir);
  color: var(--ivory);
}

.ticker-track {
  display: flex;
  width: max-content;
  animation: marquee var(--speed) linear infinite;
}

.reverse .ticker-track {
  animation-direction: reverse;
}

.ticker:hover .ticker-track {
  animation-play-state: paused;
}

.ticker-group {
  display: flex;
  flex: none;
}

li {
  display: inline-flex;
  align-items: center;
  gap: 36px;
  padding-right: 36px;
  font-family: var(--f-display);
  font-size: clamp(1.6rem, 1.2rem + 2vw, 2.8rem);
  line-height: 1;
  white-space: nowrap;
}

li.alt {
  font-style: italic;
  color: var(--gold-hi);
}

.ticker-dot {
  width: 18px;
  height: 18px;
  color: var(--gold);
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ticker-track {
    animation: none;
  }
}
</style>
