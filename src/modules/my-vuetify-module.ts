import { defineNuxtModule } from "nuxt/kit"

export default defineNuxtModule({
  setup(_options, nuxt) {
    // If you're using Nuxt < 3.8.1, you should add a ts-expect-error here
    nuxt.hook('vuetify:registerModule', register => register({
      moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true,
      useIconCDN: true,
      /* vite-plugin-vuetify options */
      styles: true,
      autoImport: true,
      useVuetifyLabs: true,
      },
      vuetifyOptions: {
          icons: {
            defaultSet: 'mdi',
            sets: [{
              name: 'mdi',
              cdn: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css'
            }]
          },
          theme: {
            defaultTheme: "myCustomLightTheme",
            themes: {
              myCustomLightTheme: {
                dark: false,
                colors: {
                  primary: "#002583",
                  secondary: "#0172EF",
                  error: "#B00020",
                  info: "#2196F3",
                  success: "#4CAF50",
                  warning: "#FB8C00",
                },
              },
            },
          },
      },
    }))
  },
})