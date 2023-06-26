# node_modules debug

日常开发中，常用 `pnpm dev` 命令启动项目，如何调试这条命令呢？

## pnpm dev
`pnpm dev` = `pnpm run dev` 对应 `package.json`
```json
{
  "scripts": {
    "dev": "vite"
  }
}
```
`vite` 对应 `node_modules\.bin` 中的脚本
![.bin\vite](/img/bin_vite.png)

```shell
# ...
if [ -x "$basedir/node" ]; then
  exec "$basedir/node"  "$basedir/../vite/bin/vite.js" "$@"
else
  exec node  "$basedir/../vite/bin/vite.js" "$@"
fi
```
脚本准备执行环境后，又执行对应依赖中的 js 脚本
![vite.js](/img/vite.js.png)

## debug vite

### 准备本地 vite 环境

1. github 下载 vite 源码，并安装依赖
2. 在项目根目录执行 pnpm dev

### 链接本地 vite
1. 进入 vite 项目 `\packages\vite` 路径，使用 [pnpm link --global](./pnpm#link) 链接到全局 `node_modules` 中，让其他项目通过全局 `node_modules` 链接访问
2. 进入 `projectA` 项目根目录，运行 `pnpm link --global vite` 链接全局 `node_modules` 中的 vite 依赖
3. 完成后，`projectA` 中的 `node_modules/vite` 软连接到 `vite\packages\vite` （可以通过增加文件或代码检测）

### vscode debug 设置

添加 launch 配置
#### 工作区 debug
工作区 `.vsocde/` 中新增  `launch.json` 文件
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug pnpm dev",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["dev"],
      "restart": true,
      "console": "integratedTerminal"
    }
  ]
}
```

#### 全局 debug
用户设置 setting 中添加
```json
"launch": {
    "version": "0.2.0",
    "configurations": [
      {
        "name": "Debug pnpm dev",
        "type": "node",
        "request": "launch",
        "cwd": "${workspaceFolder}",
        "runtimeExecutable": "pnpm",
        "runtimeArgs": [ "dev"],
        "restart": true,
        "console": "integratedTerminal"
      }
    ]
  }
```

#### 开始调试
1. 进入 `projectA/node_modules/vite/bin/vite.js` 增加断点
2. vscode `运行` `启动调试 F5` 找到对应 `Debug pnpm dev` 运行