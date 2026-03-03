<script setup lang="ts">
import { reactive } from 'vue'
import axiosInstance from '@/lib/axios'
import { AxiosError } from 'axios';

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const form = reactive<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const errors = reactive({
    name: [],
    email: [],
    password: [],
    password_confirmation: [],
})

const register = async (payload: RegisterForm) => {
    try {
        await axiosInstance.get('/sanctum/csrf-cookie', {
            baseURL: 'http://localhost:8000',
        });
        console.log('CSRF cookie set');
        const response = await axiosInstance.post('/register', payload)
        console.log(response.data)
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 422) {
            errors.name = error.response.data.errors.name
            errors.email = error.response.data.errors.email
            errors.password = error.response.data.errors.password
            errors.password_confirmation = error.response.data.errors.password_confirmation
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
                <form @submit.prevent="register(form)" class="space-y-6">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                        <div class="mt-1">
                            <input v-model="form.name" type="text" id="name" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm"
                                placeholder="Full Name" />
                            <template v-if="errors.name?.length > 0">
                                <span v-for="error in errors.name" :key="error" class="text-red-500 text-sm">
                                    {{ error }}
                                </span>
                            </template>
                        </div>
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                        <div class="mt-1">
                            <input v-model="form.email" type="email" id="email" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm"
                                placeholder="email@example.com" />
                            <template v-if="errors.email?.length > 0">
                                <span v-for="error in errors.email" :key="error" class="text-red-500 text-sm">
                                    {{ error }}
                                </span>
                            </template>
                        </div>
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <div class="mt-1">
                            <input v-model="form.password" type="password" id="password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm"
                                placeholder="••••••••" />
                            <template v-if="errors.password?.length > 0">
                                <span v-for="error in errors.password" :key="error" class="text-red-500 text-sm">
                                    {{ error }}
                                </span>
                            </template>
                        </div>
                    </div>
                    <div>
                        <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm
                            Password</label>
                        <div class="mt-1">
                            <input v-model="form.password_confirmation" type="password" id="password_confirmation"
                                required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm"
                                placeholder="••••••••" />
                            <template v-if="errors.password_confirmation?.length > 0">
                                <span v-for="error in errors.password_confirmation" :key="error"
                                    class="text-red-500 text-sm">
                                    {{ error }}
                                </span>
                            </template>
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-strong focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>