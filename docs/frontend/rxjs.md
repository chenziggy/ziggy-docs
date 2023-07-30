# rxjs

RxJS 是一个库，它通过使用 observable 序列来编写异步和基于事件的程序

可以把 RxJS 当做是用来处理事件的 Lodash 

* Observable (可观察对象): 表示一个概念，这个概念是一个可调用的未来值或事件的集合
* Observer (观察者): 一个回调函数的集合，它知道如何去监听由 Observable 提供的值
* Subscription (订阅): 表示 Observable 的执行，主要用于取消 Observable 的执行
* Operators (操作符): 采用函数式编程风格的纯函数 (pure function)，使用像 map、filter、concat、flatMap 等这样的操作符来处理集合
* Subject (主体): 相当于 EventEmitter，并且是将值或事件多路推送给多个 Observer 的唯一方式
* Schedulers (调度器): 用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 setTimeout 或 requestAnimationFrame 或其他

```ts
import { fromEvent, useObservable, } from '@vueuse/rxjs'

useObservable(
  fromEvent(button.value, 'click').pipe(map((a) => { console.log(a); return a }))
)
```
Observable 表示一个数据流，可以用来处理异步操作和事件序列

```ts
import { onMounted, ref } from 'vue'
import { from, fromEvent, toObserver, useSubscription } from '@vueuse/rxjs'
import { map, takeUntil, withLatestFrom } from 'rxjs/operators'
import { interval } from 'rxjs'

const count = ref(0)
const button = ref<HTMLButtonElement>()

onMounted(() => {
  if (button.value) {
    useSubscription(
      interval(1000)
        .pipe(
          takeUntil(fromEvent(button.value, 'click')),
          withLatestFrom(from(count, {
            immediate: true,
            deep: false,
          })),
          map(([curr, total]) => curr + total),
        )
        .subscribe(toObserver(count)), // same as ).subscribe(val => (count.value = val))
    )
  }

  useSubscription(
    formEvent(button.value, 'click')
  )
})
```
Observable 表示一个数据流，可以用来处理异步操作和事件序列
useSubscription 