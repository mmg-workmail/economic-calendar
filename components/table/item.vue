<script setup lang="ts">

const props = defineProps<{ item: any }>()
const {  isPast, isForOneHour } = useMomment()
</script>
<template>
    <tr class="bg-gray-30 hover:bg-gray-100 transition-all duration-100"
        :class="{ ' !bg-green-200': item.highlight, ' bg-slate-50': isPast(item.Date), ' bg-blue-50': isForOneHour(item.Date) }">
        <td class="px-3 py-2 whitespace-nowrap relative" width="140px">
            <table-columns-date :date="item.Date" />
        </td>
        <td class="px-3 py-2 whitespace-nowrap" width="60px">
            <div class="flex gap-2 items-center">
                <template v-if="item?.country">
                    <span :class="`flex w-10 h-8  flag flag-${item?.country?.ISO2.toLowerCase()} mb-1`"
                        :title="item.Country"></span>
                    <span class="" :title="item.Country"> {{ item?.country?.ISO2 }} </span>
                </template>
                <template v-else>
                    <span>{{ item.Country }}</span>
                </template>
            </div>
        </td>
        <td class="px-3 py-2 whitespace-nowrap" width="60px">
            <div class=" h-full flex items-center">
                <v-rating v-model="item.Importance" readonly length="3" size="small" active-color="yellow-darken-3"
                    color="grey-lighten-1"></v-rating>
            </div>
        </td>
        <td class="px-3  whitespace-nowrap">
            <div class=" flex gap-2">
                <span class="text-sm text-gray-900" dir="ltr">{{ item.Event }}</span>
                <span class="text-sm text-gray-300 uppercase">{{ item.Reference }}</span>
            </div>
        </td>

        <td class="px-3 py-2 whitespace-nowrap" width="150px">
            <span class="px-3 py-2 whitespace-nowrap text-gray-600  text-sm font-medium">
                {{ item.Actual }}
            </span>
        </td>
        <td class="px-3 py-2 whitespace-nowrap text-gray-600  text-sm font-medium" width="150px">
            {{ item.Previous }}
        </td>
        <td class="px-3 py-2 whitespace-nowrap text-gray-600 text-sm font-medium" width="150px">
            {{ item.TEForecast }}
        </td>
        <td class="px-3 py-2 whitespace-nowrap text-gray-600 text-sm font-medium" width="150px">
            {{ item.Forecast }}
        </td>
    </tr>
</template>