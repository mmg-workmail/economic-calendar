export function useTgju() {

    const { data, pending, status } = useFetch<string>(`https://www.tgju.org/?act=economics-calendar&backend=true&noview&purpose=ajax`, {
        method: 'get',
    })

    return { data, pending, status }


}