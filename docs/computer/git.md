# git

## cherry-pick

### 单次转移
对于多分支的代码库，将代码从一个分支转移到另一个分支

```bash
git cherry-pick <commitHash>
# 将指定的提交（commit）应用于其他分支
```

    a - b - c - d   main
         \
           e - f - g feature

将提交f 应用到main上
```bash
git checkout main
git cherry-pick f<commitHash>
```

### 多次转移
```bash
git cherry-pick <HashA>..<HashB>
```
转移A到B的所有提交，A必须早于B

### 代码冲突
如果cherry-pick过程中发生代码冲突，Cherry pick 会停下来，和rebase 冲突时操作云和

* --continue
```bash
# 用户解决代码冲突后
git add .
git cherry-pick --continue
```

* --abort
发生代码冲突后，放弃合并，回到操作前

* --quit
发生代码冲突后，退出cherry-pick，但不回到操作前

### 转移到另一个代码仓库

* 先将该代码仓库(target)加为另一个代码仓库的远程仓库
* 将远程代码(target)抓取到本地
* 检查一下要从远程仓库转移的提交，获取它的哈希值
* 最后使用 git cherry-pick转移提交

```bash
git remote add target git://gitUrl
git fetch target
git log target/master
git cherry-pick <commitHash>
```

## remote

远程仓库名
```bash
git remote 
```

远程仓库名、url 列表
```bash
git remote -v
```

添加远程仓库
```bash
git remote add <remote-name> <remote-url>
```

## base

### 删除提交
删除 b c
``` 
    a - b - c - d  main
```

```bash
# rebase 到 b 的前一个 commit
git rebase -i commitA
```
![git rebase](/img/git_rebase.png)

将需要删除的 commit pick 改为 drop