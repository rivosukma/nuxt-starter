import type { FetchResponse } from 'ofetch';

export type ApiResponse<T> = FetchResponse<T> & {
    data: T;
};
