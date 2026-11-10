# Jurerê Beauté · site

Site do salão Jurerê Beauté (Rua das Algas, 389, sala 01, Jurerê Internacional, Florianópolis).
Nuxt 4, gerado estático (todas as rotas pré-renderizadas), pronto para a Vercel.

Identidade: o letreiro e o selo são o logo real do salão (`public/brand`), nas cores preto, grafite e dourado.
Fontes: DM Serif Display nos títulos e Manrope no texto, auto-hospedadas em `public/fonts`.
Animações de scroll com GSAP ScrollTrigger e Lenis (`app/plugins/motion.ts`), respeitando "reduzir movimento".

Regra do conteúdo: nada inventado. Cada texto vem de uma legenda do Instagram do salão, de uma avaliação pública
do Google ou do perfil no Google Maps.

## Rodar local

```bash
npm install
npm run dev
```

Build de produção: `npm run build` e depois `npm run preview`.

## Publicar na Vercel

1. Importe o repositório na Vercel. O framework (Nuxt) é detectado sozinho.
2. Em **Settings → Environment Variables**, crie `NUXT_PUBLIC_SITE_URL` com o domínio final, sem barra no fim
   (ex.: `https://jurerebeaute.com.br`). Ele alimenta canonical, Open Graph, schema, `sitemap.xml`, `robots.txt` e `llms.txt`.
3. Faça o deploy. Depois, cadastre o domínio no Google Search Console e envie `/sitemap.xml`.

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Telefone, WhatsApp, endereço, horário, nota do Google | `shared/data/site.ts` |
| Serviços (cards, páginas, FAQ de cada serviço) | `shared/data/services.ts` |
| Avaliações, equipe, FAQ da home, galeria | `shared/data/content.ts` |
| Cores e tipografia | `app/assets/css/main.css` (variáveis no `:root`) |

Fotos ficam em `public/images` (WebP em 480/800/1080 px) e os vídeos em `public/video`.
Para trocar uma foto, mantenha o mesmo nome e os três tamanhos, ou adicione uma nova entrada em `shared/data/images.json`.

## SEO e GEO

- Meta tags, canonical e Open Graph por página (`app/composables/useSeo.ts`).
- JSON-LD: `HairSalon`/`BeautySalon` com endereço, geo, horário, nota e catálogo de serviços; `FAQPage`; `Service`; `BreadcrumbList`.
- `/sitemap.xml` com imagens, `/robots.txt` liberando buscadores e assistentes de IA, `/llms.txt` e `/llms-full.txt` para LLMs.
- 7 páginas de serviço com palavra-chave local (ex.: "morena iluminada em Florianópolis").

## Conversão

Todos os botões levam ao WhatsApp com mensagem pronta. O bloco de agendamento monta a mensagem com serviço, dia, período e nome.
Cliques em WhatsApp, telefone e rota são enviados ao `dataLayer` (eventos `whatsapp_click`, `phone_click`, `directions_click`),
prontos para GA4, Google Tag Manager ou Meta Pixel.

## Antes de publicar, confirme com o salão

- A lista de equipe em `shared/data/content.ts` saiu das avaliações do Google e dos créditos do Instagram. Equipe muda.
- A nota e o número de avaliações (`site.rating`) devem ser atualizados de tempos em tempos.
- As fotos e vídeos vieram do Instagram público do salão (@jurere.beaute).
