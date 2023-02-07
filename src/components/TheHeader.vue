<template>
    <div class="the-header">
        <h1>Vue Js Vocabulary Flip App</h1>
        <div class="router">
            <router-link class="mr-2" to="/">
                <Button>Home</Button>
            </router-link>

            <router-link to="/game">
                <Button>Game</Button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.the-header {
    background-color: rgb(57, 142, 233);
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;
}
.router {
    position: fixed;
    right: 15px;
    text-decoration: none;
}
</style>
