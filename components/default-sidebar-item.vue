<script setup lang="ts">
defineProps<{ links?: any[] }>();
</script>

<template>
    <div class="flex flex-col">
        <template v-for="(link, i) in links" :key="i">
            <NuxtLink
                v-if="!link.items"
                to="/"
                class="inline-flex items-center gap-4 p-3 px-4 text-left text-[15px]"
            >
                <Icon
                    v-if="link.icon"
                    :name="link.icon"
                    class="h-5 w-5 text-muted-foreground"
                />
                <p class="truncate">
                    {{ link.title }}
                </p>
            </NuxtLink>

            <h-disclosure v-else v-slot="{ open }">
                <h-disclosure-button
                    class="inline-flex items-center justify-between p-3 px-4 text-left text-[15px]"
                >
                    <div class="flex items-center gap-4">
                        <Icon
                            v-if="link.icon"
                            :name="link.icon"
                            class="h-5 w-5 text-muted-foreground"
                        />
                        <p class="truncate">
                            {{ link.title }}
                        </p>
                    </div>
                    <div>
                        <u-icon
                            name="i-heroicons-chevron-right"
                            :class="[open && 'rotate-90']"
                            class="h-4 w-4 text-muted-foreground transition"
                        />
                    </div>
                </h-disclosure-button>
                <h-transition-root
                    :show="open"
                    enter="transition-all duration-200 ease-in-out"
                    enter-from="opacity-0 transform translate-y-[-10px]"
                    enter-to="opacity-100"
                    leave="transition-all duration-200 ease-in-out"
                    leave-from="opacity-100"
                    leave-to="opacity-0 transform translate-y-[-10px]"
                >
                    <h-disclosure-panel
                        class="mx-6 flex flex-col border-l px-3"
                    >
                        <template v-for="(item, j) in link.items" :key="j">
                            <NuxtLink
                                class="rounded-md px-3 py-1.5 text-sm hover:bg-muted"
                                to="/"
                            >
                                {{ item.title }}
                            </NuxtLink>
                        </template>
                    </h-disclosure-panel>
                </h-transition-root>
            </h-disclosure>
        </template>
    </div>
</template>
