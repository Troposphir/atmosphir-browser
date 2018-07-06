export interface UserProfile {
    avatarUrl: string;
}


export interface Comment {
    id: number;
    authorId: number;
    author: string;
    body: string;
}
