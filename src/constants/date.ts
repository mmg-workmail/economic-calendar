import { DateEvent } from "../enums/date";

export const DateFilter = [
    {
        value : DateEvent.today,
        en: 'Today',
        fa : 'امروز'
    },
    {
        value : DateEvent.tomorrow,
        en: 'Tomorrow',
        fa : 'فردا'
    },
    {
        value : DateEvent.yesterday,
        en: 'Yesterday',
        fa : 'دیروز'
    },
    {
        value : DateEvent.this_week,
        en: 'This Week',
        fa : 'این هفته'
    },
    {
        value : DateEvent.next_week,
        en: 'Next Week',
        fa : 'هفته آینده'
    },
]