export interface BasicLevel {
    id: number;
    title: string;
    author: string;
    ratings: {
        quality: number,
        difficulty: number,
    };
    isLotd: boolean;
    isXp: boolean;
    screenshotUrl: string;
}