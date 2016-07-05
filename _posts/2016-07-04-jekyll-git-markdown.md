---
title: 使用jekyll+Github Pages+markdown本地写博客
tags: jekyll git markdown
---

[jekyll][jekyll]是一个简单的免费的Blog生成工具，类似WordPress。但是和WordPress又有很大的不同，原因是jekyll只是一个生成静态网页的工具，不需要数据库支持。最关键的是jekyll可以免费部署在Github上，而且可以绑定自己的域名。
本文介绍利用jekyll+Github Pages的方式部署环境。

<!--more-->

# jekyll的安装

## ruby安装

1.下载对应的[Ruby安装包][Ruby-download]

2.安装

3.输入ruby -v 检测是否安装成功

```bash
$ ruby -v
ruby 2.3.0p0 (2015-12-25 revision 53290) [x64-mingw32]
```
出现版本号说明安装成功。

## DevKit安装
>DevKit 是一个在 Windows 上帮助简化安装及使用 Ruby C/C++ 扩展如 RDiscount 和 RedCloth 的工具箱。 

1.下载与Ruby版本对应的[DevKit安装包][Ruby-download]

2.解压缩

3.切换到DevKit的安装目录

```bash
$ cd 'D:\devkit'
```

4.通过初始化来创建 config.yml 文件

```bash
$ ruby dk.rb init
```

5.将ruby目录的绝对路径写在config.yml中

```bash
# Example:
#
# ---
# - C:/ruby19trunk
# - C:/ruby192dev
#
---
- C:\Ruby23-x64
```

6.安装

```bash
$ ruby dk.rb install
```

## jekyll安装
1.确保 gem 已经正确安装

```bash
$ gem -v
2.5.1
```

2.安装

```bash
$ gem install jekyll
```

3.检测是否安装成功

```bash
$ jekyll -v
jekyll 3.1.6
```

# 使用Jekyll创建博客
```bash
jekyll new blog  #创建你的站点
cd blog      #进入blog目录
jekyll serve     #启动http服务 
```
本地服务开启后，Jekyll服务默认端口是4000，输入：[http://localhost:4000][http://localhost:4000]即可访问

[jekyll]: http://jekyll.bootcss.com/
[Ruby-download]: http://rubyinstaller.org/downloads/
[http://localhost:4000]: http://localhost:4000
