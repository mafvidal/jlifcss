export type Art = {
    _id: string;
    show: boolean;
    order: number;
    title: string;
    category: string;
    description: string;
    date: string;
    images: Image[];
    principal: string;
}

export type Image = {
    order: number;
    url: string;
}

export type ArtResume = {
    _id: string;
    show: boolean;
    order: number;
    title: string;
    category: string;
    description: string;
    date: string;
    image: string;
}

