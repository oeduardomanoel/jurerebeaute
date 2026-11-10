// As páginas saem sem o JS do Vue (routeRules noScripts), então o invólucro #__nuxt não serve a nada.
// O kit da taste-skill espera header.nav, main, footer.closing e nav.actionbar como filhos diretos do body.
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html) => {
    html.body = html.body.map((chunk) =>
      chunk
        .replace(/^<div id="__nuxt">([\s\S]*)<\/div>$/, '$1')
        .replace(/<div id="teleports"><\/div>/, ''),
    )
  })
})
