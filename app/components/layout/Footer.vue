<script lang="ts" setup>
// Компонент готов к использованию
</script>
<template>
    <footer class="bg-stone-900 text-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Основной контент -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <!-- О магазине -->
                <div>
                    <h3 class="text-lg font-serif font-bold mb-4">Candle Shop</h3>
                    <p class="text-gray-300 text-sm leading-relaxed">
                        Премиальные ароматизированные свечи для вашего дома. Натуральные ингредиенты и уникальные
                        ароматы.
                    </p>
                </div>

                <!-- Ссылки -->
                <div>
                    <h3 class="text-lg font-bold mb-4">Навигация</h3>
                    <ul class="space-y-2">
                        <li>
                            <NuxtLink to="/catalog" class="text-gray-300 hover:text-gold-500 transition">Каталог
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/about" class="text-gray-300 hover:text-gold-500 transition">О нас</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/contacts" class="text-gray-300 hover:text-gold-500 transition">Контакты
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/faq" class="text-gray-300 hover:text-gold-500 transition">FAQ</NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Контакты -->
                <div>
                    <h3 class="text-lg font-bold mb-4">Контакты</h3>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li>📞 +7 (999) 123-45-67</li>
                        <li>📧 info@candleshop.ru</li>
                        <li>📍 Москва, Россия</li>
                    </ul>
                </div>

                <!-- Подписка -->
                <div>
                    <h3 class="text-lg font-bold mb-4">Подписка</h3>
                    <p class="text-gray-300 text-sm mb-3">Получайте скидки и новости</p>
                    <div class="flex">
                        <input type="email" placeholder="Ваш email"
                            class="flex-1 px-3 py-2 text-gray-900 rounded-l-lg" />
                        <button
                            class="bg-yellow-500 text-candle-900 px-4 py-2 rounded-r-lg font-bold hover:bg-yellow-600 transition">
                            OK
                        </button>
                    </div>
                </div>
            </div>

            <!-- Разделитель -->
            <div class="border-t border-candle-700 py-8">
                <!-- Социальные сети -->
                <div class="flex justify-center gap-6 mb-6">
                    <a href="#" class="text-gray-300 hover:text-gold-500 transition">
                        <Icon name="mdi:instagram" class="w-6 h-6" />
                    </a>
                    <a href="#" class="text-gray-300 hover:text-gold-500 transition">
                        <Icon name="mdi:facebook" class="w-6 h-6" />
                    </a>
                    <a href="#" class="text-gray-300 hover:text-gold-500 transition">
                        <Icon name="mdi:twitter" class="w-6 h-6" />
                    </a>
                </div>

                <!-- Copyright -->
                <div class="text-center text-gray-400 text-sm">
                    <p>&copy; 2024 Candle Shop. Все права защищены.</p>
                </div>
            </div>
        </div>
    </footer>
</template>
