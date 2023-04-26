# wsl

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