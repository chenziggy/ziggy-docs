# 居中

## flex

`algin-content: center` 所有行朝向容器的中心填充。每行互相紧挨，相对于容器居中对齐
```html
<div class="flex flex-wrap justify-center items-center content-center bg-black h-[300px] w-2/3 mx-auto">
  <div class="basis-1/2 bg-[#eee] h-1/3 border-red-900 border text-center text-black align-middle">1</div>
  <div class="basis-1/2 bg-[#eee] h-1/3 border-red-900 border text-center text-black align-middle">2</div>
  <div class="basis-1/2 bg-[#eee] h-1/3 border-red-900 border text-center text-black align-middle">3</div>
</div>
```

<div class="flex flex-wrap justify-center items-center content-center bg-black h-[300px] w-2/3 mx-auto">
  <div class="basis-1/2 bg-[#eee] h-1/3 border-red-900 border text-center text-black align-middle">1</div>
  <div class="basis-1/2 bg-[#eee] h-1/3 border-red-900 border text-center text-black align-middle">2</div>
  <div class="basis-1/2 bg-[#eee] h-1/3 border-red-900 border text-center text-black align-middle">3</div>
</div>

## position transform

```html
<div class="relative h-[300px] w-2/3 bg-black mx-auto">
  <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] border border-red-900  h-1/3 w-1/2 bg-white text-black text-center">1</div>
</div>
```
<div class="relative h-[300px] w-2/3 bg-black mx-auto">
  <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] border border-red-900  h-1/3 w-1/2 bg-white text-black text-center">1</div>
</div>

