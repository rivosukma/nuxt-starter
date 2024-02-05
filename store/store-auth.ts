import type { SubmissionContext } from 'vee-validate';
import { defineStore } from 'pinia';
import type { LoginPayloadType, UserAuthStoreType } from '~/types/auth';
import { useUser } from '~/composables/use-auth';
import { catchError } from '~/utils';

// TODO: review soon (where should put toast logic)
export const useAuthStore = defineStore('auth', () => {
    const user = ref<UserAuthStoreType | null>(null);
    const isLoggedIn = computed(() => !!user.value);

    const { signIn, signOut, signUp, getSession, ...auth } = useAuth();

    async function profile() {
        try {
            if (!auth.token.value) return null;

            const response = await useUser();

            if (response.data.value) {
                user.value = response.data.value as UserAuthStoreType;
            }

            return response;
        } catch (err) {
            console.log(err);
        }
    }

    // TODO: error handling
    async function login(
        values: LoginPayloadType,
        actions?: SubmissionContext<LoginPayloadType>
    ) {
        try {
            await signIn(values, { redirect: false });

            await profile();

            // if (!profile || profile.error.value) {
            //   throw Error(profile?.error.value?.message ?? "Error fetching profile");
            // }

            await navigateTo('/');
        } catch (err) {
            if (err.status >= 400 && err.status < 500) {
                actions?.setFieldError('password', catchError(err));
            }
        }
    }

    async function logout() {
        try {
            await signOut({ redirect: false });
            await (user.value = null);

            await navigateTo('/login');
        } catch (err) {
            console.log(err);
        }
    }

    return { user, login, logout, profile, isLoggedIn, ...auth };
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useTestStore() {
    const state = ref<string | null>(null);
    const comp = computed<string | void>({
        get: () => {},
        set: () => {}
    });

    comp.value = 'blue';

    function setState(value: any) {
        state.value = value;
    }

    return { state, setState };
}
