export default defineEventHandler((event) => {
  const base = siteBase()
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `# Jurerê Beauté, salão de beleza em Jurerê Internacional
User-agent: *
Allow: /

# Buscadores e assistentes de IA são bem-vindos (GEO)
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${base}/sitemap.xml

# Resumo para LLMs: ${base}/llms.txt
`
})
