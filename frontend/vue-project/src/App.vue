<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header>
      <div class="bg-slate-700">
        <nav class="container mx-auto flex items-center justify-between p-4">
          <div class="flex space-x-2">
              <RouterLink class="text-white" to="/">Home</RouterLink>
              <RouterLink class="text-white" to="/dashboard">Dashboard</RouterLink>
          </div>
          <div class="flex space-x-2">
              <RouterLink class="text-white" to="/login">Login</RouterLink>
              <RouterLink class="text-white" to="/register">Register</RouterLink>
          </div>
        </nav>
      </div>
    </header>
    <main class="max-w-6xl mx-auto min-h-screen bg-slate-100">
      <div class="mb-6">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped></style>
