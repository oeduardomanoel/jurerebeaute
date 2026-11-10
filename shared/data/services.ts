// Serviços do salão. Cada item vira um card na home e uma página própria em /servicos/[slug].
// Os textos usam informações das legendas do Instagram e das avaliações do Google.

export interface Step { title: string; text: string }
export interface Faq { q: string; a: string }

export interface Service {
  slug: string
  name: string
  index: string
  kicker: string
  card: string
  title: string
  seoTitle: string
  seoDescription: string
  keywords: string[]
  lead: string
  body: string[]
  image: string
  gallery: string[]
  video?: { src: string; poster: string; caption: string }
  highlights: string[]
  steps: Step[]
  quote?: { text: string; author: string }
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
    card: 'Do loiro dourado ao platinado, com diagnóstico do fio antes de qualquer pó.',
    title: 'Mechas e loiros em Jurerê Internacional',
    seoTitle: 'Mechas e Loiro em Jurerê Internacional | Jurerê Beauté',
    seoDescription:
      'Mechas, loiro iluminado e superclareadores Keune em Jurerê Internacional, Florianópolis. Avaliação do histórico químico antes de clarear. Agende pelo WhatsApp.',
    keywords: ['mechas jurerê', 'loiro florianópolis', 'luzes jurerê internacional', 'keune ultimate blonde'],
    lead:
      'Loiro bonito começa antes da química. A gente olha a sua base, pergunta o que já passou pelo seu cabelo e só depois escolhe entre pó, superclareador ou coloração.',
    body: [
      'Na prática, isso quer dizer que nem todo loiro precisa de pó descolorante. Com a linha Ultimate Blonde da Keune dá para chegar num loiro claro usando coloração, e a série 3000 de superclareadores pode subir até 6 tons em cabelo virgem e até 5 em cabelo colorido, dependendo da base e do histórico.',
      'Quem decide o caminho é o seu fio. Diagnóstico, histórico químico, colorimetria e respeito ao limite do cabelo vêm antes da técnica. Às vezes o plano tem duas sessões. Às vezes clareia um pouco menos do que você trouxe na foto, e fica mais bonito por isso.',
    ],
    image: 'mechas-efeito-natural-1',
    gallery: ['mechas-efeito-natural-2', 'loiro-dourado-ondas', 'loiro-ultimate-blonde-keune', 'mechas-efeito-natural-3', 'loiro-mechas-liso', 'loiro-superclareadora-3000'],
    video: {
      src: '/video/caso-dourado-natural.mp4',
      poster: '/video/caso-dourado-natural.webp',
      caption: 'Dourado com menos amarelo: raiz aberta e mechas que ligam o crescimento ao comprimento.',
    },
    highlights: ['Mechas e luzes', 'Loiro com superclareador Keune', 'Loiro de coloração, sem pó', 'Tonalização e correção de amarelo', 'Retoque de raiz sem marcação'],
    steps: [
      { title: 'Conversa e diagnóstico', text: 'Você mostra a referência, a gente olha base, porosidade e tudo que já foi feito no cabelo.' },
      { title: 'Plano de clareamento', text: 'Técnica, produto, número de sessões e o loiro possível para o seu fio, dito antes de começar.' },
      { title: 'Mechas e tonalização', text: 'Mechas posicionadas para o crescimento não virar uma linha marcada daqui a dois meses.' },
      { title: 'Ritual de continuidade', text: 'Indicação de cuidado em casa e retorno no tempo certo. Não para corrigir, para manter.' },
    ],
    quote: {
      text: 'Faço cabelo com a Vania a um tempo, e ela é uma excelente profissional, fez um loiro magnífico, e me ajudou no tratamento.',
      author: 'Clara C., no Google',
    },
    faq: [
      { q: 'Dá para ficar loira sem descolorir?', a: 'Em alguns casos, sim. A linha Ultimate Blonde da Keune permite clarear com coloração. Se funciona no seu cabelo depende da base e do histórico, e isso a gente vê na avaliação.' },
      { q: 'Quanto tempo leva uma sessão de mechas?', a: 'Depende do comprimento, do volume e de quanto você quer clarear. Na avaliação a gente já te passa uma previsão de tempo e de valor.' },
      { q: 'Meu loiro ficou amarelado. Tem conserto?', a: 'Tem. Um caso recente aqui: o dourado estava bonito, mas amarelo demais. Abrimos a raiz e criamos mechas estratégicas para ligar o crescimento ao comprimento, sem diferença marcada de tons.' },
    ],
    related: ['morena-iluminada', 'tratamentos-capilares', 'mega-hair'],
    wa: 'Oi! Quero agendar uma avaliação de mechas/loiro no Jurerê Beauté.',
  },
  {
    slug: 'morena-iluminada',
    name: 'Morena iluminada',
    index: '02',
    kicker: 'Cor',
    card: 'Luz onde o rosto pede, tons quentes e um crescimento que não denuncia.',
    title: 'Morena iluminada em Jurerê Internacional',
    seoTitle: 'Morena Iluminada em Florianópolis | Jurerê Beauté',
    seoDescription:
      'Morena iluminada, pontos de luz e mechas em tons quentes em Jurerê Internacional, Florianópolis. Efeito natural e baixa manutenção. Agende sua avaliação.',
    keywords: ['morena iluminada florianópolis', 'morena iluminada jurerê', 'pontos de luz', 'mechas castanho'],
    lead:
      'A iluminação certa valoriza o cabelo sem apagar quem você é. Morena continua morena, só que com luz, dimensão e movimento.',
    body: [
      'O trabalho aqui é de composição: tons quentes, mel e caramelo distribuídos para dar profundidade, com raiz esfumada para o crescimento acontecer sem aquela faixa que pede retoque todo mês.',
      'É uma técnica de baixa manutenção, pensada para quem gosta de cabelo bonito mas não quer morar no salão. Pontos de luz perto do rosto, comprimento iluminado e um acabamento que parece que nasceu assim.',
    ],
    image: 'morena-iluminada-tons-quentes-1',
    gallery: ['morena-iluminada-tons-quentes-2', 'morena-iluminada-ondas', 'pontos-de-luz-castanho', 'morena-iluminada-tons-quentes-3', 'morena-iluminada-salao'],
    video: {
      src: '/video/hero-morena-iluminada.mp4',
      poster: '/video/hero-morena-iluminada.webp',
      caption: 'Morena iluminada em tons quentes, por Bárbara Oliveira.',
    },
    highlights: ['Morena iluminada', 'Pontos de luz', 'Mechas em tons quentes', 'Raiz esfumada', 'Gloss e tonalização'],
    steps: [
      { title: 'Leitura do seu tom', text: 'Pele, base natural e o quanto de luz você quer. Mel, caramelo, avelã ou mais claro.' },
      { title: 'Desenho da luz', text: 'Onde a luz entra: perto do rosto, no comprimento, nas pontas. Cada cabeça tem um desenho.' },
      { title: 'Cor e tonalização', text: 'Tonalização para fechar o tom e deixar o brilho que aparece nas fotos.' },
      { title: 'Manutenção leve', text: 'Raiz esfumada para você voltar quando quiser, não quando a raiz obrigar.' },
    ],
    faq: [
      { q: 'Morena iluminada estraga o cabelo?', a: 'Qualquer clareamento exige cuidado. Por isso a gente avalia o fio antes e indica tratamento junto. O objetivo é sair com luz e com o cabelo inteiro.' },
      { q: 'De quanto em quanto tempo preciso retocar?', a: 'Como a raiz é esfumada, o crescimento fica suave. O intervalo varia de cliente para cliente, e a gente combina isso na avaliação.' },
      { q: 'Funciona em cabelo cacheado?', a: 'Funciona. A distribuição da luz muda para acompanhar a curvatura, e isso faz parte do desenho na avaliação.' },
    ],
    related: ['mechas-e-loiros', 'corte-e-escova', 'tratamentos-capilares'],
    wa: 'Oi! Quero agendar uma avaliação de morena iluminada no Jurerê Beauté.',
  },
  {
    slug: 'corte-e-escova',
    name: 'Corte e escova',
    index: '03',
    kicker: 'Forma',
    card: 'Corte pensado para o seu rosto e a sua rotina. Tem cliente que vem do RS só para isso.',
    title: 'Corte de cabelo e escova em Jurerê',
    seoTitle: 'Corte de Cabelo e Escova em Jurerê Internacional | Jurerê Beauté',
    seoDescription:
      'Corte feminino, escova e finalização em Jurerê Internacional, Florianópolis, com massagem capilar indiana Champi. Agende pelo WhatsApp.',
    keywords: ['corte de cabelo jurerê', 'escova jurerê internacional', 'cabeleireiro florianópolis', 'massagem capilar champi'],
    lead:
      'O corte certo vai além da moda do momento. Ele precisa conversar com o seu rosto, com a textura do fio e com o tempo que você tem de manhã.',
    body: [
      'Antes da tesoura, a conversa: como você seca o cabelo, se prende, se usa solto, o que te incomoda hoje. O corte sai dessa conversa, não de uma foto isolada.',
      'Na lavagem, tem a massagem capilar indiana Champi, que as clientes citam nas avaliações. E a escova daqui tem fã declarada: uma delas escreveu no Google que é a melhor de Jurerê.',
    ],
    image: 'pontos-de-luz-castanho',
    gallery: ['loiro-mechas-liso', 'loiro-escova-volume', 'morena-iluminada-ondas', 'sorriso-cliente-cabelo-hidratado'],
    highlights: ['Corte feminino', 'Escova e finalização', 'Babyliss e ondas', 'Massagem capilar Champi', 'Renovação de corte e cor'],
    steps: [
      { title: 'Conversa', text: 'Rotina, textura, o que você gosta e o que não aguenta mais no seu cabelo.' },
      { title: 'Lavagem com Champi', text: 'Massagem capilar indiana durante a lavagem. Pode demorar um pouco mais. Ninguém reclama.' },
      { title: 'Corte', text: 'Linhas pensadas para o cabelo cair bem também no dia seguinte, sem escova.' },
      { title: 'Finalização', text: 'Escova, ondas ou natural. E a dica de como repetir em casa.' },
    ],
    quote: {
      text: 'Léo Penteado é um profissional diferenciado. Muito habilidoso no corte de cabelos. Venho do Rio Grande do Sul sempre que posso pra cortar com ele.',
      author: 'Catia S., no Google',
    },
    faq: [
      { q: 'Precisa marcar horário para corte?', a: 'Sim, o salão atende com hora marcada. Chama no WhatsApp e a recepção encontra o melhor horário com o profissional que você prefere.' },
      { q: 'O que é a massagem capilar Champi?', a: 'É uma massagem de origem indiana feita no couro cabeludo. Aqui ela faz parte da experiência de lavagem.' },
      { q: 'Posso fazer corte e cor no mesmo dia?', a: 'Pode, e muita cliente faz. Avise na hora de agendar para a recepção reservar o tempo certo.' },
    ],
    related: ['morena-iluminada', 'tratamentos-capilares', 'penteado-e-maquiagem'],
    wa: 'Oi! Quero agendar corte e escova no Jurerê Beauté.',
  },
  {
    slug: 'mega-hair',
    name: 'Mega hair',
    index: '04',
    kicker: 'Comprimento',
    card: 'Comprimento e volume que se misturam à sua cor, com mechas para fechar o resultado.',
    title: 'Mega hair em Jurerê Internacional',
    seoTitle: 'Mega Hair em Florianópolis | Jurerê Beauté Jurerê Internacional',
    seoDescription:
      'Mega hair com mechas em Jurerê Internacional, Florianópolis. Comprimento, volume e cor integrados para um resultado natural. Agende sua avaliação.',
    keywords: ['mega hair florianópolis', 'mega hair jurerê', 'alongamento de cabelo', 'mega hair loiro'],
    lead:
      'Mega hair bom é aquele que ninguém percebe. A combinação com mechas faz o comprimento novo conversar com a sua cor, sem degrau e sem diferença de tom.',
    body: [
      'O resultado que mais aparece no nosso Instagram é esse: loiro iluminado, comprimento dos sonhos e movimento. Isso só funciona quando cor e alongamento são pensados juntos, desde a avaliação.',
      'Na consulta a gente olha o seu fio, entende o comprimento e o volume que fazem sentido para você e explica a manutenção antes de qualquer decisão.',
    ],
    image: 'mega-hair-loiro-iluminado',
    gallery: ['mega-hair-cabelao', 'loiro-dourado-ondas', 'loiro-escova-volume', 'mechas-efeito-natural-3'],
    highlights: ['Avaliação do fio', 'Mega hair com mechas', 'Integração de cor', 'Manutenção orientada'],
    steps: [
      { title: 'Avaliação', text: 'Seu fio, o comprimento desejado e a cor que vai unir tudo.' },
      { title: 'Cor primeiro', text: 'Mechas e tonalização para o seu cabelo e o mega ficarem no mesmo tom.' },
      { title: 'Aplicação', text: 'Comprimento e volume distribuídos para cair natural, solto ou preso.' },
      { title: 'Manutenção', text: 'Você sai sabendo como cuidar e quando voltar.' },
    ],
    faq: [
      { q: 'Mega hair estraga o cabelo?', a: 'Com aplicação e manutenção corretas, o seu cabelo continua saudável. É por isso que a avaliação vem antes e a manutenção é combinada desde o primeiro dia.' },
      { q: 'O mega fica com a mesma cor do meu cabelo?', a: 'Esse é o ponto. A gente combina mega hair com mechas justamente para que cor e comprimento fiquem integrados.' },
    ],
    related: ['mechas-e-loiros', 'tratamentos-capilares', 'corte-e-escova'],
    wa: 'Oi! Quero agendar uma avaliação de mega hair no Jurerê Beauté.',
  },
  {
    slug: 'tratamentos-capilares',
    name: 'Tratamentos e ritual de continuidade',
    index: '05',
    kicker: 'Cuidado',
    card: 'Kérastase e Keune originais, com o protocolo certo para o seu fio. Aqui ritual de continuidade é regra.',
    title: 'Tratamentos capilares Kérastase e Keune em Jurerê',
    seoTitle: 'Tratamento Capilar Kérastase em Jurerê Internacional | Jurerê Beauté',
    seoDescription:
      'Salão autorizado Kérastase em Jurerê Internacional. Tratamentos capilares Kérastase, Keune e Truss, hidratação e reconstrução. Produtos originais com preço de internet.',
    keywords: ['kérastase florianópolis', 'salão autorizado kérastase', 'tratamento capilar jurerê', 'hidratação capilar'],
    lead:
      'Aqui ritual de continuidade é regra. Não para corrigir problema, mas porque todo cabelo precisa de tratamento, principalmente o que passa por química.',
    body: [
      'O Jurerê Beauté é salão autorizado Kérastase. Os tratamentos usam produtos originais, e os mesmos produtos ficam à venda na recepção com preço equivalente ao da internet. Sem risco de levar falsificado e com indicação de quem já viu o seu cabelo de perto.',
      'Também trabalhamos com Keune e Truss. Uma cliente escreveu no Google que os produtos Truss daqui têm preço ótimo, e a gente concorda.',
    ],
    image: 'keune-vital-nutrition',
    gallery: ['colorista-keune-produtos', 'keune-velvet-smooth', 'keune-smooth-operator', 'sorriso-cliente-cabelo-hidratado'],
    highlights: ['Salão autorizado Kérastase', 'Hidratação, nutrição e reconstrução', 'Protocolos Keune', 'Produtos Truss', 'Indicação de cuidado em casa'],
    steps: [
      { title: 'Diagnóstico', text: 'Estrutura do fio, histórico químico e o que o seu cabelo está pedindo agora.' },
      { title: 'Protocolo no salão', text: 'Hidratação, nutrição ou reconstrução com Kérastase, Keune ou Truss.' },
      { title: 'Rotina em casa', text: 'Só o que faz sentido para você. Nada de sair com uma sacola de produtos que não vai usar.' },
      { title: 'Continuidade', text: 'Retorno combinado para o tratamento render de verdade.' },
    ],
    quote: {
      text: 'A IA pode ser uma ótima aliada na hora de buscar informações. Mas ela não conhece o seu cabelo de verdade. Seu cabelo tem uma estrutura, um histórico químico e necessidades únicas.',
      author: 'Post da nossa colorista no Instagram',
    },
    faq: [
      { q: 'O Jurerê Beauté é salão autorizado Kérastase?', a: 'Sim. Os produtos Kérastase são originais e vendidos com preço equivalente ao da internet.' },
      { q: 'Preciso fazer tratamento se não tenho química?', a: 'Sol, mar, piscina e secador já são motivo. O ritual de continuidade aqui não é para corrigir, é o cuidado que todo cabelo precisa.' },
      { q: 'Posso comprar os produtos sem fazer serviço?', a: 'Pode. E se quiser, alguém da equipe te ajuda a escolher o que combina com o seu cabelo.' },
    ],
    related: ['mechas-e-loiros', 'morena-iluminada', 'corte-e-escova'],
    wa: 'Oi! Quero saber sobre os tratamentos Kérastase/Keune do Jurerê Beauté.',
  },
  {
    slug: 'penteado-e-maquiagem',
    name: 'Penteado e maquiagem',
    index: '06',
    kicker: 'Produção',
    card: 'Semipresos, tranças e makes que aguentam a festa inteira. Pronta no horário combinado.',
    title: 'Penteado e maquiagem em Jurerê Internacional',
    seoTitle: 'Penteado e Maquiagem em Jurerê Internacional | Jurerê Beauté',
    seoDescription:
      'Penteados, semipresos, tranças e maquiagem para festas, casamentos e eventos em Jurerê Internacional, Florianópolis. Produção completa com horário cumprido.',
    keywords: ['maquiagem jurerê', 'penteado florianópolis', 'penteado para casamento jurerê', 'maquiadora jurerê internacional'],
    lead:
      'Festa, casamento, formatura ou um evento na Hípica. Penteado e make feitos para durar a noite toda e parecer você na melhor versão, não fantasiada.',
    body: [
      'Semipreso com tranças orgânicas, semipreso escultural, rabo alto polido, coque atemporal. Cada penteado é uma composição de textura, forma e detalhe, e casa com a make e com a roupa que você vai usar.',
      'E tem uma coisa que as clientes sempre comentam: horário. Uma delas fez penteado, mãos, pés e maquiagem no mesmo dia e escreveu que terminaram no horário combinado. Em dia de evento, isso vale ouro.',
    ],
    image: 'penteado-semi-preso-trancas-1',
    gallery: ['maquiagem-rabo-alto-1', 'penteado-semi-preso-escultural-1', 'maquiagem-coque-atemporal', 'penteado-semi-preso-trancas-3', 'maquiagem-loira-natural', 'maquiagem-rabo-alto-2'],
    video: {
      src: '/video/making-of-make-penteado.mp4',
      poster: '/video/making-of-make-penteado.webp',
      caption: 'Make de Carol Jesuíno e cabelo de Dion Moraes.',
    },
    highlights: ['Maquiagem social', 'Penteados e semipresos', 'Tranças', 'Produção completa com mãos e pés', 'Prova com antecedência'],
    steps: [
      { title: 'Referências', text: 'Roupa, horário, local e o estilo que combina com você.' },
      { title: 'Agenda reservada', text: 'Tempo calculado para cabelo, make e unhas sem correria.' },
      { title: 'Produção', text: 'Pele preparada para durar, penteado com estrutura para a noite inteira.' },
      { title: 'Saída no horário', text: 'Pronta quando foi combinado, com tempo para a foto antes de sair.' },
    ],
    quote: {
      text: 'Meninas espetaculares!! Fiz penteado, manicure (pés e mãos) e maquiagem, elas foram impecáveis do início ao fim e ainda terminaram no horário combinado. Nota 1000!',
      author: 'Sara H., no Google',
    },
    faq: [
      { q: 'Com quanto tempo de antecedência devo agendar?', a: 'Quanto antes, melhor, principalmente em datas de festa e na temporada de verão. Uma cliente deixou a dica no Google: marque com antecedência.' },
      { q: 'Dá para fazer cabelo, make e unhas no mesmo dia?', a: 'Dá. É só avisar no agendamento para a recepção montar a sequência com o tempo certo.' },
      { q: 'Vocês atendem grupos, como madrinhas e mães?', a: 'Chama no WhatsApp com a quantidade de pessoas e o horário do evento. A recepção vê a disponibilidade da equipe.' },
    ],
    related: ['unhas', 'corte-e-escova', 'mega-hair'],
    wa: 'Oi! Quero agendar penteado e maquiagem no Jurerê Beauté. A data do evento é:',
  },
  {
    slug: 'unhas',
    name: 'Mãos, pés e unhas',
    index: '07',
    kicker: 'Detalhe',
    card: 'Blindagem, esmaltação em gel e nail art com acabamento que dura.',
    title: 'Manicure, unhas em gel e nail art em Jurerê',
    seoTitle: 'Manicure e Unhas em Gel em Jurerê Internacional | Jurerê Beauté',
    seoDescription:
      'Manicure, pedicure, blindagem, esmaltação em gel e nail art em Jurerê Internacional, Florianópolis. Acabamento impecável e durabilidade. Agende pelo WhatsApp.',
    keywords: ['manicure jurerê', 'unha em gel florianópolis', 'nail art jurerê', 'blindagem de unhas'],
    lead:
      'Acabamento e durabilidade. São as duas palavras que mais aparecem quando as clientes falam das nossas manicures no Google.',
    body: [
      'Blindagem com esmaltação em gel para unhas naturais, brilhantes e que duram. Nail art delicada para quem gosta de detalhe. E o clássico pés e mãos, bem feito, sem pressa e sem cutícula machucada.',
      'Uma cliente de mais de 60 anos escreveu que a Keliane é a melhor manicure que já a atendeu. A gente não ia deixar essa frase de fora.',
    ],
    image: 'unhas-rosa-nail-art-1',
    gallery: ['unhas-rosa-nail-art-2', 'unhas-esmaltacao-processo', 'unhas-blindagem-gel', 'unhas-rosa-detalhe'],
    highlights: ['Manicure e pedicure', 'Esmaltação em gel', 'Blindagem', 'Unha em gel', 'Nail art'],
    steps: [
      { title: 'Preparo', text: 'Cutilagem cuidadosa e formato escolhido com você.' },
      { title: 'Base certa', text: 'Blindagem, gel ou esmaltação tradicional, conforme a sua unha e a sua rotina.' },
      { title: 'Cor e arte', text: 'Do nude ao rosa bebê, com ou sem detalhes.' },
      { title: 'Acabamento', text: 'Brilho prolongado e a orientação para durar mais.' },
    ],
    quote: {
      text: 'A manicure Keliane é espetacular, tanto do ponto de vista da qualidade do trabalho quanto da delicadeza no atendimento. É a melhor manicure que já me atendeu e eu sou 60 +.',
      author: 'Marilene R., no Google',
    },
    faq: [
      { q: 'Quanto tempo dura a esmaltação em gel?', a: 'Dura bem mais que o esmalte comum, mas varia com o crescimento da unha e a rotina. A manicure te orienta sobre o retorno.' },
      { q: 'O que é blindagem de unhas?', a: 'É uma camada de proteção aplicada sobre a unha natural. Combinada com a esmaltação em gel, deixa a unha mais resistente e com brilho prolongado.' },
    ],
    related: ['penteado-e-maquiagem', 'tratamentos-capilares', 'corte-e-escova'],
    wa: 'Oi! Quero agendar manicure/unhas no Jurerê Beauté.',
  },
]

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)
