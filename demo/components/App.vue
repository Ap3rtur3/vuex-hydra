<template>
    <div id="app">
        <test></test>
    </div>
</template>

<script>
    import Test from '@/Test.vue';

    export default {
        name: 'app',
        components: {
            Test,
        },
    };
</script>

<style>
    #app {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: #fcfdfe;
    }
</style>
