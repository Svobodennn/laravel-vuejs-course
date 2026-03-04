<script setup lang="ts">
import { reactive } from 'vue'
import axiosInstance from '@/lib/axios'
import { AxiosError } from 'axios';
import type { FormKitNode } from '@formkit/core';
import type { RegisterForm } from '@/types';
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})


const register = async (payload: RegisterForm, node?: FormKitNode) => {
    try {
        await axiosInstance.get('/sanctum/csrf-cookie', {
            baseURL: 'http://localhost:8000',
        });
        console.log('CSRF cookie set');
        const response = await axiosInstance.post('/register', payload)
        console.log(response.data)
        router.push({ name: 'login' })
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
            <h1 class="text-center text-3xl font-extrabold text-gray-900">Register</h1>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <FormKit type="form" submit-label="Register" @submit="register">
                    <FormKit type="text" label="Name" name="name" />
                    <FormKit type="email" label="Email" name="email" />
                    <FormKit type="password" label="Password" name="password" />
                    <FormKit type="password" label="Confirm Password" name="password_confirmation" />
                </FormKit>
            </div>
        </div>
    </div>
</template>