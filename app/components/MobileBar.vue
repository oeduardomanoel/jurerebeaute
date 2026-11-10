<script setup lang="ts">
import { site, waLink } from '#shared/data/site'

// Barra fixa de conversão no celular. Aparece depois da primeira dobra
// e some quando o formulário de agendamento ou o rodapé estão na tela.
const visible = ref(false)
let io: IntersectionObserver | null = null
const blockers = new Set<Element>()

function update() {
  visible.value = window.scrollY > window.innerHeight * 0.7 && blockers.size === 0
}

onMounted(() => {
  io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? blockers.add(e.target) : blockers.delete(e.target)))
    update()
  })
  document.querySelectorAll('[data-hide-mobilebar]').forEach((el) => io!.observe(el))
  window.addEventListener('scroll', update, { passive: true })
  update()
})

const route = useRoute()
watch(
  () => route.fullPath,
  () =>
    nextTick(() => {
      blockers.clear()
      io?.disconnect()
      document.querySelectorAll('[data-hide-mobilebar]').forEach((el) => io!.observe(el))
    }),
)

onBeforeUnmount(() => {
  io?.disconnect()
  window.removeEventListener('scroll', update)
})
</script>

<template>
  <div class="bar" :class="{ visible }" aria-hidden="false">
    <a class="bar-call" :href="`tel:${site.phone.replace(/\s/g, '')}`" aria-label="Ligar para o salão">
      <Icon name="phone" />
    </a>
    <a class="bar-wa" :href="waLink('Oi! Vim pelo site e quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener" data-cta="mobilebar">
      <Icon name="whatsapp" />
      Agendar pelo WhatsApp
    </a>
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
  transform: translateY(140%);
  transition: transform 0.6s var(--ease);
}

.bar.visible {
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
  min-height: 56px;
  border-radius: 999px;
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.5);
}

.bar-call {
  width: 56px;
  flex: none;
  background: var(--noir);
  color: var(--gold);
  border: 1px solid var(--line-dark);
}

.bar-wa {
  flex: 1;
  background: var(--gold);
  color: var(--noir);
  font-family: var(--f-caps);
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.bar-wa:active,
.bar-call:active {
  transform: scale(0.98);
}
</style>
