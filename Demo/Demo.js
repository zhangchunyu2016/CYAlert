/**
 * Created by zhangchunyu on 2017/6/22.
 */


/*

 在CYAlert.css文件中 设置默认的蒙版色
 #CYAlert_bg{
    background: rgba(0,0,0,0.2);
 }

 也可以在所有的show方法后，
 调用.bg()方法来单独设置此次弹出的蒙版颜色

*/




function sucess() {
    // 默认存在2.5秒 + 每个字0.1秒
    CYAlert.showSucess('请求成功.').bg('none');

    // 后面可以跟一个参数，存在的时间，小于0时永久存在。
    // CYAlert.showSucess('请求成功.',0);
}


function error() {
    CYAlert.showError('请求失败!').bg('none');
    // CYAlert.showError('请求失败!',0);
}


function waring() {
    CYAlert.showWaring('此操作不可达!');
    // CYAlert.showWaring('此操作不可达!',-1);
}


function wait() {
    CYAlert.showState('载入中，请稍后。').bg('none');
    setTimeout('dimissfunc()',2000);
}

function dimissfunc() {
    CYAlert.dismiss();
}

function alert() {
    //默认永久存在，直到你点击关闭
    // CYAlert.show('唔，你点着我了。');

    //可以传自动消失的时间
    // CYAlert.show('唔，你点着我了。',3);

    //也可以获取关闭的事件
    // CYAlert.show('唔，你点着我了。', 0,function (index) {
    //     console.log('你选择了',index);
    // });

    /*
    注意，只调用show 并且上次init为false ，之前的对象将驻留在内存中，下次show将沿用上次的样式，
    除非你显示的调用init来覆盖这个样式.*/
    CYAlert.init(['关闭'] , true).show('唔，你点着我了。', 0, function (index) {
        console.log('你选择了',index);
    });
}


function choose() {
    //init 方法用来初始化警告框的内容，只作用于有交互的show方法
    //第一个参数传内容数组
    //第一个参数 为bool值 使用完是否从Dom移除 (默认为否)
    CYAlert.init(['是','否'] , false).show('你确定要删除吗？', 0, function (index) {
        console.log('你选择了',index);
    });
}

function more() {
    CYAlert.init(['男','女','中性'] , true).show('选择个你的性别？', 0, function (index) {
        console.log('你选择了',index);
    }).bg('none');
}