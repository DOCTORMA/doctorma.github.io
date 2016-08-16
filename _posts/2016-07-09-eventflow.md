---
title: DOM事件流机制
tags: javascript 事件流 DOM
---

DOM2中规定事件流包括三个部分：事件捕获阶段(Capturing)，处于目标阶段(target)，事件冒泡阶段(Bubbling)。

<!--more-->

![Event](http://upload-images.jianshu.io/upload_images/1816760-fb05eb8345bbb440.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 事件捕获

事件捕获，是从document元素开始，自上而下接收事件的过程。

**常见的坑：新插入的子元素没有绑定click事件**

```bash
<ul class="container">
	<li class="item">111</li>
	<li class="item">222</li>
	<li class="item">333</li>
	<li class="item">444</li>
</ul>
```
ul元素初始状态时包含4个li元素，循环为li元素添加click事件。

```bash
for (var i = 0; i < oli.length; i++) {
	oli[i].addEventListener("click",function(){
		alert("ok");
	});
}
```
坑在于，新添加的li元素不会有绑定的click事件。

解决方法：

```bash
//给父元素添加事件监听器
oul.addEventListener("click",function(e){
	//判断被点击的元素是否为目标元素
	var target = e.target;
	if(target.className == "item"){
		alert("ok");
	}		
});
```

上面的方法就是**事件委托**。

# 事件冒泡

事件冒泡，是从底层的目标元素开始，自下而上接收传递事件的过程。

**常见的坑：父元素和子元素同时绑定click事件**

```bash
<ul class="container">
    <li class="item">click</li>
</ul>
//--------
oli.addEventListener("click",function(e){
	alert("li");	
});
oul.addEventListener("click",function(e){
	alert("ul");	
});
```
例如ul是父元素，li是内部的子元素，两个绑定了不同的click事件。

坑在于，点击li时也会触发ul的click事件。

解决方法，阻止事件冒泡：

```bash
oli.addEventListener("click",function(e){
	alert("li");	
	e.stopPropagation();
});
oul.addEventListener("click",function(e){
	alert("ul");	
});
```

# 并非所有的事件都会经过冒泡阶段
所有的事件都要经过捕捉阶段和目标阶段，但是有些事件会跳过冒泡阶段。例如:

blur: 在元素失去焦点时触发，该事件不支持冒泡

focus: 在元素获得焦点时触发，该事件不支持冒泡

mouseenter: 当鼠标移入元素时触发，该事件不支持冒泡

mouseleave: 当鼠标移出元素时触发，该事件不支持冒泡

...




