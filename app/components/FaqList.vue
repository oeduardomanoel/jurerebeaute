<script setup lang="ts">
defineProps<{ items: { q: string; a: string }[] }>()
</script>

<template>
  <div class="faq">
    <details v-for="(f, i) in items" :key="f.q" class="faq-item" :open="i === 0">
      <summary>
        <span class="faq-q">{{ f.q }}</span>
        <span class="faq-icon" aria-hidden="true"><Icon name="plus" /></span>
      </summary>
      <div class="faq-a">
        <p>{{ f.a }}</p>
      </div>
    </details>
  </div>
</template>

<style scoped>
.faq {
  border-top: 1px solid var(--line);
}

.theme-dark .faq {
  border-color: var(--line-dark);
}

.faq-item {
  border-bottom: 1px solid var(--line);
}

.theme-dark .faq-item {
  border-color: var(--line-dark);
}

summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 26px 0;
  cursor: pointer;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

.faq-q {
  font-family: var(--f-display);
  font-size: var(--step-1);
  line-height: 1.3;
  transition: color 0.3s;
}

summary:hover .faq-q {
  color: var(--gold-deep);
}

.theme-dark summary:hover .faq-q {
  color: var(--gold-hi);
}

.faq-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--line);
  color: var(--gold-deep);
  transition: transform 0.5s var(--ease), background 0.4s, color 0.3s;
}

details[open] .faq-icon {
  transform: rotate(45deg);
  background: var(--gold);
  border-color: var(--gold);
  color: var(--noir);
}

.faq-a {
  padding: 0 56px 28px 0;
  color: var(--muted);
  max-width: 68ch;
}

.theme-dark .faq-a {
  color: var(--muted-dark);
}

details[open] .faq-a {
  animation: intro-up 0.6s var(--ease);
}
</style>
