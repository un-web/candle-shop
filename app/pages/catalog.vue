<script lang="ts" setup>
import { computed } from 'vue'
import { useProducts } from '~/composables/useProducts'
import { useFilters } from '~/composables/useFilters'
import { usePagination } from '~/composables/usePagination'

const { filterProducts } = useProducts()
const { filters, hasActiveFilters, resetFilters } = useFilters()



const viewMode = ref<'grid' | 'list'>('grid')
const mobileFiltersOpen = ref(false)

// Получение отфильтрованных товаров
const filteredProducts = computed(() => {
    return filterProducts(filters.value)
})

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
    let end = Math.min(totalPages.value, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return pages
})

// Сбросить фильтры и пагинацию
const handleResetFilters = () => {
    resetFilters()
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
            <!-- Заголовок и поиск -->
            <div class="mb-8">
                <h1 class="text-4xl font-serif font-bold text-gray-900 mb-4">
                    Каталог свечей
                </h1>

                <!-- Поиск -->
                <!-- <div class="max-w-xl mb-4">
                    <FilterSearchBar />
                </div> -->

                <!-- Информация о результатах -->
                <!-- <div class="flex items-center gap-4">
                    <p class="text-gray-600">
                        Найдено товаров: <span class="font-semibold">{{ filteredProducts.length }}</span>
                    </p>
                    <button v-if="hasActiveFilters" @click="handleResetFilters"
                        class="text-sm text-candle-500 hover:text-candle-600 font-medium underline">
                        Сбросить все фильтры
                    </button>
                </div> -->
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Боковая панель фильтров (Desktop) -->
                <aside class="hidden lg:block">
                    <FilterSidebar />
                </aside>

                <!-- Основной контент -->
                <div class="lg:col-span-3">
                    <!-- Панель управления -->
                    <div
                        class="bg-white rounded-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <!-- Кнопка фильтров (Mobile) -->
                        <button class="lg:hidden btn-secondary flex items-center gap-2"
                            @click="mobileFiltersOpen = true">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Фильтры
                        </button>

                        <!-- Сортировка -->
                        <div class="flex items-center gap-3">
                            <label class="text-sm text-gray-600">Сортировка:</label>
                            <select v-model="filters.sortBy"
                                class="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-candle-500 focus:border-transparent">
                                <option :value="undefined">По умолчанию</option>
                                <option value="price-asc">Цена: по возрастанию</option>
                                <option value="price-desc">Цена: по убыванию</option>
                                <option value="rating">По рейтингу</option>
                                <option value="name">По названию</option>
                            </select>
                        </div>

                        <!-- Вид отображения -->
                        <div class="flex gap-2">
                            <button :class="[
                                'p-2 rounded-lg transition',
                                viewMode === 'grid'
                                    ? 'bg-candle-500 text-white'
                                    : 'bg-gray-200 text-gray-600'
                            ]" @click="viewMode = 'grid'" aria-label="Вид сеткой">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button :class="[
                                'p-2 rounded-lg transition',
                                viewMode === 'list'
                                    ? 'bg-candle-500 text-white'
                                    : 'bg-gray-200 text-gray-600'
                            ]" @click="viewMode = 'list'" aria-label="Вид списком">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
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
                        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
                    </div>

                    <!-- Пустое состояние -->
                    <div v-else class="bg-white rounded-lg p-12 text-center">
                        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 class="text-xl font-bold text-gray-900 mb-2">
                            Ничего не найдено
                        </h3>
                        <p class="text-gray-600 mb-6">
                            Попробуйте изменить параметры фильтрации или поиска
                        </p>
                        <button @click="handleResetFilters" class="btn-primary">
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
            <Transition name="fade">
                <div v-if="mobileFiltersOpen" class="fixed inset-0 bg-black/50 z-50 lg:hidden"
                    @click="mobileFiltersOpen = false">
                    <Transition name="slide">
                        <div class="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto" @click.stop>
                            <div class="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                                <h2 class="text-xl font-bold">Фильтры</h2>
                                <button @click="mobileFiltersOpen = false">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div class="p-4">
                                <FilterSidebar />
                            </div>
                        </div>
                    </Transition>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}
</style>
