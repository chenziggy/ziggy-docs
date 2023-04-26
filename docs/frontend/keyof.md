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