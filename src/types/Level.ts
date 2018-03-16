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
    version: number;
    editable: boolean;
    authorId: number;
}

export type FullLevel = BasicLevel & LevelDetails;