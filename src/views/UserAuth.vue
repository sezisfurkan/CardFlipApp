<template>
    <div class="text-center mb-3 mt-6">
        <h2 class="font-bold mt-4 mb-5">Welcome You can create your account if you have account you can sign in</h2>
    </div>

    <div class="text-center">
        <div class="mb-2">
            <label for="email" class="font-bold pr-3"> E-mail:</label>
            <InputText id="email" name="email" v-model="authStore.email" class="ml-2" />
        </div>
        <div class="mb-2">
            <label for="password" class="font-bold">Password:</label>
            <InputText id="password" type="password" v-model="authStore.password" class="ml-2" />
        </div>
    </div>

    <p v-if="authStore.errorMsg !== ''" class="mt-2 text-danger text-center">{{ authStore.errorMsg }}</p>

    <div class="text-center mt-4">
        <Button class="mr-2" @click="signIn">Sign In</Button>
        <Button class="mr-2" @click="registerUser">Register</Button>
        <Button @click="signInWithGoogle">Sign In Google</Button>
    </div>
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
