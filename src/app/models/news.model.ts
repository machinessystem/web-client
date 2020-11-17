export interface News {
    newsId?: string;
    title: string;
    description: string;
    categories: string[];
    publishedOn: Date;
    more?: any;
    links?: Link[]
}

export interface NewsCategory {
    categoryId: string;
    category: string;
}

export interface Link {
    href: string;
    name: string;
    external?: boolean;
}

