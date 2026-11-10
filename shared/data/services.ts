// Serviços do salão. Cada item vira uma linha na home e uma página em /servicos/[slug].
// REGRA: só fatos com fonte. Cada texto vem de uma legenda do Instagram @jurere.beaute,
// de uma avaliação pública do Google ou do perfil do salão no Google Maps.

export interface Faq { q: string; a: string }
export interface Quote { text: string; author: string }

export interface Service {
  slug: string
  name: string
  index: string
  kicker: string
  card: string
  title: string
  seoTitle: string
  seoDescription: string
  lead: string
  body: string[]
  facts: string[]
  image: string
  gallery: string[]
  video?: { src: string; poster: string }
  quotes: Quote[]
  faq: Faq[]
  related: string[]
  wa: string
}

export const services: Service[] = [
  {
    slug: 'mechas-e-loiros',
    name: 'Mechas e loiros',
    index: '01',
    kicker: 'Cor',
    card: 'Loiro feito com diagnóstico, histórico químico e colorimetria antes da técnica.',
    title: 'Mechas e loiros em Jurerê Internacional',
    seoTitle: 'Mechas e Loiro em Jurerê Internacional | Jurerê Beauté',
    seoDescription:
      'Mechas, loiro iluminado e superclareadores Keune em Jurerê Internacional, Florianópolis. Salão nota 5,0 no Google. Agende sua avaliação pelo WhatsApp.',
    lead: 'O segredo não está só no produto: envolve diagnóstico, histórico químico, colorimetria, técnica e respeito aos limites do fio.',
    body: [
      'A colorista do salão trabalha com a Keune. Com a linha Ultimate Blonde, dá para conquistar um loiro claro com coloração, sem necessariamente recorrer ao pó descolorante.',
      'A série 3000 de superclareadores da Keune pode clarear até 6 tons em cabelo virgem e até 5 em cabelo colorido, dependendo da base e do histórico.',
    ],
    facts: ['Mechas e luzes', 'Loiro com a série 3000 da Keune', 'Loiro de coloração com Ultimate Blonde', 'Correção de dourado amarelado'],
    image: 'mechas-efeito-natural-1',
    gallery: ['mechas-efeito-natural-2', 'loiro-dourado-ondas', 'loiro-ultimate-blonde-keune', 'mechas-efeito-natural-3', 'loiro-mechas-liso', 'loiro-superclareadora-3000'],
    video: { src: '/video/caso-dourado-natural.mp4', poster: '/video/caso-dourado-natural.webp' },
    quotes: [
      { text: 'Faço cabelo com a Vania a um tempo, e ela é uma excelente profissional, fez um loiro magnífico, e me ajudou no tratamento.', author: 'Clara C., no Google' },
      { text: 'Queria dar os parabéns para a Vania Couto que é uma profissional incrível principalmente na área de corte e mechas.', author: 'Joy N., no Google' },
    ],
    faq: [
      { q: 'Dá para ficar loira sem descolorir?', a: 'Em alguns cabelos, sim. A linha Ultimate Blonde da Keune permite chegar num loiro claro com coloração, sem necessariamente usar pó descolorante. Se funciona no seu depende da base e do histórico, que a colorista avalia.' },
      { q: 'O que é a série 3000 da Keune?', a: 'São superclareadores da Keune. Segundo a marca, clareiam até 6 tons em cabelo virgem e até 5 em cabelo colorido, dependendo da base e do histórico.' },
      { q: 'Meu loiro ficou amarelado. Tem jeito?', a: 'Um caso do salão: o dourado estava bonito, mas precisava de mais naturalidade e menos amarelo. A raiz foi aberta e mechas estratégicas conectaram o crescimento ao comprimento, sem aquela diferença marcada de tons.' },
    ],
    related: ['morena-iluminada', 'tratamentos-capilares', 'mega-hair'],
    wa: 'Oi! Quero agendar uma avaliação de mechas/loiro no Jurerê Beauté.',
  },
  {
    slug: 'morena-iluminada',
    name: 'Morena iluminada',
    index: '02',
    kicker: 'Cor',
    card: 'Tons quentes, dimensão e efeito natural, com técnica de baixa manutenção.',
    title: 'Morena iluminada em Jurerê Internacional',
    seoTitle: 'Morena Iluminada em Florianópolis | Jurerê Beauté',
    seoDescription:
      'Morena iluminada, pontos de luz e mechas em tons quentes em Jurerê Internacional, Florianópolis. Efeito natural e baixa manutenção. Agende pelo WhatsApp.',
    lead: 'Quando a iluminação valoriza o cabelo sem apagar a identidade de quem usa.',
    body: [
      'Um tom iluminado, quente e cheio de dimensão. Uma cor com efeito natural e técnica de baixa manutenção, para quem ama cabelo bonito sem precisar de retoques constantes.',
      'Pontos de luz, mechas com efeito natural e luminosidade na medida certa. Os tons quentes entram numa composição pensada para elegância e naturalidade.',
    ],
    facts: ['Morena iluminada', 'Pontos de luz', 'Mechas em tons quentes', 'Técnica de baixa manutenção'],
    image: 'morena-iluminada-tons-quentes-1',
    gallery: ['morena-iluminada-tons-quentes-2', 'morena-iluminada-ondas', 'pontos-de-luz-castanho', 'morena-iluminada-tons-quentes-3', 'morena-iluminada-salao'],
    video: { src: '/video/hero-morena-iluminada.mp4', poster: '/video/hero-morena-iluminada.webp' },
    quotes: [
      { text: 'Fizemos renovação do corte e cor. A Letícia como sempre arrasa muito! Exatamente como eu queria! Atendimento personalizado e impecável!!', author: 'Liana F., no Google' },
    ],
    faq: [
      { q: 'Precisa retocar todo mês?', a: 'A morena iluminada que o salão faz é uma técnica de baixa manutenção, pensada para quem não quer retoques constantes. O intervalo para o seu cabelo a colorista combina com você.' },
      { q: 'Quem faz a cor no salão?', a: 'Nos créditos do Instagram, a morena iluminada em tons quentes é da Bárbara Oliveira. Nas avaliações do Google, as clientes também citam a Vânia Couto e a Letícia para cor.' },
    ],
    related: ['mechas-e-loiros', 'corte-e-escova', 'tratamentos-capilares'],
    wa: 'Oi! Quero agendar uma avaliação de morena iluminada no Jurerê Beauté.',
  },
  {
    slug: 'corte-e-escova',
    name: 'Corte e escova',
    index: '03',
    kicker: 'Forma',
    card: 'Tem cliente que vem do Rio Grande do Sul só para cortar aqui.',
    title: 'Corte de cabelo e escova em Jurerê',
    seoTitle: 'Corte de Cabelo e Escova em Jurerê Internacional | Jurerê Beauté',
    seoDescription:
      'Corte feminino, escova e massagem capilar indiana Champi em Jurerê Internacional, Florianópolis. Salão nota 5,0 no Google. Agende pelo WhatsApp.',
    lead: 'O corte ideal vai muito além da moda do momento.',
    body: [
      'Nas avaliações do Google, as clientes citam os profissionais pelo nome: o Léo Penteado e o Paulinho no corte, a Bárbara e a Vânia na escova.',
      'Uma cliente que fez corte com escova contou que ficou impressionada com as técnicas e os instrumentos, e com a massagem capilar indiana Champi.',
    ],
    facts: ['Corte feminino', 'Escova', 'Massagem capilar indiana Champi', 'Renovação de corte e cor'],
    image: 'pontos-de-luz-castanho',
    gallery: ['loiro-mechas-liso', 'loiro-escova-volume', 'morena-iluminada-ondas', 'sorriso-cliente-cabelo-hidratado'],
    quotes: [
      { text: 'Léo Penteado é um profissional diferenciado. Muito habilidoso no corte de cabelos. Venho do Rio Grande do Sul sempre que posso pra cortar com ele.', author: 'Catia S., no Google' },
      { text: 'Eu Heloisa, amo a escova da Barbara no Jurerê Beauté. O salão recebe muito bem, é um ambiente calmo e tranquilo, organizado e pontual… mas a escova da Bárbara é a melhor de Jurerê.', author: 'Heloisa M., no Google' },
      { text: 'Ótima experiencia! Fiz um corte de cabelo com o Paulinho e ficou lindo, excelente profissional e muito querido!', author: 'Manu G., no Google' },
    ],
    faq: [
      { q: 'O que é a massagem capilar Champi?', a: 'É uma massagem capilar de origem indiana. Uma cliente citou no Google que ela veio junto do corte com escova.' },
      { q: 'Precisa marcar horário?', a: 'Sim. O salão atende com hora marcada, de terça a sábado, das 9h às 19h. O agendamento é pelo WhatsApp (48) 99612-3993.' },
    ],
    related: ['morena-iluminada', 'tratamentos-capilares', 'penteado-e-maquiagem'],
    wa: 'Oi! Quero agendar corte e escova no Jurerê Beauté.',
  },
  {
    slug: 'mega-hair',
    name: 'Mega hair',
    index: '04',
    kicker: 'Comprimento',
    card: 'Mechas e mega hair juntos: luminosidade, comprimento e movimento.',
    title: 'Mega hair em Jurerê Internacional',
    seoTitle: 'Mega Hair em Florianópolis | Jurerê Beauté Jurerê Internacional',
    seoDescription:
      'Mega hair com mechas em Jurerê Internacional, Florianópolis: comprimento, luminosidade e movimento com efeito natural. Agende sua avaliação pelo WhatsApp.',
    lead: 'A combinação de mechas e mega hair valoriza os fios, trazendo luminosidade, comprimento e movimento.',
    body: [
      'Um visual pensado para realçar a beleza sem perder a naturalidade. O loiro iluminado com mega hair do Instagram do salão é do Dion Moraes e da Milet Lach.',
      'Tudo começa com uma avaliação no salão, para ver as possibilidades para o seu cabelo.',
    ],
    facts: ['Mega hair', 'Mega hair com mechas', 'Avaliação no salão'],
    image: 'mega-hair-loiro-iluminado',
    gallery: ['mega-hair-cabelao', 'loiro-dourado-ondas', 'loiro-escova-volume', 'mechas-efeito-natural-3'],
    quotes: [],
    faq: [
      { q: 'Como começo?', a: 'Pela avaliação. Chame no WhatsApp (48) 99612-3993 e a recepção marca o horário.' },
    ],
    related: ['mechas-e-loiros', 'tratamentos-capilares', 'corte-e-escova'],
    wa: 'Oi! Quero agendar uma avaliação de mega hair no Jurerê Beauté.',
  },
  {
    slug: 'tratamentos-capilares',
    name: 'Tratamentos Kérastase e Keune',
    index: '05',
    kicker: 'Cuidado',
    card: 'Salão autorizado Kérastase, com produtos originais a preço de internet.',
    title: 'Tratamentos capilares Kérastase e Keune em Jurerê',
    seoTitle: 'Tratamento Capilar Kérastase em Jurerê Internacional | Jurerê Beauté',
    seoDescription:
      'Salão autorizado Kérastase em Jurerê Internacional. Tratamentos Kérastase, Keune e Truss, com produtos originais e preço equivalente ao da internet.',
    lead: 'Aqui ritual de continuidade é regra. Não para correção, e sim o tratamento que todo cabelo precisa.',
    body: [
      'O Jurerê Beauté é salão autorizado Kérastase: oferece apenas produtos originais, com preço equivalente ao da internet.',
      'Da Keune, a colorista do salão destacou no Instagram o Radiant Gloss shampoo, a Vital Nutrition Mask, o Velvet Smooth 2 phase e o Smooth Operator. A indicação certa, ela lembra, parte de uma avaliação profissional.',
    ],
    facts: ['Salão autorizado Kérastase', 'Produtos originais a preço de internet', 'Keune', 'Truss'],
    image: 'keune-vital-nutrition',
    gallery: ['colorista-keune-produtos', 'keune-velvet-smooth', 'keune-smooth-operator', 'colorista-keune-1'],
    quotes: [
      { text: 'Excelente salão de beleza para fazer todos os procedimentos que você precisa. Luzes, coloração, pés e mãos. Unha em gel. Tratamentos com excelentes marcas. Produtos TRUSS com preço ótimo!!', author: 'Silvana D., no Google' },
    ],
    faq: [
      { q: 'O salão é autorizado Kérastase?', a: 'Sim. O Jurerê Beauté é salão autorizado Kérastase e oferece apenas produtos originais, com preço equivalente ao da internet.' },
      { q: 'Quais marcas o salão usa?', a: 'Kérastase, Keune e Truss.' },
    ],
    related: ['mechas-e-loiros', 'morena-iluminada', 'corte-e-escova'],
    wa: 'Oi! Quero saber sobre os tratamentos Kérastase/Keune do Jurerê Beauté.',
  },
  {
    slug: 'penteado-e-maquiagem',
    name: 'Penteado e maquiagem',
    index: '06',
    kicker: 'Produção',
    card: 'Semipresos, tranças e make. E pronta no horário combinado.',
    title: 'Penteado e maquiagem em Jurerê Internacional',
    seoTitle: 'Penteado e Maquiagem em Jurerê Internacional | Jurerê Beauté',
    seoDescription:
      'Penteados, semipresos, tranças e maquiagem em Jurerê Internacional, Florianópolis. Produção completa com cabelo, make, mãos e pés. Agende pelo WhatsApp.',
    lead: 'Penteado, maquiagem, mãos e pés no mesmo lugar, terminando no horário combinado.',
    body: [
      'No Instagram do salão: semipreso com tranças orgânicas, semipreso escultural e uma produção leve e atemporal. Cada penteado é uma composição de texturas, formas e detalhes.',
      'Nos créditos aparecem a maquiadora Carol Jesuíno, a Bruna na make e o Dion Moraes nos penteados.',
    ],
    facts: ['Penteados e semipresos', 'Tranças', 'Maquiagem', 'Produção com mãos e pés'],
    image: 'penteado-semi-preso-trancas-1',
    gallery: ['maquiagem-rabo-alto-1', 'penteado-semi-preso-escultural-1', 'maquiagem-coque-atemporal', 'penteado-semi-preso-trancas-3', 'maquiagem-loira-natural', 'maquiagem-rabo-alto-2'],
    video: { src: '/video/making-of-make-penteado.mp4', poster: '/video/making-of-make-penteado.webp' },
    quotes: [
      { text: 'Meninas espetaculares!! Fiz penteado, manicure (pés e mãos) e maquiagem, elas foram impecáveis do início ao fim e ainda terminaram no horário combinado. Nota 1000!', author: 'Sara H., no Google' },
      { text: 'Salão maravilhosooooooo!!! As gurias são excelentes, atendimento único! Fiz o melhor penteado e make da minha vida, recomendo muito.', author: 'Michelle S., no Google' },
    ],
    faq: [
      { q: 'Dá para fazer cabelo, make e unhas no mesmo dia?', a: 'Dá. Uma cliente contou no Google que fez penteado, manicure de pés e mãos e maquiagem, e que terminaram no horário combinado.' },
      { q: 'Preciso marcar com antecedência?', a: 'Uma cliente deixou a dica no Google: sempre é bom marcar com antecedência.' },
    ],
    related: ['unhas', 'corte-e-escova', 'mega-hair'],
    wa: 'Oi! Quero agendar penteado e maquiagem no Jurerê Beauté. A data é:',
  },
  {
    slug: 'unhas',
    name: 'Mãos, pés e unhas',
    index: '07',
    kicker: 'Detalhe',
    card: 'Blindagem, esmaltação em gel e nail art. Acabamento e durabilidade.',
    title: 'Manicure, unhas em gel e nail art em Jurerê',
    seoTitle: 'Manicure e Unhas em Gel em Jurerê Internacional | Jurerê Beauté',
    seoDescription:
      'Manicure, pedicure, blindagem, esmaltação em gel e nail art em Jurerê Internacional, Florianópolis. Salão nota 5,0 no Google. Agende pelo WhatsApp.',
    lead: 'As unhas ficam perfeitas, com ótimo acabamento e durabilidade. Quem diz é uma cliente, no Google.',
    body: [
      'Blindagem com esmaltação em gel: unhas naturais, com brilho prolongado. No Instagram, o trabalho é da Milene Castro.',
      'Nail art em rosa com pequenos detalhes, esmalte azul bebê, pés e mãos. Nas avaliações, as clientes citam a Keliane e a Silvia.',
    ],
    facts: ['Manicure e pedicure', 'Blindagem', 'Esmaltação em gel', 'Unha em gel', 'Nail art'],
    image: 'unhas-rosa-nail-art-1',
    gallery: ['unhas-rosa-nail-art-2', 'unhas-esmaltacao-processo', 'unhas-blindagem-gel', 'unhas-rosa-detalhe'],
    quotes: [
      { text: 'A manicure Keliane é espetacular, tanto do ponto de vista da qualidade do trabalho quanto da delicadeza no atendimento. É a melhor manicure que já me atendeu e eu sou 60 +.', author: 'Marilene R., no Google' },
      { text: 'Sempre sou muito bem atendida no Jurerê Beauté. As unhas ficam perfeitas, com ótimo acabamento e durabilidade. As recepcionistas são ágeis e organizadas.', author: 'Ana F., no Google' },
    ],
    faq: [
      { q: 'O que é blindagem com esmaltação em gel?', a: 'É a combinação que o salão mostra no Instagram para unhas naturais, com brilho prolongado.' },
    ],
    related: ['penteado-e-maquiagem', 'tratamentos-capilares', 'corte-e-escova'],
    wa: 'Oi! Quero agendar manicure/unhas no Jurerê Beauté.',
  },
]

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)
