<template>
    <div :class="testClasses(data)">
        <div class="header">
            <slot></slot>
        </div>
        <div class="data">
            {{ data | test }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Test',
        props: {
            data: null,
        },
        methods: {
            testClasses(value) {
                return {
                    'test': true,
                    'test--success': !!value
                };
            }
        },
        filters: {
            test(value) {
                return value || '-- No data --';
            }
        }
    };
</script>

<style scoped>
    .test {
        margin: 10px;
        border: 1px solid #246A73;
        border-radius: 3px;
        background-color: #f5f9f7;
        min-width: 300px;
    }

    .header {
        padding: 10px;
        font-size: 20px;
        border-bottom: 1px solid #246A73;
        color: #fff;
        background-color: #368F8B;
    }

    .data {
        padding: 10px;
        color: #0C0C0C;
    }

    .test--success .header {
        background-color: #3cc18a;
    }
</style>
