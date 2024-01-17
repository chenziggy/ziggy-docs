# for await

## iterating asynchronously
```js
const asyncIterator = {
  next: () => {
    if (index >= array.length)
      return Promise.resolve({ done: true })
    return Promise.resolve({ value: array[index++], done: false })
  }
}

const asyncIterable = {
  [Symbol.asyncIterator]: () => asyncIterator
}

async function iterate() {
  for await (const num of asyncIterable) console.log(num)
}
```


## async generators

```ts
async function * asyncIteratorGenerator<T extends Array<any>>(paramsList: T[], asyncFunc: (...params: T) => Promise<any>) {
  let i = 0
  while (true) {
    const res = await asyncFunc(...paramsList[i])
    yield await res
    i++
  }
}
```

```ts
async function delayExecute(delay: number) {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay)
    }, delay)
  })
}

it('through all in order', async () => {
  let i = 0
  const paramsList: [number][] = [[600], [500], [400]]
  for await (const res of asyncIteratorGenerator(paramsList, delayExecute)) {
    expect(res).toBe(paramsList[i][0])
    i++
    if (i >= 3)
      break
  }
})
```

