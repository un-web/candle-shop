import type { Product, FilterOptions } from '~~/shared/types'
import productsData from '~/data/products.json'

export const useProducts = () => {
    const products = ref<Product[]>(productsData as Product[])
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Получить все товары
    const getAllProducts = () => {
        return products.value
    }

    // Получить товар по ID
    const getProductById = (id: number) => {
        return products.value.find((p: Product) => p.id === id)
    }

    // Фильтрация товаров
    const filterProducts = (filters: FilterOptions) => {
        let filtered = [...products.value]

        // Фильтр по категории
        if (filters.category) {
            filtered = filtered.filter(p => p.category === filters.category)
        }

        // Фильтр по цене
        if (filters.priceMin !== undefined) {
            filtered = filtered.filter(p => p.price >= filters.priceMin!)
        }
        if (filters.priceMax !== undefined) {
            filtered = filtered.filter(p => p.price <= filters.priceMax!)
        }

        // Фильтр по объему
        if (filters.volumes && filters.volumes.length > 0) {
            filtered = filtered.filter(p => filters.volumes!.includes(p.volume))
        }

        // Фильтр по аромату
        if (filters.scents && filters.scents.length > 0) {
            filtered = filtered.filter(p => filters.scents!.includes(p.scent))
        }

        // Фильтр по наличию
        if (filters.inStock) {
            filtered = filtered.filter(p => p.inStock)
        }

        // Сортировка
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'price-asc':
                    filtered.sort((a, b) => a.price - b.price)
                    break
                case 'price-desc':
                    filtered.sort((a, b) => b.price - a.price)
                    break
                case 'rating':
                    filtered.sort((a, b) => b.rating - a.rating)
                    break
                case 'name':
                    filtered.sort((a, b) => a.name.localeCompare(b.name))
                    break
            }
        }

        return filtered
    }

    // Поиск товаров
    const searchProducts = (query: string) => {
        const lowerQuery = query.toLowerCase()
        return products.value.filter((p: Product) =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery) ||
            p.scent.toLowerCase().includes(lowerQuery)
        )
    }

    // Получить похожие товары
    const getSimilarProducts = (productId: number, limit = 4) => {
        const product = getProductById(productId)
        if (!product) return []

        return products.value
            .filter((p: Product) => p.id !== productId && p.category === product.category)
            .slice(0, limit)
    }

    return {
        products,
        loading,
        error,
        getAllProducts,
        getProductById,
        filterProducts,
        searchProducts,
        getSimilarProducts
    }
}
