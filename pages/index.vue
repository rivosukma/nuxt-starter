<script lang="ts" setup>
import { useAuthStore } from '~/store/store-auth';

const auth = useAuthStore();

function handleContact() {
    // console.log('contact me : ' + auth.user?.phone);
}
</script>

<template>
    <div class="relative flex gap-5">
        <div class="space-y-5">
            <carousel-home class="rounded-md overflow-hidden" />
            <div class="swiper-container">
                <swiper :slides-per-view="3" :space-between="30">
                    <swiper-slide>
                        <u-card class="max-w-lg">
                            <chart-skills />
                        </u-card>
                    </swiper-slide>

                    <swiper-slide>
                        <u-card class="max-w-lg">
                            <chart-skills />
                        </u-card>
                    </swiper-slide>

                    <swiper-slide>
                        <u-card class="max-w-lg">
                            <chart-skills />
                        </u-card>
                    </swiper-slide>

                    <swiper-slide>
                        <u-card class="max-w-lg">
                            <chart-skills />
                        </u-card>
                    </swiper-slide>
                </swiper>
            </div>

            <u-card> <chart-sales /> </u-card>

            <u-card>
                <chart-performance />
            </u-card>
        </div>

        <div class="space-y-5 w-lg flex-1">
            <u-card>
                <div class="space-y-3">
                    <div>
                        <p class="text-sm text-zinc-400">Current User</p>
                        <h5>{{ auth.user?.name }}</h5>
                    </div>
                    <div>
                        <p class="text-sm text-zinc-400">Email</p>
                        <h5>{{ auth.user?.email }}</h5>
                    </div>
                    <u-button block size="lg" @click="handleContact"
                        >Contact Me</u-button
                    >
                </div>
            </u-card>
        </div>
    </div>
</template>
