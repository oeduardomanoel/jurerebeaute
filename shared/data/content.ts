// Avaliações públicas do Google (texto das clientes), equipe citada nelas e nos créditos do Instagram,
// perguntas frequentes (só com fatos de fonte) e galeria de resultados.

export interface Review { text: string; author: string; service: string }

export const reviews: Review[] = [
  { text: 'Eu Heloisa, amo a escova da Barbara no Jurerê Beauté. O salão recebe muito bem, é um ambiente calmo e tranquilo, organizado e pontual… mas a escova da Bárbara é a melhor de Jurerê.', author: 'Heloisa M.', service: 'Escova' },
  { text: 'Léo Penteado é um profissional diferenciado. Muito habilidoso no corte de cabelos. Venho do Rio Grande do Sul sempre que posso pra cortar com ele.', author: 'Catia S.', service: 'Corte' },
  { text: 'Sou super fã!!! Local Maravilhoso, profissionais super qualificados em um ambiente muito gostoso… E o café!!! Hummmm o melhor', author: 'Juliana G.', service: 'Experiência' },
  { text: 'Fiz penteado, manicure (pés e mãos) e maquiagem, elas foram impecáveis do início ao fim e ainda terminaram no horário combinado. Nota 1000!', author: 'Sara H.', service: 'Produção completa' },
  { text: 'A manicure Keliane é espetacular, tanto do ponto de vista da qualidade do trabalho quanto da delicadeza no atendimento. É a melhor manicure que já me atendeu e eu sou 60 +.', author: 'Marilene R.', service: 'Manicure' },
  { text: 'Fizemos renovação do corte e cor. A Letícia como sempre arrasa muito! Exatamente como eu queria! Atendimento personalizado e impecável!!', author: 'Liana F.', service: 'Corte e cor' },
  { text: 'Fiz corte de cabelo com escova e fiquei bem impressionada com técnicas e instrumentos diferenciados, fora a massagem capilar indiana Champi, que é um plus que agrega um valor especial à experiência.', author: 'Silvia U.', service: 'Corte e escova' },
  { text: 'Adorei o resultado do meu cabelo, D. Iara cabeleireira a proprietária, superou minhas expectativas, deixou meu cabelo ainda mais lindo do que eu imaginei, macios, hidratados com muito brilho.', author: 'Duda S.', service: 'Cabelo' },
  { text: 'Sempre sou muito bem atendida no Jurerê Beauté. A equipe é gentil, atenciosa e muito profissional. As unhas ficam perfeitas, com ótimo acabamento e durabilidade.', author: 'Ana F.', service: 'Unhas' },
  { text: 'Muito bom!! Sou Argentina e sento ficar como em casa, adorei, muito confiável, amei cabeleireira, não mudo por outra!!', author: 'Maria José P.', service: 'Cabelo' },
  { text: 'Faço cabelo com a Vania a um tempo, e ela é uma excelente profissional, fez um loiro magnífico, e me ajudou no tratamento.', author: 'Clara C.', service: 'Loiro' },
  { text: 'Melhor Salao Ever!!! Todos muito simpáticos, talentosos e o atendimento nao tem igual!! Cafezinho garantido!!!', author: 'Daniela M.', service: 'Experiência' },
]

// Profissionais que as clientes citam pelo nome nas avaliações do Google e nos créditos do Instagram.
// Equipe muda: confirme com o salão antes de divulgar.
export const team = [
  { name: 'Iara', role: 'Proprietária e cabeleireira' },
  { name: 'Vânia Couto', role: 'Corte, mechas e loiros' },
  { name: 'Bárbara Oliveira', role: 'Cor e escova', ig: 'barbaraoliveirahair' },
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
  { q: 'Onde fica o Jurerê Beauté?', a: 'Na Rua das Algas, 389, sala 01, em Jurerê Internacional, Florianópolis (SC). Uma cliente comentou no Google que tem rampa de acesso e estacionamento fácil.' },
  { q: 'Qual o horário?', a: 'De terça a sábado, das 9h às 19h.' },
  { q: 'Precisa agendar?', a: 'Sim, o atendimento é com hora marcada. O agendamento é pelo WhatsApp (48) 99612-3993.' },
  { q: 'Quanto custa?', a: 'Os valores não estão no site. Pergunte no WhatsApp e a recepção passa o valor para o seu caso. Nas avaliações do Google, as clientes descrevem o preço como justo.' },
  { q: 'Quais marcas o salão usa?', a: 'Kérastase, Keune e Truss. O salão é autorizado Kérastase e vende produtos originais com preço equivalente ao da internet.' },
  { q: 'Atendem quem está de passagem por Florianópolis?', a: 'Atendem. Nas avaliações há clientes da Argentina e do Rio Grande do Sul. Uma cliente deixou a dica: sempre é bom marcar com antecedência.' },
  { q: 'Quais serviços o salão faz?', a: 'Mechas e loiros, morena iluminada, corte, escova, mega hair, tratamentos, penteado, maquiagem, manicure, pedicure, unhas em gel, sobrancelha e depilação.' },
]

export interface GalleryItem { image: string; title: string; service: string }

export const gallery: GalleryItem[] = [
  { image: 'morena-iluminada-tons-quentes-1', title: 'Morena iluminada em tons quentes', service: 'morena-iluminada' },
  { image: 'mechas-efeito-natural-1', title: 'Mechas com efeito natural', service: 'mechas-e-loiros' },
  { image: 'penteado-semi-preso-trancas-1', title: 'Semipreso com tranças orgânicas', service: 'penteado-e-maquiagem' },
  { image: 'loiro-dourado-ondas', title: 'Loiro dourado', service: 'mechas-e-loiros' },
  { image: 'maquiagem-rabo-alto-1', title: 'Make e penteado', service: 'penteado-e-maquiagem' },
  { image: 'morena-iluminada-ondas', title: 'Iluminado com movimento', service: 'morena-iluminada' },
  { image: 'unhas-rosa-nail-art-1', title: 'Nail art em rosa', service: 'unhas' },
  { image: 'pontos-de-luz-castanho', title: 'Pontos de luz', service: 'morena-iluminada' },
  { image: 'mega-hair-loiro-iluminado', title: 'Mega hair com mechas', service: 'mega-hair' },
  { image: 'penteado-semi-preso-escultural-1', title: 'Semipreso escultural', service: 'penteado-e-maquiagem' },
  { image: 'maquiagem-coque-atemporal', title: 'Produção leve e atemporal', service: 'penteado-e-maquiagem' },
  { image: 'loiro-ultimate-blonde-keune', title: 'Loiro de coloração', service: 'mechas-e-loiros' },
]
