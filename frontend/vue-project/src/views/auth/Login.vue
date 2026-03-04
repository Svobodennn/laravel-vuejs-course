<script setup lang="ts">
import axiosInstance from '@/lib/axios'
import { AxiosError } from 'axios'
import type { FormKitNode } from '@formkit/core';
import type { LoginForm, User } from '@/types';
import { useRouter } from 'vue-router'

const router = useRouter()

const login = async (payload: LoginForm, node?: FormKitNode) => {
    try {
        await axiosInstance.get('/sanctum/csrf-cookie', {
            baseURL: 'http://localhost:8000',
        });
        console.log('CSRF cookie set');
        const response = await axiosInstance.post('/login', payload)
        console.log(response.data)
        router.push({ name: 'dashboard' })
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 422) {
            node?.setErrors(error.response.data.errors)
        }
        console.error(error)
    }
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h1 class="text-center text-3xl font-extrabold text-gray-900">Login</h1>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <FormKit type="form" submit-label="Login" @submit="login">
                    <FormKit type="email" label="Email" name="email" />
                    <FormKit type="password" label="Password" name="password" />
                </FormKit>
            </div>
        </div>
    </div>
</template>