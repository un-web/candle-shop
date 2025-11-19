<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useSwipe } from '@vueuse/core'

interface Props {
    images: string[]
    alt: string
}

const props = defineProps<Props>()

const currentIndex = ref(0)
const isZoomed = ref(false)

const currentImage = computed(() => props.images[currentIndex.value])

const selectImage = (index: number) => {
    currentIndex.value = index
    isZoomed.value = false
}

const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

const toggleZoom = () => {
    isZoomed.value = !isZoomed.value
}

const closeZoom = () => {
    isZoomed.value = false
}


const target = ref<HTMLElement | null>(null)
const { direction } = useSwipe(target)

watch(direction, (newDirection) => {
    if (newDirection === 'left') nextImage()
    if (newDirection === 'right') prevImage()
})

</script>

<template>
    <div class="product-gallery">
        <!-- Основное изображение -->
        <div class="relative bg-gray-100 rounded-lg overflow-hidden aspect-square mb-4">
            <img :src="currentImage" :alt="alt" class="w-full h-full object-cover cursor-zoom-in" @click="toggleZoom" />

            <!-- Навигационные стрелки (если несколько изображений) -->
            <template v-if="images.length > 1">
                <button @click="prevImage"
                    class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition"
                    aria-label="Предыдущее изображение">
                    <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button @click="nextImage"
                    class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition"
                    aria-label="Следующее изображение">
                    <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </template>

            <!-- Индикатор количества изображений -->
            <div v-if="images.length > 1"
                class="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {{ currentIndex + 1 }} / {{ images.length }}
            </div>

            <!-- Иконка увеличения -->
            <div class="absolute top-4 right-4 bg-white/80 p-2 rounded-full">
                <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
            </div>
        </div>

        <!-- Миниатюры (если несколько изображений) -->
        <div v-if="images.length > 1" class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
            <button v-for="(image, index) in images" :key="index" @click="selectImage(index)" :class="[
                'relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all',
                currentIndex === index
                    ? 'border-candle-500 ring-2 ring-candle-500 ring-offset-2'
                    : 'border-transparent hover:border-gray-300'
            ]">
                <img :src="image" :alt="`${alt} - вид ${index + 1}`" class="w-full h-full object-cover" />
            </button>
        </div>

        <!-- Модальное окно увеличенного изображения -->
        <Teleport to="body">
            <Transition name="zoom">
                <div v-if="isZoomed" class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    @click="closeZoom">
                    <button @click="closeZoom" class="absolute top-4 right-4 text-white hover:text-gray-300 transition"
                        aria-label="Закрыть">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <img :src="currentImage" :alt="alt" class="max-w-full max-h-full object-contain" @click.stop />

                    <!-- Навигация в увеличенном режиме -->
                    <template v-if="images.length > 1">
                        <button @click.stop="prevImage"
                            class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 p-4 rounded-full transition"
                            aria-label="Предыдущее изображение">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button @click.stop="nextImage"
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 p-4 rounded-full transition"
                            aria-label="Следующее изображение">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <!-- Индикатор в увеличенном режиме -->
                        <div
                            class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full">
                            {{ currentIndex + 1 }} / {{ images.length }}
                        </div>
                    </template>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
/* Анимация для модального окна */
.zoom-enter-active,
.zoom-leave-active {
    transition: opacity 0.3s ease;
}

.zoom-enter-from,
.zoom-leave-to {
    opacity: 0;
}

.zoom-enter-active img,
.zoom-leave-active img {
    transition: transform 0.3s ease;
}

.zoom-enter-from img {
    transform: scale(0.9);
}

.zoom-leave-to img {
    transform: scale(0.9);
}

/* Курсор при наведении */
.cursor-zoom-in {
    cursor: zoom-in;
}
</style>
