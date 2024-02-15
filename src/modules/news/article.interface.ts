export interface IArticle {
    title: string;
    content: string;
    author: string;
    date?: Date;
    tags?: string[];
    views?: number;
    likes?: number;
    comments?: any[];
    images?: string[];
    isTrending?: boolean;
    isArchived?: boolean;
}

export interface IComment {
    user: string;
    content: string;
    date: Date;
}