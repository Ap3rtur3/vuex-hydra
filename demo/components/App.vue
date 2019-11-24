<template>
    <div id="app">
        <tests></tests>
    </div>
</template>

<script>
    import Tests from '@/Tests.vue';

    export default {
        name: 'app',
        components: {
            Tests,
        },
    };
</script>

<style>
    #app {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: #fcfdfe;
    }
</style>
