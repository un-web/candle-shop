<script lang="ts" setup>
import type { CartItem } from '~~/shared/types'
import { useCart } from '~/composables/useCart'

const props = defineProps<{ item: CartItem }>()
const { updateQuantity, removeItem } = useCart()

const increment = () => { updateQuantity(props.item.productId, props.item.quantity + 1) }
const decrement = () => {
    if (props.item.quantity > 1)
        updateQuantity(props.item.productId, props.item.quantity - 1)
    else removeItem(props.item.productId)
}
const onChange = () => {
    if (props.item.quantity < 1) {
        updateQuantity(props.item.productId, 1)
    }
}

</script>
<template>
    <div class="flex items-center gap-2">
        <button @click.stop="decrement" class="px-2 py-1 rounded bg-gray-200 cursor-pointer">-</button>
        <input type="number" :value="item.quantity" @change="onChange" class="w-12 py-1 text-center border rounded"
            min="1" />
        <button @click.stop="increment" class="px-2 py-1 rounded bg-gray-200 cursor-pointer">+</button>
    </div>
</template>