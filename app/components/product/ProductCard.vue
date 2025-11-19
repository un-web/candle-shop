<script lang="ts" setup>
// import type { Product } from '~/types/product'
import { useCart } from '~/composables/useCart'
import type { Product } from '~~/shared/types';
import CartQuantity from '../cart/CartQuantity.vue';

interface Props {
    product: Product
}

const props = defineProps<Props>()

const router = useRouter()

const { addItem, items } = useCart()

const cartItem = computed(() => items.value.find(item => item.productId === props.product.id))

const addToCart = () => {
    addItem(props.product)
}
</script>

<template>
    <div class="bg-white rounded-lg relative shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer "
        @click="router.push(`/products/${product.id}`)">
        <!-- Изображение -->
        <div class="relative h-64 bg-gray-200 overflow-hidden" v-if="product.images[0]">
            <img :src="product.images[0]" :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            <div class="absolute top-3 right-3 bg-stone-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {{ product.category }}
            </div>
        </div>

        <!-- Информация -->
        <div class="p-4">
            <!-- Название -->
            <h3 class="text-lg font-serif font-bold text-gray-900 mb-1 line-clamp-2">
                {{ product.name }}
            </h3>

            <!-- Описание -->
            <p class="text-sm text-gray-600 mb-2 line-clamp-2">
                {{ product.description }}
            </p>

            <!-- Запах -->
            <div class="mb-3">
                <p class="text-xs text-gray-500 uppercase tracking-wide">Аромат</p>
                <p class="text-sm font-medium text-candle-600">{{ product.scent }}</p>
            </div>

            <!-- Рейтинг -->
            <div class="flex items-center gap-2 mb-4">
                <div class="flex gap-0.5">
                    <Icon v-for="i in 5" :key="i" name="mdi:star" :class="[
                        'w-4 h-4',
                        i <= Math.round(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                    ]" />
                </div>
                <span class="text-xs text-gray-500">({{ product.reviews }})</span>
            </div>

            <!-- Цена и кнопка -->
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-2xl font-bold text-candle-500">
                        {{ product.price }} ₽
                    </p>
                    <p class="text-xs text-gray-500">
                        {{ product.volume }}мл
                    </p>
                </div>
                <button @click.stop="addToCart" :disabled="!product.inStock" v-if="!cartItem"
                    class="flex items-center justify-center bg-stone-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-stone-700 disabled:bg-gray-300 transition font-medium">
                    <Icon name="mdi:shopping-cart" class="w-5 h-5" />
                </button>
                <CartQuantity v-else :item="cartItem" />
            </div>

            <!-- Статус запаса -->
            <p v-if="!product.inStock" class="text-xs text-red-500 font-semibold mt-2">
                Нет в наличии
            </p>
        </div>

        <!-- Ссылка на товар -->
        <!-- <NuxtLink :to="`/products/${product.id}`" class="absolute inset-0" /> -->
    </div>
</template>
