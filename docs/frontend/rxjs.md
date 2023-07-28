# rxjs


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