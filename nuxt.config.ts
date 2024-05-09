import MyVuetifyModule from './src/modules/my-vuetify-module'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_BASE_URL: '192.168.1.103:7777',
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    MyVuetifyModule, 'vuetify-nuxt-module'
  ],
  css: [
    "@/assets/fonts/iranSans/style.css",
    "@/assets/css/style.css",
  ],
})