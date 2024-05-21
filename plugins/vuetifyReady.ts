import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vuetify:ready', (vuetify) => {
    // your logic here
    // console.log('vuetify:ready')
  })
})