# hook


## useEffect
接受两个参数：一个是副作用函数，另一个是一个依赖数组（可选）

* 异步执行，数据获取、订阅或者手动修改过 DOM 副作用
* React 会在每次渲染后调用副作用函数 —— 包括第一次渲染的时候
* 副作用函数还可以通过返回一个函数来指定如何“清除”副作用
* useEffect 调用发生在每轮渲染后，每次运行effect的同时，DOM都已经更新完毕了
* useEffect 与 componentDidMount componentDidUpdate 不同，不会阻塞浏览器更新


### 模拟 componentDidMount componentWillUnmount


```js
useEffect(() => {
// DidMount
  return () => {
  // willUnmount
  }
}, [])
```

### 模拟 componentDidUpdate

```js
useEffect(() => {
// componentUpdate
})
```

## useLayoutEffect
同步执行，等价于生命周期函数

## useMemo
返回一个 memoized 值（有缓存的值）

## useCallback
返回一个 memoized 函数（有缓存的函数）
经常和 useRef 一起使用

## useRef
返回一个可变的 ref对象
	.current 对应dom节点

## useImperativeHandle
暴露组件中的ref，提供给父组件调用  （需要和  forwardRef 一起使用）  