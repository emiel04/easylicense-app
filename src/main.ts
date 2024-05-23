import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toastify, {type ToastContainerOptions} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import './assets/index.css'
import {createI18n} from 'vue-i18n'
import langService from "@/modules/languages/services/service";
import {configureVue} from "../config";

const app = createApp(App)

const en_translations = await langService.translations('en')
const nl_translations = await langService.translations('nl')

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: en_translations,
        nl: nl_translations
    }
})

app.use(i18n)
app.use(router)
app.use(Vue3Toastify, {
    autoClose: 5000,
} as ToastContainerOptions);

configureVue(app);

app.mount('#app')
