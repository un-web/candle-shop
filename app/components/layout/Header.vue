<script lang="ts" setup>
console.log('Header')

const mobileMenuOpen = ref(false)
const { items } = useCart()
const cartCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
)
</script>
<template>
    <header class="bg-white shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <!-- Верхняя строка: Logo и иконки -->
            <div class="flex justify-between items-center mb-4">
                <!-- Логотип -->
                <div class="flex items-center gap-2">
                    <!-- <Icon name="candle" class="w-8 h-8 text-candle-500" /> -->
                    <span class="text-2xl font-serif font-bold text-candle-900">
                        Candle Shop
                    </span>
                </div>

                <!-- Правые иконки (Desktop) -->
                <div class="hidden md:flex items-center gap-4">
                    <button class="relative p-2 hover:bg-stone-50 rounded-lg transition">
                        <Icon name="mdi:magnify" class="w-5 h-5 text-gray-600" />
                    </button>
                    <NuxtLink to="/cart" class="relative p-2 hover:bg-stone-50 rounded-lg transition">
                        <Icon name="mdi:cart" class="w-5 h-5 text-gray-600" />
                        <span v-if="cartCount > 0"
                            class="absolute -top-1 -right-1 bg-stone-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {{ cartCount }}
                        </span>
                    </NuxtLink>
                </div>

                <!-- Мобильное меню (Mobile) -->
                <button class="md:hidden p-2 hover:bg-stone-50 rounded-lg transition"
                    @click="mobileMenuOpen = !mobileMenuOpen">
                    <Icon name="mdi:menu" class="w-6 h-6 text-gray-600" />
                </button>
            </div>

            <!-- Навигация (Desktop) -->
            <nav class="hidden md:flex gap-8 border-t pt-4">
                <NuxtLink to="/" class="text-gray-700 hover:text-candle-500 font-medium transition">
                    Главная
                </NuxtLink>
                <NuxtLink to="/catalog" class="text-gray-700 hover:text-candle-500 font-medium transition">
                    Каталог
                </NuxtLink>
                <NuxtLink to="/about" class="text-gray-700 hover:text-candle-500 font-medium transition">
                    О нас
                </NuxtLink>
                <NuxtLink to="/contacts" class="text-gray-700 hover:text-candle-500 font-medium transition">
                    Контакты
                </NuxtLink>
            </nav>
        </div>

        <!-- Мобильное меню (Mobile) -->
        <!-- <div v-if="mobileMenuOpen" class="md:hidden bg-stone-50 border-t py-4 px-4">
            <nav class="flex flex-col gap-4">
                <NuxtLink to="/" class="text-gray-700 hover:text-candle-500 font-medium"
                    @click="mobileMenuOpen = false">
                    Главная
                </NuxtLink>
                <NuxtLink to="/catalog" class="text-gray-700 hover:text-candle-500 font-medium"
                    @click="mobileMenuOpen = false">
                    Каталог
                </NuxtLink>
                <NuxtLink to="/about" class="text-gray-700 hover:text-candle-500 font-medium"
                    @click="mobileMenuOpen = false">
                    О нас
                </NuxtLink>
                <NuxtLink to="/contacts" class="text-gray-700 hover:text-candle-500 font-medium"
                    @click="mobileMenuOpen = false">
                    Контакты
                </NuxtLink>
            </nav>
        </div> -->
    </header>
</template>
