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

export interface LevelDetails {
    description: string;
    editable: boolean;
    authorId: number;
    playCount: number;
}

export type FullLevel = BasicLevel & LevelDetails;