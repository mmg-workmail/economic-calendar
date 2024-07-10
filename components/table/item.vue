<script setup lang="ts">
const props = defineProps<{ item: any }>();
const { isPast, isForOneHour } = useMomment();

import { Impact, ImpactRate } from "~/src/enums/impact";
</script>
<template>
  <tr
    class="bg-gray-30 hover:bg-gray-100 transition-all duration-100"
    :class="{
      ' !bg-green-200': item.highlight,
      ' bg-slate-50': isPast(item.Date),
      ' bg-blue-50': isForOneHour(item.Date),
    }"
  >
    <td class="px-3 py-2 whitespace-nowrap relative" width="140px">
      <table-columns-date :date="item.Date" />
    </td>
    <td class="px-3 py-2 whitespace-nowrap" width="60px">
      <div class="flex gap-2 items-center">
        <template v-if="item?.country">
          <span
            :class="`flex w-10 h-8  flag flag-${item?.country?.ISO2.toLowerCase()}`"
            :title="item.Country"
          ></span>
          <span class="" :title="item.Country">
            {{ item?.country?.ISO2 }}
          </span>
        </template>
        <template v-else>
          <span>{{ item.Country }}</span>
        </template>
      </div>
    </td>
    <td class="px-3 py-2 whitespace-nowrap" width="60px">
      <div class="h-full flex items-center">
        <v-rating
          :model-value="ImpactRate[item.volatility]"
          readonly
          length="3"
          size="small"
          active-color="yellow-darken-3"
          color="grey-lighten-1"
        ></v-rating>
      </div>
    </td>
    <td class="px-3 whitespace-nowrap">
      <div class="flex gap-2">
        <span class="text-sm text-gray-900" dir="ltr">{{ item.name }}</span>
        <span class="text-sm text-gray-300 uppercase">
          {{ item.Reference }}
        </span>
      </div>
    </td>

    <td class="px-3 py-2 whitespace-nowrap" width="150px">
      <span
        class="px-3 py-2 whitespace-nowrap text-gray-600 text-sm font-medium"
      >
        <template v-if="item.actual">
          {{ item.actual }}
          <span
            v-if="item.potency && item.potency !== 'ZERO'"
            class="font-bold"
          >
            {{ item.potency }}
          </span>
        </template>
        <template v-else> - </template>
      </span>
    </td>
    <td
      class="px-3 py-2 whitespace-nowrap text-gray-600 text-sm font-medium"
      width="150px"
    >
      <template v-if="item.consensus">
        {{ item.consensus }}
        <span v-if="item.potency && item.potency !== 'ZERO'" class="font-bold">
          {{ item.potency }}
        </span>
      </template>
      <template v-else> - </template>
    </td>
    <td
      class="px-3 py-2 whitespace-nowrap text-gray-600 text-sm font-medium"
      width="150px"
    >
      <template v-if="item.previous">
        {{ item.previous }}
        <span v-if="item.potency && item.potency !== 'ZERO'" class="font-bold">
          {{ item.potency }}
        </span>
      </template>
      <template v-else> - </template>
    </td>
    <td
      class="px-3 py-2 whitespace-nowrap text-gray-600 text-sm font-medium"
      width="150px"
    ></td>
    <td
      class="px-3 py-2 whitespace-nowrap text-gray-600 text-sm font-medium"
      width="150px"
    >
      <div class="flex gap-1 justify-center">
        <v-tooltip text="Speech" color="success">
          <template v-slot:activator="{ props }">
            <v-chip
              size="small"
              v-if="item.isSpeech"
              color="success"
              v-bind="props"
            >
              <v-icon> mdi-microphone </v-icon>
            </v-chip>
          </template>
        </v-tooltip>
        <v-tooltip color="success" text="Report">
          <template v-slot:activator="{ props }">
            <v-chip
              size="small"
              color="success"
              v-if="item.isReport"
              v-bind="props"
            >
              <v-icon> mdi-chart-box-outline </v-icon>
            </v-chip>
          </template>
        </v-tooltip>
      </div>
    </td>
  </tr>
</template>
