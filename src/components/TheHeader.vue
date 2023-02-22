<template>
    <Menubar :model="menuItems">
        <template #end>
            <h1 class="text-green-600 text-2xl font-normal m-0 p-0">Vue Js Vocabulary Flip App</h1>
        </template>
    </Menubar>
</template>

<script>
import { useAuthStore } from '../store/auth';

export default {
    data() {
        return {
            authStore: useAuthStore()
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
                    label: this.authStore.user ? this.authStore.user : 'Login',
                    icon: 'pi pi-user',
                    to: '/auth'
                }
            ];

            return items;
        }
    }
};
</script>

<style scoped></style>
