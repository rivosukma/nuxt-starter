export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@nuxt/ui',
        '@vee-validate/nuxt',
        '@sidebase/nuxt-auth',
        '@nuxtjs/eslint-module',
        '@nuxtjs/color-mode',
        '@nuxtjs/google-fonts',
        'nuxt-headlessui',
        'nuxt-swiper'
    ],
    build: {
        transpile: ['jsonwebtoken']
    },
    eslint: { lintOnStart: false, emitWarning: false },
    auth: {
        baseURL: '/api/auth',
        provider: {
            type: 'refresh',
            endpoints: {
                signIn: { path: '/login', method: 'post' },
                signOut: { path: '/logout', method: 'post' },
                signUp: { path: '/register', method: 'post' },
                getSession: { path: '/session', method: 'get' },
                refresh: { path: '/refresh', method: 'post' }
            },
            pages: { login: '/login' },
            token: {
                signInResponseTokenPointer: '/token/accessToken',
                maxAgeInSeconds: 60 * 5, // 5 min
                sameSiteAttribute: 'lax'
            },
            refreshToken: {
                signInResponseRefreshTokenPointer: '/token/refreshToken'
            }
        },
        globalAppMiddleware: {
            allow404WithoutAuth: true,
            isEnabled: true
        }
    },
    css: ['~/assets/css/global.css'],
    headlessui: { prefix: 'H', autoImports: true },
    colorMode: { classSuffix: '' },
    veeValidate: { prefix: 'Vee', autoImports: true },
    $development: {
        runtimeConfig: {
            public: {
                baseUrl: 'http://localhost:3000',
                prefixBaseUrl: process.env.PREFIX_BASE_URL ?? ''
            }
        },
        routeRules: {
            '/api/v1/**': { proxy: `${process.env.BASE_URL}/**` }
        }
    },
    $production: {
        runtimeConfig: {
            secret: process.env.NUXT_SECRET ?? '',
            public: {
                baseUrl: process.env.BASE_URL ?? '',
                prefixBaseUrl: process.env.PREFIX_BASE_URL ?? ''
            }
        }
    }
});
