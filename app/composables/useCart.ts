import { ref, computed, watch } from 'vue'
import type { Product, CartItem } from '~~/shared/types'

const CART_KEY = 'candle-shop-cart'



export const useCart = () => {

    const loadCart = (): CartItem[] => {
        try {
            const raw = localStorage.getItem(CART_KEY)
            return raw ? JSON.parse(raw) : []
        } catch {
            return []
        }
    }

    const saveCart = (items: CartItem[]) => {
        localStorage.setItem(CART_KEY, JSON.stringify(items))
    }

    const items = ref<CartItem[]>(loadCart())

    watch(items, (newItems) => {
        saveCart(newItems)
    }, { deep: true })

    const getTotal = computed(() =>
        items.value.reduce((sum, i) => sum + (i.product.price * i.quantity), 0)
    )

    const addItem = (product: Product, quantity = 1) => {
        const idx = items.value.findIndex(item => item.productId === product.id)
        if (idx > -1 && items.value[idx]) {
            items.value[idx].quantity += quantity
        } else {
            items.value.push({
                productId: product.id,
                quantity,
                product
            })
        }
    }

    const removeItem = (productId: number) => {
        items.value = items.value.filter(item => item.productId !== productId)
    }

    const updateQuantity = (productId: number, quantity: number) => {
        const item = items.value.find(item => item.productId === productId)
        if (item) item.quantity = quantity
    }

    const clearCart = () => {
        items.value = []
    }

    return {
        items,
        total: getTotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart
    }
}

