<script setup lang="ts">
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore()

</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h1 class="text-center text-3xl font-extrabold text-gray-900">Login</h1>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <FormKit type="form" submit-label="Login" @submit="authStore.login">
                    <FormKit type="email" label="Email" name="email" />
                    <FormKit type="password" label="Password" name="password" />
                </FormKit>
            </div>
        </div>
    </div>
</template>