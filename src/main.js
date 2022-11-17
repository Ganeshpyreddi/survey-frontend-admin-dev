import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router';
import VueCollapsiblePanel from '@dafcoe/vue-collapsible-panel';

loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .use(VueCollapsiblePanel)
  .mount('#app')
