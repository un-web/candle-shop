<script lang="ts" setup>
const filters = reactive({
    category: '',
    priceMin: 0,
    priceMax: 5000,
    volumes: [] as number[]
})

const categories = ['Ароматические', 'Декоративные', 'Спа', 'Подарочные']

const updateFilter = (key: string, value: any) => {
    filters[key] = value
}

const toggleVolume = (volume: number) => {
    const index = filters.volumes.indexOf(volume)
    if (index > -1) {
        filters.volumes.splice(index, 1)
    } else {
        filters.volumes.push(volume)
    }
}

const applyFilters = () => {
    // Логика применения фильтров
    console.log('Фильтры применены:', filters)
}

const resetFilters = () => {
    filters.category = ''
    filters.priceMin = 0
    filters.priceMax = 5000
    filters.volumes = []
}
</script>

<template>
    <aside class="bg-white rounded-lg p-6 h-fit">
        <h2 class="text-xl font-serif font-bold text-gray-900 mb-6">Фильтры</h2>

        <!-- Категория -->
        <div class="mb-6 pb-6 border-b">
            <h3 class="font-semibold text-gray-800 mb-3">Категория</h3>
            <div class="space-y-2">
                <label v-for="category in categories" :key="category" class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" :checked="filters.category === category"
                        @change="() => updateFilter('category', category)" class="w-4 h-4 accent-candle-500" />
                    <span class="text-sm text-gray-700">{{ category }}</span>
                </label>
            </div>
        </div>

        <!-- Цена -->
        <div class="mb-6 pb-6 border-b">
            <h3 class="font-semibold text-gray-800 mb-3">Цена</h3>
            <div class="space-y-3">
                <div>
                    <label class="text-xs text-gray-600">От (₽)</label>
                    <input type="number" v-model.number="filters.priceMin"
                        @change="updateFilter('priceMin', filters.priceMin)"
                        class="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                    <label class="text-xs text-gray-600">До (₽)</label>
                    <input type="number" v-model.number="filters.priceMax"
                        @change="updateFilter('priceMax', filters.priceMax)"
                        class="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
            </div>
        </div>

        <!-- Объем -->
        <div class="mb-6">
            <h3 class="font-semibold text-gray-800 mb-3">Объем (мл)</h3>
            <div class="space-y-2">
                <label v-for="volume in [100, 200, 300, 500]" :key="volume"
                    class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" :checked="filters.volumes.includes(volume)"
                        @change="() => toggleVolume(volume)" class="w-4 h-4 accent-candle-500" />
                    <span class="text-sm text-gray-700">{{ volume }}мл</span>
                </label>
            </div>
        </div>

        <!-- Кнопки -->
        <div class="space-y-2">
            <button @click="applyFilters"
                class="w-full bg-stone-500 text-white py-2 rounded-lg hover:bg-stone-600 transition font-medium">
                Применить
            </button>
            <button @click="resetFilters"
                class="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium">
                Сбросить
            </button>
        </div>
    </aside>
</template>
