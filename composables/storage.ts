import type { Filter } from "./filter"

export function useStorage() {
    const filter = useCookie<Filter | null>('storage-economic-calendar-filter',{ default: () => {
        return null
    },})
    return {
        filter
    }
}