<script setup lang="ts">
import { reviews, team } from '#shared/data/content'
import { site, waLink } from '#shared/data/site'

useSeo({
  title: 'Jurerê Beauté: salão de beleza em Jurerê Internacional, Florianópolis',
  description:
    'Mechas, morena iluminada, corte, mega hair, Kérastase, penteado, maquiagem e unhas na Rua das Algas, 389. Nota 5,0 no Google. Agende pelo WhatsApp.',
  path: '/',
})
useHead({
  link: [
    { rel: 'preload', as: 'image', href: '/images/hero-salao-morena-iluminada-1080.webp', fetchpriority: 'high' },
    { rel: 'modulepreload', href: '/assets/moments/picture-develops/moment.js' },
    { rel: 'modulepreload', href: '/assets/moments/word-highlight/moment.js' },
  ],
})


const cabelo = [
  { slug: 'mechas-e-loiros', name: 'Mechas e loiros', line: 'Superclareadores Keune da série 3000 ou loiro só de coloração.' },
  { slug: 'morena-iluminada', name: 'Morena iluminada', line: 'Tons quentes e raiz esfumada, para retocar menos.' },
  { slug: 'corte-e-escova', name: 'Corte e escova', line: 'A lavagem vem com massagem capilar indiana Champi.' },
  { slug: 'mega-hair', name: 'Mega hair', line: 'Comprimento e volume na mesma cor do seu cabelo.' },
]
const resto = [
  { slug: 'tratamentos-capilares', name: 'Tratamentos Kérastase e Keune', line: 'Hidratação, nutrição e reconstrução com produto original.' },
  { slug: 'penteado-e-maquiagem', name: 'Penteado e maquiagem', line: 'Semipresos, tranças e make para festa e casamento.' },
  { slug: 'unhas', name: 'Mãos, pés e unhas', line: 'Blindagem, esmaltação em gel e nail art.' },
  { slug: '', name: 'Sobrancelha e depilação', line: 'Dá para marcar junto com o cabelo ou a unha.' },
]
const picked = [0, 1, 3, 4, 6, 8].map((i) => reviews[i]!)
useJsonLd([salonSchema(), websiteSchema()])
</script>

<template>
    <!-- type: place · deal: hero place, nav-split, footer-visit, rhythm space, buttons arrow, mark: logo do cliente,
         offer pair, place trio, type moment address · moments: picture-develops (visita), word-highlight (frase da colorista) -->
    <section class="hero hero--place" data-enter aria-labelledby="hero-h">
      <picture class="hero__bg" data-phone-fill style="--ly-pos: 50% 50%">
        <source media="(max-width: 639px)" srcset="/images/hero-salao-morena-iluminada-phone-480.webp 480w, /images/hero-salao-morena-iluminada-phone-800.webp 800w" sizes="100vw" />
        <img
          src="/images/hero-salao-morena-iluminada-1080.webp"
          srcset="/images/hero-salao-morena-iluminada-800.webp 800w, /images/hero-salao-morena-iluminada-1080.webp 1080w"
          sizes="100vw"
          width="1080"
          height="360"
          alt="Cliente com morena iluminada em tons quentes, a colorista ajeitando o cabelo no salão"
          fetchpriority="high"
        />
      </picture>
      <div class="wrap"><div class="hero-text">
        <div class="hero__text">
          <h1 id="hero-h">Salão de beleza em Jurerê Internacional</h1>
          <p class="hero__lead">Cabelo, maquiagem e unhas na Rua das Algas. Terça a sábado, das 9h às 19h.</p>
          <div class="btn-row">
            <a class="btn btn--primary" :href="waLink('Oi! Quero agendar um horário no Jurerê Beauté.')" target="_blank" rel="noopener" data-cta="hero">Agendar pelo WhatsApp<svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path class="m-arrow__stem" d="M1 6h8" /><path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" /></svg></a>
          </div>
        </div>
      </div></div>
    </section>

    <section id="visit" class="section" data-place="visit" aria-labelledby="visit-h">
      <div class="wrap">
        <h2 id="visit-h">Visita ao salão</h2>
        <p class="type-moment"><a :href="site.googleMaps" target="_blank" rel="noopener">Rua das Algas, 389</a></p>
        <div class="grid grid--top">
          <div class="visit visit--card span-6">
            <div class="visit__head"><p class="t-small" data-aberto>Terça a sábado, das 9h às 19h</p></div>
            <div class="visit__cols">
              <div class="visit__col stack-4">
                <address class="visit__address">Sala 01, Jurerê Internacional<br />Florianópolis, SC</address>
                <a class="link" :href="`tel:${site.phone.replace(/[\s-]/g, '')}`">{{ site.phoneDisplay }}</a>
                <a class="link" :href="site.googleMaps" target="_blank" rel="noopener">Traçar rota</a>
              </div>
              <div class="visit__col"><Hours /></div>
            </div>
            <ul class="visit__rows">
              <li><span>Acesso</span><span>Rampa na entrada e estacionamento na rua</span></li>
              <li><span>Atendimento</span><span>Com hora marcada, e o café sai na hora</span></li>
            </ul>
          </div>
          <figure class="develop span-6 start-7" data-moment="picture-develops">
            <Pic name="salao-jurere-ambiente" alt="Cliente sorrindo com o cabelo iluminado, as prateleiras e o espelho do salão ao fundo" sizes="(min-width: 1024px) 588px, 92vw" />
          </figure>
        </div>
      </div>
    </section>

    <section id="servicos" class="section" style="--hm: 2" aria-labelledby="servicos-h">
      <div class="wrap">
        <div class="section-head">
          <h2 id="servicos-h">Serviços do salão</h2>
          <p>O valor sai depois da avaliação do seu cabelo. <a class="link" href="/servicos">Ver todos</a></p>
        </div>
        <div class="grid grid--top">
          <div class="span-3">
            <p class="t-label">Cabelo</p>
            <ul class="rows">
              <li v-for="r in cabelo" :key="r.slug"><span class="rows__name"><a :href="`/servicos/${r.slug}`">{{ r.name }}</a><small>{{ r.line }}</small></span></li>
            </ul>
          </div>
          <div class="span-3">
            <p class="t-label">Tratamento, produção e unhas</p>
            <ul class="rows">
              <li v-for="r in resto" :key="r.name"><span class="rows__name"><a v-if="r.slug" :href="`/servicos/${r.slug}`">{{ r.name }}</a><span v-else>{{ r.name }}</span><small>{{ r.line }}</small></span></li>
            </ul>
          </div>
          <div class="pair span-6 start-7">
            <a href="/servicos/morena-iluminada"><Pic name="morena-iluminada-tons-quentes-2" alt="Morena iluminada em tons quentes, vista de perto" sizes="(min-width: 1024px) 282px, 46vw" /></a>
            <a href="/servicos/mechas-e-loiros"><Pic name="mechas-efeito-natural-2" alt="Mechas em loiro bege com efeito natural, cabelo longo e liso" sizes="(min-width: 1024px) 282px, 46vw" /></a>
          </div>
        </div>
      </div>
    </section>

    <section id="avaliacao" class="section statement" data-moment="word-highlight" aria-label="Como a gente avalia">
      <div class="wrap">
        <p class="t-label">Da nossa colorista</p>
        <p class="mo-wh__text">Seu cabelo tem uma estrutura, um histórico químico e necessidades únicas. É isso que a gente olha antes de indicar <strong>qualquer técnica</strong> ou produto para a sua rotina.</p>
      </div>
    </section>

    <section id="trabalhos" class="section g2" aria-labelledby="trabalhos-h">
      <div class="wrap">
        <div class="group">
          <div class="section-head">
            <h2 id="trabalhos-h">Trabalhos feitos no salão</h2>
          </div>
          <div class="grid trio">
            <a class="span-5 r45" href="/servicos/morena-iluminada"><Pic name="morena-iluminada-tons-quentes-1" alt="Cliente com morena iluminada em tons quentes no salão" sizes="(min-width: 1024px) 486px, 92vw" /></a>
            <a class="span-4 r11" href="/servicos/mechas-e-loiros"><Pic name="loiro-dourado-ondas" alt="Loiro dourado com ondas largas" sizes="(min-width: 1024px) 384px, 46vw" /></a>
            <a class="span-3 r43" href="/servicos/penteado-e-maquiagem"><Pic name="penteado-semi-preso-trancas-1" alt="Semipreso com tranças e cachos soltos" sizes="(min-width: 1024px) 282px, 46vw" /></a>
          </div>
        </div>
        <div class="group">
          <p class="t-lead">As fotos acima são de clientes, todas do nosso <a class="link" :href="site.instagram" target="_blank" rel="noopener">Instagram</a>. No Google, a nota é {{ site.rating.display }} com {{ site.rating.count }} avaliações. <a class="link" :href="site.googleReviews" target="_blank" rel="noopener">Ler no Google</a></p>
          <div class="grid reviews">
            <figure v-for="(r, i) in picked" :key="r.author" class="span-4" :class="{ 'hide-phone': i > 2 }">
              <blockquote>“{{ r.text }}”</blockquote>
              <figcaption>{{ r.author }}, {{ r.service.toLowerCase() }}</figcaption>
            </figure>
          </div>
          <p class="team-line">Nomes que as clientes citam nas avaliações: {{ team.map((p) => p.name).join(', ') }}.</p>
        </div>
      </div>
    </section>

</template>
