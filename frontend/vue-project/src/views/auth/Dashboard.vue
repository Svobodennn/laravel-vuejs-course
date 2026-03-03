<script setup lang="ts">
import axiosInstance from '@/lib/axios'
import { onMounted, ref } from 'vue';

const user = ref({
    name: '',
    email: '',
});

const getUser = async () => {
    try {
        const response = await axiosInstance.get('/user')
        user.value = response.data
    } catch (error) {
        console.error(error)
    }
}

const logout = async () => {
    try {
        await axiosInstance.post('/logout')
        console.log('User logged out')
    } catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    getUser();
});
</script>
<template>
    <div>
    <div class="flex items-center justify-between">
            <h1 class="text-3xl">Dashboard</h1>
            <button @click="logout" class="px-4 py-2 bg-red-500 text-white rounded-md">Logout</button>
        </div>
        <div>
            <p class="text-lg">Welcome {{ user?.name }}</p>
            <p class="text-lg">{{ user?.email }}</p>
        </div>
    </div>
</template>