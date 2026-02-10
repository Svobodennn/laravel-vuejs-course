<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = 'http://localhost:8000'

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

const register = async (e: Event) => {
    await axios.get('/sanctum/csrf-cookie')
    
    try {
        const response = await axios.post('/api/register', {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        })
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}
</script>   

<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <input type="text" v-model="name" placeholder="Name" />
            <input type="email" v-model="email" placeholder="Email" />
            <input type="password" v-model="password" placeholder="Password" />
            <input type="password" v-model="password_confirmation" placeholder="Confirm Password" />
            <button type="submit">Register</button>
        </form>
    </div>
</template>