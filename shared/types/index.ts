export interface Product {
    id: number
    name: string
    description: string
    price: number
    images: string[]
    category: string
    scent: string
    volume: number
    rating: number
    reviews: number
    inStock: boolean
    ingredients: string[]
    burnTime: string
}

export interface Category {
    id: number
    name: string
    slug: string
    count: number
}

export interface FilterOptions {
    category?: string
    priceMin?: number
    priceMax?: number
    volumes?: number[]
    scents?: string[]
    inStock?: boolean
    sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'name' | 'default'
    search?: string
}

export interface PaginationOptions {
    page: number
    perPage: number
    total: number
}

export interface CartItem {
    productId: number
    quantity: number
    product: Product
}
export interface Cart {
    items: CartItem[]
    total: number
}

export interface Order {
    name: string
    email: string
    phone: string
    address: string
    comment?: string
    items: {
        productId: number
        quantity: number
    }[]
    total: number
}

export interface User {
    id: number
    name: string
    email: string
    phone: string
}

export interface OrderForm {
    name: string
    email: string
    phone: string
    address: string
    comment?: string
}
export interface OrderItem {
    productId: number
    productName: string
    quantity: number
    price: number
}

export interface OrderData extends OrderForm {
    items: OrderItem[]
    total: number
    orderDate: string
    orderId: string
}

export interface OrderResponse {
    success: boolean;
    message?: string;
}
