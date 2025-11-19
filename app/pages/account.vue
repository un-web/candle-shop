<script lang="ts" setup>
import { ref } from 'vue'
import type { User, OrderSummary } from '~~/shared/types'

const user = ref<User>({
    id: 1,
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67'
})

const orders = ref<OrderSummary[]>([
    { id: 101, date: '2025-11-01', total: 5200, status: 'completed' },
    { id: 102, date: '2025-11-15', total: 2300, status: 'processing' },
])

const logout = () => {
    alert('Выход из аккаунта пока не реализован.')
}
</script>

<template>
    <div class="container mx-auto py-12 px-4 max-w-4xl">
        <h1 class="text-3xl font-bold font-serif mb-8">Личный кабинет</h1>

        <section class="mb-12">
            <h2 class="text-xl font-semibold mb-4">Профиль</h2>
            <div class="bg-white rounded-lg p-6 shadow-md max-w-md">
                <p><strong>Имя:</strong> {{ user.name }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Телефон:</strong> {{ user.phone }}</p>
                <button @click="logout" class="btn-secondary mt-4">Выйти</button>
            </div>
        </section>

        <section>
            <h2 class="text-xl font-semibold mb-4">История заказов</h2>
            <div v-if="orders.length > 0" class="space-y-4">
                <div v-for="order in orders" :key="order.id"
                    class="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                    <div>
                        <p>Заказ #: {{ order.id }}</p>
                        <p>Дата: {{ order.date }}</p>
                    </div>
                    <div class="text-right">
                        <p>Итого: {{ order.total }} ₽</p>
                        <p :class="{
                            'text-green-600': order.status === 'completed',
                            'text-yellow-600': order.status === 'processing',
                            'text-red-600': order.status === 'cancelled',
                            'text-gray-600': order.status === 'pending'
                        }">
                            {{ order.status }}
                        </p>
                    </div>
                </div>
            </div>
            <p v-else class="text-gray-500">История заказов пуста.</p>
        </section>
    </div>
</template>
