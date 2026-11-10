import { services } from '#shared/data/services'
import images from '#shared/data/images.json'

export default defineEventHandler((event) => {
  const base = siteBase()
  const today = new Date().toISOString().slice(0, 10)
  const img = (name: string, title: string) =>
    `<image:image><image:loc>${base}/images/${name}-${(images as any)[name]?.sizes.at(-1) ?? 1080}.webp</image:loc><image:title>${title}</image:title></image:image>`

  const pages = [
    { loc: '/', priority: '1.0', freq: 'weekly', images: [img('morena-iluminada-tons-quentes-1', 'Morena iluminada no Jurerê Beauté'), img('mechas-efeito-natural-1', 'Mechas com efeito natural')] },
    { loc: '/servicos', priority: '0.9', freq: 'monthly', images: [] as string[] },
    ...services.map((s) => ({
      loc: `/servicos/${s.slug}`,
      priority: '0.8',
      freq: 'monthly',
      images: [s.image, ...s.gallery.slice(0, 3)].map((g) => img(g, `${s.name} em Jurerê Internacional`)),
    })),
    { loc: '/privacidade', priority: '0.2', freq: 'yearly', images: [] as string[] },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map(
    (p) => `  <url>
    <loc>${base}${p.loc === '/' ? '/' : p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>${p.images.length ? '\n    ' + p.images.join('\n    ') : ''}
  </url>`,
  )
  .join('\n')}
</urlset>
`
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
