<script lang="ts" setup>
import type { CartItem } from '~/types/cart'
import { useCart } from '~/composables/useCart'

const props = defineProps<{ item: CartItem }>()
const { removeItem } = useCart()

const remove = () => removeItem(props.item.productId)
</script>
<template>
    <div class="flex items-center justify-between py-4 border-b">
        <!-- Изображение -->
        <img :src="item.product.image" :alt="item.product.name" class="w-20 h-20 rounded-lg object-cover mr-4" />

        <!-- Название и аромат -->
        <div class="flex-1">
            <h2 class="text-lg font-bold mb-1">{{ item.product.name }}</h2>
            <p class="text-sm text-gray-500">{{ item.product.scent }}</p>
        </div>

        <!-- Количество -->
        <CardQuantity :item="item" />

        <!-- Цена -->
        <div class="w-24 text-right font-bold text-candle-500">
            {{ item.product.price * item.quantity }} ₽
        </div>

        <!-- Удалить -->
        <button @click="remove" class="ml-4 text-red-500 hover:underline">Удалить</button>
    </div>
</template>
