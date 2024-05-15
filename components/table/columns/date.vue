<template>
    <div class="relative flex items-center gap-1.5 ">

        <template v-if="isPast(date)">
            <span class="relative flex h-2 w-2" :title="time.past[language.code]">
                <span class=" absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full  h-2 w-2 bg-red-500"></span>
            </span>
        </template>
        <template v-else-if="isForOneHour(date)">
            <span class="relative flex h-2 w-2" :title="time.current[language.code]">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full  h-2 w-2 bg-sky-500"></span>
            </span>
        </template>
        <template v-else>
            <span class="relative flex h-2 w-2" :title="time.future[language.code]">
                <span class=" absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full  h-2 w-2 bg-green-500"></span>
            </span>
        </template>
        <span class=" text-sm">
            {{ datePreview || 1 }} 
            <span v-if="isForOneHour(date)">
                {{ time.min[language.code] }}
            </span>
        </Span>
        <!-- <p>{{ date }}</p> -->
    </div>
</template>

<script setup lang="ts">

const { getTimeCalendar, isPast, isForOneHour } = useMomment()
const language = useLang()
const props = defineProps({ date: '' })

const time = ref({
    past: {
        en: 'In Past',
        fa: 'در گذشته',
    },
    current: {
        en: 'Currently',
        fa: 'در حال حاضر',
    },
    future: {
        en: 'In Future',
        fa: 'در آینده',
    },
    min: {
        en : 'min',
        fa: 'دقیقه'
    }
})



const datePreview = ref(getTimeCalendar(props.date, language.value.code))
let intervalId: any;
  
onMounted(() => {
    intervalId = setInterval(() => {
        datePreview.value =  getTimeCalendar(props.date, language.value.code)
    }, 1000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});

</script>