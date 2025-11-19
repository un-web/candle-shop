<script lang="ts" setup>
import { useCart } from '~/composables/useCart'
const { items, total, clearCart } = useCart()
</script>

<template>
    <div class="container mx-auto py-12 px-4">
        <h1 class="text-3xl font-bold font-serif mb-8">Корзина</h1>
        <div v-if="items.length > 0" class="grid gap-8 grid-cols-1 lg:grid-cols-3">
            <!-- Товары -->
            <div class="lg:col-span-2">
                <CartItem v-for="item in items" :key="item.productId" :item="item" />
            </div>
            <!-- Итог -->
            <div class="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 h-fit">
                <div class="flex justify-between font-bold text-lg">
                    <span>Итого</span>
                    <span>{{ total }} ₽</span>
                </div>
                <NuxtLink to="/checkout" class="btn-primary text-center">
                    Оформить заказ
                </NuxtLink>
                <button @click="clearCart" class="btn-secondary">Очистить корзину</button>
            </div>
        </div>
        <div v-else class="text-center py-32 text-gray-500">
            <p>Корзина пуста.</p>
            <NuxtLink to="/catalog" class="btn-primary mt-8">Перейти в каталог</NuxtLink>
        </div>
    </div>
</template>
