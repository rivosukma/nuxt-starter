import type { ApiResponse } from './api';

export type UserAuthStoreType = {
    name: string;
    email: string;
    phone?: string;
    picture?: string;
};

export type ProfileResponseType = {
    name: string;
    email: string;
    phone: string;
};
export type ProfileApiType = ApiResponse<ProfileResponseType>;

export type LoginPayloadType = { email: string; password: string };
export type LoginResponseType = {
    token: { access_token: string };
    user_id: number;
};
export type LoginApiType = ApiResponse<LoginResponseType>;
