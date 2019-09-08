<template>
    <div class="test">
        <div class="group">
            <div class="message">
                <div class="header">Inline</div>
                {{ inlineMessage }}
            </div>

            <div class="message">
                <div class="header">JSON</div>
                {{ jsonMessage }}
            </div>

            <div class="message">
                <div class="header">Window</div>
                {{ windowMessage }}
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'Test',
        computed: {
            ...mapGetters([
                'userInput',
                'inlineMessage',
                'jsonMessage',
                'windowMessage'
            ]),
        }
    };
</script>

<style scoped>
    .test {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 50px;
        min-width: 400px;
    }

    .group {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .message {
    }

    .header {
        font-size: 20px;
    }
</style>
