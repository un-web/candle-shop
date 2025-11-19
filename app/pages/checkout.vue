<script lang="ts" setup>
import { ref } from 'vue'
import { useCart } from '~/composables/useCart'
import type { OrderResponse, OrderForm } from '~~/shared/types';


const { items, total, clearCart } = useCart()
const router = useRouter()

const form = ref<OrderForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
    comment: ''
})

const loading = ref(false)
const success = ref(false)
const error = ref<string | null>(null)

const submitOrder = async () => {
    // Валидация
    if (!form.value.name || !form.value.email || !form.value.phone || !form.value.address) {
        error.value = 'Пожалуйста, заполните все обязательные поля'
        return
    }

    if (items.value.length === 0) {
        error.value = 'Корзина пуста'
        return
    }

    loading.value = true
    error.value = null

    try {
        // Подготовка данных заказа
        const orderData = {
            ...form.value,
            items: items.value.map(item => ({
                productId: item.productId,
                productName: item.product.name,
                quantity: item.quantity,
                price: item.product.price
            })),
            total: total.value
        }

        // Отправка на сервер
        const response = await $fetch<OrderResponse>('/api/orders/create', {
            method: 'POST',
            body: orderData
        })

        if (response.success) {
            success.value = true
            clearCart()

            // Редирект на страницу успеха через 3 секунды
            setTimeout(() => {
                router.push('/')
            }, 3000)
        } else {
            error.value = response.message || 'Ошибка при оформлении заказа'
        }
    } catch (e) {
        error.value = 'Ошибка при отправке заказа. Попробуйте позже.'
        console.error(e)
    } finally {
        loading.value = false
    }
}

useHead({
    title: 'Оформление заказа - Candle Shop'
})
</script>

<template>
    <div class="container mx-auto py-12 px-4 max-w-2xl">
        <h1 class="text-3xl font-bold font-serif mb-8">Оформление заказа</h1>

        <!-- Форма -->
        <form v-if="!success" @submit.prevent="submitOrder" class="bg-white p-8 rounded-lg shadow-md">
            <!-- Контактные данные -->
            <div class="space-y-6 mb-8">
                <h2 class="text-xl font-semibold mb-4">Контактные данные</h2>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Имя <span class="text-red-500">*</span>
                    </label>
                    <input v-model="form.name" type="text" required class="input-field" placeholder="Иван Иванов" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Email <span class="text-red-500">*</span>
                    </label>
                    <input v-model="form.email" type="email" required class="input-field"
                        placeholder="email@example.com" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Телефон <span class="text-red-500">*</span>
                    </label>
                    <input v-model="form.phone" type="tel" required class="input-field"
                        placeholder="+7 (999) 123-45-67" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Адрес доставки <span class="text-red-500">*</span>
                    </label>
                    <textarea v-model="form.address" required rows="3" class="input-field"
                        placeholder="Город, улица, дом, квартира" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Комментарий к заказу
                    </label>
                    <textarea v-model="form.comment" rows="3" class="input-field"
                        placeholder="Дополнительная информация" />
                </div>
            </div>

            <!-- Состав заказа -->
            <div class="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 class="text-xl font-semibold mb-4">Ваш заказ</h2>
                <div class="space-y-3">
                    <div v-for="item in items" :key="item.productId" class="flex justify-between text-sm">
                        <span>{{ item.product.name }} x{{ item.quantity }}</span>
                        <span class="font-medium">{{ item.product.price * item.quantity }} ₽</span>
                    </div>
                </div>
                <div class="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                    <span>Итого:</span>
                    <span class="text-candle-500">{{ total }} ₽</span>
                </div>
            </div>

            <!-- Ошибка -->
            <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                {{ error }}
            </div>

            <!-- Кнопка отправки -->
            <button type="submit" :disabled="loading" class="btn-primary w-full text-lg">
                {{ loading ? 'Отправка...' : 'Оформить заказ' }}
            </button>

            <p class="text-xs text-gray-500 text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
            </p>
        </form>

        <!-- Успешное оформление -->
        <div v-if="success" class="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h2 class="text-2xl font-bold text-green-800 mb-2">
                Заказ успешно оформлен!
            </h2>
            <p class="text-green-700 mb-4">
                Мы отправили подтверждение на вашу почту и свяжемся с вами в ближайшее время.
            </p>
            <p class="text-sm text-gray-600">
                Перенаправление на главную страницу...
            </p>
        </div>
    </div>
</template>
