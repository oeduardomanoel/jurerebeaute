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
  font-size: clamp(1.6rem, 1.2rem + 1.8vw, 2.6rem);
  line-height: 1;
  white-space: nowrap;
}

li.alt {
  font-style: italic;
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
