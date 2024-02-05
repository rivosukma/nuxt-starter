<script lang="ts" setup>
const data = ref([
    {
        alt: 'desert',
        imgUrl: 'https://images.unsplash.com/photo-1682686578842-00ba49b0a71a?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        alt: 'ranting',
        imgUrl: 'https://images.unsplash.com/photo-1705750164473-c0efa38c6005?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
]);
</script>

<template>
    <div class="swiper-container">
        <swiper
            :modules="[SwiperPagination, SwiperAutoplay]"
            :slides-per-view="1"
            :space-between="30"
            :loop="true"
            :autoplay="{
                delay: 8000,
                disableOnInteraction: true
            }"
            :creative-effect="{
                prev: {
                    shadow: false,
                    translate: ['-20%', 0, -1]
                },
                next: {
                    translate: ['100%', 0, 0]
                }
            }"
            :pagination="{ clickable: true }"
        >
            <swiper-slide v-for="slide in data" :key="slide.alt">
                <img
                    :src="slide.imgUrl"
                    :alt="slide.alt"
                    class="object-cover object-center h-[300px] w-full"
                />
            </swiper-slide>
        </swiper>
    </div>
</template>
