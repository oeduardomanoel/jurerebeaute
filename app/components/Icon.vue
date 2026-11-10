<script setup lang="ts">
// Ícones desenhados à mão em traço fino, no mesmo peso das hairlines do site.
const props = defineProps<{ name: string; label?: string }>()

const paths: Record<string, string> = {
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
  'arrow-down': '<path d="M12 4v15M6 13l6 6 6-6"/>',
  star: '<path fill="currentColor" stroke="none" d="m12 2.8 2.7 6 6.5.6-4.9 4.3 1.5 6.4L12 16.8 6.2 20.1l1.5-6.4L2.8 9.4l6.5-.6z"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
  phone: '<path d="M5 3.8h3.3l1.6 4.1-2.1 1.3a11 11 0 0 0 7 7l1.3-2.1 4.1 1.6V19a1.7 1.7 0 0 1-1.8 1.7A16.7 16.7 0 0 1 3.3 5.6 1.7 1.7 0 0 1 5 3.8Z"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".8" fill="currentColor"/>',
  whatsapp:
    '<path d="M3.6 20.4 5 15.6A8.6 8.6 0 1 1 8.4 19z"/><path d="M9 8.3c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.3.6.8 1.2 1.3 1.6.6.5 1.2.8 1.6 1 .2.1.4 0 .5-.1l.6-.7c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3 0 .2 0 .9-.4 1.4-.4.5-1.3.9-1.9.9-.6 0-1.4-.1-3-.9a9.6 9.6 0 0 1-3.5-3.4c-.6-1-.8-1.8-.8-2.4 0-.6.4-1.3.7-1.7Z" fill="currentColor" stroke="none"/>',
  menu: '<path d="M3 8h18M3 16h18"/>',
  close: '<path d="m5 5 14 14M19 5 5 19"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  coffee: '<path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z"/><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5c-.6.8.6 1.6 0 2.5M12 3.5c-.6.8.6 1.6 0 2.5"/>',
  hourglass: '<path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9"/>',
  ramp: '<path d="M3 19h18L3 9z"/><circle cx="15" cy="6" r="1.6"/>',
  car: '<path d="M4 16V12l2-5h12l2 5v4"/><path d="M3 16h18v2H3z"/><circle cx="7.5" cy="13" r=".6" fill="currentColor"/><circle cx="16.5" cy="13" r=".6" fill="currentColor"/>',
  bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
  hands: '<path d="M7 20c-2-2-3-4.5-3-7.5V7.5a1.5 1.5 0 0 1 3 0V11M7 11V5.5a1.5 1.5 0 0 1 3 0V11M10 11V4.5a1.5 1.5 0 0 1 3 0V11M13 11V6a1.5 1.5 0 0 1 3 0v7.5c0 3-1 4.5-2 6.5"/>',
  sparkle: '<path d="M12 3c.6 4.5 2.5 6.4 7 7-4.5.6-6.4 2.5-7 7-.6-4.5-2.5-6.4-7-7 4.5-.6 6.4-2.5 7-7Z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  drop: '<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
}
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="['icon', `icon-${props.name}`, props.name === 'arrow' ? 'arrow' : '']"
    :role="props.label ? 'img' : undefined"
    :aria-label="props.label"
    :aria-hidden="props.label ? undefined : 'true'"
    v-html="paths[props.name] || ''"
  />
</template>

<style scoped>
.icon {
  width: 1.15em;
  height: 1.15em;
  flex: none;
}
</style>
