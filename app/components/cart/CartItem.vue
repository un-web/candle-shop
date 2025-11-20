<script lang="ts" setup>
import type { CartItem } from '~/types/cart'
import { useCart } from '~/composables/useCart'

const props = defineProps<{ item: CartItem }>()
const { removeItem } = useCart()

const remove = () => removeItem(props.item.productId)
</script>
<template>
    <div class="flex items-center justify-between py-4 border-b relative">
        <!-- Изображение -->
        <img :src="item.product.images[0]" :alt="item.product.name" class="w-20 h-20 rounded-lg object-cover mr-4" />

        <!-- Название и аромат -->
        <div class="flex-1 flex flex-col items-start">
            <h2 class="text-lg font-bold mb-1">{{ item.product.name }}</h2>
            <p class="text-sm text-gray-500">{{ item.product.scent }}</p>
        </div>

        <!-- Количество -->
        <CartQuantity :item="item" />

        <!-- Цена -->
        <div class="w-24 text-right font-bold text-candle-500">
            {{ item.product.price * item.quantity }} ₽
        </div>

        <!-- Удалить -->
        <button @click="remove"
            class="ml-4 text-red-500 hover:underline flex items-center justify-center bg-gray-100 p-2 rounded-lg">
            <Icon name="mdi:trash-can" class="text-lg" />
        </button>
    </div>
</template>
