<template>
    <Menubar :model="menuItems">
        <template #end>
            <h1 class="text-green-600 text-2xl font-normal m-0 p-0">Vue Js Vocabulary Flip App</h1>
        </template>
    </Menubar>
</template>

<script>
import { useAuthStore } from '../store/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
    data() {
        return {
            authStore: useAuthStore(),
            isLoggedIn: false
        };
    },
    computed: {
        menuItems() {
            const items = [
                {
                    label: 'Home',
                    icon: 'pi pi-home',
                    to: '/'
                },
                {
                    label: 'Categories',
                    icon: 'pi pi-list',
                    to: '/categories'
                },
                {
                    label: 'Game',
                    icon: 'pi pi-tablet',
                    to: '/game'
                },
                {
                    label: this.authStore.user ? this.authStore.user.email : 'Login',
                    icon: 'pi pi-user',
                    to: '/auth'
                }
            ];
            if (this.isLoggedIn) {
                items.push({
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        this.authStore.signOut();
                        this.$router.push('/');
                    }
                });
            }

            return items;
        }
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
            }
        });
    }
};
</script>

<style scoped></style>
