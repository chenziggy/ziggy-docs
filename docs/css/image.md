# 图片预加载

通过 new Image() 预加载图片，`<img>` 使用已加载图片的缓存

```html
<img v-if="count" src="../public/img/wallhaven-o32mml.jpg">

<script setup lang="ts">
  import {ref} from 'vue'
  const count = ref(0)
  const img = new Image()
  img.src = '../public/img/wallhaven-o32mml.jpg'
  img.onload = () => {
    count.value++
  }
</script>
```

<img v-if="count" src="../public/img/wallhaven-o32mml.jpg">

<script setup lang="ts">
  import {ref} from 'vue'
  const count = ref(0)
  const img = new Image()
  img.src = '../public/img/wallhaven-o32mml.jpg'
  img.onload = () => {
    count.value++
  }
</script>