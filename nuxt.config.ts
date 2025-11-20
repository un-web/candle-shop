// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  runtimeConfig: {
    // Приватные ключи (только на сервере)
    emailHost: '',
    emailPort: '',
    emailUser: '',
    emailPassword: '',
    emailRecipient: '',
    telegramBotToken: '',
    telegramChatId: '',

    public: {
      // Публичные ключи (доступны на клиенте)
    }
  },
  ssr: false,
  devtools: { enabled: true },
  dir: {
    app: 'app',
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/main.css'], //This is important 
  // ui: {
  //   prefix: 'Nuxt',
  // },

})