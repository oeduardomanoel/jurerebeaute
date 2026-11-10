<script setup lang="ts">
import { site, waLink } from '#shared/data/site'

const route = useRoute()
// Sobre o hero escuro da home o cabeçalho começa transparente; nas outras páginas já é sólido.
const overHero = computed(() => route.path === '/')
const scrolled = ref(false)
const hidden = ref(false)
const open = ref(false)

const nav = [
  { label: 'Serviços', hash: '#servicos' },
  { label: 'Trabalhos', hash: '#trabalhos' },
  { label: 'Avaliações', hash: '#avaliacoes' },
  { label: 'Visita', hash: '#visita' },
]
const href = (hash: string) => (route.path === '/' ? hash : `/${hash}`)

let lastY = 0
function onScroll() {
  const y = window.scrollY
  scrolled.value = y > 30
  if (!open.value) hidden.value = y > 520 && y > lastY + 4
  if (y < lastY - 4) hidden.value = false
  lastY = y
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})

const { $motion } = useNuxtApp()
watch(open, (v) => {
  document.documentElement.style.overflow = v ? 'hidden' : ''
  const l = ($motion as any)?.lenis
  v ? l?.stop() : l?.start()
})
watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <header class="hd" :class="{ solid: scrolled || !overHero, hidden, open }">
    <div class="hd-bar container">
      <NuxtLink to="/" class="hd-logo" aria-label="Jurerê Beauté, início">
        <img class="hd-ring" src="/brand/jurere-beaute-selo-160.webp" width="160" height="160" alt="" decoding="async" />
        <BrandLogo class="hd-brand" />
      </NuxtLink>

      <nav class="hd-nav" aria-label="Principal">
        <a v-for="n in nav" :key="n.hash" :href="href(n.hash)">{{ n.label }}</a>
      </nav>

      <div class="hd-actions">
        <a class="btn hd-cta" :href="waLink('Oi! Vim pelo site e quero agendar uma avaliação no Jurerê Beauté.')" target="_blank" rel="noopener" data-cta="header">
          <Icon name="whatsapp" /><span>Agende sua avaliação</span>
        </a>
        <button class="hd-burger" type="button" :aria-expanded="open" aria-controls="menu" @click="open = !open">
          <span class="sr-only">{{ open ? 'Fechar menu' : 'Abrir menu' }}</span>
          <i /><i />
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-show="open" id="menu" class="menu dark" role="dialog" aria-modal="true" aria-label="Menu">
        <nav class="menu-nav container" aria-label="Menu">
          <a v-for="(n, i) in nav" :key="n.hash" :href="href(n.hash)" :style="{ '--i': i }" @click="open = false">{{ n.label }}</a>
          <NuxtLink to="/servicos" :style="{ '--i': nav.length }" @click="open = false">Todos os serviços</NuxtLink>
        </nav>
        <div class="menu-foot container">
          <p>{{ site.address.street }}, Jurerê Internacional</p>
          <p class="muted">{{ site.hours.label }}</p>
          <a class="btn btn--gold btn--lg" :href="waLink('Oi! Vim pelo site e quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener"><Icon name="whatsapp" /> Agendar pelo WhatsApp</a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.hd {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  color: var(--ivory);
  transition: transform 0.6s var(--ease), background-color 0.4s, box-shadow 0.4s;
}

.hd.solid {
  background: rgba(18, 17, 16, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--line-dark);
}

.hd.hidden {
  transform: translateY(-100%);
}

.hd.open {
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;
}

.hd-bar {
  position: relative;
  z-index: 2;
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.hd-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--gold);
}

.hd-ring {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px var(--line-dark);
  transition: transform 0.8s var(--ease), box-shadow 0.4s;
}

.hd-logo:hover .hd-ring {
  transform: rotate(-12deg);
  box-shadow: 0 0 0 1px var(--gold);
}

.hd-brand {
  font-size: clamp(26px, 2.4vw, 38px);
  transition: transform 0.6s var(--ease), opacity 0.3s;
}

.hd-logo:hover .hd-brand {
  transform: scale(1.04);
}

.hd-nav {
  display: none;
  gap: 34px;
}

.hd-nav a {
  position: relative;
  font-size: 0.9875rem;
  font-weight: 600;
  padding-block: 8px;
  opacity: 0.88;
  transition: opacity 0.3s, color 0.3s;
}

.hd-nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.45s var(--ease);
}

.hd-nav a:hover {
  opacity: 1;
  color: var(--gold-hi);
}

.hd-nav a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.hd-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hd-cta {
  min-height: 46px;
  padding: 0 16px;
  color: var(--gold-hi);
  border-color: var(--gold);
  background: rgba(18, 17, 16, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.hd-cta span {
  display: none;
}

.hd-burger {
  display: grid;
  place-content: center;
  gap: 7px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1.5px solid var(--line-dark);
  transition: border-color 0.3s;
}

.hd-burger:hover {
  border-color: var(--gold);
}

.hd-burger i {
  display: block;
  width: 18px;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.5s var(--ease);
}

.open .hd-burger i:nth-of-type(1) {
  transform: translateY(4.5px) rotate(45deg);
}

.open .hd-burger i:nth-of-type(2) {
  transform: translateY(-4.5px) rotate(-45deg);
}

@media (max-width: 380px) {
  .hd-brand {
    display: none;
  }
}

@media (min-width: 640px) {
  .hd-cta {
    padding: 0 22px;
  }

  .hd-cta span {
    display: inline;
  }
}

@media (min-width: 1040px) {
  .hd-nav {
    display: flex;
  }

  .hd-burger {
    display: none;
  }
}

.menu {
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: calc(var(--header-h) + 5vh);
  padding-bottom: max(28px, env(safe-area-inset-bottom));
}

.menu-nav {
  display: grid;
  gap: 4px;
}

.menu-nav a {
  font-family: var(--f-display);
  font-weight: 300;
  font-size: clamp(2.4rem, 10vw, 3.4rem);
  line-height: 1.2;
  transition: color 0.3s, transform 0.5s var(--ease);
}

.menu-nav a:hover {
  color: var(--gold-hi);
  transform: translateX(8px);
}

.menu-foot {
  display: grid;
  gap: 6px;
}

.menu-foot .btn {
  margin-top: 16px;
  width: 100%;
}

.menu-enter-active,
.menu-leave-active {
  transition: clip-path 0.7s var(--ease-io);
}

.menu-enter-from,
.menu-leave-to {
  clip-path: inset(0 0 100% 0);
}

.menu-enter-active .menu-nav a {
  animation: intro-up 0.8s var(--ease) both;
  animation-delay: calc(var(--i) * 60ms + 220ms);
}
</style>
