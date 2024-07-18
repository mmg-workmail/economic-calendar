<template>
  <tr>
    <td class="!p-0 bg-gray-200" :colspan="props.cols">
      <v-card flat :loading="pending">
        <div class="!bg-gray-200 p-3 rounded-md">
          <div class="flex gap-5" v-if="item">
            <div class="w-1/2 flex flex-col gap-2">
              <div class="flex flex-col" v-if="item?.data?.description">
                <div>
                  <strong class="text-primary"
                    >{{ property.description[language.code] }} :</strong
                  >
                </div>
                <div class="description" v-html="item?.data?.description"></div>
              </div>
              <div class="flex flex-col" v-if="item?.data?.comments">
                <div>
                  <strong class="text-primary"
                    >{{ property.comments[language.code] }} :</strong
                  >
                </div>
                <div v-html="item?.data?.comments"></div>
              </div>
            </div>
            <div class="">
              <div class="flex flex-col gap-2">
                <div class="">
                  <strong class="text-primary">
                    {{ property.source[language.code] }} :
                  </strong>
                  <span>{{ item?.data?.source }}</span>
                </div>
                <div class="">
                  <strong class="text-primary">
                    {{ property.frequency[language.code] }} :
                  </strong>
                  <span>{{ item?.data?.periodType }}</span>
                </div>
                <div class="">
                  <strong class="text-primary">
                    {{ property.next_release[language.code] }} :
                  </strong>
                  <span>
                    {{
                      getFullDate(item?.data?.nextReleaseDate, language.code)
                    }}
                  </span>
                </div>
                <div class="">
                  <strong class="text-primary">
                    {{ property.volatility[language.code] }} :
                  </strong>
                  <span>
                    {{ property[item?.data?.volatility][language.code] }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps({ item: {}, cols: 12 });
const language = useLang();
const { item, pending } = useDetails(props.item.id);

const property = ref({
  description: {
    en: "Description",
    fa: "توضیحات",
  },
  comments: {
    en: "Comments",
    fa: "نظرات",
  },
  source: {
    en: "Source",
    fa: "منبع",
  },
  frequency: {
    en: "Frequency",
    fa: "دوره",
  },
  next_release: {
    en: "Next release",
    fa: "انتشار بعدی",
  },
  volatility: {
    en: "Volatility",
    fa: "نوسان",
  },
  LOW: {
    en: "Low",
    fa: "کم",
  },
  MEDIUM: {
    en: "Meium",
    fa: "متوسط",
  },
  HIGH: {
    en: "High",
    fa: "زیاد",
  },
});

const { getFullDate } = useMomment();
</script>
