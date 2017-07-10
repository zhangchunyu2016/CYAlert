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

#### 简单点的显示一个等待状态
```
CYAlert.showState('载入中，请稍后。');
```

#### 全面点的显示一个多选框
```
CYAlert.init(['男','女','中性'] , true).show('选择个你的性别？', 0, function (index) {
     console.log('你选择了',index);
}).bg('none');
```

#### 更多用法请看Demo


## 三.  更新历史 - Update History
2017.07.10  - 支持IE10 以及 IE Edge
			  

## 四.  更多 - More

- 如果你发现任何Bug 或者 新需求请issue我.

- 大家一起讨论一起学习进步.