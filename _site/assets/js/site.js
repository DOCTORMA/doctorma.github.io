/*!
 * jQCloud Plugin for jQuery
 *
 * Version 1.0.0
 *
 * Copyright 2011, Luca Ongaro
 * Licensed under the MIT license.
 *
 * Date: Tue Apr 17 15:06:02 +0200 2012
*/
(function(a){"use strict",a.fn.jQCloud=function(b,c){var d=this,e=d.attr("id")||Math.floor(Math.random()*1e6).toString(36),f={width:d.width(),height:d.height(),center:{x:(c&&c.width?c.width:d.width())/2,y:(c&&c.height?c.height:d.height())/2},delayedMode:b.length>50,shape:!1};c=a.extend(f,c||{}),d.addClass("jqcloud").width(c.width).height(c.height),d.css("position")==="static"&&d.css("position","relative");var g=function(){var f=function(a,b){var c=function(a,b){return Math.abs(2*a.offsetLeft+a.offsetWidth-2*b.offsetLeft-b.offsetWidth)<a.offsetWidth+b.offsetWidth&&Math.abs(2*a.offsetTop+a.offsetHeight-2*b.offsetTop-b.offsetHeight)<a.offsetHeight+b.offsetHeight?!0:!1},d=0;for(d=0;d<b.length;d++)if(c(a,b[d]))return!0;return!1};for(var g=0;g<b.length;g++)b[g].weight=parseFloat(b[g].weight,10);b.sort(function(a,b){return a.weight<b.weight?1:a.weight>b.weight?-1:0});var h=c.shape==="rectangular"?18:2,i=[],j=c.width/c.height,k=function(g,k){var l=e+"_word_"+g,m="#"+l,n=6.28*Math.random(),o=0,p=0,q=0,r=5,s="",t="",u="";k.html=a.extend(k.html,{id:l}),k.html&&k.html["class"]&&(s=k.html["class"],delete k.html["class"]),b[0].weight>b[b.length-1].weight&&(r=Math.round((k.weight-b[b.length-1].weight)/(b[0].weight-b[b.length-1].weight)*9)+1),u=a("<span>").attr(k.html).addClass("w"+r+" "+s),k.link?(typeof k["link"]=="string"&&(k.link={href:k.link}),k.link=a.extend(k.link,{href:encodeURI(k.link.href).replace(/'/g,"%27")}),t=a("<a>").attr(k.link).text(k.text)):t=k.text,u.append(t);if(!!k.handlers)for(var v in k.handlers)k.handlers.hasOwnProperty(v)&&typeof k.handlers[v]=="function"&&a(u).bind(v,k.handlers[v]);d.append(u);var w=u.width(),x=u.height(),y=c.center.x-w/2,z=c.center.y-x/2,A=u[0].style;A.position="absolute",A.left=y+"px",A.top=z+"px";while(f(document.getElementById(l),i)){if(c.shape==="rectangular"){p++,p*h>(1+Math.floor(q/2))*h*(q%4%2===0?1:j)&&(p=0,q++);switch(q%4){case 1:y+=h*j+Math.random()*2;break;case 2:z-=h+Math.random()*2;break;case 3:y-=h*j+Math.random()*2;break;case 0:z+=h+Math.random()*2}}else o+=h,n+=(g%2===0?1:-1)*h,y=c.center.x-w/2+o*Math.cos(n)*j,z=c.center.y+o*Math.sin(n)-x/2;A.left=y+"px",A.top=z+"px"}i.push(document.getElementById(l)),a.isFunction(k.afterWordRender)&&k.afterWordRender.call(u)},l=function(e){e=e||0,e<b.length?(k(e,b[e]),setTimeout(function(){l(e+1)},10)):a.isFunction(c.afterCloudRender)&&c.afterCloudRender.call(d)};c.delayedMode?l():(a.each(b,k),a.isFunction(c.afterCloudRender)&&c.afterCloudRender.call(d))};return setTimeout(function(){g()},10),d}})(jQuery);
/*!
 * Infinite Ajax Scroll v2.1.2
 * A jQuery plugin for infinite scrolling
 * http://infiniteajaxscroll.com
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://infiniteajaxscroll.com/docs/license.html
 *
 * Non-commercial use is licensed under the MIT License
 *
 * Copyright (c) 2014 Webcreate (Jeroen Fiege)
 */
var IASCallbacks=function(){return this.list=[],this.fireStack=[],this.isFiring=!1,this.isDisabled=!1,this.fire=function(a){var b=a[0],c=a[1],d=a[2];this.isFiring=!0;for(var e=0,f=this.list.length;f>e;e++)if(!1===this.list[e].fn.apply(b,d)){c.reject();break}this.isFiring=!1,c.resolve(),this.fireStack.length&&this.fire(this.fireStack.shift())},this.inList=function(a,b){b=b||0;for(var c=b,d=this.list.length;d>c;c++)if(this.list[c].fn===a||a.guid&&this.list[c].fn.guid&&a.guid===this.list[c].fn.guid)return c;return-1},this};IASCallbacks.prototype={add:function(a,b){var c={fn:a,priority:b};b=b||0;for(var d=0,e=this.list.length;e>d;d++)if(b>this.list[d].priority)return this.list.splice(d,0,c),this;return this.list.push(c),this},remove:function(a){for(var b=0;(b=this.inList(a,b))>-1;)this.list.splice(b,1);return this},has:function(a){return this.inList(a)>-1},fireWith:function(a,b){var c=jQuery.Deferred();return this.isDisabled?c.reject():(b=b||[],b=[a,c,b.slice?b.slice():b],this.isFiring?this.fireStack.push(b):this.fire(b),c)},disable:function(){this.isDisabled=!0},enable:function(){this.isDisabled=!1}},function(a){"use strict";var b=-1,c=function(c,d){return this.itemsContainerSelector=d.container,this.itemSelector=d.item,this.nextSelector=d.next,this.paginationSelector=d.pagination,this.$scrollContainer=c,this.$itemsContainer=a(this.itemsContainerSelector),this.$container=window===c.get(0)?a(document):c,this.defaultDelay=d.delay,this.negativeMargin=d.negativeMargin,this.nextUrl=null,this.isBound=!1,this.listeners={next:new IASCallbacks,load:new IASCallbacks,loaded:new IASCallbacks,render:new IASCallbacks,rendered:new IASCallbacks,scroll:new IASCallbacks,noneLeft:new IASCallbacks,ready:new IASCallbacks},this.extensions=[],this.scrollHandler=function(){var a=this.getCurrentScrollOffset(this.$scrollContainer),c=this.getScrollThreshold();this.isBound&&b!=c&&(this.fire("scroll",[a,c]),a>=c&&this.next())},this.getLastItem=function(){return a(this.itemSelector,this.$itemsContainer.get(0)).last()},this.getFirstItem=function(){return a(this.itemSelector,this.$itemsContainer.get(0)).first()},this.getScrollThreshold=function(a){var c;return a=a||this.negativeMargin,a=a>=0?-1*a:a,c=this.getLastItem(),0===c.size()?b:c.offset().top+c.height()+a},this.getCurrentScrollOffset=function(a){var b=0,c=a.height();return b=window===a.get(0)?a.scrollTop():a.offset().top,(-1!=navigator.platform.indexOf("iPhone")||-1!=navigator.platform.indexOf("iPod"))&&(c+=80),b+c},this.getNextUrl=function(b){return b||(b=this.$container),a(this.nextSelector,b).last().attr("href")},this.load=function(b,c,d){var e,f,g=this,h=[],i=+new Date;d=d||this.defaultDelay;var j={url:b};return g.fire("load",[j]),a.get(j.url,null,a.proxy(function(b){e=a(this.itemsContainerSelector,b).eq(0),0===e.length&&(e=a(b).filter(this.itemsContainerSelector).eq(0)),e&&e.find(this.itemSelector).each(function(){h.push(this)}),g.fire("loaded",[b,h]),c&&(f=+new Date-i,d>f?setTimeout(function(){c.call(g,b,h)},d-f):c.call(g,b,h))},g),"html")},this.render=function(b,c){var d=this,e=this.getLastItem(),f=0,g=this.fire("render",[b]);g.done(function(){a(b).hide(),e.after(b),a(b).fadeIn(400,function(){++f<b.length||(d.fire("rendered",[b]),c&&c())})})},this.hidePagination=function(){this.paginationSelector&&a(this.paginationSelector,this.$container).hide()},this.restorePagination=function(){this.paginationSelector&&a(this.paginationSelector,this.$container).show()},this.throttle=function(b,c){var d,e,f=0;return d=function(){function a(){f=+new Date,b.apply(d,g)}var d=this,g=arguments,h=+new Date-f;e?clearTimeout(e):a(),h>c?a():e=setTimeout(a,c)},a.guid&&(d.guid=b.guid=b.guid||a.guid++),d},this.fire=function(a,b){return this.listeners[a].fireWith(this,b)},this};c.prototype.initialize=function(){var a=this.getCurrentScrollOffset(this.$scrollContainer),b=this.getScrollThreshold();this.hidePagination(),this.bind();for(var c=0,d=this.extensions.length;d>c;c++)this.extensions[c].bind(this);return this.fire("ready"),this.nextUrl=this.getNextUrl(),a>=b&&this.next(),this},c.prototype.bind=function(){this.isBound||(this.$scrollContainer.on("scroll",a.proxy(this.throttle(this.scrollHandler,150),this)),this.isBound=!0)},c.prototype.unbind=function(){this.isBound&&(this.$scrollContainer.off("scroll",this.scrollHandler),this.isBound=!1)},c.prototype.destroy=function(){this.unbind()},c.prototype.on=function(b,c,d){if("undefined"==typeof this.listeners[b])throw new Error('There is no event called "'+b+'"');return d=d||0,this.listeners[b].add(a.proxy(c,this),d),this},c.prototype.one=function(a,b){var c=this,d=function(){c.off(a,b),c.off(a,d)};return this.on(a,b),this.on(a,d),this},c.prototype.off=function(a,b){if("undefined"==typeof this.listeners[a])throw new Error('There is no event called "'+a+'"');return this.listeners[a].remove(b),this},c.prototype.next=function(){var a=this.nextUrl,b=this;if(this.unbind(),!a)return this.fire("noneLeft",[this.getLastItem()]),this.listeners.noneLeft.disable(),b.bind(),!1;var c=this.fire("next",[a]);return c.done(function(){b.load(a,function(a,c){b.render(c,function(){b.nextUrl=b.getNextUrl(a),b.bind()})})}),c.fail(function(){b.bind()}),!0},c.prototype.extension=function(a){if("undefined"==typeof a.bind)throw new Error('Extension doesn\'t have required method "bind"');return"undefined"!=typeof a.initialize&&a.initialize(this),this.extensions.push(a),this},a.ias=function(){var b=a(window);return b.ias.apply(b,arguments)},a.fn.ias=function(b){var d=Array.prototype.slice.call(arguments),e=this;return this.each(function(){var f=a(this),g=f.data("ias"),h=a.extend({},a.fn.ias.defaults,f.data(),"object"==typeof b&&b);if(g||(f.data("ias",g=new c(f,h)),a(document).ready(a.proxy(g.initialize,g))),"string"==typeof b){if("function"!=typeof g[b])throw new Error('There is no method called "'+b+'"');d.shift(),g[b].apply(g,d),"destroy"===b&&f.data("ias",null)}e=f.data("ias")}),e},a.fn.ias.defaults={item:".item",container:".listing",next:".next",pagination:!1,delay:600,negativeMargin:10}}(jQuery);var IASHistoryExtension=function(a){return a=jQuery.extend({},this.defaults,a),this.ias=null,this.prevSelector=a.prev,this.prevUrl=null,this.listeners={prev:new IASCallbacks},this.onPageChange=function(a,b,c){var d={};window.history&&window.history.replaceState&&history.replaceState(d,document.title,c)},this.onScroll=function(a){var b=this.getScrollThresholdFirstItem();this.prevUrl&&(a-=this.ias.$scrollContainer.height(),b>=a&&this.prev())},this.getPrevUrl=function(a){return a||(a=this.ias.$container),jQuery(this.prevSelector,a).last().attr("href")},this.getScrollThresholdFirstItem=function(){var a;return a=this.ias.getFirstItem(),0===a.size()?-1:a.offset().top},this.renderBefore=function(a,b){var c=this.ias,d=c.getFirstItem(),e=0;c.fire("render",[a]),jQuery(a).hide(),d.before(a),jQuery(a).fadeIn(400,function(){++e<a.length||(c.fire("rendered",[a]),b&&b())})},this};IASHistoryExtension.prototype.initialize=function(a){var b=this;this.ias=a,jQuery.extend(a.listeners,this.listeners),a.prev=function(){return b.prev()},this.prevUrl=this.getPrevUrl()},IASHistoryExtension.prototype.bind=function(a){var b=this;a.on("pageChange",jQuery.proxy(this.onPageChange,this)),a.on("scroll",jQuery.proxy(this.onScroll,this)),a.on("ready",function(){var c=a.getCurrentScrollOffset(a.$scrollContainer),d=b.getScrollThresholdFirstItem();c-=a.$scrollContainer.height(),d>=c&&b.prev()})},IASHistoryExtension.prototype.prev=function(){var a=this.prevUrl,b=this,c=this.ias;if(!a)return!1;c.unbind();var d=c.fire("prev",[a]);return d.done(function(){c.load(a,function(a,d){b.renderBefore(d,function(){b.prevUrl=b.getPrevUrl(a),c.bind(),b.prevUrl&&b.prev()})})}),d.fail(function(){c.bind()}),!0},IASHistoryExtension.prototype.defaults={prev:".prev"};var IASNoneLeftExtension=function(a){return a=jQuery.extend({},this.defaults,a),this.ias=null,this.uid=(new Date).getTime(),this.html=a.html.replace("{text}",a.text),this.showNoneLeft=function(){var a=jQuery(this.html).attr("id","ias_noneleft_"+this.uid),b=this.ias.getLastItem();b.after(a),a.fadeIn()},this};IASNoneLeftExtension.prototype.bind=function(a){this.ias=a,a.on("noneLeft",jQuery.proxy(this.showNoneLeft,this))},IASNoneLeftExtension.prototype.defaults={text:"You reached the end.",html:'<div class="ias-noneleft" style="text-align: center;">{text}</div>'};var IASPagingExtension=function(){return this.ias=null,this.pagebreaks=[[0,document.location.toString()]],this.lastPageNum=1,this.enabled=!0,this.listeners={pageChange:new IASCallbacks},this.onScroll=function(a){if(this.enabled){var b,c=this.ias,d=this.getCurrentPageNum(a),e=this.getCurrentPagebreak(a);this.lastPageNum!==d&&(b=e[1],c.fire("pageChange",[d,a,b])),this.lastPageNum=d}},this.onNext=function(a){var b=this.ias.getCurrentScrollOffset(this.ias.$scrollContainer);this.pagebreaks.push([b,a]);var c=this.getCurrentPageNum(b)+1;this.ias.fire("pageChange",[c,b,a]),this.lastPageNum=c},this.onPrev=function(a){var b=this,c=b.ias,d=c.getCurrentScrollOffset(c.$scrollContainer),e=d-c.$scrollContainer.height(),f=c.getFirstItem();this.enabled=!1,this.pagebreaks.unshift([0,a]),c.one("rendered",function(){for(var d=1,g=b.pagebreaks.length;g>d;d++)b.pagebreaks[d][0]=b.pagebreaks[d][0]+f.offset().top;var h=b.getCurrentPageNum(e)+1;c.fire("pageChange",[h,e,a]),b.lastPageNum=h,b.enabled=!0})},this};IASPagingExtension.prototype.initialize=function(a){this.ias=a,jQuery.extend(a.listeners,this.listeners)},IASPagingExtension.prototype.bind=function(a){try{a.on("prev",jQuery.proxy(this.onPrev,this),this.priority)}catch(b){}a.on("next",jQuery.proxy(this.onNext,this),this.priority),a.on("scroll",jQuery.proxy(this.onScroll,this),this.priority)},IASPagingExtension.prototype.getCurrentPageNum=function(a){for(var b=this.pagebreaks.length-1;b>0;b--)if(a>this.pagebreaks[b][0])return b+1;return 1},IASPagingExtension.prototype.getCurrentPagebreak=function(a){for(var b=this.pagebreaks.length-1;b>=0;b--)if(a>this.pagebreaks[b][0])return this.pagebreaks[b];return null},IASPagingExtension.prototype.priority=500;var IASSpinnerExtension=function(a){return a=jQuery.extend({},this.defaults,a),this.ias=null,this.uid=(new Date).getTime(),this.src=a.src,this.html=a.html.replace("{src}",this.src),this.showSpinner=function(){var a=this.getSpinner()||this.createSpinner(),b=this.ias.getLastItem();b.after(a),a.fadeIn()},this.showSpinnerBefore=function(){var a=this.getSpinner()||this.createSpinner(),b=this.ias.getFirstItem();b.before(a),a.fadeIn()},this.removeSpinner=function(){this.hasSpinner()&&this.getSpinner().remove()},this.getSpinner=function(){var a=jQuery("#ias_spinner_"+this.uid);return a.size()>0?a:!1},this.hasSpinner=function(){var a=jQuery("#ias_spinner_"+this.uid);return a.size()>0},this.createSpinner=function(){var a=jQuery(this.html).attr("id","ias_spinner_"+this.uid);return a.hide(),a},this};IASSpinnerExtension.prototype.bind=function(a){this.ias=a,a.on("next",jQuery.proxy(this.showSpinner,this));try{a.on("prev",jQuery.proxy(this.showSpinnerBefore,this))}catch(b){}a.on("render",jQuery.proxy(this.removeSpinner,this))},IASSpinnerExtension.prototype.defaults={src:"data:image/gif;base64,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",html:'<div class="ias-spinner" style="text-align: center;"><img src="{src}"/></div>'};var IASTriggerExtension=function(a){return a=jQuery.extend({},this.defaults,a),this.ias=null,this.html=a.html.replace("{text}",a.text),this.htmlPrev=a.htmlPrev.replace("{text}",a.textPrev),this.enabled=!0,this.count=0,this.offset=a.offset,this.$triggerNext=null,this.$triggerPrev=null,this.showTriggerNext=function(){if(!this.enabled)return!0;if(!1===this.offset||++this.count<this.offset)return!0;var a=this.$triggerNext||(this.$triggerNext=this.createTrigger(this.next,this.html)),b=this.ias.getLastItem();return b.after(a),a.fadeIn(),!1},this.showTriggerPrev=function(){if(!this.enabled)return!0;var a=this.$triggerPrev||(this.$triggerPrev=this.createTrigger(this.prev,this.htmlPrev)),b=this.ias.getFirstItem();return b.before(a),a.fadeIn(),!1},this.createTrigger=function(a,b){var c,d=(new Date).getTime();return b=b||this.html,c=jQuery(b).attr("id","ias_trigger_"+d),c.hide(),c.on("click",jQuery.proxy(a,this)),c},this};IASTriggerExtension.prototype.bind=function(a){var b=this;this.ias=a;try{a.on("prev",jQuery.proxy(this.showTriggerPrev,this),this.priority)}catch(c){}a.on("next",jQuery.proxy(this.showTriggerNext,this),this.priority),a.on("rendered",function(){b.enabled=!0},this.priority)},IASTriggerExtension.prototype.next=function(){this.enabled=!1,this.ias.unbind(),this.$triggerNext&&(this.$triggerNext.remove(),this.$triggerNext=null),this.ias.next()},IASTriggerExtension.prototype.prev=function(){this.enabled=!1,this.ias.unbind(),this.$triggerPrev&&(this.$triggerPrev.remove(),this.$triggerPrev=null),this.ias.prev()},IASTriggerExtension.prototype.defaults={text:"Load more items",html:'<div class="ias-trigger ias-trigger-next" style="text-align: center; cursor: pointer;"><a>{text}</a></div>',textPrev:"Load previous items",htmlPrev:'<div class="ias-trigger ias-trigger-prev" style="text-align: center; cursor: pointer;"><a>{text}</a></div>',offset:0},IASTriggerExtension.prototype.priority=1e3;
/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version: 1.9.0
 *
 */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.data(j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.data(j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);
/*! social-share 1.0.0 by harttle, 2016-03-20
* Social share widget supporting: wechat, weibo, linkedin, github, google+, rss, twitter, facebook and more.
* https://github.com/harttle/social-share */

var QRCode;!function(){function a(a){this.mode=j.MODE_8BIT_BYTE,this.data=a,this.parsedData=[];for(var b=[],c=0,d=this.data.length;d>c;c++){var e=this.data.charCodeAt(c);e>65536?(b[0]=240|(1835008&e)>>>18,b[1]=128|(258048&e)>>>12,b[2]=128|(4032&e)>>>6,b[3]=128|63&e):e>2048?(b[0]=224|(61440&e)>>>12,b[1]=128|(4032&e)>>>6,b[2]=128|63&e):e>128?(b[0]=192|(1984&e)>>>6,b[1]=128|63&e):b[0]=e,this.parsedData=this.parsedData.concat(b)}this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function b(a,b){this.typeNumber=a,this.errorCorrectLevel=b,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function c(a,b){if(void 0==a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0==a[c];)c++;this.num=new Array(a.length-c+b);for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}function d(a,b){this.totalCount=a,this.dataCount=b}function e(){this.buffer=[],this.length=0}function f(){return"undefined"!=typeof CanvasRenderingContext2D}function g(){var a=!1,b=navigator.userAgent;return/android/i.test(b)&&(a=!0,aMat=b.toString().match(/android ([0-9]\.[0-9])/i),aMat&&aMat[1]&&(a=parseFloat(aMat[1]))),a}function h(a,b){for(var c=1,d=i(a),e=0,f=p.length;f>=e;e++){var g=0;switch(b){case k.L:g=p[e][0];break;case k.M:g=p[e][1];break;case k.Q:g=p[e][2];break;case k.H:g=p[e][3]}if(g>=d)break;c++}if(c>p.length)throw new Error("Too long data");return c}function i(a){var b=encodeURI(a).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return b.length+(b.length!=a?3:0)}a.prototype={getLength:function(){return this.parsedData.length},write:function(a){for(var b=0,c=this.parsedData.length;c>b;b++)a.put(this.parsedData[b],8)}},b.prototype={addData:function(b){var c=new a(b);this.dataList.push(c),this.dataCache=null},isDark:function(a,b){if(0>a||this.moduleCount<=a||0>b||this.moduleCount<=b)throw new Error(a+","+b);return this.modules[a][b]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[d][e]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,c),this.typeNumber>=7&&this.setupTypeNumber(a),null==this.dataCache&&(this.dataCache=b.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,b){for(var c=-1;7>=c;c++)if(!(-1>=a+c||this.moduleCount<=a+c))for(var d=-1;7>=d;d++)-1>=b+d||this.moduleCount<=b+d||(this.modules[a+c][b+d]=c>=0&&6>=c&&(0==d||6==d)||d>=0&&6>=d&&(0==c||6==c)||c>=2&&4>=c&&d>=2&&4>=d?!0:!1)},getBestMaskPattern:function(){for(var a=0,b=0,c=0;8>c;c++){this.makeImpl(!0,c);var d=m.getLostPoint(this);(0==c||a>d)&&(a=d,b=c)}return b},createMovieClip:function(a,b,c){var d=a.createEmptyMovieClip(b,c),e=1;this.make();for(var f=0;f<this.modules.length;f++)for(var g=f*e,h=0;h<this.modules[f].length;h++){var i=h*e,j=this.modules[f][h];j&&(d.beginFill(0,100),d.moveTo(i,g),d.lineTo(i+e,g),d.lineTo(i+e,g+e),d.lineTo(i,g+e),d.endFill())}return d},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(var b=8;b<this.moduleCount-8;b++)null==this.modules[6][b]&&(this.modules[6][b]=0==b%2)},setupPositionAdjustPattern:function(){for(var a=m.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var f=-2;2>=f;f++)for(var g=-2;2>=g;g++)this.modules[d+f][e+g]=-2==f||2==f||-2==g||2==g||0==f&&0==g?!0:!1}},setupTypeNumber:function(a){for(var b=m.getBCHTypeNumber(this.typeNumber),c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d}for(var c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d}},setupTypeInfo:function(a,b){for(var c=this.errorCorrectLevel<<3|b,d=m.getBCHTypeInfo(c),e=0;15>e;e++){var f=!a&&1==(1&d>>e);6>e?this.modules[e][8]=f:8>e?this.modules[e+1][8]=f:this.modules[this.moduleCount-15+e][8]=f}for(var e=0;15>e;e++){var f=!a&&1==(1&d>>e);8>e?this.modules[8][this.moduleCount-e-1]=f:9>e?this.modules[8][15-e-1+1]=f:this.modules[8][15-e-1]=f}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,f=0,g=this.moduleCount-1;g>0;g-=2)for(6==g&&g--;;){for(var h=0;2>h;h++)if(null==this.modules[d][g-h]){var i=!1;f<a.length&&(i=1==(1&a[f]>>>e));var j=m.getMask(b,d,g-h);j&&(i=!i),this.modules[d][g-h]=i,e--,-1==e&&(f++,e=7)}if(d+=c,0>d||this.moduleCount<=d){d-=c,c=-c;break}}}},b.PAD0=236,b.PAD1=17,b.createData=function(a,c,f){for(var g=d.getRSBlocks(a,c),h=new e,i=0;i<f.length;i++){var j=f[i];h.put(j.mode,4),h.put(j.getLength(),m.getLengthInBits(j.mode,a)),j.write(h)}for(var k=0,i=0;i<g.length;i++)k+=g[i].dataCount;if(h.getLengthInBits()>8*k)throw new Error("code length overflow. ("+h.getLengthInBits()+">"+8*k+")");for(h.getLengthInBits()+4<=8*k&&h.put(0,4);0!=h.getLengthInBits()%8;)h.putBit(!1);for(;!(h.getLengthInBits()>=8*k)&&(h.put(b.PAD0,8),!(h.getLengthInBits()>=8*k));)h.put(b.PAD1,8);return b.createBytes(h,g)},b.createBytes=function(a,b){for(var d=0,e=0,f=0,g=new Array(b.length),h=new Array(b.length),i=0;i<b.length;i++){var j=b[i].dataCount,k=b[i].totalCount-j;e=Math.max(e,j),f=Math.max(f,k),g[i]=new Array(j);for(var l=0;l<g[i].length;l++)g[i][l]=255&a.buffer[l+d];d+=j;var n=m.getErrorCorrectPolynomial(k),o=new c(g[i],n.getLength()-1),p=o.mod(n);h[i]=new Array(n.getLength()-1);for(var l=0;l<h[i].length;l++){var q=l+p.getLength()-h[i].length;h[i][l]=q>=0?p.get(q):0}}for(var r=0,l=0;l<b.length;l++)r+=b[l].totalCount;for(var s=new Array(r),t=0,l=0;e>l;l++)for(var i=0;i<b.length;i++)l<g[i].length&&(s[t++]=g[i][l]);for(var l=0;f>l;l++)for(var i=0;i<b.length;i++)l<h[i].length&&(s[t++]=h[i][l]);return s};for(var j={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},k={L:1,M:0,Q:3,H:2},l={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},m={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var b=a<<10;m.getBCHDigit(b)-m.getBCHDigit(m.G15)>=0;)b^=m.G15<<m.getBCHDigit(b)-m.getBCHDigit(m.G15);return(a<<10|b)^m.G15_MASK},getBCHTypeNumber:function(a){for(var b=a<<12;m.getBCHDigit(b)-m.getBCHDigit(m.G18)>=0;)b^=m.G18<<m.getBCHDigit(b)-m.getBCHDigit(m.G18);return a<<12|b},getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return m.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,b,c){switch(a){case l.PATTERN000:return 0==(b+c)%2;case l.PATTERN001:return 0==b%2;case l.PATTERN010:return 0==c%3;case l.PATTERN011:return 0==(b+c)%3;case l.PATTERN100:return 0==(Math.floor(b/2)+Math.floor(c/3))%2;case l.PATTERN101:return 0==b*c%2+b*c%3;case l.PATTERN110:return 0==(b*c%2+b*c%3)%2;case l.PATTERN111:return 0==(b*c%3+(b+c)%2)%2;default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var b=new c([1],0),d=0;a>d;d++)b=b.multiply(new c([1,n.gexp(d)],0));return b},getLengthInBits:function(a,b){if(b>=1&&10>b)switch(a){case j.MODE_NUMBER:return 10;case j.MODE_ALPHA_NUM:return 9;case j.MODE_8BIT_BYTE:return 8;case j.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(27>b)switch(a){case j.MODE_NUMBER:return 12;case j.MODE_ALPHA_NUM:return 11;case j.MODE_8BIT_BYTE:return 16;case j.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else{if(!(41>b))throw new Error("type:"+b);switch(a){case j.MODE_NUMBER:return 14;case j.MODE_ALPHA_NUM:return 13;case j.MODE_8BIT_BYTE:return 16;case j.MODE_KANJI:return 12;default:throw new Error("mode:"+a)}}},getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0;b>d;d++)for(var e=0;b>e;e++){for(var f=0,g=a.isDark(d,e),h=-1;1>=h;h++)if(!(0>d+h||d+h>=b))for(var i=-1;1>=i;i++)0>e+i||e+i>=b||(0!=h||0!=i)&&g==a.isDark(d+h,e+i)&&f++;f>5&&(c+=3+f-5)}for(var d=0;b-1>d;d++)for(var e=0;b-1>e;e++){var j=0;a.isDark(d,e)&&j++,a.isDark(d+1,e)&&j++,a.isDark(d,e+1)&&j++,a.isDark(d+1,e+1)&&j++,(0==j||4==j)&&(c+=3)}for(var d=0;b>d;d++)for(var e=0;b-6>e;e++)a.isDark(d,e)&&!a.isDark(d,e+1)&&a.isDark(d,e+2)&&a.isDark(d,e+3)&&a.isDark(d,e+4)&&!a.isDark(d,e+5)&&a.isDark(d,e+6)&&(c+=40);for(var e=0;b>e;e++)for(var d=0;b-6>d;d++)a.isDark(d,e)&&!a.isDark(d+1,e)&&a.isDark(d+2,e)&&a.isDark(d+3,e)&&a.isDark(d+4,e)&&!a.isDark(d+5,e)&&a.isDark(d+6,e)&&(c+=40);for(var k=0,e=0;b>e;e++)for(var d=0;b>d;d++)a.isDark(d,e)&&k++;var l=Math.abs(100*k/b/b-50)/5;return c+=10*l}},n={glog:function(a){if(1>a)throw new Error("glog("+a+")");return n.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;a>=256;)a-=255;return n.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},o=0;8>o;o++)n.EXP_TABLE[o]=1<<o;for(var o=8;256>o;o++)n.EXP_TABLE[o]=n.EXP_TABLE[o-4]^n.EXP_TABLE[o-5]^n.EXP_TABLE[o-6]^n.EXP_TABLE[o-8];for(var o=0;255>o;o++)n.LOG_TABLE[n.EXP_TABLE[o]]=o;c.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),d=0;d<this.getLength();d++)for(var e=0;e<a.getLength();e++)b[d+e]^=n.gexp(n.glog(this.get(d))+n.glog(a.get(e)));return new c(b,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var b=n.glog(this.get(0))-n.glog(a.get(0)),d=new Array(this.getLength()),e=0;e<this.getLength();e++)d[e]=this.get(e);for(var e=0;e<a.getLength();e++)d[e]^=n.gexp(n.glog(a.get(e))+b);return new c(d,0).mod(a)}},d.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],d.getRSBlocks=function(a,b){var c=d.getRsBlockTable(a,b);if(void 0==c)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+b);for(var e=c.length/3,f=[],g=0;e>g;g++)for(var h=c[3*g+0],i=c[3*g+1],j=c[3*g+2],k=0;h>k;k++)f.push(new d(i,j));return f},d.getRsBlockTable=function(a,b){switch(b){case k.L:return d.RS_BLOCK_TABLE[4*(a-1)+0];case k.M:return d.RS_BLOCK_TABLE[4*(a-1)+1];case k.Q:return d.RS_BLOCK_TABLE[4*(a-1)+2];case k.H:return d.RS_BLOCK_TABLE[4*(a-1)+3];default:return}},e.prototype={get:function(a){var b=Math.floor(a/8);return 1==(1&this.buffer[b]>>>7-a%8)},put:function(a,b){for(var c=0;b>c;c++)this.putBit(1==(1&a>>>b-c-1))},getLengthInBits:function(){return this.length},putBit:function(a){var b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}};var p=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],q=function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){function b(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg",a);for(var d in b)b.hasOwnProperty(d)&&c.setAttribute(d,b[d]);return c}var c=this._htOption,d=this._el,e=a.getModuleCount();Math.floor(c.width/e),Math.floor(c.height/e),this.clear();var f=b("svg",{viewBox:"0 0 "+String(e)+" "+String(e),width:"100%",height:"100%",fill:c.colorLight});f.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),d.appendChild(f),f.appendChild(b("rect",{fill:c.colorDark,width:"1",height:"1",id:"template"}));for(var g=0;e>g;g++)for(var h=0;e>h;h++)if(a.isDark(g,h)){var i=b("use",{x:String(g),y:String(h)});i.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),f.appendChild(i)}},a.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},a}(),r="svg"===document.documentElement.tagName.toLowerCase(),s=r?q:f()?function(){function a(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}function b(a,b){var c=this;if(c._fFail=b,c._fSuccess=a,null===c._bSupportDataURI){var d=document.createElement("img"),e=function(){c._bSupportDataURI=!1,c._fFail&&_fFail.call(c)},f=function(){c._bSupportDataURI=!0,c._fSuccess&&c._fSuccess.call(c)};return d.onabort=e,d.onerror=e,d.onload=f,void(d.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")}c._bSupportDataURI===!0&&c._fSuccess?c._fSuccess.call(c):c._bSupportDataURI===!1&&c._fFail&&c._fFail.call(c)}if(this._android&&this._android<=2.1){var c=1/window.devicePixelRatio,d=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(a,b,e,f,g,h,i,j){if("nodeName"in a&&/img/i.test(a.nodeName))for(var k=arguments.length-1;k>=1;k--)arguments[k]=arguments[k]*c;else"undefined"==typeof j&&(arguments[1]*=c,arguments[2]*=c,arguments[3]*=c,arguments[4]*=c);d.apply(this,arguments)}}var e=function(a,b){this._bIsPainted=!1,this._android=g(),this._htOption=b,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=b.width,this._elCanvas.height=b.height,a.appendChild(this._elCanvas),this._el=a,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return e.prototype.draw=function(a){var b=this._elImage,c=this._oContext,d=this._htOption,e=a.getModuleCount(),f=d.width/e,g=d.height/e,h=Math.round(f),i=Math.round(g);b.style.display="none",this.clear();for(var j=0;e>j;j++)for(var k=0;e>k;k++){var l=a.isDark(j,k),m=k*f,n=j*g;c.strokeStyle=l?d.colorDark:d.colorLight,c.lineWidth=1,c.fillStyle=l?d.colorDark:d.colorLight,c.fillRect(m,n,f,g),c.strokeRect(Math.floor(m)+.5,Math.floor(n)+.5,h,i),c.strokeRect(Math.ceil(m)-.5,Math.ceil(n)-.5,h,i)}this._bIsPainted=!0},e.prototype.makeImage=function(){this._bIsPainted&&b.call(this,a)},e.prototype.isPainted=function(){return this._bIsPainted},e.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},e.prototype.round=function(a){return a?Math.floor(1e3*a)/1e3:a},e}():function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){for(var b=this._htOption,c=this._el,d=a.getModuleCount(),e=Math.floor(b.width/d),f=Math.floor(b.height/d),g=['<table style="border:0;border-collapse:collapse;">'],h=0;d>h;h++){g.push("<tr>");for(var i=0;d>i;i++)g.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+e+"px;height:"+f+"px;background-color:"+(a.isDark(h,i)?b.colorDark:b.colorLight)+';"></td>');g.push("</tr>")}g.push("</table>"),c.innerHTML=g.join("");var j=c.childNodes[0],k=(b.width-j.offsetWidth)/2,l=(b.height-j.offsetHeight)/2;k>0&&l>0&&(j.style.margin=l+"px "+k+"px")},a.prototype.clear=function(){this._el.innerHTML=""},a}();QRCode=function(a,b){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:k.H},"string"==typeof b&&(b={text:b}),b)for(var c in b)this._htOption[c]=b[c];"string"==typeof a&&(a=document.getElementById(a)),this._android=g(),this._el=a,this._oQRCode=null,this._oDrawing=new s(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},QRCode.prototype.makeCode=function(a){this._oQRCode=new b(h(a,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(a),this._oQRCode.make(),this._el.title=a,this._oDrawing.draw(this._oQRCode),this.makeImage()},QRCode.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},QRCode.prototype.clear=function(){this._oDrawing.clear()},QRCode.CorrectLevel=k}(),function(a){function b(b){b=a.extend({},f,b);var e=d(b.links),g=a(this),h=a('<ul class="list-unstyled social-share">');h.addClass("social-share-"+b.size),e.map(function(a){h.append(c(a,b))}),g.append(h)}function c(b,c){var d="fa-"+(c.classMapping[b.name]||b.name),f=a('<li class="social-share-item">'),g=a("<a>",{href:b.url||"#"}),h=a("<i>",{"class":"fa "+d});return g.append(h),c.blank&&g.attr("target","_blank"),f.append(g),f.addClass(b.name),["wechat","qrcode"].indexOf(b.name)>-1&&(g.removeAttr("target"),f.click(function(){return e(b.url),!1})),f}function d(a){var b=[];for(var c in a)if(a.hasOwnProperty(c)){var d=a[c];b.push({name:c,index:"string"==typeof d?0:d.index,url:"string"==typeof d?d:d.url})}return b.sort(function(a,b){return a.index-b.index}),b}function e(b){var c='<div class="qrcode-dialog">   <div class="qrcode-header">    <span class="dismiss">&times;</span>    <header>分享链接</header>  </div>  <div class="qrcode-body">   </div></div>',d=a(c);new QRCode(d.find(".qrcode-body").get(0),{text:b,width:256,height:256,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H});d.find(".qrcode-header .dismiss").click(function(){d.remove()}),d.appendTo("body").addClass("show")}var f={size:"md",links:{},blank:!0,classMapping:{}};a.fn.socialShare=b}(jQuery);

window.modules = {};

$(function() {
    resolve(function(mod){
        var ctrl = window.modules[mod];
        if(typeof ctrl !== 'function') return;
        ctrl(conslFactory(mod), $('[class*=module-'+mod+']'), mod);
        console.log('[loader]', mod, 'loaded');
    });

    function conslFactory(mod) {
        return {
            log: console.log.bind(console, '[' + mod + ']'),
            info: console.info.bind(console, '[' + mod + ']'),
            warn: console.warn.bind(console, '[' + mod + ']'),
            error: console.error.bind(console, '[' + mod + ']'),
        };
    }
    function resolve(cb){
        var enabled = {};
        $('[class*=module-]').each(function(i, ele) {
            $(ele).attr('class').split(' ').map(function(cls){
                var mt = cls.match(/^module-(\w+)/),
                    mod = mt && mt[1];

                if(!mod) return;
                if(enabled[mod]) return;
                else enabled[mod] = true;

                cb(mod);
            });
        });
    }
});


window.modules.default = function(console, $ele, mod) {
    $('.site-nav .toggle').click(function(){
        $('.site-nav').addClass('hover');
    });
    $('.site-content').click(function(){
        $('.site-nav').removeClass('hover');
    });
};

window.modules.index = function() {
    var ias = $.ias({
        container: '.posts',
        item: '.post',
        pagination: '.pager-next-url',
        next: '.pager-next-url'
    });
    ias.on('loaded', function(data, items) {
        console.log('loaded:', items);
        if(window.MathJax) MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    });
    ias.extension(new IASSpinnerExtension({
        src: '/assets/img/loading.gif'
    }));
    ias.extension(new IASNoneLeftExtension({
        text: '只有这些了~',
        html: '<div class="ias-noneleft" style="text-align: center;">{text}</div>'
    }));

    $.get('/tags.json').done(function(tags){
        var tagEls = tags
        .sort(function(lhs, rhs){
            return rhs.count - lhs.count;
        })
        .map(function(tag){
            return $('<a>', {
                class: 'tag',
                href: '/tags.html#' + tag.name
            }).html(tag.name + '(' + tag.count + ')');
        });
        $('.tag-list').append(tagEls);
    });
    var links = {
        github: 'https://github.com/DOCTORMA',
        facebook: '',
        weibo: '',
        linkedin: '',
        rss: ''
    };
    $('.follow').socialShare({ links: links, size: 'sm'});
};

window.modules.blog = function(console, $ele, mod) {
    var toc = getTOC($('article')),
        $toc = $('.toc');
    if (toc) {
        $toc.append(toc);

        //toc affix, this offset is for toc position recognition
        setTimeout(function() {
            $toc.affix({
                offset: {
                    top: function() {
                        var offsetTop = $toc.offset().top;
                        return (this.top = offsetTop - 40);
                    },
                    bottom: function() {
                        return (this.bottom = $(document).height() - $('.md').offset().top - $('.md').height());
                    }
                }
            });
        }, 100);

        //toc scroll spy
        $('body').scrollspy({
            target: '.toc',
            offset: 10 //make sure to spy the element when scrolled to
        });
    } else {
        $ele.addClass('collapsed');
    }

    $(window).resize(function() {
        $('body').scrollspy('refresh');
    });

    //生成目录
    function getTOC($content) {
        var $toc = $('<ul class="nav level-0" >').addClass("nav sidenav");

        var base_level = 1;
        while ($content.find('h' + base_level).length < 1 && base_level < 7) base_level += 1;
        if (base_level == 7) return null;

        $content.find(':header').each(function(i) {
            var $this = $(this);
            $this.attr('id', i);

            var level = parseInt(this.nodeName.substr(1));
            var offset = level - base_level;

            var li = new $('<li/>')
                .append('<a href="#' + i + '" class="animate">' + $this.text() + '</a>')
                .append($('<ul class="nav level-' + (offset + 1) + '"/>'));

            $('<div>').append($toc).find('ul.level-' + offset + ':last').append(li);
        });
        // remove empty ul
        $toc.find('ul').not(':parent').remove();
        return $toc;
    }

    //分享
    var links = {
        weibo: 'http://v.t.sina.com.cn/share/share.php?' + $.param({
            url: location.href,
            title: $('meta[name=description]').attr('content')
        }),
        wechat: location.href
    };
    $('#social-share-block').socialShare({ links: links, size: 'sm'});
};


window.modules.about = function(console, $ele, mod) {
};

window.modules.tags = function (console, $ele) {
    // lib config
    setHighchartsRadiationColors();

    // post/tag parsing
    var $btnPie = $('#tags-display-toggle .btn-pie'), 
        $btnCloud = $('#tags-display-toggle .btn-cloud'), 
        $btns = $('#tags-display-toggle .btn'), 
        $btnList = $('#tags-display-toggle .btn-list'), 
        $currentTag = $('#current-tag'), 
        $tagContainer = $('.tag-container'),
        $tagPie = $('.tag-pie'),
        $tagList = $('.tag-list'),
        $tagCloud = $('.tag-cloud'),
        $postList = $('.post-list');

    $.when(getTags(), getPosts()).done(function(tags, posts){
        var $statusBar = $('#status-bar');

        showCloud(tags);
        initList();

        $tagContainer.on('click', 'span', function(e){
            var tag = $(e.target).data('tag');
            tag && onTagSelected(tag);
        });

        if(location.query('verbose')){
            $postList.on('mouseenter', 'a', function(e){
                var tags = $(e.target).closest('li').data('tags');
                $statusBar.html(tags.join(', '));
            })
            .on('mouseleave', 'a', function(e){
                $statusBar.html('');
            });
        }

        $btnCloud.click(function(){
            hidePie();
            hideList();
            showCloud(tags);
        });
        $btnPie.click(function(){
            hideCloud();
            hideList();
            showPie(tags, onTagSelected);
        });
        $btnList.click(function(){
            hideCloud();
            hidePie();
            showList(tags);
        });

        function initList(){
            var selectedTag = decodeURIComponent(location.hash.replace('#', ''));
            if(selectedTag) setTag(posts, selectedTag);
            else updateList(posts.slice(0, 30), true);
        }

        function onTagSelected(tag){
            setTag(posts, tag);
            $body.animate({
                scrollTop: $('.right-panel').offset().top
            }, 500);
        }
    });

    // functions
    function setTag(posts, tag){
        var selectedPosts = searchByTag(posts, tag); 
        updateList(selectedPosts);
        updateCurrentTag(tag, selectedPosts.length);
        location.hash = tag;

        function searchByTag(posts, tag){
            return posts.filter(function(post){
                return post.tagstr.indexOf(',' + tag.toLowerCase() + ',') > -1;
            });
        }
        function updateCurrentTag(tag, count){
            $('head title').html('技术标签：' + tag + '（'+ count + '）');
            $currentTag.html(tag + '('+count+')');
        }
    }

    function updateList(posts, disableAnimation){
        var $ul = $('<ul>');
        var $lis = posts.map(function(p){
            var $li = $('<li>', {class: 'clearfix'}).data('tags', p.tags),
                $anchor = $('<a>', { href: p.url}).html(p.title),
                $time = $('<time>').html(p.date),
                $title = $('<div>').append($anchor);
            return $li.append($time).append($title);
        });
        $postList.hide().html('').append($lis);
        if(disableAnimation) $postList.show();
        else $postList.fadeIn();
    }

    function showList(tags){
        $btnList.addClass('active');
        $tagList.html('').append(tags.map(function(tag){
            return $('<span>', {
                class: 'tag'
            })
            .data('tag', tag.name)
            .html(tag.name+'('+tag.count+')');
        }));
        $tagList.fadeIn();
    }

    function hideList(){
        $btnList.removeClass('active');
        $tagList.fadeOut().html('');
    }

    function showPie(tags, onTagSelected){
        $btnPie.addClass('active');
        var options = getTagPieOptions(tags.slice(0, 20), function(){
            onTagSelected(this.name);
        });
        $tagPie.html('').show().highcharts(options);
    }

    function hidePie(){
        $btnPie.removeClass('active');
        $tagPie.hide().html('');
    }

    function showCloud(tags){
        var displayTags = getTagCloudTags(tags),
            options = getTagCloudOptions(function(){ 
                $btns.attr('disabled', false);
            });
        $btns.attr('disabled', true);
        $tagCloud.html('').show().jQCloud(displayTags, options);
        $btnCloud.addClass('active');
    }

    function hideCloud(tags){
        $btnCloud.removeClass('active');
        $tagCloud.html('').removeAttr('style').hide();
    }


    function getPosts(){
        return $.get('/posts.json').then(function(posts){
            posts.forEach(function(post){
                post.tagstr = ',' + post.tags.join(',').toLowerCase() + ',';
            });
            return posts;
        });
    }

    function getTags(){
        return $.get('/tags.json').then(function(tags){
            return tags.sort(function(lhs, rhs){
                return rhs.count - lhs.count;
            });
        });
    }

    function getTagCloudTags(rawTags){
        var norm = 0, offset = 0, last = -1;
        var tags = rawTags.slice(0, 100).map(function (raw) {
            var wt = Math.log2(raw.count+1);
            norm = Math.max(norm, wt);
            return {
                text: raw.name,
                count: raw.count,
                weight: wt,
                afterWordRender: function(){
                    this.data('tag', raw.name);
                }
            };
        })
        .map(function(tag){
            tag.weight *= 10/norm;
            return tag;
        })
        .map(function(tag){
            var cur = Math.round(tag.weight);
            if(last !== -1 && cur < last-1)
                offset += last - cur - 1;
            tag.weight += offset;
            last = cur;
            return tag;
        });
        return tags;
    }

    function getTagCloudOptions(afterRender){
        return {
            afterCloudRender: afterRender
        };
    }

    function getTagPieOptions(tags, clickCallback){
        var chartOptions = {
            title: { text: '' },
            credits: { enabled: false },
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            tooltip: { enabled: false, },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    point: {
                        events: { click: clickCallback }
                    },
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y}',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            series: [{
                name: 'Tags',
                data: tags.map(function(tag){
                    return { name: tag.name, y: tag.count };
                })
            }]
        };
        return chartOptions;
    }

    function setHighchartsRadiationColors(){
        // Radiation Configuration
        Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
            return {
                radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        });
    }
};


var footHeight = $('#footer').outerHeight(true);

window.$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');

window.uuid = function(){
    Math.random().toString(36).substr(2);
};

$(window).load(function(){
    $('script[type="text/async-script"]').each(function(idx, el){
        if(el.dataset.src) $.getScript(el.dataset.src);
    });
});

location.query = function(name, val) {
    if(arguments.length == 1){
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(this.search);
        return results === null ? 
            "" : 
            decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    else{
        history.replaceState(null, document.title, '?'+name+'='+encodeURIComponent(val));
    }
};

$(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $("img.lazy").lazyload({
        effect: "fadeIn",
        skip_invisible: false
    });

    // 页面内链接滑动效果
    $('a.animate').click(function() {
        var $this = $(this);
        if ($this.attr('offset')) {
            offset += parseInt($(this).attr('offset'));
        }
        $body.animate({
            scrollTop: $($this.attr('href')).offset().top
        }, 500);
        return false;
    });

    initScrollTopButton();

    // enable lightbox 
    $('.md img').not('a img').wrap(function(){
        return '<a data-lightbox="true" href="'+$(this).attr("src")+'"></a>';
    });

    // 关键字链接
    $('.md p, .md li').contents()
        .filter(function() { 
            return (this.nodeType == 3) && this.nodeValue.match(/\S/); 
        })
        .replaceWith(function(){
            var html = this.textContent;
            html = html.replace(/harttle/ig, 
                "<a href='https://doctorma.github.io'>Doctorma</a>");
            return $('<span>').html(html);
        });

    $('.md a').attr('target', '_blank');
});

function initScrollTopButton(){
    var $window = $(window), topDistance = 300, shown = false, $btn = $('#site-scroll-top');
    $window.scroll(function() {
        if ($window.scrollTop() > topDistance) {
            if (!shown) {
                shown = true;
                $btn.addClass('show');
            }
        } else {
            if (shown) {
                $btn.removeClass('show');
                shown = false;
            }
        }
    });
}


