---
title: git远程操作
tags: git Github
---

git是目前最流行的版本管理系统。

本文将详细介绍5个Git命令。

<!--more-->

![](http://image.beekka.com/blog/2014/bg2014061202.jpg)

# git clone

从远程主机克隆一个版本库到本地

```bash
$ git clone <版本库的网址> <本地目录名>
```
支持多种协议，包括HTTP(s)、SSH、Git、本地文件协议等。

# git remote

用于管理主机名。

**git remote**：列出所有远程主机。

**git remote -v**：可以参看远程主机的网址。

**git remote add**：用于添加远程主机。

**git remote rm**：用于删除远程主机。


# git fetch

将远程主机版本库的更新（commit）取回本地。

```bash
$ git fetch <远程主机名>
```

# git pull

取回远程主机某个分支的更新，再与本地的指定分支合并。

```bash
$ git pull <远程主机名> <远程分支名>:<本地分支名>
```

# git push

用于将本地分支的更新，推送到远程主机。

```bash
$ git push <远程主机名> <本地分支名>:<远程分支名>
```


[ts]: https://en.wikipedia.org/wiki/Web_template_system
[sl]: https://shopify.github.io/liquid/
[liquid-node]: https://github.com/sirlantis/liquid-node
[hsl]: https://github.com/harttle/shopify-liquid
[dt]: https://docs.djangoproject.com/en/1.9/ref/templates/
[cs]: https://en.wikipedia.org/wiki/CodeCharge_Studio
[Thymeleaf]: https://en.wikipedia.org/wiki/Thymeleaf
[hbs]: http://handlebarsjs.com/
[ngt]: https://docs.angularjs.org/guide/templates
[jade]: http://jade-lang.com/
[ejs]: https://github.com/tj/ejs

