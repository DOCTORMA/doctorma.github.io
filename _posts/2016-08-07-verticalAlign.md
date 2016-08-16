---
title: vertical-align的理解
tags: vertical-align
---

vertical-align，垂直对齐。

<!--more-->

# 条件

只有一个元素属于inline或是inline-block（table-cell也可以理解为inline-block水平）水平，其身上的vertical-align属性才会起作用。所以，类似下面的代码就不会起作用：

```bash
div{vertical-align:middle;}
```

# 用法

W3C上对vertical-align的定义：vertical-align 属性设置元素的垂直对齐方式。该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐。允许指定负长度值和百分比值。这会使元素降低而不是升高。在表单元格中，这个属性会设置单元格框中的单元格内容的对齐方式。

有两种用法：

第一种用法，后面一句“在表单元格中，这个属性会设置单元格框中的单元格内容的对齐方式。”如果给一个表格的td加一个vertical-align:middle的样式，表格里面的内容会垂直居中，同样的如果给一个vertical-align:bottom就会底部对齐，如果给一个vertical-align:top就会顶部对齐。

第二种用法，前一句“该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐。”打个比喻：假设有两个行内元素a和b，a和b都是img，当a加了一个vertical-align:middle样式之后，b的底部（基线）就会对齐a的中间位置，如下图：

![](http://pic002.cnblogs.com/images/2012/214152/2012032120552273.png)

如果a和b都加了一个vertical-align:middle样式，那么就互相对齐了对方的中间位置，也就是它们在垂直方向上的中线对齐了，如下图：

![](http://pic002.cnblogs.com/images/2012/214152/2012032120584288.png)

# 图片居中

在div里面加一个span空标签，把它的高度设为100%，再给它一个vertical-align:middle样式，同样地给img一个vertical-align:middle样式，那么img就可以在div里面垂直居中了。如图：

![](http://pic002.cnblogs.com/images/2012/214152/2012032121121823.png)

参考文章：

[vertical-align](http://blog.csdn.net/wyzlwyzl/article/details/17734077)

