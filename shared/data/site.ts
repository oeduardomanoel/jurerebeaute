// Dados do salão. Tudo que aparece no site, no schema e nos arquivos de SEO sai daqui.
// Para trocar telefone, horário ou endereço, edite só este arquivo.

export const site = {
  name: 'Jurerê Beauté',
  legalName: 'Salão de Beleza Jurerê Beauté',
  tagline: 'Salão de beleza em Jurerê Internacional',
  description:
    'Salão de beleza em Jurerê Internacional, Florianópolis. Mechas, loiros, morena iluminada, corte, mega hair, tratamentos Kérastase e Keune, penteado, maquiagem e unhas. Nota 5,0 no Google.',
  locale: 'pt_BR',
  lang: 'pt-BR',

  phone: '+55 48 99612-3993',
  phoneDisplay: '(48) 99612-3993',
  whatsapp: '5548996123993',
  instagram: 'https://www.instagram.com/jurere.beaute/',
  instagramHandle: '@jurere.beaute',
  instagramFollowers: '7,6 mil',
  googleMaps:
    'https://www.google.com/maps/place/SAL%C3%83O+DE+BELEZA+JURER%C3%8A+BEAUT%C3%89+-+JURER%C3%8A+INTERNACIONAL/data=!4m2!3m1!1s0x0:0xd5fc5329302009dc',
  googleReviews: 'https://search.google.com/local/reviews?placeid=ChIJ9b0_M5VFJ5UR3AkgMClT_NU',
  googleWriteReview: 'https://search.google.com/local/writereview?placeid=ChIJ9b0_M5VFJ5UR3AkgMClT_NU',
  placeId: 'ChIJ9b0_M5VFJ5UR3AkgMClT_NU',

  address: {
    street: 'Rua das Algas, 389, sala 01',
    neighborhood: 'Jurerê Internacional',
    city: 'Florianópolis',
    state: 'SC',
    postalCode: '88053-505',
    country: 'BR',
    full: 'Rua das Algas, 389, sala 01, Jurerê Internacional, Florianópolis, SC, 88053-505',
  },
  geo: { lat: -27.4427183, lng: -48.4939166 },

  hours: {
    label: 'Terça a sábado, das 9h às 19h',
    short: 'Ter a sáb · 9h às 19h',
    days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    // 0 = domingo
    openDays: [2, 3, 4, 5, 6],
    opens: '09:00',
    closes: '19:00',
  },

  rating: { value: 5.0, display: '5,0', count: 112 },

  brands: ['Kérastase', 'Keune', 'Truss'],

  amenities: [
    'Atendimento com hora marcada',
    'Rampa de acesso',
    'Estacionamento fácil na rua',
    'Café servido durante o atendimento',
  ],
} as const

export type Site = typeof site

export function waLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
