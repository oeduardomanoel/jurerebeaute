<script setup lang="ts">
import { site, waLink } from '#shared/data/site'

// Barra fixa no celular: aparece depois do hero e some quando o agendamento ou o rodapé estão na tela.
const visible = ref(false)
const blockers = new Set<Element>()
let io: IntersectionObserver | null = null

function update() {
  visible.value = window.scrollY > window.innerHeight * 0.75 && blockers.size === 0
}
function observe() {
  io?.disconnect()
  blockers.clear()
  io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? blockers.add(e.target) : blockers.delete(e.target)))
    update()
  })
  document.querySelectorAll('[data-hide-bar]').forEach((el) => io!.observe(el))
}

onMounted(() => {
  observe()
  window.addEventListener('scroll', update, { passive: true })
  update()
})
const route = useRoute()
watch(() => route.fullPath, () => nextTick(observe))
onBeforeUnmount(() => {
  io?.disconnect()
  window.removeEventListener('scroll', update)
})
</script>

<template>
  <div class="bar" :class="{ on: visible }">
    <a class="bar-call" :href="`tel:${site.phone.replace(/[\s-]/g, '')}`" aria-label="Ligar para o salão"><Icon name="phone" /></a>
    <a class="bar-wa" :href="waLink('Oi! Vim pelo site e quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener" data-cta="mobilebar"><Icon name="whatsapp" /> Agendar pelo WhatsApp</a>
  </div>
</template>

<style scoped>
.bar {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: max(12px, env(safe-area-inset-bottom));
  z-index: 90;
  display: flex;
  gap: 8px;
  transform: translateY(150%);
  transition: transform 0.55s var(--ease);
}

.bar.on {
  transform: none;
}

@media (min-width: 900px) {
  .bar {
    display: none;
  }
}

.bar a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 58px;
  border-radius: 999px;
  box-shadow: 0 14px 30px -10px rgba(0, 0, 0, 0.5);
}

.bar-call {
  width: 58px;
  flex: none;
  background: var(--noir);
  color: var(--gold);
  border: 1px solid var(--line-dark);
}

.bar-wa {
  flex: 1;
  background: var(--gold);
  color: var(--noir);
  font-weight: 800;
  font-size: 1rem;
}

.bar a:active {
  transform: scale(0.98);
}
</style>
