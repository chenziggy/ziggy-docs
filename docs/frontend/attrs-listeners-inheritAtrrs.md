# Vue attrs listeners 透传


## MyButton.vue

```vue
<template>
    <el-button
        :size="size"
        :type="type"
        :disabled="disabled"
        @click="onClick"
    >
        <slot />
    </el-button>
</template>

<script>
export default {
    name: "MyButton",
    props: {
        size: {
            type: String,
            default: "medium",
        },
        type: {
            type: String,
            default: "primary",
        },
        disabled: Boolean,
    },
    methods: {
        onClick() {
            this.$emit("click");
        },
    },
};
</script>
```

## UseMyButton.vue

```vue
<template>
    <my-button
        type="success"
        disabled
        round
        native-type="submit"
    >测试</my-button>
</template>
```

如何理解`inheritAttrs`（默认值为`true`）这个选项呢？我们知道，一个组件如果要接受父组件传来的属性，是需要先在`props`里面预定义好的。比如前面的例子，我在`MyButton`预定义了3个属性，分别是`size`,`type`,`disabled`，意思是`MyButton`这里只接受3个`prop`。

我们应该是希望`round`和`native-type="submit"`能够传到`el-button`，产生应有的效果。然而，`round`和`native-type="submit"`仅仅是挂在了根元素的`attribute`上，并没有真正起到应有的作用！

也就是说，`inheritAttrs`的作用是：使那些没有在`props`中定义的属性，直接以`attribute`的形式作用在组件的根元素上！

首先，不能让那些未被props标识的属性直接落到根元素上，所以需要设置`inheritAttrs`为`false`。

然后，要获取到那些未被props标识的属性，并直接绑定到`el-button`。恰好，Vue提供了$attrs[2]用于获取这些属性，而`v-bind`本身就能绑定一个对象，这是容易被我们忽略的！

处理完属性透传，接下来我们还要处理事件，类似于`$attrs`，`$listeners`也能把父组件中对子组件的事件监听全部拿到，这样我们就能用一个`v-on`把这些来自于父组件的事件监听传递到下一级组件。

```vue
<template>
    <el-button
        v-bind="customizedAttrs"
        v-on="$listeners"
    >
        <slot />
    </el-button>
</template>

<script>
export default {
    name: "MyButton",inheritAttrs:false,
    props: {
        size: {
            type: String,
            default: "medium",
        },
    },
    computed: {
        customizedAttrs() {
            return {
                size: "medium",
                // 支持传过来的size覆盖默认的size
                ...this.$attrs,
            };
        },
    },
};
</script>
```

[Vue 这个透传技巧，治好了我的重度代码洁癖（收藏！）](https://mp.weixin.qq.com/s/F7PkcVhN15JB6AaCap7QgQ)