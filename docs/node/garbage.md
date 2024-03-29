# 垃圾回收机制
GC (Garbage Collection) 垃圾回收

JavaScript中的垃圾回收机制是自动的，它负责在运行时自动检测和释放不再使用的内存空间，以避免内存泄漏和资源浪费

## V8 JavaScript 引擎
Node.js 使用 Chrome V8 JavaScript 引擎作为其底层执行引擎，负责分配和管理 JavaScript 代码的内存

## V8垃圾回收机制
回收不在引用的对象，当一个对象无法从根节点访问这个对象就会做为垃圾回收的候选对象，根对象可以为全局对象、局部变量，无法从根节点访问

### 可达性
可达性 `reachability` 是垃圾回收器的一个概念，用于描述对象是否仍然可以通过某个路径访问到，不存在名为"可达性属性"的具体属性或键

:::tip
* V8 内存限制 64 位的机器大约 1.4GB，32 位机器大约为 0.7GB
* 调整老生代、新生代空间内存空间大小  
`--max-new-space-size=2048`  
`--max-old-space-size=2048`
:::

## 新生代空间与老生代空间
V8 将堆分为两类新生代和老生代
* 新空间中的对象都非常小大约为 1-8MB，这里的垃圾回收也很快
* 新生代空间中垃圾回收过程中幸存下来且满足一定条件的对象会被提升到老生代空间

### 新生代空间
用于存活较短的对象的内存区域

由于新空间中的垃圾回收很频繁，采用 Scavenge 算法

Scavenge 是一种复制算法 新生代空间会被一分为二划分成两个相等大小的 from-space 和 to-space
* 当 from space 被占满，将 from space 中存活对象移动到 to space或者提升到老生代空间中
* 将 from space 中没有存活的对象将被释放 （from space 清空）
* 互换 from space 和 to space

![新生代空间](/img/新生代空间.png)

### 老生代空间
存储长时间存活的对象的内存区域

新生代空间在垃圾回收满足一定条件（是否经历过 Scavenge 回收、to space 的内存占比大于 25%）会被晋升到老生代空间中，对象长期存在新生代空间影响性能

老生代空间中采用了 Mark-Sweep（标记清除） 和 Mark-Compact（标记整理） 算法

#### 标记清除

* 标记阶段（Marking Phase）：垃圾回收器会从根对象开始，遍历所有可访问的对象（可达性 `reachability`），并标记为"存活"状态。根对象可以是全局对象（如window对象）或正在执行的函数的局部变量等  

* 清除阶段（Sweeping Phase）：垃圾回收器会扫描内存中的所有对象，将没有标记为"存活"的对象认定为垃圾，然后释放它们占用的内存空间

垃圾回收触发时机：JavaScript中的垃圾回收机制是由浏览器或JavaScript引擎自动管理的，具体的触发时机是由实现决定的，一般情况下，当内存占用达到一定阈值或当空闲时间较长时，垃圾回收机制会自动启动

![标记清除](/img/标记清除.png)

#### 标记整理
标记整理算法解决 Mark-Sweep 算法的内存碎片问题

将活着的对象往一端移动，这时内存空间是紧凑的，移动完成之后，直接清理边界之外的内存
![标记整理](/img/标记整理.png)


### 循环引用
对象之间相互引用，形成了一个闭环，这种情况下，每个对象都持有对方的引用，导致它们无法被垃圾回收机制正常释放
```js
const obj1 = {}
const obj2 = {}

obj1.ref = obj2
obj2.ref = obj1
```

### 解决内存泄漏具体措施
* 避免滥用全局变量
* 及时释放不在使用的对象
* 手动解除事件、定时器
* 减少闭包的使用
* 避免循环引用
* 使用 weakMap weakSet