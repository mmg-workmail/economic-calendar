
export interface Utc {
    zone : string,
}

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

export const useUtc = () => {
    return useState<Utc>("utc", () => {
        return {
            zone : timezone 
        };
    });
};
