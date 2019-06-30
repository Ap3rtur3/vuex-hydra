<template>
    <div class="hello">
        {{ msg }}

        <div class="button-group">
            <div class="button"
                 @click="$events.emit('hydrate:inline')">
                Inline
            </div>
            <div class="button"
                 @click="$events.emit('hydrate:json')">
                JSON
            </div>
            <div class="button"
                 @click="$events.emit('hydrate:window')">
                Window
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'HelloWorld',
        computed: {
            ...mapGetters(['hello']),
            msg() {
                return `Hello ${this.hello}`;
            }
        }
    };
</script>

<style scoped>
    .button-group {
        display: flex;

    }
</style>
