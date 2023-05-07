# npm

## .npmrc
npm run configuration 即npm运行时配置文件
* 每个项目的配置文件（/path/to/my/project/.npmrc）
* 每个用户的配置文件 (~/.npmrc)
* 全局配置文件 ($PREFIX/etc/npmrc)
* npm 内置配置文件 (/path/to/npm/npmrc)

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
