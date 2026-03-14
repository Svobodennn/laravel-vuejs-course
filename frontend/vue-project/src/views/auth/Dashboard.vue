<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore()

onMounted(() => {
    authStore.getUser();
});
</script>
<template>
    <div>
    <div class="flex items-center justify-between">
            <h1 class="text-3xl">Dashboard</h1>
            <button @click="authStore.logout" class="px-4 py-2 bg-red-500 text-white rounded-md">Logout</button>
        </div>
        <div>
            <p class="text-lg">Welcome {{ authStore.user?.name }}</p>
            <p class="text-lg">{{ authStore.user?.email }}</p>
        </div>
    </div>
</template>