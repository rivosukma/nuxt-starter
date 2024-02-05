import { API_ROUTES } from '~/utils/lib/constant';

export function useUser() {
    return useBaseFetch(API_ROUTES.AUTH.USER);
}
