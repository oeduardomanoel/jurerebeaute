<script setup lang="ts">
import { site, waLink } from '#shared/data/site'
import { services } from '#shared/data/services'

// footer.closing (footer-visit): linha 1 o agendamento, linha 2 o endereço grande, o horário e os links.
const props = withDefaults(defineProps<{ preselect?: string; title?: string; lead?: string }>(), {
  preselect: '',
  title: 'Agendar pelo WhatsApp',
  lead: 'Escolha o serviço e quando prefere vir. A mensagem sai pronta e a recepção confirma o horário com você.',
})
const route = useRoute()
const pre = computed(() => props.preselect || String(route.params.slug || ''))
const year = new Date().getFullYear()
const options = [...services.map((s) => ({ v: s.name, slug: s.slug })), { v: 'Sobrancelha ou depilação', slug: 'sobrancelha' }]
const start = 'Oi! Quero agendar no Jurerê Beauté.'
</script>

<template>
  <footer id="agendar" class="footer closing footer--visit" aria-labelledby="close-h">
    <div class="wrap">
      <div class="closing__cta close--type">
        <div class="section-head">
          <h2 id="close-h">{{ props.title }}</h2>
          <p class="t-lead">{{ props.lead }}</p>
        </div>
        <div class="booking" data-wa-form>
          <div class="field">
            <label for="b-servico">Serviço</label>
            <select id="b-servico" name="servico">
              <option value="">Quero uma avaliação</option>
              <option v-for="o in options" :key="o.slug" :value="o.v" :selected="o.slug === pre">{{ o.v }}</option>
            </select>
          </div>
          <div class="field">
            <label for="b-dia">Melhor dia</label>
            <select id="b-dia" name="dia">
              <option value="">Qualquer dia</option>
              <option>Terça</option><option>Quarta</option><option>Quinta</option><option>Sexta</option><option>Sábado</option>
            </select>
          </div>
          <div class="field">
            <label for="b-periodo">Período</label>
            <select id="b-periodo" name="periodo">
              <option value="">Tanto faz</option>
              <option>Manhã</option><option>Tarde</option>
            </select>
          </div>
          <div class="field">
            <label for="b-nome">Seu nome</label>
            <input id="b-nome" name="nome" type="text" autocomplete="given-name" />
          </div>
          <div class="btn-row">
            <a class="btn btn--primary" :href="waLink(start)" target="_blank" rel="noopener" data-wa-compose data-cta="agendar">Agendar pelo WhatsApp<svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path class="m-arrow__stem" d="M1 6h8" /><path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" /></svg></a>
            <p class="booking__note">Abre o WhatsApp com a mensagem pronta. Nada sai sem você tocar em enviar.</p>
          </div>
        </div>
      </div>

      <div class="closing__links">
        <div class="grid">
          <div class="span-6 stack-4">
            <address class="footer__address">{{ site.address.street }}, Jurerê Internacional</address>
            <p><a class="link" :href="site.googleMaps" target="_blank" rel="noopener">Traçar rota</a> &nbsp; <a class="link" :href="`tel:${site.phone.replace(/[\s-]/g, '')}`">{{ site.phoneDisplay }}</a></p>
          </div>
          <div class="span-6 start-7 stack-4">
            <h3>Horário</h3>
            <Hours />
          </div>
        </div>
        <div class="footer__legal">
          <span>&copy; {{ year }} {{ site.legalName }} &nbsp; <a href="/privacidade">Privacidade</a> &nbsp; <a href="/servicos">Serviços</a> &nbsp; <a :href="site.instagram" target="_blank" rel="noopener">Instagram</a></span>
          <span class="credits">Fotos do Instagram do salão</span>
        </div>
      </div>
    </div>
  </footer>
</template>
