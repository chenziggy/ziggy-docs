# typescript keyof

## 查找类型

```ts
interface Person {
    name: string;
    age: number;
    location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"   索引类型
type P2 = Person["name" | "age"];  // string | number    索引访问类型
```

索引类型查询`keyof T`产生的类型是`T`的属性名称。与之相对应的是*索引访问类型*，也称为*查找类型*

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];  // 推断类型是T[K]
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    obj[key] = value;
}

let x = { foo: 10, bar: "hello!" };
let foo = getProperty(x, "foo"); // number
setProperty(x, "foo", "string"); // 错误！, 类型是number而非string
```

## 映射类型

```ts
interface PartialPerson {
    name?: string;
    age?: number;
    location?: string;
}

type Partial<T> = {
    [P in keyof T]?: T[P];
};

type PartialPerson = Partial<Person>;
```

```ts
// 保持类型相同，但每个属性是只读的。
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

`Partial`和`Readonly它`们现在默认包含在标准库中。

我们还包括两个其他实用程序类型：`Record`和`Pick`。

```ts
// 从T中选取一组属性K
declare function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>;

const nameAndAgeOnly = pick(person, "name", "age");  // { name: string, age: number }

// 对于类型T的每个属性K，将其转换为U
function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U>

const names = { foo: "hello", bar: "world", baz: "bye" };
const lengths = mapObject(names, s => s.length);  // { foo: number, bar: number, baz: number }
```


# Typescript in keyof  extends keyof

[https://github.com/Microsoft/TypeScript/issues/10485](https://github.com/Microsoft/TypeScript/issues/10485)

The `in` operator could trivially be seen as a type guard:

```tsx
interface A {
  x: number;
}
interface B {
  y: string;
}

let q: A | B = ...;
if ('x' in q) {
  // q: A
} else {
  // q: B
}
```

Basically, for a `n in x` where `n` is a string literal or string literal type and `x` is a union type, the "true" arm narrows to types which have an optional or required property `n`, and the "false" arm narrows to types which have an optional or missing property `n`.

`<T, K extends keyof T>`

`K` can therefor only be a public property name of `T`.

`[K in keyof T]`

`in` is used when we're defining an [index signature](https://basarat.gitbook.io/typescript/type-system/index-signatures#declaring-an-index-signature) that we want to type with a union of string, number or symbol literals. In combination with `keyof` we can use it to create a so called *mapped type*, which re-maps all properties of the original type.

```tsx
type Partial<T> = {
    [P in keyof T]?: T[P];
};
// 理解符号[]  index signature  arr[0] obj['name']
```

[In TypeScript, what do "extends keyof" and "in keyof" mean?](https://stackoverflow.com/questions/57337598/in-typescript-what-do-extends-keyof-and-in-keyof-mean)