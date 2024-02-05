<script lang="ts" setup>
import { useAuthStore } from '~/store/store-auth';

const auth = useAuthStore();
const mode = useColorMode();

const navbars = [
    { label: 'Home', url: '/' },
    { label: 'Login', url: '/login' },
    { label: 'Profile', url: '/profile' }
];

const profileOptions = [
    { label: 'Your Profile', href: '/profile' },
    { label: 'Settings', href: '/settings' },
    { label: 'Sign Out', action: () => auth.logout() }
];

function handleMode() {
    mode.preference = mode.preference === 'light' ? 'dark' : 'light';
}
</script>

<template>
    <header class="sticky top-0 right-0 left-0 z-50">
        <nav
            class="dark:bg-gray-900/70 backdrop-blur-md border-b bg-white/70 dark:border-gray-800"
        >
            <div class="mx-auto max-w-7xl px-2 sm:px-32">
                <div class="relative flex h-16 items-center justify-between">
                    <div
                        class="flex items-center justify-center sm:items-stretch sm:justify-start"
                    >
                        <div class="flex flex-shrink-0 items-center">
                            <img
                                class="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </div>
                    </div>

                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4 justify-center">
                            <div v-for="(item, index) in navbars" :key="index">
                                <NuxtLink
                                    :href="item.url"
                                    class="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                    aria-current="page"
                                    >{{ item.label }}
                                </NuxtLink>
                            </div>
                        </div>
                    </div>

                    <div
                        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                    >
                        <u-button
                            :icon="
                                mode.preference == 'light'
                                    ? 'i-heroicons-sun'
                                    : 'i-heroicons-moon'
                            "
                            variant="link"
                            @click="handleMode"
                        />

                        <!-- Profile dropdown -->
                        <div class="relative ml-3 group">
                            <div>
                                <button
                                    id="user-menu-button"
                                    type="button"
                                    class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    <span class="absolute -inset-1.5"></span>
                                    <span class="sr-only">Open user menu</span>
                                    <img
                                        class="h-8 w-8 rounded-full"
                                        :src="auth.user?.picture ?? ''"
                                        alt="profile"
                                    />
                                </button>
                            </div>

                            <div
                                class="hidden group-hover:block group-hover:absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu-button"
                                tabindex="-1"
                            >
                                <div
                                    v-for="(item, index) in profileOptions"
                                    :key="index"
                                >
                                    <NuxtLink
                                        v-if="!!item.href"
                                        :id="`user-menu-item-${index}`"
                                        :href="item.href"
                                        class="block px-4 py-2 text-sm text-gray-700"
                                        role="menuitem"
                                        :tabindex="-1 * index"
                                        >{{ item.label }}</NuxtLink
                                    >
                                    <button
                                        v-if="item.action && auth.isLoggedIn"
                                        :id="`user-menu-item-${index}`"
                                        class="block px-4 py-2 text-sm text-gray-700"
                                        role="menuitem"
                                        :tabindex="-1 * index"
                                        @click="item.action"
                                    >
                                        {{ item.label }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>
