<script setup lang="ts">
import axiosInstance from '@/lib/axios'

const user = async () => {
    try {
        const response = await axiosInstance.get('/user')
        console.log(response.data)
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

logout();
</script>
<template>
    <h1>Dashboard</h1>
</template>