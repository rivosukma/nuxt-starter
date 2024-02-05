export const COOKIES = {
    ACCESS_TOKEN: 'auth:token',
    REFRESH_TOKEN: 'auth:refresh-token'
};

export const AUTH_PREFIX = '/api/auth';
export const BASE_PREFIX = '/api/v1';

export const API_ROUTES = {
    AUTH: { LOGIN: AUTH_PREFIX + '/login', USER: AUTH_PREFIX + '/user' }
};

export const ROUTES = {
    PROTECTED: ['/profile']
};
