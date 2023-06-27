# es5.d.ts

## Partial
将对象类型 T 的所有属性都设置为可选属性
```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
}
```

## Required
将对象类型 T 的所有属性都设置为必选属性
```ts
/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
}
```

## Readonly
将对象类型 T 的所有属性都设置为只读
```ts
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
}
```
## Pick
从对象类型 T 中选择指定的属性 K 构造新的类型
```ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
}
```

## Record
该类型包含由指定键类型 K 映射到指定值类型 T 的一组属性
```ts
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
}
```
## Exclude
从类型 T 中排除可以赋值给类型 U 的子类型
```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T

type NumberOrString = number | string;
type ExcludeNumber = Exclude<NumberOrString, number>;

const value: ExcludeNumber = 'Hello';
```



## Extract
从类型 T 中提取可以赋值给类型 U 的子类型
```ts
/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never
```

## Omit
从类型 T 中删除指定的属性 K
```ts
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```
##

## never
never 表示那些永远不会发生的类型。它通常用于表示不可能到达的代码路径或抛出异常的函数
* 当一个函数抛出异常或者总是返回错误时，它的返回类型可以被推断为 never
* `never 是所有类型的子类型`，这意味着可以将 never 类型赋值给其他类型，但不能将其他类型赋值给 never
* never 类型的变量无法具体化为其他类型，因为它表示不可能的情况

```ts
function throwError(): never {
  throw new Error('An error occurred.');
}

let errorValue: never;
errorValue = throwError(); // Valid
errorValue = 'Hello'; // Error
```

## unknown 
表示未知类型，它用于表示一个值的类型是不确定的情况，或者在编写通用代码时需要处理多种类型的值
* unknown 类型的变量只能赋值给 any 类型或 unknown 类型本身
* 在使用 unknown 类型的变量之前，需要进行类型检查或类型断言来确定其具体类型，才能进行相应的操作
* `所有类型都是 unknown 的子类型`，所有类型都可以赋值给 unknown 类型

```ts
let unknownValue: unknown;
let stringValue: string;

stringValue = unknownValue; // Error: Type 'unknown' is not assignable to type 'string'.
unknownValue = stringValue; // Valid
```

## any
any 表示任意类型。它可以表示任何类型的值，就像在普通 JavaScript 中一样
* `any 类型的变量可以赋值给任何类型的变量，也可以接收任何类型的赋值`
* any 类型的变量可以直接进行任何操作，如函数调用、属性访问等，无需进行类型检查
* any 类型是 TypeScript 中最不安全的类型，因为它取消了类型检查的大部分好处，可能导致运行时的错误