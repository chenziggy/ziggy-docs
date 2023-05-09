# axios
axios 可以在浏览器、node环境中运行

## 区分环境
axios 在 adapter 区分环境

* 浏览器 -- XMLHttpRequest
* node -- http、https 模块


调用链路

```js
// /lib/axios.js 
createInstance() { const instance = bind(Axios.prototype.request, context) }
// /lib/core/Axios.js  
request() { promise = dispatchRequest.call(this, newConfig) }
// /lib/core/dispatchRequest.js  
dispatchRequest() { const adapter = adapters.getAdapter(config.adapter || defaults.adapter) }

// /lib/adapter/adapter.js
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
}

export default {
  // 默认 config.adapters: ['xhr', 'http'],
  getAdapter: (adapters) => {
    adapters = utils.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      // 这里返回 adapter   看这有点草率
      if((adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter)) {
        break;
      }
    }

    return adapter;
  },
  adapters: knownAdapters
}

//xhr.js 
isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

// http.js
const isHttpAdapterSupported = typeof process !== 'undefined' && utils.kindOf(process) === 'process';
```

## 取消请求

### signal

用法
```js
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// cancel the request
controller.abort()
```

### cancelToken <span class="icon icon-deprecated"></span>
This API is deprecated since v0.22.0 and shouldn't be used in new projects (Oct 1, 2021)



<style>
  @import '/css/common.css';
</style>