# CYAlert
[![](https://img.shields.io/badge/Support-Firefox-red.svg)](http://www.firefox.com.cn)
[![](https://img.shields.io/badge/Support-Chrome-green.svg)](https://www.google.cn/chrome/browser/desktop/index.html)
[![](https://img.shields.io/badge/Support-Opera-red.svg)](http://www.opera.com)
[![](https://img.shields.io/badge/Support-Safari-blue.svg)](https://www.apple.com/cn/safari/)
[![](https://img.shields.io/badge/Support-IE11-yellow.svg)](https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads)
[![](https://img.shields.io/badge/Support-IE%20Edge-yellowgreen.svg)](https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads)
</br>
[![](https://img.shields.io/badge/language-javascript-green.svg)](https://github.com/zhangchunyu2016/CYAlert)
[![](https://img.shields.io/badge/QQ-707214577-red.svg)](http://wpa.qq.com/msgrd?v=3&uin=707214577&site=qq&menu=yes)
</br>


<p>一直在写iOS，看到警告框不是苹果风有点沮丧，所以业余时间写了个，希望对你有帮助。</p></br>
<img src="http://upload-images.jianshu.io/upload_images/2028853-3486b3efe1e179a3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"></br>

## 一.  功能简介 - Introduction

- [x] 做为网络提示蒙版 					--->  状态有 成功，失败，警告，等待
- [x] 做为确认框							--->  有单关闭，确认，多选等

## 二.  使用 - How to use
直接拖入文件文件即可，然后引入js文件

```
<script type="text/javascript" src="xxx/CYAlert/CYAlert.js"></script>
```

#### 等待状态
```
CYAlert.showState('载入中，请稍后。');
```

#### 错误状态
```
CYAlert.showError('请求失败!');
```

#### 警告状态
```
CYAlert.showWaring('此操作不可达!');
```

#### 成功状态
```
CYAlert.showSucess('请求成功.');
```

#### 手动移除
```
CYAlert.dismiss();
```

#### 指定不同的蒙版颜色
```
CYAlert.showError('请求失败!').bg('red');
or
CYAlert.showSucess('请求成功.').bg('none');
```

#### 指定消失的时间
```
//单纯的显示状态，默认存在2.5秒 + 每个字0.1秒，
//show方法调用的，默认永久存在，直到用户点击交互按钮关闭
//指定时间小于等于0时永久存在
CYAlert.showSucess('请求成功.',0);
```

#### 可选的初始化设置
```
//init 方法用来初始化警告框的内容，只作用于有交互的show方法，和影响所有方法的内存驻留策略
//第一个参数传内容数组,元素类型为字符串
//第二个参数 为bool值 使用完是否从Dom移除 (默认为否)
//注意，只调用show 并且上次init为false ，之前的对象将驻留在内存中，下次show将沿用上次的样式，除非你显式的调用init来覆盖这个样式
CYAlert.init(['是','否'] , false).show('你确定要删除吗？', 0, function (index) {
     console.log('你选择了',index);
});

```

#### 全面显示，选择框
```
CYAlert.init(['男','女','中性'] , true).show('选择个你的性别？', 0, function (index) {
     console.log('你选择了',index);
}).bg('none');
```

#### 更多tips请看Demo


## 三.  更新历史 - Update History
2017.07.10  - 支持IE11 以及 IE Edge
2017.07.18	- 修复dimiss()连续调用，对象可能为null时报错的问题(issue By woshiku)
			  

## 四.  更多 - More

- 如果你发现任何Bug 或者 新需求请issue我.

- 大家一起讨论一起学习进步.