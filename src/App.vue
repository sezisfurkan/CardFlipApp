<template>
    <the-header></the-header>

    <router-view />
</template>

<script>
import TheHeader from './components/TheHeader.vue';

export default {
    components: { TheHeader }
};
</script>

<style scoped>
.router {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
}
</style>
