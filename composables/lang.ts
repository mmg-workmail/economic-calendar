
export enum lang {
    en = 'en',
    fa = 'fa'
}

export const language = {
    'en-US' : lang.en,
    'fa-IR' : lang.fa
}



const defaultLanguage = document.querySelector('html')?.attributes?.lang?.textContent
export const useLang = () => {
    const route = useRoute()
    return useState<{code : lang}>("lang", () => {
        return {
            code: route.query.lang || language[defaultLanguage] || lang.en
        };
    });
};
