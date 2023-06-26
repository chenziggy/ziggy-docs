# 时间

## GMT
GMT（格林尼治标准时间）是一种国际时间标准，它与地球上的任何特定时区无关  
格林尼治位于英国伦敦东南部的格林尼治区，它位于零度经线（经度0度）上，被称为本初子午线
`http协议` 使用的时间格式是 GMT

```js
// 获取GMT
const gmtString = new Date().toGMTString()
const gmtString = new Date().toUTCString()
// Wed, 12 May 2021 10:30:00 GMT
```

## UTC
UTC（世界协调时间）是一种国际标准的时间标准，用于统一全球各地的时间。它基于原子钟的时间计量，不受地理位置的影响，地球自转大约为24小时，自转速度略有变化  

UTC是以格林尼治标准时间为基础，通过在必要时进行微调来保持与地球自转的一致性  

闰秒是为了保持 UTC 与地球自转周期的同步而引入的调整措施，需要插入闰秒时，UTC 时间会在最后一分钟的最后一秒，即 23:59:59 之后，插入一个额外的闰秒，使得时间变为 23:59:60，然后才进入下一天的 00:00:00

## timestamp
timestamp（时间戳）是指一个特定时间点相对于某个参考时间的计量

时间戳通常以秒为单位，表示自某个特定参考时间（如1970年1月1日00:00:00 UTC）至该时间点的秒数

常见时间戳
* Unix 时间戳：Unix 时间戳是指自1970年1月1日00:00:00 UTC至特定时间点的`秒数`
* JavaScript 时间戳：JavaScript 时间戳是指自1970年1月1日00:00:00 UTC至特定时间点的`毫秒数`
```js
Date.now()
```
## 时区
```js
// 获取当前时区偏移（分钟）
const timezoneOffset = new Date().getTimezoneOffset()

console.log(timezoneOffset)
// -480，表示当前时区为 UTC+8（中国标准时间）
```

## 本地时间
本地时间是指某个特定地理位置的当地时间，考虑了时区和夏令时等因素。本地时间可以根据所在的时区和当地的时间规则进行调整
```js
// GMT 转换本地时间
const gmtTime = new Date('Wed, 12 May 2021 10:30:00 GMT')
// Wed May 12 2021 18:30:00 GMT+0800 (中国标准时间)
const localTime = gmtTime.toLocaleString() // 转换为本地时间字符串
console.log(localTime)
// 2021/5/12 18:30:00
```