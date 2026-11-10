<script setup lang="ts">
import { site, waLink } from '#shared/data/site'

const route = useRoute()
const scrolled = ref(false)
const hidden = ref(false)
const open = ref(false)

const nav = [
  { label: 'Serviços', to: '/#servicos' },
  { label: 'Resultados', to: '/#resultados' },
  { label: 'Como funciona', to: '/#como-funciona' },
  { label: 'Avaliações', to: '/#avaliacoes' },
  { label: 'Onde estamos', to: '/#onde-estamos' },
]

let lastY = 0
function onScroll() {
  const y = window.scrollY
  scrolled.value = y > 40
  hidden.value = !open.value && y > 480 && y > lastY + 2
  if (y < lastY - 2) hidden.value = false
  lastY = y
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const { $motion } = useNuxtApp()
watch(open, (v) => {
  if (import.meta.client) {
    document.documentElement.style.overflow = v ? 'hidden' : ''
    const l = ($motion as any)?.lenis
    v ? l?.stop() : l?.start()
  }
})
watch(() => route.fullPath, () => (open.value = false))

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <header class="header" :class="{ scrolled, hidden, open }">
    <div class="header-inner container">
      <NuxtLink to="/" class="brand" aria-label="Jurerê Beauté, página inicial">
        <Logo />
      </NuxtLink>

      <nav class="nav" aria-label="Principal">
        <a v-for="item in nav" :key="item.to" :href="route.path === '/' ? item.to.slice(1) : item.to" class="nav-link">{{ item.label }}</a>
      </nav>

      <div class="actions">
        <a class="btn btn-book" :href="waLink('Oi! Vim pelo site e quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener" data-cta="header">
          <Icon name="whatsapp" />
          <span>Agendar</span>
        </a>
        <button class="burger" type="button" :aria-expanded="open" aria-controls="menu-mobile" @click="open = !open">
          <span class="sr-only">{{ open ? 'Fechar menu' : 'Abrir menu' }}</span>
          <i /><i />
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-show="open" id="menu-mobile" class="menu theme-dark" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="menu-ring" aria-hidden="true" />
        <nav class="menu-nav container" aria-label="Menu">
          <a
            v-for="(item, i) in nav"
            :key="item.to"
            :href="route.path === '/' ? item.to.slice(1) : item.to"
            class="menu-link"
            :style="{ '--i': i }"
            @click="open = false"
          >
            <span class="num">0{{ i + 1 }}</span>
            {{ item.label }}
          </a>
          <NuxtLink to="/servicos" class="menu-link" :style="{ '--i': nav.length }" @click="open = false">
            <span class="num">0{{ nav.length + 1 }}</span>
            Todos os serviços
          </NuxtLink>
        </nav>
        <div class="menu-foot container">
          <p class="caps">{{ site.address.street }} · Jurerê Internacional</p>
          <p class="caps muted">{{ site.hours.short }}</p>
          <a class="btn btn--gold btn--lg" :href="waLink('Oi! Vim pelo site e quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener">
            <Icon name="whatsapp" /> Agendar pelo WhatsApp
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  color: var(--ivory);
  transition: transform 0.6s var(--ease), background-color 0.5s var(--ease), border-color 0.5s;
  border-bottom: 1px solid transparent;
}

.header.scrolled {
  background: color-mix(in srgb, var(--noir) 82%, transparent);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  border-bottom-color: var(--line-dark);
}

.header.hidden {
  transform: translateY(-100%);
}

.header.open {
  background: transparent;
  backdrop-filter: none;
  border-bottom-color: transparent;
}

.header-inner {
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  position: relative;
  z-index: 2;
}

.brand :deep(.logo-mark) {
  font-size: 36px;
}

.nav {
  display: none;
  gap: clamp(18px, 2.4vw, 36px);
}

.nav-link {
  position: relative;
  font-family: var(--f-caps);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding-block: 8px;
  opacity: 0.82;
  transition: opacity 0.3s, color 0.3s;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 2px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--gold);
  transform: translateX(-50%) scale(0);
  transition: transform 0.45s var(--ease);
}

.nav-link:hover {
  opacity: 1;
  color: var(--gold-hi);
}

.nav-link:hover::after {
  transform: translateX(-50%) scale(1);
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-book {
  min-height: 44px;
  padding: 0 20px;
  border-color: var(--line-dark);
  color: var(--ivory);
}

.btn-book span {
  display: none;
}

.burger {
  width: 44px;
  height: 44px;
  display: grid;
  place-content: center;
  gap: 7px;
  border: 1px solid var(--line-dark);
  border-radius: 50%;
  transition: border-color 0.3s;
}

.burger:hover {
  border-color: var(--gold);
}

.burger i {
  display: block;
  width: 18px;
  height: 1px;
  background: currentColor;
  transition: transform 0.5s var(--ease);
}

.open .burger i:nth-of-type(1) {
  transform: translateY(4px) rotate(45deg);
}

.open .burger i:nth-of-type(2) {
  transform: translateY(-4px) rotate(-45deg);
}

@media (min-width: 560px) {
  .btn-book span {
    display: inline;
  }
}

@media (min-width: 1100px) {
  .nav {
    display: flex;
  }

  .burger {
    display: none;
  }
}

/* menu mobile */
.menu {
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: calc(var(--header-h) + 4vh);
  padding-bottom: max(28px, env(safe-area-inset-bottom));
  overflow: hidden;
}

.menu-ring {
  position: absolute;
  right: -40vw;
  top: 10vh;
  width: 110vw;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid var(--line-dark);
  box-shadow: inset 0 0 0 14px var(--noir), inset 0 0 0 15px var(--line-dark);
  pointer-events: none;
}

.menu-nav {
  display: grid;
  gap: 6px;
  position: relative;
}

.menu-link {
  display: flex;
  align-items: baseline;
  gap: 16px;
  font-family: var(--f-display);
  font-size: clamp(2.2rem, 9vw, 3.4rem);
  line-height: 1.15;
  transition: color 0.3s, transform 0.5s var(--ease);
}

.menu-link .num {
  font-size: 0.9rem;
  color: var(--gold);
}

.menu-link:hover {
  color: var(--gold-hi);
  transform: translateX(8px);
}

.menu-foot {
  display: grid;
  gap: 10px;
  position: relative;
}

.menu-foot .btn {
  margin-top: 14px;
  width: 100%;
}

.menu-enter-active,
.menu-leave-active {
  transition: clip-path 0.8s var(--ease-in-out);
}

.menu-enter-from,
.menu-leave-to {
  clip-path: inset(0 0 100% 0);
}

.menu-enter-active .menu-link {
  animation: intro-up 0.9s var(--ease) both;
  animation-delay: calc(var(--i) * 60ms + 250ms);
}
</style>
