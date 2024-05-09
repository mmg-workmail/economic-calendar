
<script setup lang="ts">

const language = useLang()

</script>

<template>
  <v-app>
    <v-locale-provider v-bind="{ltr : language.code === lang.en, rtl : language.code === lang.fa}">
      <v-main>
        <div class="!font-sans" :dir="language.code === lang.en ? 'en' : 'fa'">
          <App>
            <v-container>
              <v-row>
                <slot />
              </v-row>
            </v-container>
          </App>
        </div>
      </v-main>
    </v-locale-provider>
  </v-app>
</template>
