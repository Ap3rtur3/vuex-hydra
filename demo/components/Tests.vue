<template>
    <div class="wrapper">
        <h2 class="header">Various sources for hydration</h2>

        <div class="tests">
            <Test :data="inlineMessage">
                Inline
            </Test>

            <Test :data="jsonMessage">
                JSON
            </Test>

            <Test :data="windowMessage">
                Window
            </Test>
            
            <Test :data="namespacedMessage">
                Namespaced module
            </Test>

            <Test :data="nestedMessage">
                Nested module
            </Test>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';
    import Test from '@/Test.vue';

    export default {
        name: 'Tests',
        components: {
            Test,
        },
        computed: {
            ...mapState(['wtf']),
            ...mapGetters([
                'userInput',
                'inlineMessage',
                'jsonMessage',
                'windowMessage',
            ]),
            ...mapGetters('namespacedModule', ['namespacedMessage']),
            ...mapGetters('namespacedModule/nestedModule', ['nestedMessage']),
        },
    };
</script>

<style scoped>
    .wrapper {
        margin: 50px;
    }

    .header {
        text-align: center;
    }

    .tests {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>
