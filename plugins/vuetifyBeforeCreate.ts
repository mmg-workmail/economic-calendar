import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vuetify:before-create', ({ vuetifyOptions }) => {
    // update vuetifyOptions
    console.log('vuetify:before-create')
  })
})