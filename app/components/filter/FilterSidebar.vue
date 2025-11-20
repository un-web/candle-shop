<script lang="ts" setup>
import { computed } from 'vue'
import { useProducts } from '~/composables/useProducts'
import { useFilters } from '~/composables/useFilters'

const { getUniqueCategories, getUniqueScents, getUniqueVolumes, getPriceRange } = useProducts()
const { filters, resetFilters, toggleArrayValue } = useFilters()

const categories = computed(() => getUniqueCategories())
const scents = computed(() => getUniqueScents())
const volumes = computed(() => getUniqueVolumes())
const priceRange = computed(() => getPriceRange())
</script>

<template>
    <aside class="bg-white rounded-lg p-6 shadow-md h-fit sticky top-24">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-serif font-bold text-gray-900">Фильтры</h2>
            <button v-if="filters.category || filters.volumes?.length || filters.scents?.length" @click="resetFilters"
                class="text-sm text-candle-500 hover:text-candle-600 font-medium">
                Сбросить
            </button>
        </div>

        <!-- Категория -->
        <div class="mb-6 pb-6 border-b">
            <h3 class="font-semibold text-gray-800 mb-3">Категория</h3>
            <div class="space-y-2">
                <label v-for="category in categories" :key="category"
                    class="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" :value="category" v-model="filters.category"
                        class="w-4 h-4 accent-candle-500 cursor-pointer" />
                    <span class="text-sm text-gray-700 group-hover:text-candle-500 transition">
                        {{ category }}
                    </span>
                </label>
                <label v-if="filters.category" class="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" value="" v-model="filters.category"
                        class="w-4 h-4 accent-candle-500 cursor-pointer" />
                    <span class="text-sm text-gray-500 group-hover:text-candle-500 transition">
                        Все категории
                    </span>
                </label>
            </div>
        </div>

        <!-- Цена -->
        <div class="mb-6 pb-6 border-b">
            <h3 class="font-semibold text-gray-800 mb-3">Цена (₽)</h3>
            <div class="space-y-3">
                <div>
                    <label class="text-xs text-gray-600 mb-1 block">От</label>
                    <input type="number" v-model.number="filters.priceMin" :min="priceRange.min" :max="filters.priceMax"
                        class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-candle-500 focus:border-transparent" />
                </div>
                <div>
                    <label class="text-xs text-gray-600 mb-1 block">До</label>
                    <input type="number" v-model.number="filters.priceMax" :min="filters.priceMin" :max="priceRange.max"
                        class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-candle-500 focus:border-transparent" />
                </div>
                <!-- Слайдер диапазона -->
                <div class="pt-2">
                    <div class="text-xs text-gray-500 text-center">
                        {{ filters.priceMin }} ₽ - {{ filters.priceMax }} ₽
                    </div>
                </div>
            </div>
        </div>

        <!-- Аромат -->
        <div class="mb-6 pb-6 border-b">
            <h3 class="font-semibold text-gray-800 mb-3">Аромат</h3>
            <div class="space-y-2">
                <label v-for="scent in scents" :key="scent" class="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" :checked="filters.scents?.includes(scent)"
                        @change="() => toggleArrayValue('scents', scent)"
                        class="w-4 h-4 accent-candle-500 cursor-pointer" />
                    <span class="text-sm text-gray-700 group-hover:text-candle-500 transition">
                        {{ scent }}
                    </span>
                </label>
            </div>
        </div>

        <!-- Объем -->
        <div class="mb-6 pb-6 border-b">
            <h3 class="font-semibold text-gray-800 mb-3">Объем (мл)</h3>
            <div class="space-y-2">
                <label v-for="volume in volumes" :key="volume" class="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" :checked="filters.volumes?.includes(volume)"
                        @change="() => toggleArrayValue('volumes', volume)"
                        class="w-4 h-4 accent-candle-500 cursor-pointer" />
                    <span class="text-sm text-gray-700 group-hover:text-candle-500 transition">
                        {{ volume }} мл
                    </span>
                </label>
            </div>
        </div>

        <!-- Наличие -->
        <div class="mb-4">
            <label class="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" v-model="filters.inStock" class="w-4 h-4 accent-candle-500 cursor-pointer" />
                <span class="text-sm font-medium text-gray-700 group-hover:text-candle-500 transition">
                    Только в наличии
                </span>
            </label>
        </div>
    </aside>
</template>
