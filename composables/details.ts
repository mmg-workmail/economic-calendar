export function useDetails(id: number = 0) {
    const runtimeConfig = useRuntimeConfig();
    const language = useLang()

    const { data: item, pending, status } = useFetch<any>(`${runtimeConfig.public.API_BASE_URL}/api/events/${id}`, {
        method: 'get',
        headers: {
            'lang': language.value.code,
        },
    })

    return {
        item,
        pending,
        status
    }

}