import type { Directive } from 'vue'

type RevealOpts =
  | undefined
  | string
  | {
      type?: 'up' | 'fade' | 'clip' | 'stagger' | 'lines'
      y?: number
      delay?: number
      stagger?: number
      start?: string
    }

interface MotionEl extends HTMLElement {
  __motion?: { kill: () => void }[]
}

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default defineNuxtPlugin(async (nuxtApp) => {
  // No servidor as diretivas não fazem nada: o HTML sai com tudo visível.
  if (import.meta.server) {
    const noop: Directive = { getSSRProps: () => ({}) }
    nuxtApp.vueApp.directive('reveal', noop)
    nuxtApp.vueApp.directive('parallax', noop)
    return { provide: { motion: null } }
  }

  const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('lenis'),
  ])
  gsap.registerPlugin(ScrollTrigger)

  const enabled = !prefersReduced()
  let lenis: InstanceType<typeof Lenis> | null = null

  if (enabled) {
    lenis = new Lenis({ duration: 1.15, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis!.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
  }

  const track = (el: MotionEl, item: { kill: () => void } | undefined | null) => {
    if (!item) return
    ;(el.__motion ||= []).push(item)
  }

  const inView = (el: Element) => el.getBoundingClientRect().top < window.innerHeight * 0.92

  const reveal: Directive<MotionEl, RevealOpts> = {
    mounted(el, binding) {
      if (!enabled) return
      const raw = binding.value
      const opts = typeof raw === 'string' ? { type: raw as any } : raw || {}
      const type = opts.type || 'up'
      const start = opts.start || 'top 88%'
      // O que já está na tela no carregamento não é escondido (evita "piscar").
      if (inView(el)) return

      if (type === 'stagger') {
        const kids = Array.from(el.children)
        track(
          el,
          gsap.fromTo(kids, { y: opts.y ?? 36, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            stagger: opts.stagger ?? 0.09,
            delay: opts.delay ?? 0,
            scrollTrigger: { trigger: el, start, once: true },
          }),
        )
      } else if (type === 'clip') {
        const media = el.querySelector('img, video')
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true }, delay: opts.delay ?? 0 })
        tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' })
        if (media) tl.fromTo(media, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0.1)
        track(el, tl)
      } else if (type === 'lines') {
        const lines = el.querySelectorAll('.line-mask > span')
        track(
          el,
          gsap.fromTo(lines, { yPercent: 105 }, {
            yPercent: 0,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: el, start, once: true },
          }),
        )
      } else {
        track(
          el,
          gsap.fromTo(el, { y: type === 'fade' ? 0 : opts.y ?? 40, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: type === 'fade' ? 1.6 : 1.2,
            ease: 'expo.out',
            delay: opts.delay ?? 0,
            scrollTrigger: { trigger: el, start, once: true },
          }),
        )
      }
    },
    beforeUnmount(el) {
      el.__motion?.forEach((m) => m.kill())
      el.__motion = []
    },
  }

  const parallax: Directive<MotionEl, number | undefined> = {
    mounted(el, binding) {
      if (!enabled) return
      const amount = binding.value ?? 12
      const target = (el.querySelector('img, video') as HTMLElement) || el
      if (target !== el) gsap.set(target, { scale: 1 + Math.abs(amount) / 50 })
      track(
        el,
        gsap.fromTo(
          target,
          { yPercent: -amount / 2 },
          { yPercent: amount / 2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        ),
      )
    },
    beforeUnmount(el) {
      el.__motion?.forEach((m) => m.kill())
      el.__motion = []
    },
  }

  nuxtApp.vueApp.directive('reveal', reveal)
  nuxtApp.vueApp.directive('parallax', parallax)

  nuxtApp.hook('page:finish', () => {
    lenis?.scrollTo(0, { immediate: true, force: true })
    requestAnimationFrame(() => ScrollTrigger.refresh())
  })

  // Âncoras internas (#servicos etc.) passam pelo Lenis para manter a suavidade.
  window.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest?.('a[href^="#"], a[href^="/#"]') as HTMLAnchorElement | null
    if (!a || !lenis) return
    const hash = a.getAttribute('href')!.replace(/^\//, '')
    if (location.pathname !== '/' && a.getAttribute('href')!.startsWith('/#')) return
    const target = hash.length > 1 ? document.querySelector(hash) : null
    if (!target) return
    e.preventDefault()
    lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.4 })
    history.replaceState(null, '', hash)
  })

  window.addEventListener('load', () => ScrollTrigger.refresh())

  return { provide: { motion: { gsap, ScrollTrigger, lenis, enabled } } }
})
