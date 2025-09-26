// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  vite: {
    build: {
      sourcemap: true
    }
  },
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  },

  runtimeConfig: {
    abc: 'def',
    public: {
      API_URL: process.env.API_URL,
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENTID,
      // Used by nuxt-simple-sitemap to generate absolute URLs
      siteUrl: process.env.SITE_URL || process.env.BASE_URL,
      // STATE: process.env.STATE,
      // TXN: process.env.TXN,
      // CLIENT_ID: process.env.CLIENT_ID,
      // DIGILOCKER_URI: process.env.DIGILOCKER_URI,
      PLAN_PRICE: process.env.PLAN_PRICE,
      baseURL: process.env.BASE_URL,
      appPrice: process.env.WHITELEVELAPP_PRICE
    },
    private: {
      STATE: process.env.STATE,
      STATE_ADMIN: process.env.STATE_ADMIN,
      TXN: process.env.TXN,
      CLIENT_ID: process.env.CLIENT_ID,
      DIGILOCKER_URI: process.env.DIGILOCKER_URI,

    }
  },

    // Site configuration for nuxt-site-config / nuxt-simple-sitemap
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || process.env.SITE_URL || process.env.BASE_URL || 'http://localhost:3000',
  },

  modules: [
    '@nuxtjs/tailwindcss',
    "nuxt-primevue",
    '@formkit/nuxt',
    'nuxt-bootstrap-icons',
    '@nuxt/image',
    '@sidebase/nuxt-pdf',
    'nuxt-simple-sitemap'
  ],

  // Configure nuxt-simple-sitemap
  sitemap: {
    // Pull dynamic URLs from our custom endpoint
    sources: ['/api/sitemap'],
    // Exclude private areas - use more specific patterns
    exclude: [
      '/admin/**',
      '/superadmin/**', 
      '/subadmin/**',
      '/user/**',
      '/addBusiness/**',
      '/form/**',
      '/Auth/Logout/**',
      '/Auth/Login/GoogleSignIn/**',
      '/Auth/Login/ForgotPassword/**',
      '/Admin/**',
      '/SuperAdmin/**',
      '/Subadmin/**',
      '/User/**',
      '/AddBusiness/**',
      '/ExtraPages/**',
      '/ClearCache/**',
      '/CommingSoon/**',
      '/business-visa/**',
      '/study-visa/**',
      '/tourist-visa/**',
      '/visitor-visa/**',
      '/work-visa/**',
      '/Job/**',
      '/Search/**',
      '/Home/**',
      '/Homepage/**',
      '/permanent-residency/**',
      '/Serviceview/**',
      '/Form/**',
      '/Adminprofile/**',
      '/Events/**',
      '/NotFound/**',
      '/Terms/**'
    ],
    autoLastmod: true,
  },

  routeRules: {
    '/user/**': { ssr: false },
    '/form/**': { ssr: false },
    '/admin/**': { ssr: false },
    '/superadmin/**': { ssr: false },
    '/addBusiness/**': { ssr: false },
    // Emit a static llms.txt at build/prerender time
    '/llms.txt': { prerender: true },
  },

  image: {
    domains: [], // Add domains if fetching external images
    formats: ['webp', 'avif'], // Use for optimizing raster images
    alias: {
      'svg-new-img': '/svg-new-img/', // Ensure correct aliasing
    },
    staticFilename: '[publicPath]/svg-new-img/[name][ext]', // Use static file for SVGs
  },
  css: ['~/assets/css/global.css'],


})