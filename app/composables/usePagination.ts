export const usePagination = <T>(items: T[], perPage = 12) => {
    const currentPage = ref(1)
    const itemsPerPage = ref(perPage)

    const totalPages = computed(() =>
        Math.ceil(items.length / itemsPerPage.value)
    )

    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value
        const end = start + itemsPerPage.value
        return items.slice(start, end)
    })

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const nextPage = () => {
        goToPage(currentPage.value + 1)
    }

    const prevPage = () => {
        goToPage(currentPage.value - 1)
    }

    return {
        currentPage,
        itemsPerPage,
        totalPages,
        paginatedItems,
        goToPage,
        nextPage,
        prevPage
    }
}
