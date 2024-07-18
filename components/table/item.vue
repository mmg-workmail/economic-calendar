<script setup lang="ts">
import { Impact, ImpactRate } from "~/src/enums/impact";
const props = defineProps<{ item: any }>();
const { isPast, isForOneHour } = useMomment();

const emit = defineEmits(["update:details"]);

const language = useLang();

const status = ref({
  speech: {
    en: "Speech",
    fa: "سخنرانی",
  },
  report: {
    en: "Report",
    fa: "گزارش",
  },
});

const { amount } = useFormatterPrice();
</script>
<template>
  <tr
    class="bg-gray-30 hover:bg-gray-100 cursor-pointer transition-all duration-100"
    :class="{
      ' !bg-green-200': item.highlight,
      ' bg-slate-50': isPast(item.Date),
      ' bg-blue-50': isForOneHour(item.Date),
    }"
    @click="emit('update:details', item)"
  >
    <td class="px-3 py-2 whitespace-nowrap relative" width="140px">
      <table-columns-date :date="item.dateUtc" />
    </td>
    <td class="px-3 py-2 whitespace-nowrap" width="60px">
      <div class="flex gap-2 items-center">
        <template v-if="item?.country">
          <span
            :class="`flex w-10 h-8  flag flag-${
              item?.country?.codeFlag?.toLowerCase() ||
              item?.country?.ISO2.toLowerCase()
            }`"
            :title="item.Country"
          ></span>
          <span class="" :title="item.Country">
            {{ item?.country?.ISO2 }}
          </span>
        </template>
        <template v-else>
          <span>{{ item.countryCode }}</span>
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
        <div class="flex gap-1 justify-center">
          <v-tooltip
            :text="status.speech[language.code]"
            color="success"
            v-if="item.isSpeech"
          >
            <template v-slot:activator="{ props }">
              <v-chip size="small" color="success" v-bind="props">
                <v-icon> mdi-microphone </v-icon>
              </v-chip>
            </template>
          </v-tooltip>
          <v-tooltip
            color="success"
            :text="status.report[language.code]"
            v-if="item.isReport"
          >
            <template v-slot:activator="{ props }">
              <v-chip size="small" color="success" v-bind="props">
                <v-icon> mdi-chart-box-outline </v-icon>
              </v-chip>
            </template>
          </v-tooltip>
        </div>
      </div>
    </td>

    <td class="px-3 py-2 whitespace-nowrap" width="120px">
      <span
        class="whitespace-nowrap text-gray-600 text-sm font-medium flex gap-0.5"
        :class="{
          ' text-green-800': item.isBetterThanExpected,
          'text-red-800':
            item.actual < item.previous && item.actual < item.consensus,
        }"
      >
        <template v-if="item.actual">
          <span v-if="item.unit == '$' || item.unit == '€'" class="font-bold">
            {{ item.unit }}
          </span>
          <span>{{ amount(item.actual) }}</span>
          <span
            v-if="item.potency && item.potency !== 'ZERO'"
            class="font-bold"
          >
            {{ item.potency }}
          </span>
          <span v-if="item.unit == '%'" class="font-bold"> % </span>
        </template>
        <template v-else> - </template>
      </span>
    </td>
    <td
      class="px-3 py-2 whitespace-nowrap text-gray-600 text-sm font-medium flex gap-0.5"
      width="120px"
    >
      <template v-if="item.consensus">
        <span v-if="item.unit == '$' || item.unit == '€'" class="font-bold">
          {{ item.unit }}
        </span>
        <span>{{ item.consensus }}</span>
        <span v-if="item.potency && item.potency !== 'ZERO'" class="font-bold">
          {{ item.potency }}
        </span>
        <span v-if="item.unit == '%'" class="font-bold"> % </span>
      </template>
      <template v-else> - </template>
    </td>
    <td
      class="px-3 py-2 whitespace-nowrap text-gray-600 text-sm font-medium"
      width="120px"
    >
      <div class="flex gap-0.5">
        <template v-if="item.revised">
          <div class="flex gap-0.5 items-center">
            <!-- <span v-if="item.unit == '$' || item.unit == '€'" class="font-bold">
              {{ item.unit }}
            </span> -->
            <span>{{ amount(item.revised) }}</span>
            <span
              v-if="item.potency && item.potency !== 'ZERO'"
              class="font-bold"
            >
              {{ item.potency }}
            </span>
            <span v-if="item.unit == '%'" class="font-bold"> % </span>
            <span class="cursor-pointer">
              <v-tooltip :text="`Revised from ${amount(item.previous)}`">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon="mdi-information"
                    color="primary"
                    size="x-small"
                    density="comfortable"
                    variant="tonal"
                  ></v-btn>
                </template>
              </v-tooltip>
            </span>
          </div>
        </template>
        <template v-else-if="item.previous">
          <span v-if="item.unit == '$' || item.unit == '€'" class="font-bold">
            {{ item.unit }}
          </span>
          <span>{{ amount(item.previous) }}</span>
          <span
            v-if="item.potency && item.potency !== 'ZERO'"
            class="font-bold"
          >
            {{ item.potency }}
          </span>
          <span v-if="item.unit == '%'" class="font-bold"> % </span>
        </template>
        <template v-else> - </template>
      </div>
    </td>
    <td
      class="px-3 py-2 whitespace-nowrap text-gray-600 text-sm font-medium flex gap-0.5"
      width="120px"
    >
      <template v-if="item.ratioDeviation">
        <span>{{ amount(item.ratioDeviation.toFixed(3)) }}</span>
      </template>
      <template v-else>
        <span> - </span>
      </template>
    </td>
  </tr>
</template>
