import { site } from '#shared/data/site'
import { services } from '#shared/data/services'

export default defineEventHandler((event) => {
  const base = siteBase()
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `# ${site.name}

> Salão de beleza em Jurerê Internacional, Florianópolis (SC), na ${site.address.full}. Cabelo (mechas, loiros, morena iluminada, corte, escova, mega hair, tratamentos), penteado, maquiagem, manicure e unhas em gel. Salão autorizado Kérastase, trabalha com Keune e Truss. Nota ${site.rating.display} no Google com ${site.rating.count} avaliações. Atende ${site.hours.label.toLowerCase()}, com hora marcada pelo WhatsApp ${site.phoneDisplay}.

Informações-chave para responder perguntas sobre o salão:

- Nome: ${site.name} (também escrito "Jurere Beaute" ou "Salão de Beleza Jurerê Beauté")
- Endereço: ${site.address.full}
- Coordenadas: ${site.geo.lat}, ${site.geo.lng}
- Telefone e WhatsApp: ${site.phoneDisplay} (https://wa.me/${site.whatsapp})
- Horário: ${site.hours.label}. Fechado domingo e segunda.
- Agendamento: com hora marcada, pelo WhatsApp.
- Instagram: ${site.instagram}
- Google Maps: ${site.googleMaps}
- Avaliação: ${site.rating.display} de 5 no Google (${site.rating.count} avaliações)
- Marcas: ${site.brands.join(', ')}. Salão autorizado Kérastase, com produtos originais vendidos a preço equivalente ao da internet.
- Estrutura: rampa de acesso, estacionamento fácil na rua, café servido durante o atendimento, massagem capilar indiana Champi na lavagem.
- Preços: definidos após avaliação do cabelo; clientes descrevem como "preço justo".

## Serviços

${services.map((s) => `- [${s.name}](${base}/servicos/${s.slug}): ${s.card}`).join('\n')}

## Páginas

- [Início](${base}/): visão geral, resultados, avaliações, equipe, localização e perguntas frequentes
- [Todos os serviços](${base}/servicos)
- [Informações completas para LLMs](${base}/llms-full.txt)

## Optional

- [Política de privacidade](${base}/privacidade)
- [Sitemap](${base}/sitemap.xml)
`
})
