import type { Category } from "~/src/enums/category";
import { DateEvent } from "~/src/enums/date";
import { Impact } from "~/src/enums/impact";

export interface Filter {
    country: [],
    category: null | Category,
    date: null | DateEvent,
    impact: Impact | null,
    timezone: null | string
}
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

export const useFilter = () => {
    const storageFilter = useStorage()
    let initial = {
        country: [],
        category: null,
        date: DateEvent.today,
        impact: null,
        timezone: timezone
    };
    if (storageFilter.filter.value) {
        initial = storageFilter.filter.value
    }
    return useState<Filter>("filter", () => {
        return initial;
    });
};
