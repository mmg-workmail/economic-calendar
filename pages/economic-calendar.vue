<script setup lang="ts">
const language = useLang();

const { items: categories, status, pending, groupByDate } = useCategory();
</script>

<template>
  <v-app>
    <v-locale-provider
      v-bind="{
        ltr: language.code === lang.en,
        rtl: language.code === lang.fa,
      }"
    >
      <v-main>
        <div
          class="calendar-economic"
          :dir="language.code === lang.en ? 'en' : 'fa'"
        >
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <Header :categories="categories" />
              </v-col>
              <v-col cols="12" v-if="categories">
                <Table :categories="categories" />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-main>
    </v-locale-provider>
  </v-app>
</template>
