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

删除远程分支
```bash
git push origin --delete <remote-branch>
```

## worktree

添加工作区
```bash
git worktree add <path> <branch>

git worktree add ../project_main main
```

删除工作区
```bash
git worktree remove <worktree>

git worktree remove D:/project/github/project_main
```

修剪工作区
```bash
git worktree prune
## 清理已经不存在的工作区，例如被 rm -rf 的工作区
```

整理本地分支
```bash
git fetch origin --prune

# 配置fetch时，自动删除本地已删除的远程分支
git config --global fetch.prune true
```


##  tag

新建 轻量标签 lightweight tag
```bash
git tag v0.1.0

# 推送远程仓库
git push origin v0.1.0
```

新建 附注标签 annotated tag
```bash
git tag -a v0.1.0 -m "message"
```

删除 tag
```bash
git tag --delete v0.1.0
```

## rebase

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

## diff

```bash
git diff 7d08a0fc2b0e67642ee818ec4ce42780d4f0380f
diff --git a/docs/computer/git.md b/docs/computer/git.md       # a版本的(即变动前)和b版本的(即变动后),进行比较
index eda7fb7..d75a794 100644                                  # index区域的eda7fb7对象,与工作目录区域的d75a794对象进行比较。100代表普通文件，644代表文件具有的权限
--- a/docs/computer/git.md                                     # --- 变动前
+++ b/docs/computer/git.md                                     # +++ 变动后
@@ -71,4 +71,20 @@ git remote -v                               # -71,4 变动前第71行开始，连续4行  +71,20 变动后第71行开始，连续20行
 添加远程仓库
 ```bash
 git remote add <remote-name> <remote-url>
-```                                                           # - 删除
\ No newline at end of file
+```^M                                                         # + 新增
+^M
+## base^M
+^M
+### 删除提交^M
+删除 b c^M
+``` ^M
+    a - b - c - d  main^M
+```^M
+^M
+```bash^M
+# rebase 到 b 的前一个 commit^M
+git rebase -i commitA^M
+```^M
+![git rebase](/img/git_rebase.png)^M
+^M
+将需要删除的 commit pick 改为 drop
```
