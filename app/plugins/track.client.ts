// Registra cliques de conversão (WhatsApp, telefone, rota) no dataLayer.
// Se o GA4/Google Tag Manager ou o Meta Pixel forem instalados depois, os eventos já chegam prontos.
export default defineNuxtPlugin(() => {
  const w = window as any
  w.dataLayer = w.dataLayer || []
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as HTMLElement).closest?.('a') as HTMLAnchorElement | null
      if (!a) return
      const href = a.href || ''
      let event: string | null = null
      if (href.includes('wa.me')) event = 'whatsapp_click'
      else if (href.startsWith('tel:')) event = 'phone_click'
      else if (/google\.com\/maps\/dir|waze\.com/.test(href)) event = 'directions_click'
      if (!event) return
      const detail = { event, cta: a.dataset.cta || 'link', page: location.pathname }
      w.dataLayer.push(detail)
      if (typeof w.fbq === 'function' && event === 'whatsapp_click') w.fbq('track', 'Contact', detail)
      if (typeof w.gtag === 'function') w.gtag('event', event, detail)
    },
    { capture: true },
  )
})
