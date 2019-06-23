# vuex-hydra

This Vuex plugin provides a method to initialize your stores with external data.
Store data can be passed directly, read from JSON strings or the window object.

This makes it easy for backends to pass data into vuex stores.

## Setup

Install the plugin with npm or yarn
```bash
npm install --save vuex-hydra
```
```bash
yarn add vuex-hydra
```

Import vuex-hydra into your project
```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import VuexHydra from 'vuex-hydra';

Vue.use(Vuex);
Vue.use(VuexHydra);

const store = Vuex.Store({
    state: {
        hello: '',
    }
});

new Vue({
    store,
    created() {
        const data = { root: { hello: 'world' } }
        this.$hydrate({ data });
    }
});
```

## Usage

#### $hydrate([config])

The configuration object can have following properties

|Config|Type|Default|Description|
|---|---|---|---|
|data|object|{}|Store data|
|id|string|null|Id of DOM Element containing JSON|
|name|string|'Hydra'|Property name in window object|

## Examples

### Hydrate with JSON

```html
<body>
    <div id="vuex-hydra">
        { "root": { "foo": "bar" } }
    </div>
</body>
```

```javascript
new Vue({
    store,
    created() {
        this.$hydrate({ id: 'vuex-hydra' });
    }
});
```

### Hydrate with script

```html
<body>
    <script>
        // Place this before vue intialization
        window.backendData = { root: { foor: 'bar' } }
    </script>
</body>
```

```javascript
new Vue({
    store,
    created() {
        this.$hydrate({ name: 'backendData' });
    }
});
```

## Development

Clone this project and run 
```bash
yarn install
```

Create tests with Jest and run them with
```bash
yarn run test
```

Lint and fix files
```bash
yarn run lint
```

