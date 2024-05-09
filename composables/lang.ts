
export enum lang {
    en = 'en',
    fa = 'fa'
}

export const useLang = () => {
    return useState<{code : lang}>("lang", () => {
        return {
            code: lang.en
        };
    });
};
