# npm

## .npmrc
npm run configuration 即npm运行时配置文件
* 每个项目的配置文件（/path/to/my/project/.npmrc）
* 每个用户的配置文件 (~/.npmrc)
* 全局配置文件 ($PREFIX/etc/npmrc)
* npm 内置配置文件 (/path/to/npm/npmrc)

## 发展历史

### npm v1 v2
嵌套的依赖结构，每个依赖包都会在其父级依赖包的目录下进行安装，形成一个嵌套的目录结构，每个依赖都有自己的node_modules存放其依赖包
#### 缺点
* node_modules 体积过大（大量重复的包被安装）
* node_modules 嵌套层级过深，路径过长
* 依赖不能共享

### npm v3 yarn
扁平化依赖管理，依赖包安装到项目的顶层 node_modules 目录下
#### 缺点
* 依赖结构不确定
* 扁平化算法复杂度高、耗时长
* 项目中可以非法访问有没申明的依赖包
* 同一个包存在不同版本依赖时，不能明确版本关系

### npm v5
package-lock.json 文件，记录依赖版本和树状结构，保证不同环境安装相同依赖

### pnpm
节省磁盘空间并提升安装速度，创建非扁平化的 node_modules  
项目node_modules .pnpm 软链接  
全局 .pnpm-store 硬链接

![pnpm](/img/pnpm.jpg)
### 优点
* 不同项目依赖同一个包，pnpm安装的包会存储在寻址的磁盘中（依赖store），节约磁盘空间
* 算法比`扁平化算法`简单耗时短
* 安全 不可访问未申明的依赖
## npmmirror 换源
由于墙的原因，下载npm依赖会出现网速慢，超时等原因  
npm切换淘宝源，在用户目录下新建.npmrc文件，配置registry
```
registry=https://registry.npmmirror.com/
```

## 更新淘宝源
unocss 更新了`vscode-css-languageservice`: 6.2.5，更新依赖时淘宝源下载失败，404  
查看了淘宝源`vscode-css-languageservice` 最新版本是 6.2.4  

### 解决办法
* 进入 https://registry.npmmirror.com/
* Search packages input 框搜索 包名vscode-css-languageservice，点击 `SYNC`
![vscode-css-languageservice](/img/vscode-css-languageservice.png)
* 等待同步完成
![vscode-css-languageservice_log](/img/vscode-css-languageservice_log.png)

## node_modules 文件夹命名

### vite
vite: 这是 Vite 的核心模块，它包含了 Vite 的运行时代码和相关功能。这个模块通常被用于启动开发服务器、构建生产代码等任务

### @vite
@vite: 这是一个命名空间，通常用于存放与 Vite 相关的模块。当你使用 Vite 进行项目开发时，一些与 Vite 相关的模块可能会被安装到 node_modules 目录中的 @vite 文件夹下

`@vitejs/plugin-vue`

### .vite
.vite: 这是 Vite 项目的默认输出目录，用于存放构建生成的文件。当你在项目中使用 Vite 构建生产代码时，Vite 会将构建生成的文件输出到 .vite 目录中。这些文件可以是打包后的 JavaScript 文件、CSS 文件、HTML 文件等，具体内容根据项目的配置和构建规则而定


## 语义化版本 Semver

 2.0.0 MAJOR.MINOR.PATCH
 * MAJOR 主版本号，非兼容性升级
 * MINOR 次版本号，功能升级
 * PATCH 补丁版本号，bug 修复

`^` 只会执行不更改最左边非零数字的更新

* ^0.2.3 相当于 >=0.2.3 <0.3.0
* ^0.0.3相当于>=0.0.3 <0.0.4
* ^1.2.3-beta.2 相当于 >=1.2.3-beta.2 <2.0.0，这其中 1.2.3-beta.4是可以的，但 1.2.4-beta.2就不行了

`~` 如果指定了次版本号，则会只进行修订版本号的更新，如果没有指定，则会进行此版本号的更新，所以：

* ~1.2.3 相当于 >=1.2.3 <1.3.0
* ~1.2相当于 >=1.2.0 <1.3.0 (相当于 1.2.x)
* ~1 相当于 >=1.0.0 <2.0.0 (相当于 1.x)
* ~1.2.3-beta.2 相当于 >=1.2.3-beta.2 <1.3.0，这其中 1.2.3-beta.4是可以的，但 1.2.4-beta.2就不行了