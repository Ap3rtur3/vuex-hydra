# vuex-hydra

This Vuex plugin provides a method to initialize your store states with external data.
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

Import vuex-hydra into your project, 
which makes the `$hydrate` function available in your components
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
|name|string|null|Property name in window object|
|ignoreUndefined|boolean|true|Only assigns data to state if respective property is already defined|
|silent|boolean|false|Prevents console output like logs or errors|

#### Data structure

Vuex-hydra can hydrate the root state and namespaced modules.
The first level properties of your data object should contain the names of your store modules.
Root store data is identified by `root`, namespaced modules should have their respective names.

**Example:** Assign data to root state and the state of a namespaced module called `user`.

```javascript
import Vuex from 'vuex';

const user = {
    state: {
        id: null,
        name: '',
    },
};

export default new Vuex.Store({
    modules: {
        user,
    },
    state: {
        foo: '',
    },
});
```

```json
{
  "root": {
    "foo": "bar"
  },
  "user": {
    "id": 42,
    "name": "baz"
  }
}
```

## Examples

#### Hydrate with data

```javascript
const storeData = {
    root: { foo: 'bar' }
};

new Vue({
    store,
    created() {
        this.$hydrate({ data: storeData });
    }
});
```

#### Hydrate with JSON in DOM

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

#### Hydrate with window object

```html
<body>
    <script>
        window.backendData = { root: { foo: 'bar' } }
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

Create tests with [Jest](https://jestjs.io/docs/en/getting-started) and run them with
```bash
yarn run test
```

Lint and fix files
```bash
yarn run lint
```

Create a feature branch und submit it as pull request.

**Note:** The local demo server does not work correctly at the moment.
To test features in a real application, 
import the build files locally or via private npm registry.

#### TODO

* More tests
* Local demo

## License

MIT