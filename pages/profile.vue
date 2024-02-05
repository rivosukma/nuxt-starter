<script lang="ts" setup>
import { useAuthStore } from '~/store/store-auth';

const auth = useAuthStore();

const { dataSet, pending, hasNext, nextPage } = await useInfiniteFetch(
    ['test'],
    (params) => $fetch('/api/infinite', { params })
);
</script>

<template>
    <div class="space-y-4">
        <u-card>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <u-avatar :src="auth.user?.picture" alt="profile-img" />
                    <div class="space-y-2">
                        <div>
                            <p class="text-sm text-zinc-400">Current User</p>
                            <h5>{{ auth.user?.name }}</h5>
                        </div>
                        <!-- <div>
                    <p class="text-sm text-zinc-400">Email</p>
                    <h5>{{ auth.user?.email }}</h5>
                </div> -->
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <u-button
                        icon="i-heroicons-envelope"
                        variant="link"
                        square
                        size="xs"
                        >{{ auth.user?.email }}
                    </u-button>
                    <u-tooltip
                        v-if="!!auth.user?.phone"
                        :text="auth.user?.phone"
                    >
                        <button>
                            <u-icon
                                class="h-6 w-6"
                                name="i-heroicons-phone"
                            /></button
                    ></u-tooltip>
                    <u-button
                        icon="i-heroicons-ellipsis-vertical"
                        variant="ghost"
                        color="gray"
                        rounded
                        square
                        :ui="{ rounded: 'rounded-full' }"
                    >
                    </u-button>
                </div>
            </div>
        </u-card>

        <div v-for="(items, index) in dataSet" :key="index" class="space-y-4">
            <div v-for="child in items.data" :key="child.id">
                <u-card>
                    {{ child.name }}
                </u-card>
            </div>
        </div>

        <u-button v-if="hasNext" :loading="pending" @click="nextPage"
            >More</u-button
        >
    </div>
</template>
