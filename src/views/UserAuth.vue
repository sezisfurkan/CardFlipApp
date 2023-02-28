<template>
    <div class="mt-3 ml-2">
        <label for="email">E-mail</label>
        <InputText id="email" name="email" v-model="authStore.email" class="ml-2 mb-2" />
    </div>

    <div class="ml-2">
        <label for="password">Password:</label>
        <InputText id="password" type="password" v-model="authStore.password" class="ml-2" />
    </div>

    <p v-if="authStore.errorMsg !== ''">{{ authStore.errorMsg }}</p>
    <Button class="mt-4 ml-2" @click="signIn">Sign In</Button>
    <Button class="mt-4 ml-2" @click="registerUser">Register</Button>
    <Button class="mt-4 ml-2" @click="signInWithGoogle">Sign In Google</Button>
    <p>User ID: {{ userId }}</p>
</template>

<script>
import { useAuthStore } from '../store/auth';

export default {
    data() {
        return {
            authStore: useAuthStore(),
            userId: ''
        };
    },
    methods: {
        async registerUser() {
            await this.authStore.register();
        },
        async signIn() {
            await this.authStore.login();
            this.userId = this.authStore.user.uid;

            this.$router.push('/');
        },
        async signInWithGoogle() {
            await this.authStore.signInWithGoogle();
            this.$router.push('/');
        }
    }
};
</script>

<style></style>
