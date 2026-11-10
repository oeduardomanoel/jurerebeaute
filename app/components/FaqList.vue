<script setup lang="ts">
defineProps<{ items: { q: string; a: string }[] }>()
</script>

<template>
  <div class="faq">
    <details v-for="(f, i) in items" :key="f.q" :open="i === 0">
      <summary>
        <span>{{ f.q }}</span>
        <i aria-hidden="true"><Icon name="plus" /></i>
      </summary>
      <p>{{ f.a }}</p>
    </details>
  </div>
</template>

<style scoped>
.faq {
  border-top: 1px solid var(--line);
}

details {
  border-bottom: 1px solid var(--line);
}

summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 24px 0;
  cursor: pointer;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

summary span {
  font-family: var(--f-display);
  font-size: var(--t-lead);
  line-height: 1.3;
  transition: color 0.3s;
}

summary:hover span {
  color: var(--gold-text);
}

summary i {
  display: grid;
  place-items: center;
  flex: none;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1.5px solid var(--line);
  color: var(--gold-text);
  transition: transform 0.5s var(--ease), background 0.35s, border-color 0.3s, color 0.3s;
}

details[open] summary i {
  transform: rotate(45deg);
  background: var(--gold);
  border-color: var(--gold);
  color: var(--noir);
}

details p {
  padding: 0 56px 26px 0;
  color: var(--muted);
  max-width: 66ch;
}

details[open] p {
  animation: intro-up 0.5s var(--ease);
}
</style>
