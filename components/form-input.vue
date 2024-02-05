<script lang="ts" setup>
import type { FormInputPropsType } from '~/types/form';

const { name, label, required = false } = defineProps<FormInputPropsType>();
const { value, errorMessage } = useField<string>(name);
</script>

<template>
    <UFormGroup :label="label" :required="required" :error="errorMessage">
        <UInput v-model="value" v-bind="$attrs" />
    </UFormGroup>
</template>
