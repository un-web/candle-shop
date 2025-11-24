<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'
import { useFilters } from '~/composables/useFilters'

const { filters } = useFilters()

// Варианты сортировки
const sortOptions: DropdownMenuItem[] = [
    {
        label: 'По умолчанию',
        icon: 'i-lucide-arrow-up-down',
        onSelect: () => {
            filters.value.sortBy = undefined
        }
    },
    {
        type: 'separator'
    },
    {
        label: 'Цена: по возрастанию',
        icon: 'i-lucide-arrow-up-narrow-wide',
        onSelect: () => {
            filters.value.sortBy = 'price-asc'
        }
    },
    {
        label: 'Цена: по убыванию',
        icon: 'i-lucide-arrow-down-wide-narrow',
        onSelect: () => {
            filters.value.sortBy = 'price-desc'
        }
    },
    {
        type: 'separator'
    },
    {
        label: 'По рейтингу',
        icon: 'i-lucide-star',
        onSelect: () => {
            filters.value.sortBy = 'rating'
        }
    },
    {
        label: 'По названию',
        icon: 'i-lucide-a-arrow-up',
        onSelect: () => {
            filters.value.sortBy = 'name'
        }
    }
]

// Текущая выбранная опция
const selectedLabel = computed(() => {
    const option = sortOptions.find(opt => {
        if (opt.type === 'separator') return false
        if (!filters.value.sortBy) return opt.label === 'По умолчанию'

        switch (filters.value.sortBy) {
            case 'price-asc': return opt.label === 'Цена: по возрастанию'
            case 'price-desc': return opt.label === 'Цена: по убыванию'
            case 'rating': return opt.label === 'По рейтингу'
            case 'name': return opt.label === 'По названию'
            default: return opt.label === 'По умолчанию'
        }
    })

    return option?.label || 'Сортировка'
})

const selectedIcon = computed(() => {
    const option = sortOptions.find(opt => {
        if (opt.type === 'separator') return false
        if (!filters.value.sortBy) return opt.label === 'По умолчанию'

        switch (filters.value.sortBy) {
            case 'price-asc': return opt.label === 'Цена: по возрастанию'
            case 'price-desc': return opt.label === 'Цена: по убыванию'
            case 'rating': return opt.label === 'По рейтингу'
            case 'name': return opt.label === 'По названию'
            default: return opt.label === 'По умолчанию'
        }
    })

    return option?.icon || 'i-lucide-arrow-up-down'
})
</script>

<template>
    <UDropdownMenu :items="sortOptions" :modal="true">
        <UButton color="primary" variant="solid" :icon="selectedIcon" trailing-icon="i-lucide-chevron-down"
            class="justify-between min-w-[200px] text-white">
            {{ selectedLabel }}
        </UButton>
    </UDropdownMenu>
</template>
