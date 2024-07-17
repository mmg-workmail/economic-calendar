<script setup lang="ts">
import { Countries } from "~/src/constants/countries";
import { DateFilter } from "~/src/constants/date";
import { Impact, ImpactRate } from "~/src/enums/impact";
import TIMEZONE from "~/src/constants/timezone";

const props = defineProps({ categories: {} });

const language = useLang();
const countries = ref(Countries);

const date = ref(DateFilter);

const filters = useFilter();

const filtersName = ref({
  date: {
    en: "Date",
    fa: "تاریخ",
  },
  impact: {
    en: "Impact",
    fa: "درجه",
  },
  category: {
    en: "Category",
    fa: "دسته بندی",
  },
  country: {
    en: "Country",
    fa: "کشور",
  },
  timezone: {
    en: "Timezone",
    fa: "منطقه زمانی",
  },
});

const timezone = ref([]);
TIMEZONE.map((continent) => {
  return continent.newRow.map((c) => {
    timezone.value.push({ ...c, continent: continent.continent });
  });
});
</script>

<template>
  <div class="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 md:gap-4 gap-3">
    <div class="">
      <v-select
        base-color="primary"
        item-color="primary"
        color="primary"
        density="compact"
        variant="outlined"
        :items="date"
        :item-title="language.code"
        item-value="value"
        v-model="filters.date"
        prepend-inner-icon="mdi-calendar-month"
        class="w-full"
        rounded="lg"
        hide-details
        :label="filtersName.date[language.code]"
      ></v-select>
    </div>
    <div class="">
      <v-select
        base-color="primary"
        item-color="primary"
        color="primary"
        density="compact"
        variant="outlined"
        :items="[Impact.one, Impact.two, Impact.three]"
        v-model="filters.impact"
        class="w-full"
        rounded="lg"
        hide-details
        :label="filtersName.impact[language.code]"
        clearable
      >
        <template v-slot:selection="{ item, index }">
          <div class="flex gap-2 items-center">
            <v-rating
              :model-value="ImpactRate[filters.impact]"
              readonly
              length="3"
              size="small"
              color="grey-lighten-1"
              active-color="yellow-darken-3"
            ></v-rating>
          </div>
        </template>

        <template v-slot:item="{ item, props, index }">
          <v-list-item v-bind="props" title="">
            <v-rating
              :model-value="ImpactRate[item.value]"
              readonly
              length="3"
              size="small"
              color="grey-lighten-1"
              active-color="yellow-darken-3"
            ></v-rating>
          </v-list-item>
        </template>
      </v-select>
    </div>
    <div class="md:col-span-1 sm:col-span-3 col-span-2">
      <v-autocomplete
        base-color="primary"
        item-color="primary"
        color="primary"
        density="compact"
        variant="outlined"
        :items="countries"
        item-title="Country"
        item-value="ISO2"
        v-model="filters.country"
        prepend-inner-icon="mdi-web"
        class="w-full"
        rounded="lg"
        hide-details
        :label="filtersName.country[language.code]"
        multiple
        clearable
      >
        <template v-slot:selection="{ item, index }">
          <div class="whitespace-nowrap">
            <!-- <v-chip  size="x-small" color="primary">
                            <span>{{ item.title }}</span>
                        </v-chip> -->
            <span v-if="index < 3">
              <span
                :class="`flex w-10 h-8  flag flag-${item.raw?.ISO2?.toLowerCase()}`"
              ></span>
            </span>
            <span
              v-if="index === 3"
              class="text-grey text-caption align-self-center"
            >
              (+{{ filters.country.length - 3 }})
            </span>
          </div>
        </template>

        <template v-slot:item="{ item, props }">
          <v-list density="compact" class="!py-0 !my-0">
            <v-list-item
              v-bind="props"
              title=""
              :class="
                filters.country.findIndex((c) => c == item.title) >= 0 &&
                ' !bg-primary/10'
              "
              active-class="!bg-primary/10"
            >
              <v-list-item-title>
                <div class="flex gap-2">
                  <span
                    :class="`flex w-10 h-8 mt-1 flag flag-${item.raw?.ISO2?.toLowerCase()}`"
                  ></span>
                  <span>
                    {{ item.title }}
                  </span>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </template>
      </v-autocomplete>
    </div>
    <div class="">
      <v-autocomplete
        base-color="primary"
        item-color="primary"
        color="primary"
        density="compact"
        variant="outlined"
        :items="categories?.data"
        item-title="name"
        item-value="id"
        v-model="filters.category"
        prepend-inner-icon="mdi-signal"
        class="w-full"
        rounded="lg"
        hide-details
        :label="filtersName.category[language.code]"
        clearable
      ></v-autocomplete>
    </div>
    <div class="">
      <v-autocomplete
        base-color="primary"
        item-color="primary"
        color="primary"
        density="compact"
        variant="outlined"
        :items="timezone"
        item-title="tz"
        item-value="tz"
        v-model="filters.timezone"
        prepend-inner-icon="mdi-clock-time-eight-outline"
        class="w-full"
        rounded="lg"
        hide-details
        :label="filtersName.timezone[language.code]"
      >
        <template v-slot:item="{ item, props }">
          <v-list density="compact" class="!py-0 !my-0">
            <v-list-item v-bind="props" title="" active-class="!bg-primary/10">
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <small>
                  {{ item.raw.country }}
                </small>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </template>
      </v-autocomplete>
    </div>
  </div>
</template>
