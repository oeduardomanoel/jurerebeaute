// Avaliações reais do Google (texto original das clientes), equipe citada nas avaliações,
// perguntas frequentes e galeria de resultados.

export interface Review { text: string; author: string; service: string; when: string }

export const reviews: Review[] = [
  { text: 'Eu Heloisa, amo a escova da Barbara no Jurerê Beauté. O salão recebe muito bem, é um ambiente calmo e tranquilo, organizado e pontual… mas a escova da Bárbara é a melhor de Jurerê.', author: 'Heloisa M.', service: 'Escova', when: '2026' },
  { text: 'Léo Penteado é um profissional diferenciado. Muito habilidoso no corte de cabelos. Venho do Rio Grande do Sul sempre que posso pra cortar com ele.', author: 'Catia S.', service: 'Corte', when: '2023' },
  { text: 'Sou super fã!!! Local Maravilhoso, profissionais super qualificados em um ambiente muito gostoso… E o café!!! Hummmm o melhor', author: 'Juliana G.', service: 'Experiência', when: '2026' },
  { text: 'Fiz penteado, manicure (pés e mãos) e maquiagem, elas foram impecáveis do início ao fim e ainda terminaram no horário combinado. Nota 1000!', author: 'Sara H.', service: 'Produção completa', when: '2025' },
  { text: 'A manicure Keliane é espetacular, tanto do ponto de vista da qualidade do trabalho quanto da delicadeza no atendimento. É a melhor manicure que já me atendeu e eu sou 60 +.', author: 'Marilene R.', service: 'Manicure', when: '2026' },
  { text: 'Fizemos renovação do corte e cor. A Letícia como sempre arrasa muito! Exatamente como eu queria! Atendimento personalizado e impecável!!', author: 'Liana F.', service: 'Corte e cor', when: '2025' },
  { text: 'Fiz corte de cabelo com escova e fiquei bem impressionada com técnicas e instrumentos diferenciados, fora a massagem capilar indiana Champi, que é um plus que agrega um valor especial à experiência.', author: 'Silvia U.', service: 'Corte e escova', when: '2025' },
  { text: 'Adorei o resultado do meu cabelo, D. Iara superou minhas expectativas, deixou meu cabelo ainda mais lindo do que eu imaginei, macios, hidratados com muito brilho.', author: 'Duda S.', service: 'Cabelo', when: '2024' },
  { text: 'Sempre sou muito bem atendida no Jurerê Beauté. As unhas ficam perfeitas, com ótimo acabamento e durabilidade. As recepcionistas são ágeis e organizadas.', author: 'Ana F.', service: 'Unhas', when: '2026' },
  { text: 'Muito bom!! Sou Argentina e sento ficar como em casa, adorei, muito confiável, amei cabeleireira, não mudo por outra!!', author: 'Maria José P.', service: 'Cabelo', when: '2026' },
  { text: 'Queria dar os parabéns para a Vania Couto que é uma profissional incrível principalmente na área de corte e mechas.', author: 'Joy N.', service: 'Corte e mechas', when: '2024' },
  { text: 'Liguei em vários salões e esse foi o que melhor me atendeu desde o agendamento. Parabéns!', author: 'Bruna F.', service: 'Escova', when: '2023' },
  { text: 'Luzes, coloração, pés e mãos. Unha em gel. Tratamentos com excelentes marcas. Produtos TRUSS com preço ótimo!!', author: 'Silvana D.', service: 'Vários serviços', when: '2026' },
  { text: 'O salão é de fácil acesso, tem rampa de acesso, estacionamento fácil, atende com hora marcada, a equipe é capacitada e eficiente, tem preço justo e produtos de qualidade.', author: 'Vera F.', service: 'Experiência', when: '2022' },
]

// Profissionais que as clientes citam pelo nome nas avaliações e nos créditos do Instagram.
// Confirme com o salão antes de publicar: equipe muda.
export const team = [
  { name: 'Iara', role: 'Proprietária e cabeleireira' },
  { name: 'Vânia Couto', role: 'Corte, mechas e loiros' },
  { name: 'Bárbara Oliveira', role: 'Cor Keune e escova', ig: 'barbaraoliveirahair' },
  { name: 'Letícia', role: 'Corte e cor' },
  { name: 'Léo Penteado', role: 'Corte' },
  { name: 'Paulinho', role: 'Corte' },
  { name: 'Dion Moraes', role: 'Mega hair e penteados', ig: 'dionmoraes_' },
  { name: 'Carol Jesuíno', role: 'Maquiagem', ig: 'caroljesuino.makeup' },
  { name: 'Bruna', role: 'Maquiagem', ig: 'brunamaqui' },
  { name: 'Milene Castro', role: 'Unhas', ig: 'milenecastro.nails' },
  { name: 'Keliane', role: 'Manicure' },
  { name: 'Silvia', role: 'Mãos e unhas' },
]

export const faqs = [
  {
    q: 'Onde fica o Jurerê Beauté?',
    a: 'Na Rua das Algas, 389, sala 01, em Jurerê Internacional, Florianópolis (SC). O acesso é fácil, tem rampa e estacionamento na rua.',
  },
  {
    q: 'Qual o horário de funcionamento?',
    a: 'De terça a sábado, das 9h às 19h. Domingo e segunda o salão fica fechado.',
  },
  {
    q: 'Preciso agendar ou posso ir direto?',
    a: 'O atendimento é com hora marcada. O jeito mais rápido é chamar no WhatsApp (48) 99612-3993. A recepção responde e encaixa você com o profissional certo.',
  },
  {
    q: 'Quanto custa fazer mechas ou morena iluminada?',
    a: 'O valor depende do comprimento, do volume e do histórico do cabelo, por isso a gente passa o preço depois de uma avaliação. As clientes costumam descrever o preço como justo nas avaliações do Google.',
  },
  {
    q: 'Quais marcas vocês usam?',
    a: 'O Jurerê Beauté é salão autorizado Kérastase e trabalha também com Keune e Truss. Os produtos Kérastase são originais e vendidos com preço equivalente ao da internet.',
  },
  {
    q: 'Atendem quem está de férias em Florianópolis?',
    a: 'Atendem. Tem cliente da Argentina e do Rio Grande do Sul que marca sempre que vem para a ilha. No verão a agenda aperta, então vale chamar com antecedência.',
  },
  {
    q: 'Quais serviços o salão oferece?',
    a: 'Mechas e loiros, morena iluminada, corte, escova, mega hair, tratamentos capilares, penteado, maquiagem, manicure, pedicure, unhas em gel, sobrancelha e depilação.',
  },
]

export interface GalleryItem { image: string; title: string; credit?: string; service: string }

export const gallery: GalleryItem[] = [
  { image: 'morena-iluminada-tons-quentes-1', title: 'Morena iluminada em tons quentes', service: 'morena-iluminada' },
  { image: 'mechas-efeito-natural-1', title: 'Mechas com efeito natural', service: 'mechas-e-loiros' },
  { image: 'penteado-semi-preso-trancas-1', title: 'Semipreso com tranças orgânicas', service: 'penteado-e-maquiagem' },
  { image: 'loiro-dourado-ondas', title: 'Loiro dourado com ondas', service: 'mechas-e-loiros' },
  { image: 'maquiagem-rabo-alto-1', title: 'Make e rabo alto polido', credit: 'Cabelo: Bárbara Oliveira', service: 'penteado-e-maquiagem' },
  { image: 'morena-iluminada-ondas', title: 'Iluminado com movimento', service: 'morena-iluminada' },
  { image: 'unhas-rosa-nail-art-1', title: 'Rosa com nail art', service: 'unhas' },
  { image: 'pontos-de-luz-castanho', title: 'Pontos de luz no castanho', service: 'morena-iluminada' },
  { image: 'mega-hair-loiro-iluminado', title: 'Mega hair com mechas', credit: 'Por Dion Moraes', service: 'mega-hair' },
  { image: 'penteado-semi-preso-escultural-1', title: 'Semipreso escultural', service: 'penteado-e-maquiagem' },
  { image: 'maquiagem-coque-atemporal', title: 'Produção leve e atemporal', credit: 'Make: Bruna · Penteado: Dion Moraes', service: 'penteado-e-maquiagem' },
  { image: 'loiro-ultimate-blonde-keune', title: 'Loiro de coloração, sem pó', service: 'mechas-e-loiros' },
]
