export interface Business {
    name: string;
    tagline: string;
    whatsapp: string;
    address: string;
    hours: string;
    instagram?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    inStock: boolean;
}