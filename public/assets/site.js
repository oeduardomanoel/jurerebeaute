// Jurerê Beauté: o único script próprio do site.
// 1) monta a mensagem do WhatsApp a partir dos campos do agendamento;
// 2) escreve "Aberto agora" em português, no horário de Florianópolis;
// 3) registra cliques de conversão no dataLayer (pronto para GA4, GTM ou Meta Pixel).

const WA = 'https://wa.me/5548996123993?text=';

function compose(form) {
  const v = (n) => (form.querySelector(`[name="${n}"]`)?.value || '').trim();
  const nome = v('nome');
  const lines = [nome ? `Oi! Aqui é ${nome}. Quero agendar no Jurerê Beauté.` : 'Oi! Quero agendar no Jurerê Beauté.'];
  lines.push(`Serviço: ${v('servico') || 'quero uma avaliação'}`);
  lines.push(`Melhor dia: ${(v('dia') || 'qualquer dia').toLowerCase()}`);
  lines.push(`Período: ${(v('periodo') || 'tanto faz').toLowerCase()}`);
  return WA + encodeURIComponent(lines.join('\n'));
}

document.querySelectorAll('[data-wa-form]').forEach((form) => {
  const link = form.querySelector('[data-wa-compose]');
  if (!link) return;
  const update = () => { link.href = compose(form); };
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  update();
});

// Terça a sábado, 9h às 19h (shared/data/site.ts)
const ABRE = 9, FECHA = 19, DIAS = [2, 3, 4, 5, 6];
const NOMES = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
function aberto() {
  const out = document.querySelectorAll('[data-aberto]');
  if (!out.length) return;
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  const d = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
  const h = +p.hour + +p.minute / 60;
  let text;
  if (DIAS.includes(d) && h >= ABRE && h < FECHA) text = `Aberto agora, até as ${FECHA}h`;
  else {
    let k = DIAS.includes(d) && h < ABRE ? 0 : 1;
    while (!DIAS.includes((d + k) % 7)) k++;
    const quando = k === 0 ? 'hoje' : k === 1 ? 'amanhã' : NOMES[(d + k) % 7];
    text = `Fechado agora, abre ${quando} às ${ABRE}h`;
  }
  out.forEach((o) => { o.textContent = text; });
}
aberto();

window.dataLayer = window.dataLayer || [];
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('a');
  if (!a) return;
  const href = a.href || '';
  const event = href.includes('wa.me') ? 'whatsapp_click' : href.startsWith('tel:') ? 'phone_click' : /google\.com\/maps/.test(href) ? 'directions_click' : null;
  if (!event) return;
  const detail = { event, cta: a.dataset.cta || 'link', page: location.pathname };
  window.dataLayer.push(detail);
  if (typeof window.fbq === 'function' && event === 'whatsapp_click') window.fbq('track', 'Contact');
  if (typeof window.gtag === 'function') window.gtag('event', event, detail);
}, { capture: true });
