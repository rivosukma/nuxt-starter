import type { FetchError } from 'ofetch';

export function catchError(value: any) {
    const err: FetchError = value;

    return err?.response?._data?.message || err?.message;
}
