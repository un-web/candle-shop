export interface Product {
    id: number
    name: string
    description: string
    price: number
    image: string
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
}

export interface PaginationOptions {
    page: number
    perPage: number
    total: number
}
