# package.json

## name 
* `name` 发布包名 element-plus
* `@name` 开头为命名空间，常用在 monorepo 子项目中  @element-plus/components

## version
版本号
语义化版本号 [Semantic Version](./npm.md#语义化版本-semver)

## main
代码入口（entry point） `"main": "dist/es/index.mjs",`
相对路径，起始位置为 `package.json` 目录
未设置，使用默认值  `index.js`

## browser
模块打算在客户端使用

* 单个字符串时，替换 `main` 作为代码入口
```json
{
  "browser": "./browser/specific/main.js"
}
```
* 替换特定文件
```json
{
  "browser": {
    "module-a": "./shims/module-a.js",
    "./server/only.js": "./shims/client-only.js"
  }
}
```

## bin
定义与包一起安装的可执行文件（命令行工具）的入口，这个字段允许你在全局或本地安装包时创建命令行工具

```json
{
  "name": "vite",
  "version": "4.3.9",
  "bin": {
    "vite": "bin/vite.js"
  }
}
```
当安装 vite 包时，会创建一个名为 `vite` 的命令行工具，它将执行 `bin/vite.js` 中的代码；当你在本地安装包，会在 node_modules/.bin 下生成一个 `vite` 的可执行文件




## dependencies
生产依赖

```json
{
  "dependencies": {
    "foo": "1.0.0 - 2.9999.9999",
    "bar": ">=1.0.2 <2.1.2",
    "baz": ">1.0.2 <=2.3.4",
    "boo": "2.0.1",
    "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
    "asd": "http://asdf.com/asdf.tar.gz",
    "til": "~1.2",
    "elf": "~1.2.3",
    "two": "2.x",
    "thr": "3.3.x",
    "lat": "latest",
    "dyl": "file:../dyl"
  }
}
```

## devDependencies
开发依赖

## peerDependencies
兼容性依赖，当前包所依赖的其他包的版本
```json
{
  "peerDependencies": {
    "vue": ">=3.0.0"
  }
}
```

## peerDependenciesMeta
当用户安装包时，如果 中指定的包尚未安装，peerDependencies npm 将发出警告。该 peerDependenciesMeta 字段用于为 npm 提供有关如何使用对等依赖项的更多信息
```json
{
  "peerDependencies": {
    "vue": ">=3.0.0"
  },
  "peerDependenciesMeta": {
    "vue": {
      "optional": false
    }
  }
}
```
`"optional": false` 依赖标记为必选

## engines
指定 node 版本
```json
{
  "engines": {
    "node": ">=0.10.3 <15"
  }
}
```