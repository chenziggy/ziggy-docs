# pnpm


## link
* 将当前目录下的依赖链接到 当前目录下`node_modules`
* --global 将依赖链接到全局 `node_modules`

```bash
# <dir> 默认值为当前目录，可不填

# 同一个 workspace
# 将当前目录下的依赖链接到当前目录下的 node_modules 目录
pnpm link <dir>

# 不同 workspace
pnpm link --global <dir>
pnpm link --global <pkg>
```

### demo
本地项目 project，使用本地 unocss

`/unocss` 是 unocss 源码文件夹，因为 `unocss` 是 monorepo，需要进入 `/unocss/packages/unocss`，找到真正的 unocss
:::tip
* `/unocss/package.json` 中 "name": "@unocss/monorepo"
* `/unocss/packages/unocss/package.json` "name": "unocss"  
* 链接当前依赖时 pnpm link 读取当前目录下的 package.json name 
:::

1. 进入 `/unocss/packages/unocss`，将依赖链接到全局 `node_modules`
```bash
pnpm link --global

# output /home/ziggy/.local/share/pnpm/global/5:
# + unocss 0.53.1 <- ../../../../../project/unocss/packages/unocss
```
2. 进入本地项目 `/project` ，将全局 `node_modules` 下的 unocss，链接到当前目录下的 `node_modules`
```bash
pnpm link --global unocss
```


## unlink
断开依赖链接
```bash
# 所有已经链接的依赖项都将被切断链接
pnpm unlink

# 断开依赖名为 package_selector 的链接
pnpm unlink --filter <package_selector>
```

## ls
```bash
# 查看当前目录 `node_modules` 依赖列表
pnpm ls

# 查看全局 `node_modules` 依赖列表
pnpm ls --global
```

## why
查看指定依赖包的依赖关系
```bash
pnpm why <pkg>
# -r 嵌套查询
pnpm why -r <pkg>
```
