---
title: css的三角形运用
tags: css 三角形
---

利用css完成一些三角形的页面元素的制作。

<!--more-->

# css如何实现三角形

通过边框，也就是border属性。

### 长方形边框

HTML的块级元素都是长方形的，比如我们设定了以下样式：

```bash
.simple-rectangle {
    margin: 50px auto;
    width: 200px;
    height: 200px;
    border: 40px solid salmon;
}
<div class="simple-rectangle"></div>
```

这只是一个简单的长方形，这个长方形在画面中是这样显示的：

![](/assets/img/blog/css/simple-retangle.jpg)

给这个长方形来个彩色边框:

```bash
.simple-rectangle{
	width: 120px;
	height: 120px;
	margin: 50px auto;
	border-top: 40px solid coral;
	border-right: 40px solid lightblue;
	border-bottom: 40px solid lightgreen;
	border-left: 40px solid mediumpurple;
}		
```

结果如下：

![](/assets/img/blog/css/simple-retangle-color.jpg)

可以看到，每个边框都变成一个梯形了。

注意长方形的4个角，以左上角为例，它到底是属于左边框还是上边框呢？
左上角，既属于左边框，又属于上边框，角落的归属成了一个问题，浏览器为了不让边框打架，就让二位各分一半吧。

于是乎左上角就被一分为二，变成了两个三角形，三角形靠近哪个边框，就显示那个边框的颜色。

### 三角形的实现

把上面这个彩色边框的矩形内容拿掉：

```bash
.empty-rectangle{
	width: 0;
	margin: 50px auto;
	border-top: 40px solid coral;
	border-right: 40px solid lightblue;
	border-bottom: 40px solid lightgreen;
	border-left: 40px solid mediumpurple;
}	
```

现在上下左右4个边框都是三角形了：

![](/assets/img/blog/css/empty-retangle.jpg)

假设我们不要4个三角形，也不要让它们凑一块，我们就只要1个三角形，该如何做呢？

将其他3个边框的颜色设为透明色：

```bash
.triangle-top,.triangle-right,.triangle-bottom,.triangle-left{
	width: 0;
	margin: 50px auto;
	border: 40px solid transparent;
}
.triangle-top{
	border-top-color: coral;
}
.triangle-right{
	border-right-color: lightblue;
}
.triangle-bottom{
	border-bottom-color: lightgreen;
}
.triangle-left{
	border-left-color: mediumpurple;
}
```

![](/assets/img/blog/css/single-triangle.jpg)

# 三角形应用

应用上面的原理实现如下四个图标：

![](/assets/img/blog/css/tubiao.jpg)

### 旗帜

![](/assets/img/blog/css/flag.jpg)

旗帜图案是下半部分被啃掉了一口的长方形，这一口是个三角形。

实现方法，是将border-bottom的颜色设置为透明（transparent）的。

```bash
.flag{
	margin: 50px auto;
	width: 0;
	border: 20px solid #FF6600;
	border-top-width: 40px;
	border-bottom: 10px solid transparent;
}
<div class="flag"></div>
```

### 向右的双实心箭头

![](/assets/img/blog/css/arrow.jpg)

双实心箭头则是由两个三角形组成的。

我们可以只提供一个元素实现第1个三角形，然后借助CSS3的伪类实现第2个三角形。

第1个三角形使用了相对定位，第2个三角形使用了绝对定位，使得第2个三角形能够紧挨着第1个三角形。

```bash
.double-arrow{
	position: relative;
	margin: 50px auto;
	width: 0;
	border: 20px solid transparent;
	border-left: 20px solid #A30BE8;
}
.double-arrow::after{
	content: "";
	position: absolute;
	left: 100%;
	top: -20px;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-left: 20px solid #A30BE8;
}
<div class="double-arrow"></div>
```

### 气泡

![](/assets/img/blog/css/bubble.jpg)

气泡是我们常见的一种图案，它是由一个三角形和一个长方形组成的。

由于三角形是放在长方形前面的，所以我们使用:before伪类，并设置绝对定位。

```bash
.bubble{
	position: relative;
	margin: 50px auto;
	font-size: 2rem;
	color: #fff;
	background-color: #5295E3;
	width: 10rem;
	height: 3rem;
	text-align: center;
	line-height: 3rem;
}
.bubble::before{
	content: "";
	position: absolute;
	right: 100%;
	top: 0.5rem;
	width: 0;
	border: 1rem solid transparent;
	border-right: 1rem solid #5295E3;
}
<div class="bubble">
	<span>立即查看</span>
</div>
```

### 丝带

![](/assets/img/blog/css/ribbon.jpg)

丝带的实现则稍微复杂一些，不过我们可以将它拆分成3个部分：

1.一个显示文字的长方形

```bash
<div class="ribbon">
	<span>金卡会员</span>
</div>
.ribbon{
	position: relative;
	margin: 50px auto;
	font-size: 2rem;
	color: #fff;
	background-color: #ff0066;
	width: 10rem;
	height: 3rem;
	text-align: center;
	line-height: 3rem;
}
```

2.左右两侧的耳朵（被啃了一口的长方形）

```bash
.ribbon::before{
	content: "";
	position: absolute;
	z-index: -1;
	right: 95%;
	top: 0.5rem;
	border: 1.5rem solid #ff0066;
	border-left: 1.5rem solid transparent;
	box-shadow: 0 1px 0 rgba(176, 102, 166, 0.8);
}
.ribbon::after{
	content: "";
	position: absolute;
	z-index: -1;
	left: 95%;
	top: 0.5rem;
	border: 1.5rem solid #ff0066;
	border-right: 1.5rem solid transparent;
	box-shadow: 0 1px 0 rgba(176, 102, 166, 0.8);
}
```

3.在下方用于显示阴影的两个小三角形

```bash
.ribbon span::before{
	content: "";
	position: absolute;
	left: 0;
	top: 3rem;
	border: 0.5rem solid transparent;
	border-top: 0.5rem solid #bf004c;
	border-width: 0.5rem 0 0 0.5rem;
}
.ribbon span::after{
	content: "";
	position: absolute;
	right: 0;
	top: 3rem;
	border: 0.5rem solid transparent;
	border-top: 0.5rem solid #bf004c;
	border-width: 0.5rem;
	border-width: 0.5rem 0.5rem 0 0;
}
```