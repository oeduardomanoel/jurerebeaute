<script setup lang="ts">
withDefaults(defineProps<{ items: string[]; speed?: number }>(), { speed: 42 })
</script>

<template>
  <div class="mq" :style="{ '--speed': `${speed}s` }">
    <div class="mq-track">
      <ul v-for="n in 2" :key="n" class="mq-group" :aria-hidden="n === 2 ? 'true' : undefined">
        <li v-for="(item, i) in items" :key="`${n}-${i}`" :class="{ alt: i % 2 }">{{ item }}<Icon name="sparkle" class="mq-dot" /></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.mq {
  overflow: hidden;
  padding-block: 26px;
  background: var(--gold);
  color: var(--noir);
}

.mq-track {
  display: flex;
  width: max-content;
  animation: marquee var(--speed) linear infinite;
}

.mq:hover .mq-track {
  animation-play-state: paused;
}

.mq-group {
  display: flex;
  flex: none;
}

li {
  display: inline-flex;
  align-items: center;
  gap: 32px;
  padding-right: 32px;
  font-family: var(--f-display);
  font-weight: 500;
  font-size: clamp(1.3rem, 1rem + 1.4vw, 2.1rem);
  line-height: 1;
  white-space: nowrap;
}

li.alt {
  font-family: var(--f-script);
  font-size: 1.3em;
  line-height: 0.8;
}

.mq-dot {
  width: 18px;
  height: 18px;
}

@media (prefers-reduced-motion: reduce) {
  .mq-track {
    animation: none;
  }
}
</style>
