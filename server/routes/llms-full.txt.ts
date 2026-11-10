import { site } from '#shared/data/site'
import { services } from '#shared/data/services'
import { faqs, reviews, team } from '#shared/data/content'

export default defineEventHandler((event) => {
  const base = siteBase()
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  const svc = services
    .map(
      (s) => `### ${s.name}
URL: ${base}/servicos/${s.slug}

${s.lead}

${s.body.join('\n\n')}

Inclui: ${s.highlights.join(', ')}.

Como funciona:
${s.steps.map((st, i) => `${i + 1}. ${st.title}: ${st.text}`).join('\n')}

Perguntas frequentes:
${s.faq.map((f) => `P: ${f.q}\nR: ${f.a}`).join('\n\n')}
`,
    )
    .join('\n')

  return `# ${site.name}: informações completas

> ${site.description}

## Dados do negócio

- Nome: ${site.name}
- Tipo: salão de beleza (cabeleireiro, maquiagem, manicure, sobrancelha, depilação)
- Endereço: ${site.address.full}
- Bairro: Jurerê Internacional, norte da Ilha de Santa Catarina, Florianópolis
- Coordenadas: ${site.geo.lat}, ${site.geo.lng}
- Telefone/WhatsApp: ${site.phoneDisplay}
- Horário: ${site.hours.label}. Domingo e segunda fechado.
- Atendimento com hora marcada.
- Instagram: ${site.instagram} (${site.instagramFollowers} seguidores)
- Google: nota ${site.rating.display}, ${site.rating.count} avaliações (${site.googleReviews})
- Marcas: ${site.brands.join(', ')}. Salão autorizado Kérastase.
- Comodidades: ${site.amenities.join('; ')}; massagem capilar indiana Champi.

## Como o salão trabalha

Antes de qualquer química, a equipe faz uma avaliação do cabelo: histórico químico, base, porosidade e rotina. A técnica e o produto são escolhidos depois disso. O salão chama de "ritual de continuidade" o acompanhamento com tratamento e cuidado em casa depois do serviço.

## Serviços

${svc}
## Equipe citada pelas clientes

${team.map((p) => `- ${p.name}: ${p.role}`).join('\n')}

## O que as clientes dizem (trechos de avaliações do Google)

${reviews.map((r) => `- "${r.text}" (${r.author}, ${r.service})`).join('\n')}

## Perguntas frequentes

${faqs.map((f) => `P: ${f.q}\nR: ${f.a}`).join('\n\n')}
`
})
