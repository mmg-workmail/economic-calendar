import { Countries } from "~/src/constants/countries";
export function useCalendar() {
    const { getDate, getTimezoneOffset } = useMomment()
    const language = useLang()
    const filters = useFilter()
    const runtimeConfig = useRuntimeConfig();
    const router = useRouter()

    const country = ref(Countries);



    const {data: items, pending, status} =  useFetch<{data: any[]}>(`${runtimeConfig.public.API_BASE_URL}/api/calendar`, {
        method: 'post',
        body: filters,
        headers: {
            'lang'  : language.value.code
        },
        onRequest({ request, options }) {
            const storageFilter = useStorage()
            storageFilter.filter.value = filters.value
            const body = {...options.body}
            if (options.body?.country.length <=0) {
                delete body?.country
            }
            if (!options.body?.category) {
               delete body?.category
            }

            if (!options.body?.impact) {
                delete body?.impact
             }

             if (!options.body?.timezone) {
                delete body?.timezone
             } else {

                body.timezone = getTimezoneOffset(body?.timezone) 
             }

            options.body = body

            // router.push()

        }
    }) 

    
    const groupByDate = computed(() => {
        const result = {};

        items.value?.data.map(i => {
            const day = getDate(i.Date as string);
            if (!result[day]) {
                result[day] = []
            }
            i.country = getCountry(i)
            result[day].push(i)

        })

        return result
    })

    const loading = computed(() => pending.value)

    function getCountry(item) {
        return country.value.find(c => c.Country == (language.value.code == 'en' ? item.Country : item.OCountry))
    }

    return {
        loading,
        groupByDate,
        items
    }
}