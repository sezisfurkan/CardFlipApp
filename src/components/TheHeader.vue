<template>
    <Menubar :model="items">
        <template #end>
            <h1 class="text-green-600 text-2xl font-normal m-0 p-0">Vue Js Vocabulary Flip App</h1>
        </template>
    </Menubar>
</template>

<script>
export default {
    data() {
        return {
            items: [
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
                }
            ]
        };
    }
};
</script>

<style scoped></style>
