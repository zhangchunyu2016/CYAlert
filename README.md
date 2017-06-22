# CYAlert
[![](https://img.shields.io/badge/Support-Firefox-red.svg)](http://www.firefox.com.cn)
[![](https://img.shields.io/badge/Support-Chrome-green.svg)](https://www.google.cn/chrome/browser/desktop/index.html)


</br>
<p>iOS写多了，看到警告框不是苹果风有点沮丧，所以业余时间写了个，希望对你有帮助。</p></br>
<img src="http://upload-images.jianshu.io/upload_images/2028853-65b7c7e2e04935c1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"></br>

## 一.  功能简介 - Introduction

- [x] 做为网络提示蒙版 					--->  状态有 成功，失败，警告，等待
- [x] 做为确认框							--->  有单关闭，确认，多选等

## 二.  使用 - How to use
直接拖入文件文件即可，然后引入js文件

```
<script type="text/javascript" src="xxx/CYAlert/CYAlert.js"></script>
```

#### 最简单的，显示一个等待状态
```
CYAlert.showState('载入中，请稍后。');
```

#### 最全面的，显示一个多选框
```
CYAlert.init(['男','女','中性'] , true).show('选择个你的性别？', 0, function (index) {
        console.log('你选择了',index);
    }).bg('none');
```

#### 请看Demo


## 三.  更新历史 - Update History
暂无
			  

## 四.  更多 - More

- 如果你发现任何Bug 或者 新需求请issue我.

- 大家一起讨论一起学习进步.