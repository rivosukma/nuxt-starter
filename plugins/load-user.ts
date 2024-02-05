import { useAuthStore } from '~/store/store-auth';

// TODO: temporary use plugin because nuxt-auth sesh bug
export default defineNuxtPlugin(async () => {
    const auth = useAuthStore();

    if (!auth.isLoggedIn) {
        await auth.profile();
    }
});
