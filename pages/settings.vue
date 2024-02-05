<script lang="ts" setup>
const { data, page, pageSize, pending } = await usePaginationFetch<any>(
    ['test'],
    (params) =>
        $fetch('https://dummyjson.com/products', {
            params: {
                skip: params.page * params.pageSize,
                limit: params.pageSize
            }
        })
);
</script>

<template>
    <u-table
        :rows="data.products"
        :loading="pending"
        :loading-state="{
            icon: 'i-heroicons-arrow-path-20-solid',
            label: 'Loading...'
        }"
        ><template #images-data="{ row }">
            <img
                :src="row.images[0]"
                :alt="`image-${row.id}`"
                class="rounded-full w-12 h-12"
            />
        </template>
        <template #thumbnail-data="{ row }">
            <img
                :src="row.thumbnail"
                :alt="`image-${row.id}`"
                class="rounded-full w-12 h-12"
            /> </template
    ></u-table>
    <u-pagination
        v-model="page"
        :max="pageSize"
        :total="data?.total ?? 50"
        :disabled="pending"
    />
</template>
