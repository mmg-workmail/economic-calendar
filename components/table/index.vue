<script setup lang="ts">
const props = defineProps({ categories: {} });
const { loading, groupByDate, items } = useCalendar(props.categories);

useWebSocket(items);

const { getFullDate } = useMomment();
const language = useLang();

const header = ref({
  actual: {
    en: "Actual",
    fa: "واقعی",
  },
  previous: {
    en: "Previous",
    fa: "قبلی",
  },
  consensus: {
    en: "Consensus",
    fa: "اجماع",
  },
  dev: {
    en: "Dev",
    fa: "Dev",
  },
  // status: {
  //   en: "Status",
  //   fa: "وضعیت",
  // },
});

const itemSelected = ref({});
function openDetails(item: any) {
  if (itemSelected.value?.id === item.id) {
    itemSelected.value = {};
  } else {
    itemSelected.value = item;
  }
}
</script>

<template>
  <v-card :loading="loading && 'primary'" rounded="lg">
    <div class="flex flex-col overflow-auto" v-if="!loading">
      <template v-for="(dailyEvents, key) of groupByDate" :key="key">
        <div
          class="table-box border !border-gray-200"
          v-if="dailyEvents.length > 0 || true"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead
              class="bg-primary text-gray-500"
              :class="{
                'text-left': language.code == 'en',
                'text-right': language.code == 'fa',
              }"
            >
              <tr>
                <th
                  scope="col"
                  colspan="4"
                  class="px-3 py-3 font-medium text-sm uppercase"
                >
                  {{ getFullDate(key, language.code) }}
                </th>

                <th scope="col" class="px-3 py-3 text-sm font-medium uppercase">
                  {{ header.actual[language.code] }}
                </th>
                <th scope="col" class="px-3 py-3 text-sm font-medium uppercase">
                  {{ header.consensus[language.code] }}
                </th>
                <th scope="col" class="px-3 py-3 text-sm font-medium uppercase">
                  {{ header.previous[language.code] }}
                </th>

                <th scope="col" class="px-3 py-3 text-sm font-medium uppercase">
                  {{ header.dev[language.code] }}
                </th>
                <!-- <th scope="col" class="px-3 py-3 text-sm font-medium uppercase">
                  {{ header.status[language.code] }}
                </th> -->
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <template v-for="(item, index) of dailyEvents" :key="index">
                <table-item
                  :item="item"
                  @update:details="openDetails($event)"
                />
                <TableDetail
                  :item="itemSelected"
                  v-if="item.id === itemSelected.id"
                  cols="9"
                />
              </template>
            </tbody>
          </table>
        </div>
      </template>
    </div>
    <template v-else>
      <div class="flex justify-center items-center py-10 px-5">
        <v-progress-circular
          indeterminate
          :size="89"
          :width="5"
          color="primary"
        ></v-progress-circular>
      </div>
    </template>
  </v-card>
</template>
