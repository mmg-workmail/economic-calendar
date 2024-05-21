import MyVuetifyModule from './src/modules/my-vuetify-module'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_BASE_URL: 'https://cal-api.eplanetbrokers.org',
      SOCKET_BASE_URL: 'wss://calcal.eplanetbrokers.org',
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    MyVuetifyModule, 'vuetify-nuxt-module'
  ],
  css: [
    // "@/assets/fonts/iranSans/style.css",
    "@/assets/css/style.css",
    "@/assets/css/flag.css",
  ],
  app: {

    head: {

      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
      ],
    },
  },
})