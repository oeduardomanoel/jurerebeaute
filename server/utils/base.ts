export function siteBase() {
  const cfg = useRuntimeConfig()
  return String(cfg.public.siteUrl || 'https://jurerebeaute.com.br').replace(/\/$/, '')
}
