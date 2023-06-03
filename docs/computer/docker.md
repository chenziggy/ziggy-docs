# docker

## docker ps
显示运行中的容器

![docker ps](/img/docker_ps.png)

`docker ps -a` 显示全部容器

## docker run
启动容器
```
 docker run -d -p 8090:80 --name subapp -v "$(pwd)/dist:/usr/share/nginx/html" \
 -v "$(pwd)/nginx.conf:/etc/nginx/nginx.conf" nginx
```
* -p 端口映射 host:container  <主机端口>:<容器端口>
* --name 容器名称  subapp
* -v 挂载数据卷（Volume）  <主机目录或文件>:<容器目录或文件>
* $(pwd) 当前工作目录的路径
* -d 容器后台运行
* --force-recreate 如有存在重名容器，会强制替换

## docker stop
`docker stop subapp`
停止名为 subapp 的容器

## docker rm 
`docker rm subapp`
删除名为 subapp 的容器

## docker-compose
使用 `docker-compose` 替换 `docker run` 
```
# docker-compose.yml
version: '3'
services:
  subapp:
    container_name: subapp
    image: nginx
    ports:
      - 8090:80
    volumes:
      - ./dist:/usr/share/nginx/html
      - ./nginx.conf:/etc/nginx/nginx.conf
```