import { defu } from 'defu';
import type { UseFetchOptions } from '#app';

export function useBaseFetch<T>(
    url: string | (() => string),
    options: UseFetchOptions<T> = {}
) {
    const config = useRuntimeConfig();
    const auth = useAuth();

    const defaults: UseFetchOptions<T> = {
        baseURL: `${config.public.baseUrl}`,
        key: url as string,
        headers: auth.token.value
            ? { Authorization: `${auth.token.value}` }
            : {},

        onResponse(_ctx) {},

        onResponseError(_ctx) {}
    };

    // for nice deep defaults, please use unjs/defu
    const params = defu(options, defaults);

    return useFetch(url, params);
}

// find way to call env
export const $api = $fetch.create({
    baseURL: 'http://localhost:3000/api/v1'
    // (process.env.NUXT_PUBLIC_BASE_URL ?? "") +
    // (process.env.NUXT_PUBLIC_PREFIX_BASE_URL ?? ""),
});

type FetchParamsType = {
    page: number;
    pageSize: number;
};

type UseInfiniteFetchParamsType = FetchParamsType;

type UseInfiniteFetchDataSetType<T> = {
    data: T;
}[];

export async function useInfiniteFetch<T = any>(
    fnKey: [string] | [string, UseInfiniteFetchParamsType],
    fnCb: (params: FetchParamsType) => Promise<T | any>
) {
    const [key, params] = fnKey;

    const page = ref(params?.page ?? 1);
    const pageSize = ref(params?.pageSize ?? 5);

    const state = useState(`state-infinite-${key}`, () => {
        return {
            data: [],
            page: params?.page ?? 1,
            pageSize: params?.pageSize ?? 5,
            hasMore: false
        };
    });

    const dataSet = computed<UseInfiniteFetchDataSetType<T>>(
        () => state.value.data
    );

    const hasPrev = computed(() => state.value.page > 1);
    const hasNext = computed(() => !!state.value.hasMore);

    const watched = computed(() => ({
        page: state.value.page,
        pageSize: state.value.pageSize
    }));

    function nextPage() {
        if (hasNext) state.value.page++;
    }

    function handleData(newValue: { data: any[]; hasMore: boolean }) {
        state.value.hasMore = newValue.hasMore;
        state.value.data.push(newValue);
    }

    const asyncResponse = await useAsyncData(
        `async-infinite-${key}`,
        async () => {
            const response = await fnCb(watched.value);

            handleData(response);

            return response;
        },
        {
            watch: [watched]
        }
    );

    return {
        ...asyncResponse,
        page,
        pageSize,
        dataSet,
        hasNext,
        hasPrev,
        nextPage
    };
}

type UsePaginationFetchParamsType = FetchParamsType;

export async function usePaginationFetch<T = any>(
    fnKey: [string] | [string, UsePaginationFetchParamsType],
    fnCb: (params: FetchParamsType) => Promise<T | any>
) {
    const [key, params] = fnKey;

    const page = ref(params?.page ?? 1);
    const pageSize = ref(params?.pageSize ?? 5);

    const watched = computed(() => ({
        page: page.value,
        pageSize: pageSize.value
    }));

    const asyncResponse = await useAsyncData(
        `async-pagination-${key}`,
        () => fnCb(watched.value),
        {
            // TODO: experimental only
            transform: (res) => {
                res.hasMore = true;
                return res;
            },
            watch: [watched]
        }
    );

    function nextPage() {
        if (asyncResponse.data?.hasMore) page.value++;
    }

    function prevPage() {
        if (asyncResponse.data?.hasPrev) page.value--;
    }

    return {
        ...asyncResponse,
        page,
        pageSize,
        hasNext: asyncResponse.data?.hasNext ?? false,
        hasPrev: asyncResponse.data?.hasPrev ?? false,
        nextPage,
        prevPage
    };
}
