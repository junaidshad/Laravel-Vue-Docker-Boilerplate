<template>
    <RouterView :key="$route.fullPath"></RouterView>
</template>

<script>
    export default {
        name: "App",
    }
</script>

<style scoped>

</style>
