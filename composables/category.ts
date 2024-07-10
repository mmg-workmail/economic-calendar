export function useCategory() {
    const runtimeConfig = useRuntimeConfig();
    const language = useLang()

    const { data: items, pending, status } = useFetch<{ data: { id: string, name: string }[] }>(`${runtimeConfig.public.API_BASE_URL}/api/categories`, {
        method: 'get',
        headers: {
            'lang': language.value.code,
        },
    })

    return {
        items,
        pending,
        status
    }

}