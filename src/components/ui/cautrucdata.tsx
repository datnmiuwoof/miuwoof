export interface IDiscount {
    discount_value: number;
    discount_type: number;
}

export interface IProduct {
    id: number;
    image: string;
    alt: string;
    name: string;
    slug: string;
    price: number;
    originalPrice: string;
    is_hot: boolean;
    category_id: number;
    category_name: string;
    href: string;
    gallery?: string[];
    sold_out: boolean;
    Discounts: IDiscount[];
}


export interface IPost {
    id: number;
    image: string;
    title: string;
    date: string;
    href: string;
}
