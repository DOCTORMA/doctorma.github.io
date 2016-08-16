---
title: CSS3 Transition, Transform和Animation区别和使用
tags: css3 transition transform animation
---

CSS3动画相关的几个属性是：transition, transform, animation。分别为过渡，变换，动画。

<!--more-->

# transition

其作用是：在一定的时间内平滑的改变CSS的值。无论是点击事件，焦点事件，还是鼠标hover，只要值改变了，就是平滑的，就是动画。

transition有下面些具体属性：

transition-property :* //指定过渡的属性

transition-duration:*//指定这个过渡的持续时间

transition-timing-function:*//指定过渡类型

transition-delay:* //延迟过渡时间

### transition-property

语法：

```bash
transition-property ： none | all | [ <IDENT> ] [ ',' <IDENT> ]*
```

transition-property是用来指定当元素其中一个属性改变时执行transition效果，其主要有以下几个值：none(没有属性改变)；all（所有属性改变）这个也是其默认值；ident（元素属性名）。当其值为none时，transition马上停止执行，当指定为all时，则元素产生任何属性值变化时都将执行transition效果，ident是可以指定元素的某一个属性值。

### transition-duration

语法：

```bash
transition-duration ： <time> [, <time>]* 
```

transition-duration是用来指定元素转换过程的持续时间，取值：<time>为数值，单位为s（秒）或者ms(毫秒),可以作用于所有元素，包括::before和::after伪元素。其默认值是0，也就是变换时是即时的。

### transition-timing-function

语法：

```bash
transition-timing-function ： ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>) [, ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>)]* 
```

transition-timing-function有6个可能值：

1、ease：（逐渐变慢）默认值，ease函数等同于贝塞尔曲线(0.25, 0.1, 0.25, 1.0).

2、linear：（匀速），linear 函数等同于贝塞尔曲线(0.0, 0.0, 1.0, 1.0).

3、ease-in：(加速)，ease-in 函数等同于贝塞尔曲线(0.42, 0, 1.0, 1.0).

4、ease-out：（减速），ease-out 函数等同于贝塞尔曲线(0, 0, 0.58, 1.0).

5、ease-in-out：（加速然后减速），ease-in-out 函数等同于贝塞尔曲线(0.42, 0, 0.58, 1.0)

6、cubic-bezier：（该值允许你去自定义一个时间曲线）， 特定的cubic-bezier曲线。 (x1, y1, x2, y2)四个值特定于曲线上点P1和点P2。所有值需在[0, 1]区域内，否则无效。

### transition-delay

语法：

```bash
transition-delay ： <time> [, <time>]* 
```

transition-delay是用来指定一个动画开始执行的时间，也就是说当改变元素属性值后多长时间开始执行transition效果，其取值：<time>为数值，单位为s（秒）或者ms(毫秒)，也可以作用于所有元素，包括:before和:after伪元素。 默认大小是"0"，也就是变换立即执行，没有延迟。

综合上述我们可以给transition一个速记法：transition: <property> <duration> <animation type> <delay>.

# transform

transform指变换，主要包括以下几种：旋转rotate、扭曲skew、缩放scale和移动translate以及矩阵变形matrix。

语法：

```bash
transform ： none | <transform-function> [ <transform-function> ]* 
也就是：
transform :  rotate | scale | skew | translate |matrix;
```

none:表示不进行变换；<transform-function>表示一个或多个变换函数，以空格分开。

### 旋转rotate

rotate(<angle>) ：通过指定的角度参数对原元素指定一个2D rotation（2D 旋转），需先有transform-origin属性的定义。transform-origin定义的是旋转的基点，其中angle是指旋转角度，如果设置的值为正数表示顺时针旋转，如果设置的值为负数，则表示逆时针旋转。如：transform:rotate(30deg)。

### 移动translate

移动translate我们分为三种情况：translate(x,y)水平方向和垂直方向同时移动（也就是X轴和Y轴同时移动）；translateX(x)仅水平方向移动（X轴移动）；translateY(Y)仅垂直方向移动（Y轴移动）。其基点默认为元素中心点，也可以根据transform-origin进行改变基点。

### 缩放scale

缩放scale和移动translate是极其相似，也具有三种情况：scale(x,y)使元素水平方向和垂直方向同时缩放（也就是X轴和Y轴同时缩放）；scaleX(x)元素仅水平方向缩放（X轴缩放）；scaleY(y)元素仅垂直方向缩放（Y轴缩放），但它们具有相同的缩放中心点和基数，其中心点就是元素的中心位置，缩放基数为1，如果其值大于1元素就放大，反之其值小于1，元素缩小。

### 扭曲skew

扭曲skew和translate、scale一样同样具有三种情况：skew(x,y)使元素在水平和垂直方向同时扭曲（X轴和Y轴同时按一定的角度值进行扭曲变形）；skewX(x)仅使元素在水平方向扭曲变形（X轴扭曲变形）；skewY(y)仅使元素在垂直方向扭曲变形（Y轴扭曲变形）。

### 矩阵matrix

matrix(<number>, <number>, <number>, <number>, <number>, <number>) ： 以一个含六值的(a,b,c,d,e,f)变换矩阵的形式指定一个2D变换，相当于直接应用一个[a b c d e f]变换矩阵。就是基于水平方向（X轴）和垂直方向（Y轴）重新定位元素。

# animation

Animation，也就是动画。但CSS3中的Animation与HTML5中的Canvas绘制动画又不同，Animation只应用在页面上已存在的DOM元素上。

### Keyframes

关键帧，前面在使用transition制作一个简单的transition效果时，我们包括了初始属性和最终属性，一个开始执行动作时间和一个延续动作时间以及动作的变换速率，其实这些值都是一个中间值，如果我们要控制的更细一些，比如说我要第一个时间段执行什么动作，第二个时间段执行什么动作（换到flash中说，就是第一帧我要执行什么动作，第二帧我要执行什么动作），这样我们用Transition就很难实现了，此时我们也需要这样的一个“关键帧”来控制。那么CSS3的Animation就是由“keyframes”这个属性来实现这样的效果。

语法：

```bash
keyframes-rule: '@keyframes' IDENT '{' keyframes-blocks '}';
keyframes-blocks: [ keyframe-selectors block ]* ;
keyframe-selectors: [ 'from' | 'to' | PERCENTAGE ] [ ',' [ 'from' | 'to' | PERCENTAGE ] ]*;
```

Keyframes具有其自己的语法规则，他的命名是由"@keyframes"开头，后面紧接着是这个“动画的名称IDENT”加上一对花括号“{}”，括号中就是一些不同时间段样式规则，有点像我们css的样式写法一样。对于一个"@keyframes"中的样式规则是由多个百分比构成的，如“0%”到"100%"之间，我们可以在这个规则中创建多个百分比，我们分别给每一个百分比中给需要有动画效果的元素加上不同的属性，从而让元素达到一种在不断变化的效果，比如说移动，改变元素颜色，位置，大小，形状等，不过有一点需要注意的是，我们可以使用“from”“to”来代表一个动画是从哪开始，到哪结束，也就是说这个 "from"就相当于"0%"而"to"相当于"100%",值得一说的是，其中"0%"不能像别的属性取值一样把百分比符号省略，我们在这里必须加上百分符号（“%”）如果没有加上的话，我们这个keyframes是无效的，不起任何作用。因为keyframes的单位只接受百分比值。综上：

```bash
@keyframes IDENT {
 from {
   Properties:Properties value;
 }
 Percentage {
   Properties:Properties value;
 }
 to {
   Properties:Properties value;
 }
}
或者全部写成百分比的形式：
@keyframes IDENT {
  0% {
     Properties:Properties value;
  }
  Percentage {
     Properties:Properties value;
  }
  100% {
     Properties:Properties value;
  }
}
```

### 元素怎么调用animation属性

```bash
.demo1 {
 width: 50px;
 height: 50px;
 margin-left: 100px;
 background: blue;
 -webkit-animation-name:'wobble';/*动画属性名，也就是我们前面keyframes定义的动画名*/
 -webkit-animation-duration: 10s;/*动画持续时间*/
 -webkit-animation-timing-function: ease-in-out; /*动画频率，和transition-timing-function是一样的*/
 -webkit-animation-delay: 2s;/*动画延迟时间*/
 -webkit-animation-iteration-count: 10;/*定义循环次数，默认为1，infinite为无限次*/
 -webkit-animation-direction: alternate;/*定义动画播放的方式，其只有两个值，默认值为normal，如果设置为normal时，动画的每次循环都是向前播放；另一个值是alternate，他的作用是，动画播放在第偶数次向前播放，第奇数次向反方向播放。*/
}
```

综合上面的内容可以给animation属性一个速记法：

```bash
animation:[<animation-name> || <animation-duration> || <animation-timing-function> || <animation-delay> || <animation-iteration-count> || <animation-direction>] [, [<animation-name> || <animation-duration> || <animation-timing-function> || <animation-delay> || <animation-iteration-count> || <animation-direction>] ]* 
```

参考文章：

[transition](http://www.w3cplus.com/content/css3-transition)

[transform](http://www.w3cplus.com/content/css3-transform)

[animation](http://www.w3cplus.com/content/css3-animation)