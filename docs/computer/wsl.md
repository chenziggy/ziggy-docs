# wsl

## 命令
```bash
pwd  #  Print Working Directory 打印出当前所在的工作目录的绝对路径
source  #  在当前 shell 环境下读取并执行指定的 shell 脚本文件  source ~/.zshrc
alias  # 创建命令别名 alias p="pnpm"
export #  设置环境变量 export PNPM_HOME="/home/ziggy/.local/share/pnpm"
```

## Proxy
使用 windows 的代理端口
```bash
port=10809
export HOSTIP=$(cat /etc/resolv.conf | grep "nameserver" | cut -f 2 -d " ")
export http_proxy="http://$HOSTIP:$port"
export https_proxy="http://$HOSTIP:$port"
export all_proxy="socks5://$HOSTIP:$port"
```

## 端口占用

* 升级了wsl2之后，本地开发经常遇到端口被占用
![permission_denied](/img/port_permission_denied.png)

* 使用windows查找端口命令又发现没有被占用
```cmd
netstat -ano |findstr "端口号"
```

### 问题原因

* Hyper-V 会在`TCP 动态端口范围`中随机挑一些端口号保留（占用）
* Windows 自动更新有时会出错，导致`TCP 动态端口范围`的起始端口被重置为 1024
![tcp_dynamic_port](/img/tcp_dynamic_port.png){width="50%" height="50%"}
```cmd
netsh int ipv4 show dynamicport tcp
# 查看动态端口范围
netsh int ipv4 show excludedportrange protocol=tcp
# 查看当前所有已经被征用了的端口
```
![port_excludedportrange](/img/port_excludedportrange.png){width="30%" height="30%"}

### 解决办法
* 重新设置`TCP 动态端口范围`
* 重启电脑，检查设置是否生效
```cmd
// 设置 TCP 动态端口范围
netsh int ipv4 set dynamic tcp start=49152 num=16384
netsh int ipv6 set dynamic tcp start=49152 num=16384
```

## oh-my-posh
oh-my-posh themes 存放路径
```bash
/home/linuxbrew/.linuxbrew/opt/oh-my-posh/themes
```

## linux 文件系统
/bin：包含二进制可执行文件（命令）   
/boot：包含启动 Linux 操作系统所需的文件，如内核和引导程序  
/dev：包含设备文件，这些文件提供了与硬件设备的接口  
/etc：包含系统配置文件和可执行文件，例如网络设置和启动脚本  
/lib：包含共享库文件，这些文件由许多程序共享  
/media：用于自动挂载可移动媒体设备，例如 USB 磁盘和 CD-ROM  
/mnt：通常用于手动挂载文件系统  
/opt：包含可选的应用程序和其他软件包  
/proc：包含系统和进程信息的虚拟文件系统  
/run：包含在系统引导时创建的运行时文件，例如进程 ID 和锁文件  
/sbin：包含系统管理员使用的系统管理命令  
/srv：包含系统服务的相关文件，例如网站和 FTP 服务器的文件  
/sys：包含用于访问内核的虚拟文件系统  
/sys：虚拟文件系统目录，包含系统硬件信息和设备信息等  
/tmp：临时文件目录，一般用于存放临时文件  
/usr：用户软件资源目录，包含系统中大部分应用程序和文件  
/var：变量文件目录，存放经常变化的文件和目录，如日志文件、邮件等  

## Linuxbrew
Linuxbrew 是一个 Linux 系统上的软件包管理工具，。主要目的是在 Linux 系统上安装和管理开源软件包，它可以在普通用户的主目录下安装软件而不需要 root 权限