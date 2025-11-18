<script lang="ts" setup>
import type { FilterOptions } from '~/types'
import { useProducts } from '~/composables/useProducts'
import { usePagination } from '~/composables/usePagination'

const { filterProducts } = useProducts()

const filters = ref<FilterOptions>({})
const sortBy = ref<FilterOptions["sortBy"]>('default')
const viewMode = ref<'grid' | 'list'>('grid')
const mobileFiltersOpen = ref(false)

// Получение отфильтрованных товаров
const filteredProducts = computed(() => {
    const filterOptions: FilterOptions = {
        ...filters.value,
        sortBy: sortBy.value
    };
    return filterProducts(filterOptions);
});

// Пагинация
const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage
} = usePagination(filteredProducts.value, 12)

// Видимые страницы для пагинации
const visiblePages = computed(() => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages.value, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return pages
})

// Обработчики событий
const handleFilterChange = (newFilters: FilterOptions) => {
    filters.value = newFilters
    currentPage.value = 1
}

const handleFilterReset = () => {
    filters.value = {}
    sortBy.value = 'default'
    currentPage.value = 1
}

const handleSortChange = () => {
    currentPage.value = 1
}

// SEO
useHead({
    title: 'Каталог свечей - Candle Shop',
    meta: [
        {
            name: 'description',
            content: 'Широкий выбор ароматических и декоративных свечей. Натуральные материалы, уникальные ароматы.'
        }
    ]
})
</script>

<template>
    <div class="bg-gray-50 min-h-screen py-8">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Заголовок -->
            <div class="mb-8">
                <h1 class="text-4xl font-serif font-bold text-gray-900 mb-2">
                    Каталог свечей
                </h1>
                <p class="text-gray-600">
                    Найдено товаров: {{ filteredProducts.length }}
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Боковая панель фильтров (Desktop) -->
                <aside class="hidden lg:block">
                    <FilterSidebar @filter-change="handleFilterChange" @filter-reset="handleFilterReset" />
                </aside>

                <!-- Основной контент -->
                <div class="lg:col-span-3">
                    <!-- Панель управления (сортировка, вид) -->
                    <div
                        class="bg-white rounded-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <!-- Кнопка фильтров (Mobile) -->
                        <button
                            class="lg:hidden btn-secondary flex items-center justify-center transition bg-gray-500 text-white py-2 px-4 rounded-lg"
                            @click="mobileFiltersOpen = true">
                            <Icon name="mdi:filter" class="w-5 h-5 mr-2" />
                            Фильтры
                        </button>

                        <!-- Сортировка -->
                        <div class="flex items-center gap-3">
                            <label class="text-sm text-gray-600">Сортировка:</label>
                            <select v-model="sortBy" @change="handleSortChange"
                                class="px-3 py-2 border rounded-lg text-sm">
                                <option value="default">По умолчанию</option>
                                <option value="price-asc">Цена: по возрастанию</option>
                                <option value="price-desc">Цена: по убыванию</option>
                                <option value="rating">По рейтингу</option>
                                <option value="name">По названию</option>
                            </select>
                        </div>

                        <!-- Вид отображения -->
                        <div class="flex gap-2">
                            <button :class="[
                                'p-2 rounded-lg transition flex items-center justify-center',
                                viewMode === 'grid'
                                    ? 'bg-gray-500 text-white'
                                    : 'bg-gray-200 text-gray-600'
                            ]" @click="viewMode = 'grid'">
                                <Icon name="mdi:view-grid" class="w-5 h-5" />
                            </button>
                            <button :class="[
                                'p-2 rounded-lg transition flex items-center justify-center',
                                viewMode === 'list'
                                    ? 'bg-gray-500 text-white'
                                    : 'bg-gray-200 text-gray-600'
                            ]" @click="viewMode = 'list'">
                                <Icon name="mdi:format-list-text" class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <!-- Сетка товаров -->
                    <div v-if="paginatedItems.length > 0" :class="[
                        'grid gap-6 mb-8',
                        viewMode === 'grid'
                            ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                            : 'grid-cols-1'
                    ]">
                        <ProductCard v-for="product in paginatedItems" :key="product.id" :product="product"
                            :view-mode="viewMode" />
                    </div>

                    <!-- Пустое состояние -->
                    <div v-else class="bg-white rounded-lg p-12 text-center">
                        <Icon name="mdi:magnify" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 class="text-xl font-bold text-gray-900 mb-2">
                            Ничего не найдено
                        </h3>
                        <p class="text-gray-600 mb-6">
                            Попробуйте изменить параметры фильтрации
                        </p>
                        <button @click="handleFilterReset" class="btn-primary">
                            Сбросить фильтры
                        </button>
                    </div>

                    <!-- Пагинация -->
                    <div v-if="totalPages > 1" class="flex justify-center items-center gap-2">
                        <button @click="prevPage" :disabled="currentPage === 1"
                            class="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition">
                            Назад
                        </button>

                        <div class="flex gap-1">
                            <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="[
                                'w-10 h-10 rounded-lg font-medium transition',
                                page === currentPage
                                    ? 'bg-candle-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border'
                            ]">
                                {{ page }}
                            </button>
                        </div>

                        <button @click="nextPage" :disabled="currentPage === totalPages"
                            class="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition">
                            Вперед
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Мобильные фильтры (Modal) -->
        <Teleport to="body">
            <div v-if="mobileFiltersOpen" class="fixed inset-0 bg-black/50 z-50 lg:hidden"
                @click="mobileFiltersOpen = false">
                <div class="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto" @click.stop>
                    <div class="p-4 border-b flex justify-between items-center">
                        <h2 class="text-xl font-bold">Фильтры</h2>
                        <button @click="mobileFiltersOpen = false">
                            <Icon name="mdi:close" class="w-6 h-6" />
                        </button>
                    </div>
                    <div class="p-4">
                        <FilterSidebar @filter-change="handleFilterChange" @filter-reset="handleFilterReset" />
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>
