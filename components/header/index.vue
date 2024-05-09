
<script setup lang="ts">
import { Countries } from "~/src/constants/countries";
import { CountriesFlags } from "~/src/constants/flags";
import { Categories } from "~/src/constants/categories";
import { DateFilter } from "~/src/constants/date";
import { Impact } from "~/src/enums/impact";



const language = useLang()

const countries = ref([])
const countriesItems = {}
Object.entries(Countries).map(item => item[1].map(c => {
    countriesItems[c.value] = c
}))
Object.entries(countriesItems).map(([key, item]) => {
    countries.value.push({...item, ...{flag : CountriesFlags[item.name]}})
})

const categories = ref(Categories)
const date = ref(DateFilter)
const impact = ref(Impact)



const filters = ref(
    {
        countries : [],
        categories : null,
        date : date.value[0].value,
        impact: Impact.one
    }
)

const filtersName = ref({
    date: {
        en : 'Date',
        fa: 'تاریخ'
    },
    impact: {
        en : 'Impact',
        fa: 'درجه'
    },
    category: {
        en: 'Category',
        fa: 'دسته بندی'
    },
    country: {
        en: 'Country',
        fa: 'کشور'
    }
})

</script>


<template>
    <div class="flex gap-3">
        {{ filters }}
        <div class="">
            <v-select
            base-color="primary"
            item-color="primary"
            color="primary"
            density="compact"
            variant="outlined"
            width="170"
            :items="date"
            :item-title="language.code"
            item-value="value"
            v-model="filters.date"
            prepend-inner-icon="mdi-calendar-month"
            class=""
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
            width="170"
            :items="[Impact.one, Impact.two, Impact.three]"
            v-model="filters.impact"
            class=""
            rounded="lg"
            hide-details
            :label="filtersName.impact[language.code]"
            >

            <template v-slot:selection="{ item, index }">
                <div class=" flex gap-2 items-center">
                    <v-rating
                    v-model="item.value"
                    readonly
                    length="3"
                    size="small"

                    active-color="yellow-darken-3"
                    ></v-rating>
                    
                    <span>
                        {{ filtersName.impact[language.code] }}
                    </span>
                </div>
            </template>

            <template v-slot:item="{item, props}">
                
                <v-list-item  v-bind="props" title="">
                    <v-rating
                        v-model="item.value"
                        readonly
                        length="3"
                        size="small"

                        active-color="yellow-darken-3"
                        ></v-rating>
                </v-list-item>
            </template>

            </v-select>
        </div>
        <div class="">

            <v-autocomplete
                base-color="primary"
                item-color="primary"
                color="primary"
                density="compact"
                variant="outlined"
                width="300"
                :items="countries"
                item-title="name"
                item-value="name"
                v-model="filters.countries"
                prepend-inner-icon="mdi-web"
                class=""
                rounded="lg"
                hide-details
                :label="filtersName.country[language.code]"
                multiple
                clearable
            >
        
                <template v-slot:selection="{ item, index }">
                    <div class=" whitespace-nowrap">
                        <!-- <v-chip  size="x-small" color="primary">
                            <span>{{ item.title }}</span>
                        </v-chip> -->
                        <span v-if="index < 3">
                            <span class=" flex w-6 h-4">
                                    <img class="w-full border border-gray-500 rounded" :src="item.raw.flag?.mini" v-if="item.raw.flag?.mini" />
                                </span>
                        </span>
                        <span
                            v-if="index === 3"
                            class="text-grey text-caption align-self-center"
                        >
                            (+{{ filters.countries.length - 3 }})
                        </span>
                    </div>
                </template>

                <template v-slot:item="{item, props}">
                   <v-list density="compact">

                    <v-list-item  v-bind="props"  title="">
                        <v-list-item-title>
                            <div class=" flex gap-2">
                                <span class=" flex w-6 h-4">
                                    <img class="w-full border border-gray-500 rounded" :src="item.raw.flag?.mini" v-if="item.raw.flag?.mini" />
                                </span>
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
            width="250"
            :items="categories"
            :item-title="language.code"
            item-value="value"
            v-model="filters.categories"
            prepend-inner-icon="mdi-signal"
            class=""
            rounded="lg"
            hide-details
            :label="filtersName.category[language.code]"
            ></v-autocomplete>
        </div>
    </div>
</template>
