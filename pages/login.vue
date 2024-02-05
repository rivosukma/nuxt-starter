<script lang="ts" setup>
import { useAuthStore } from '~/store/store-auth';
import { type LoginSchemaType, loginSchema } from '~/utils/schema/auth';

definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/'
    },
    layout: false
});

const auth = useAuthStore();
const form = useForm<LoginSchemaType>({ validationSchema: loginSchema });

const handleSubmit = form.handleSubmit(auth.login);
</script>

<template>
    <div class="min-h-screen flex flex-col items-center py-32">
        <div class="w-[300px]">
            <h3 class="font-semibold mb-4">Magic happen after login</h3>
            <form class="w-full max-w-md" @submit="handleSubmit">
                <div class="space-y-3">
                    <form-input
                        class="mb-5"
                        name="email"
                        label="Email"
                        size="xl"
                        autocomplete="email"
                        block
                    />
                    <form-input
                        class="mb-6"
                        name="password"
                        label="Password"
                        type="password"
                        autocomplete="current-password"
                        size="xl"
                        block
                    />
                </div>

                <u-button
                    type="submit"
                    size="xl"
                    :loading="form.isSubmitting.value"
                >
                    Submit
                </u-button>
            </form>
        </div>
    </div>
</template>

<style scoped></style>
