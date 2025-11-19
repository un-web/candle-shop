<script lang="ts" setup>
import { useProducts } from '~/composables/useProducts'
import { useCart } from '~/composables/useCart'

const route = useRoute()
const { getProductById, getSimilarProducts } = useProducts()
const { addItem } = useCart()

const productId = computed(() => Number(route.params.id))
const product = computed(() => getProductById(productId.value))
const similarProducts = computed(() => getSimilarProducts(productId.value))

// Если товар не найден - редирект на 404
if (!product.value) {
    throw createError({ statusCode: 404, statusMessage: 'Товар не найден' })
}

const addToCart = () => {
    if (product.value) {
        addItem(product.value)
    }
}

// SEO
useHead({
    title: `${product.value?.name} - Candle Shop`,
    meta: [
        {
            name: 'description',
            content: product.value?.description || ''
        }
    ]
})
</script>

<template>
    <div class="bg-gray-50 min-h-screen py-8">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Хлебные крошки -->
            <nav class="mb-6 text-sm">
                <ol class="flex items-center gap-2 text-gray-600">
                    <li>
                        <NuxtLink to="/" class="hover:text-candle-500">Главная</NuxtLink>
                    </li>
                    <li>/</li>
                    <li>
                        <NuxtLink to="/catalog" class="hover:text-candle-500">Каталог</NuxtLink>
                    </li>
                    <li>/</li>
                    <li class="text-gray-900 font-medium">{{ product?.name }}</li>
                </ol>
            </nav>

            <!-- Основная информация о товаре -->
            <div v-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <!-- Галерея -->
                <div>
                    <ProductGallery :images="product.images" :alt="product.name" />
                </div>

                <!-- Информация -->
                <div>
                    <h1 class="text-4xl font-serif font-bold text-gray-900 mb-4">
                        {{ product.name }}
                    </h1>

                    <!-- Рейтинг и отзывы -->
                    <div class="flex items-center gap-3 mb-6">
                        <div class="flex gap-1">
                            <Icon v-for="i in 5" :key="i" name="mdi:star" :class="[
                                'w-5 h-5',
                                i <= Math.round(product.rating)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                            ]" />
                        </div>
                        <span class="text-sm text-gray-600">
                            {{ product.rating }} ({{ product.reviews }} отзывов)
                        </span>
                    </div>

                    <!-- Цена -->
                    <div class="mb-8">
                        <p class="text-4xl font-bold text-candle-500 mb-1">
                            {{ product.price }} ₽
                        </p>
                        <p class="text-gray-600">
                            Объем: {{ product.volume }}мл
                        </p>
                    </div>

                    <!-- Описание -->
                    <p class="text-gray-700 leading-relaxed mb-8">
                        {{ product.description }}
                    </p>

                    <!-- Характеристики -->
                    <div class="bg-white rounded-lg p-6 mb-8">
                        <h3 class="font-bold text-gray-900 mb-4">Характеристики</h3>
                        <dl class="space-y-3">
                            <div class="flex justify-between">
                                <dt class="text-gray-600">Аромат:</dt>
                                <dd class="font-medium">{{ product.scent }}</dd>
                            </div>
                            <div class="flex justify-between">
                                <dt class="text-gray-600">Категория:</dt>
                                <dd class="font-medium">{{ product.category }}</dd>
                            </div>
                            <div class="flex justify-between">
                                <dt class="text-gray-600">Время горения:</dt>
                                <dd class="font-medium">{{ product.burnTime }}</dd>
                            </div>
                            <div class="flex justify-between">
                                <dt class="text-gray-600">Состав:</dt>
                                <dd class="font-medium text-right">{{ product.ingredients.join(', ') }}</dd>
                            </div>
                        </dl>
                    </div>

                    <!-- Добавить в корзину -->
                    <div class="flex gap-4">
                        <button @click="addToCart" :disabled="!product.inStock"
                            class="flex-1 bg-candle-500 text-white px-8 py-4 rounded-lg hover:bg-candle-600 disabled:bg-gray-300 transition font-bold text-lg">
                            {{ product.inStock ? 'Добавить в корзину' : 'Нет в наличии' }}
                        </button>
                        <button class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                            <Icon name="mdi:heart" class="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Похожие товары -->
            <div v-if="similarProducts.length > 0" class="mb-16">
                <h2 class="text-3xl font-serif font-bold text-gray-900 mb-8">
                    Похожие товары
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ProductCard v-for="similar in similarProducts" :key="similar.id" :product="similar" />
                </div>
            </div>
        </div>
    </div>
</template>