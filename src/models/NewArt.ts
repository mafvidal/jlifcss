export type NewArt = {
    title: string;
    category: string;
    description?: string;
    date?: string;
    images: {
        id: string;
        order: number;
        principal: boolean;
    }[];
}
