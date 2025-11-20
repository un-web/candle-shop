import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FilterOptions } from '~~/shared/types'



export const useFilters = () => {
    const route = useRoute()
    const router = useRouter()
    const filters = useState<FilterOptions>('filters')
    // Инициализация фильтров из URL
    filters.value = {
        category: (route.query.category as string) || '',
        priceMin: Number(route.query.priceMin) || 0,
        priceMax: Number(route.query.priceMax) || 10000,
        volumes: route.query.volumes
            ? (route.query.volumes as string).split(',').map(Number)
            : [],
        scents: route.query.scents
            ? (route.query.scents as string).split(',')
            : [],
        inStock: route.query.inStock === 'true',
        sortBy: (route.query.sortBy as FilterOptions['sortBy']) || undefined,
        search: (route.query.search as string) || ''
    }

    // Синхронизация фильтров с URL
    const syncWithUrl = () => {
        const query: Record<string, string> = {}

        if (filters.value.category) query.category = filters.value.category
        if (filters.value.priceMin && filters.value.priceMin > 0) query.priceMin = String(filters.value.priceMin)
        if (filters.value.priceMax && filters.value.priceMax < 10000) query.priceMax = String(filters.value.priceMax)
        if (filters.value.volumes?.length) query.volumes = filters.value.volumes.join(',')
        if (filters.value.scents?.length) query.scents = filters.value.scents.join(',')
        if (filters.value.inStock) query.inStock = 'true'
        if (filters.value.sortBy) query.sortBy = filters.value.sortBy
        if (filters.value.search) query.search = filters.value.search

        router.push({ query })
    }

    // Автоматическая синхронизация при изменении фильтров
    watch(
        filters,
        () => {
            console.log('filters changed')
            syncWithUrl()
        },
        { deep: true }
    )

    // Сброс фильтров
    const resetFilters = () => {
        filters.value = {
            category: '',
            priceMin: 0,
            priceMax: 10000,
            volumes: [],
            scents: [],
            inStock: false,
            sortBy: undefined,
            search: ''
        }
    }

    // Применение одного фильтра
    const setFilter = (key: keyof FilterOptions, value: string) => {
        filters.value[key] = value as never
    }

    // Переключение значения в массиве (для multiple select)
    const toggleArrayValue = <T>(key: keyof FilterOptions, value: T) => {
        const arr = filters.value[key] as T[]
        if (!Array.isArray(arr)) return

        const index = arr.indexOf(value)
        if (index > -1) {
            arr.splice(index, 1)
        } else {
            arr.push(value)
        }
    }

    // Проверка активности фильтра
    const hasActiveFilters = computed(() => {
        return !!(
            filters.value.category ||
            filters.value.priceMin && filters.value.priceMin > 0 ||
            filters.value.priceMax && filters.value.priceMax < 10000 ||
            filters.value.volumes?.length ||
            filters.value.scents?.length ||
            filters.value.inStock ||
            filters.value.search
        )
    })

    return {
        filters,
        resetFilters,
        setFilter,
        toggleArrayValue,
        hasActiveFilters
    }
}
