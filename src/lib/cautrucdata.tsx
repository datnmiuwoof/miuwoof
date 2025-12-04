export interface IDiscount {
    discount_value: number;
    discount_type: number;
}



export interface IBrand {
    id: number;
    url: NamedCurve;
    description: string;
}

export interface IProductImages {
    id: number;
    image: string;
    alt_text?: string | null;
    description?: string | null;
    sort_order?: number;
    product_id?: number;
}

export interface ICategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    children?: ICategory[];
    parentCategory: string;
    is_active: boolean;
    parent_id?: number | null;
    image: string;
    ParentCategory?: ICategory | null;
}

export interface IProduct {
    id: number;
    image: string;
    alt: string;
    name: string;
    slug: string;
    price: number;
    originalPrice: string;
    sku: string;
    is_hot: boolean;
    category_id: number;
    category_name: string;
    is_active: boolean;
    href: string;
    ProductImages?: IProductImages[];
    sold_out: boolean;
    Brand: IBrand;
    Discounts: IDiscount[];
    Category: ICategory;
    ProductVariants: IVariant[];
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface IPost {
    id: number;
    image: string;
    title: string;
    date: string;
    href: string;
}

export interface IVariant {
    id: number;
    product_id: number;
    size: string;
    style: string;
    unit: string;
    flavor: string;
    price: string;
    available_quantity: string;
    images?: File[] | null;
    previews?: string[] | null;
    ProductImages: [];
}

export interface ICart {
    id: number
    name: string;
    quantity: number;
    variant: [];
    price: number;
    image: string;
    totalPrice: number;
    uniqueId: number;
    finalPrice: any;
    userId: number;
}
