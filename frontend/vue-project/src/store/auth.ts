import { defineStore } from "pinia";
import {ref} from "vue";
import type {User} from "@/types";
import type {FormKitNode} from "@formkit/core";
import axiosInstance from '@/lib/axios'
import {AxiosError} from "axios";
import router from "@/router";
import type {RegisterForm, LoginForm} from "@/types";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isLoggedIn = ref<boolean>(false)

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

    const getUser = async () => {
        try {
            const response = await axiosInstance.get('/user')
            user.value = response.data
            isLoggedIn.value = true
        } catch (error) {
            console.error(error)
        }
    }

    const logout = async () => {
        try {
            await axiosInstance.post('/logout')
            console.log('User logged out')
            user.value = null
            isLoggedIn.value = false
            router.push({ name: 'login' })
        } catch (error) {
            console.error(error)
        }
    }

    return {
        user,
        isLoggedIn,
        register,
        login,
        getUser,
        logout
    }
})