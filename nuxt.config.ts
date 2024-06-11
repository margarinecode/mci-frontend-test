// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      MCI_TEST_API: process.env.MCI_TEST_API || "http://localhost:5000",
    },
  },
  build: {
    transpile: ["primevue"],
  },
  primevue: {
    cssLayerOrder: 'reset,primevue',
  },
  modules: [
    'nuxt-primevue',
  ],
  css: [
    "primeicons/primeicons.css",
    "primevue/resources/primevue.min.css",
    'primevue/resources/themes/aura-light-blue/theme.css'
  ],
})
