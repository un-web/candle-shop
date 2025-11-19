<template>
    <div class="flex flex-col min-h-screen ">
        <LayoutHeader />
        <div class="flex grow flex-col items-center">
            <div class="container px-4 sm:px-6 lg:px-8 py-4">
                <slot />
            </div>
        </div>
        <LayoutFooter />
    </div>
</template>
