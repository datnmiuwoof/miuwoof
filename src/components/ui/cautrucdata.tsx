export interface IProduct {
    id: number;
    image: string;
    alt: string;
    name: string;
    slug: string;
    price: string;
    originalPrice: string;
    sale: string;
    soldOut: boolean;
    is_new: boolean;
    category_id: number;
    category_name: string;
    href: string;
}


export interface IPost {
    id: number;
    image: string;
    title: string;
    date: string;
    href: string;
}
