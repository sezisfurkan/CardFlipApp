<template>
    <div class="mt-3 ml-2">
        <label for="email">E-mail</label>
        <InputText id="email" name="email" v-model="authStore.email" class="ml-2 mb-2" />
    </div>

    <div class="ml-2">
        <label for="password">Password:</label>
        <InputText id="password" type="password" v-model="authStore.password" class="ml-2" />
    </div>
    <!-- <p v-if="!authStore.formIsValid">Please enter a valid password (must be at least 6 characters long)</p> -->
    <!-- <p v-if="authStore.errorMsg !== ''">{{ authStore.errorMsg }}</p> -->
    <Button class="mt-4 ml-2" @click="signIn">Sign In</Button>
    <Button class="mt-4 ml-2" @click="registerUser">Register</Button>
</template>

<script>
import { useAuthStore } from '../store/auth';

export default {
    data() {
        return {
            authStore: useAuthStore()
        };
    },
    methods: {
        registerUser() {
            this.authStore.register();
            this.$router.push('/');
        },
        signIn() {
            this.authStore.login();
            this.$router.push('/');
        }
    }
};
</script>

<style></style>
