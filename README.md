# Vuex Hydra

> A Vuex plugin to hydrate your stores with external data.

It can be used for decoupled frontends to instantly access backend data without further API requests.
Store data can be passed directly, read from JSON strings or the window object.

Check the examples below for more information.

## Setup

Install the plugin with `npm` or `yarn`
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
Vue.use(VuexHydra); // Use after Vuex

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

#### Data structure

Vuex-hydra can hydrate the root state and namespaced modules.
The first level properties of your data object should contain the names of your store modules.
Root state data is identified by `root`, namespaced modules should have their respective names.

**Example:** Assign data to root state and the state of a namespaced module called `user`.

```javascript
import Vuex from 'vuex';

export default new Vuex.Store({
    state: {
        foo: '',
    },
    modules: {
        user: {
            namespaced: true,
            state: {
                id: null,
                name: '',
            },
        }
    },
});
```

This data structure defines store names and their states
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

#### $hydrate([config])

The configuration object can have following properties

|Config|Type|Default|Description|
|---|---|---|---|
|data|object|{}|Store data|
|id|string|null|Id of DOM Element containing JSON|
|name|string|null|Property name in window object|
|silent|boolean|false|Prevents console messages like logs or errors|

## Examples

There are multiple ways to hydrate your store.
If the data is provided by a backend, the best way is to
hydrate your stores with JSON in HTML.

#### Hydrate with JSON in HTML

Serialize your data to JSON, place it in a DOM Element and hydrate via id

```html
<body>
    <div id="vuex-hydra">
        { "root": { "foo": "bar" } }
    </div>
</body>
```

```javascript
this.$hydrate({ id: 'vuex-hydra' });
```

#### Hydrate with window object

Extend the window object with your data before application initialization

```html
<body>
    <script>
        window.backendData = { root: { foo: 'bar' } }
    </script>
</body>
```

```javascript
this.$hydrate({ name: 'backendData' });
```

#### Hydrate namespaced and nested modules

Use the name your namespaced modules are registered with instead of `root`.
Separate nested modules names with `/`.

```json
{
    "namespacedModuleName": { "foo": "bar" },
    "nested/moduleName": { "bar": "baz" },
    "really/nested/moduleName": { "baz": "qux" }
}
```

```javascript
this.$hydrate({ /* config */ });
```

## Frameworks

_This section is in progress_

#### Laravel

Collect your data in the controller and pass it to a view
```php
public function index()
{
    $data = [
        'root' => [
            'foo' => Bar::first(),
        ],
    ];
    return view('index', [
        'data' => $data,
    ]);
}
```

Insert hidden JSON without further encoding
```html
<div id="vuex-hydra" style="display: none">
    {!! json_encode($data) !!}
</div>
```

```javascript
this.$hydrate({ name: 'vuex-hydra' })
```

## Development

Clone this project and run 
```bash
npm install
```

Start local dev server from application in `demo/`
```bash
npm run serve
```

Create tests with [Jest](https://jestjs.io/docs/en/getting-started) and run them with
```bash
npm run test
```

Lint and fix files
```bash
npm run lint
```

Create a feature branch und submit it as pull request.

## License

MIT