import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard, faCrown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHatWizard, faCrown)


createApp(App)
    .use(router)
    .component("FontAwesomeIcon", FontAwesomeIcon)
    .mount('#app')
