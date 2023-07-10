# LRU
LRU（Least Recently Used）是一种常见的缓存淘汰策略，用于在有限的缓存空间中选择最近最少使用的数据进行淘汰，为新的数据腾出空间

## 基本思想
当缓存空间已满时，优先淘汰最近最少使用的数据，以便为新的数据提供空间

它基于以下原则：

* 当某个数据被访问时，将其移动到最近使用的位置
* 当需要淘汰数据时，选择最久未使用的数据进行淘汰
* LRU 算法通常使用一个数据结构来维护缓存中的数据顺序，以便快速判断最近使用的数据和最久未使用的数据

:::tip
常见的数据结构包括链表和哈希表的组合：
* 链表用于维护数据的访问顺序，每次访问数据时，将其移动到链表的头部或尾部，以表示最近使用或最久未使用的数据
* 哈希表用于实现快速的数据查找和插入操作，键为数据的标识符，值为对应的链表节点
:::

### 链表和哈希表关系
![lru](/img/lru.png)

## 缓存读写

* 缓存的读取：在哈希表中查找数据，如果存在则将对应节点移动到链表头部，并返回数据
* 缓存的写入：在哈希表中查找数据，如果存在则将对应节点移动到链表头部；如果不存在，则在链表头部插入新节点，并在哈希表中添加对应的键值对。如果缓存已满，还需要删除链表尾部的节点并从哈希表中移除对应的键值对


## 实现

### map
* map 遍历顺序为成员插入顺序，满足 lru 思想
* 查询、插入时间复杂度 O(1)

```js
/*
 * [146] LRU 缓存
 */

const LRUCache = function (capacity) {
  this.cache = new Map()
  this.capacity = capacity
}

LRUCache.prototype.get = function (key) {
  if (!this.cache.has(key))
    return -1
  const value = this.cache.get(key)
  this.cache.delete(key)
  this.cache.set(key, value)
  return this.cache.get(key)
}

LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key))
    this.cache.delete(key)

  this.cache.set(key, value)
  if (this.cache.size > this.capacity)
    this.cache.delete(this.cache.keys().next().value) // 返回第一个key， 先进先出

}
```
### 