import type { Product, FilterOptions } from '~~/shared/types'
import productsData from '~/data/products.json'

export const useProducts = () => {
    const products = useState<Product[]>('products', () => productsData)
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Получить все товары
    const getAllProducts = () => {
        return products.value
    }

    // Получить товар по ID
    const getProductById = (id: number) => {
        return products.value.find(p => p.id === id)
    }

    // Фильтрация и сортировка товаров
    const filterProducts = (filters: FilterOptions) => {
        console.log('filters', filters)
        let filtered = [...products.value]

        // Поиск по названию, описанию и аромату
        if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower) ||
                p.scent.toLowerCase().includes(searchLower) ||
                p.category.toLowerCase().includes(searchLower)
            )
        }

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

    // Получить уникальные значения для фильтров
    const getUniqueCategories = () => {
        return [...new Set(products.value.map(p => p.category))]
    }

    const getUniqueScents = () => {
        return [...new Set(products.value.map(p => p.scent))]
    }

    const getUniqueVolumes = () => {
        return [...new Set(products.value.map(p => p.volume))].sort((a, b) => a - b)
    }

    // Получить диапазон цен
    const getPriceRange = () => {
        const prices = products.value.map(p => p.price)
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        }
    }

    // Получить похожие товары
    const getSimilarProducts = (productId: number, limit = 4) => {
        const product = getProductById(productId)
        if (!product) return []

        return products.value
            .filter(p => p.id !== productId && p.category === product.category)
            .slice(0, limit)
    }

    return {
        products,
        loading,
        error,
        getAllProducts,
        getProductById,
        filterProducts,
        getUniqueCategories,
        getUniqueScents,
        getUniqueVolumes,
        getPriceRange,
        getSimilarProducts
    }
}
