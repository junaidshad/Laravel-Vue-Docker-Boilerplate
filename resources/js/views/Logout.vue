<template>

</template>

<script>
    import {authMethods} from "../state/helpers";

    export default {
        name: "Logout",
        computed: {

        },
        created() {

        },
        mounted() {
            this.logOut();
        },
        methods: {
            ...authMethods
        }
    }
</script>

<style scoped>

</style>
