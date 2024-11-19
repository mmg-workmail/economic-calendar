import { Countries, CountriesAll } from "~/src/constants/countries";
import { Impact } from "~/src/enums/impact";
import { Selected } from "~/src/constants/countries";

export function useCalendar(categories: any = null) {
    const { getDate, getTimezoneOffset } = useMomment()
    const language = useLang()
    const filters = useFilter()
    const runtimeConfig = useRuntimeConfig();
    const router = useRouter()

    const country = ref(CountriesAll);
    // const country = ref(Countries);

    const { data: items, pending, status } = useFetch<{ data: any[] }>(`${runtimeConfig.public.API_BASE_URL}/api/events`, {
        method: 'post',
        body: filters,
        headers: {
            'lang': language.value.code,
        },
        onRequest({ request, options }) {
            const storageFilter = useStorage()
            storageFilter.filter.value = filters.value
            const body = { ...options.body }
            if (options.body?.country.length <= 0) {
                body.country = Selected;
            }
            if (!options.body?.category) {
                body.category = categories.data.map(c => c.id);
            }

            if (!options.body?.impact) {
                body.impact = [Impact.one, Impact.two, Impact.three];
            }

            if (!options.body?.timezone) {
                delete body?.timezone
            } else {
                body.timezone = getTimezoneOffset(body?.timezone)
            }

            if (options.body?.category) {
                body.category = [body.category]
            }
            if (options.body?.impact) {
                body.impact = [body.impact]
            }

            options.body = body


        }
    })


    const groupByDate = computed(() => {
        const result = {};

        items.value?.data.map(i => {
            const day = getDate(i.dateUtc as string);
            if (!result[day]) {
                result[day] = []
            }
            i.country = getCountry(i)
            result[day].push(i)

        })

        return result
    })

    const loading = computed(() => pending.value)

    function getCountry(item: any) {
        return country.value.find(c => c.ISO2 == item.countryCode)
    }
    function parseCountry(countryName: string) {
        return countryName
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return {
        loading,
        groupByDate,
        items
    }
}