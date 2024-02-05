import { loginSignature } from '../lib/crypto';
import type {
    LoginApiType,
    LoginPayloadType,
    LoginResponseType,
    ProfileApiType,
    ProfileResponseType
} from '../types/auth';
import { API_ROUTES } from '../lib/constant';
import { catchError } from '~/utils';

export async function $login(
    payload: LoginPayloadType
): Promise<[LoginResponseType | null, string | null]> {
    try {
        const res = await $api<LoginApiType>(API_ROUTES.AUTH.LOGIN, {
            method: 'POST',
            body: { token: loginSignature(payload.email, payload.password) }
        });
        const data = await res.data;

        return [data, null];
    } catch (err) {
        return [null, catchError(err)];
    }
}

export async function $profile(): Promise<
    [ProfileResponseType | null, string | null]
> {
    try {
        // TODO: change route soon
        const res = await $fetch<ProfileApiType>(
            '/api' + API_ROUTES.AUTH.PROFILE
        );
        const data = await res.data;

        return [data, null];
    } catch (err) {
        return [null, catchError(err)];
    }
}
