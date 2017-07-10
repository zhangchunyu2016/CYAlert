/**
 * Created by zhangchunyu on 2017/5/27.
 */

var CYAlert = {
    eternal: false , //使用完是否从Dom移除，boolean
    options: ['关闭'],  //按钮数组，[String]
    index: 0,          //点击的下标, number
    successResult: undefined,  //成功回调, function 参数为index
    timeIdentifier: undefined, //计时器标示
    cssBgColor:undefined,      //用于临时记录CSS中的背景色
    /**
     * 显示警告框
     * @param   message        显示的字符串
     * @param   interval       自动消失的时间(秒)(不传或小于0时，不会自动消失)
     * @param   successResult  成功回调函数(无返回值)
     * @return                 警告框对象
     */
    show: function (message ,interval ,successResult) {
        var dc = this.findTopWindow().document;
        if (dc.getElementById('CYAlert_bg') == undefined){
            this.init();
        }
        clearTimeout(this.timeIdentifier);
        var that = this;
        this.successResult = successResult;
        dc.getElementById('CYAlert_title').innerText = message;
        dc.getElementById('CYAlert_bg').style.visibility="visible";
        that.toggleDisplay(false);

        var buttomArr = dc.getElementsByClassName('CYAlert_bottomBox');
        for (var i=0 ; i<buttomArr.length ; i++){
            buttomArr[i].onclick = function () {
                that.index = parseInt(this.getAttribute('index'));
                that.result(that);
            }
        }

        var intervalTime = parseInt(interval);
        if (intervalTime!=undefined && intervalTime > 0){
            that.timeIdentifier = setTimeout(function () {that.result(that);} , intervalTime*1000);
        }
        return this;
    },
    /**
     * 显示等待状态
     * @param   message        显示的字符串
     * @param   interval       自动消失的时间(秒)(不传或小于0时，不会自动消失)
     * @return                 警告框对象
     */
    showState: function (message , interval) {
        interval = interval==undefined ? 0 : interval;
        this.toggleDisplay(true ,interval , message,'data:image/gif;base64,R0lGODlhgACAAKIAAP///93d3bu7u5mZmQAA/wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQAEACwCAAIAfAB8AAAD/0i63P4wygYqmDjrzbtflvWNZGliYXiubKuloivPLlzReD7al+7/Eh5wSFQIi8hHYBkwHUmD6CD5YTJLz49USuVYraRsZ7vtar7XnQ1Kjpoz6LRHvGlz35O4nEPP2O94EnpNc2sef1OBGIOFMId/inB6jSmPdpGScR19EoiYmZobnBCIiZ95k6KGGp6ni4wvqxilrqBfqo6skLW2YBmjDa28r6Eosp27w8Rov8ekycqoqUHODrTRvXsQwArC2NLF29UM19/LtxO5yJd4Au4CK7DUNxPebG4e7+8n8iv2WmQ66BtoYpo/dvfacBjIkITBE9DGlMvAsOIIZjIUAixliv9ixYZVtLUos5GjwI8gzc3iCGghypQqrbFsme8lwZgLZtIcYfNmTJ34WPTUZw5oRxdD9w0z6iOpO15MgTh1BTTJUKos39jE+o/KS64IFVmsFfYT0aU7capdy7at27dw48qdS7eu3bt480I02vUbX2F/JxYNDImw4GiGE/P9qbhxVpWOI/eFKtlNZbWXuzlmG1mv58+gQ4seTbq06dOoU6vGQZJy0FNlMcV+czhQ7SQmYd8eMhPs5BxVdfcGEtV3buDBXQ+fURxx8oM6MT9P+Fh6dOrH2zavc13u9JXVJb520Vp8dvC76wXMuN5Sepm/1WtkEZHDefnzR9Qvsd9+/wi8+en3X0ntYVcSdAE+UN4zs7ln24CaLagghIxBaGF8kFGoIYV+Ybghh841GIyI5ICIFoklJsigihmimJOLEbLYIYwxSgigiZ+8l2KB+Ml4oo/w8dijjcrouCORKwIpnJIjMnkkksalNeR4fuBIm5UEYImhIlsGCeWNNJphpJdSTlkml1jWeOY6TnaRpppUctcmFW9mGSaZceYopH9zkjnjUe59iR5pdapWaGqHopboaYua1qije67GJ6CuJAAAIfkEBQUABAAsCgACAFcAMAAAA/9Iutz+ML5Ag7w46z0r5WAoSp43nihXVmnrdusrv+s332dt4Tyo9yOBUJD6oQBIQGs4RBlHySSKyczVTtHoidocPUNZaZAr9F5FYbGI3PWdQWn1mi36buLKFJvojsHjLnshdhl4L4IqbxqGh4gahBJ4eY1kiX6LgDN7fBmQEJI4jhieD4yhdJ2KkZk8oiSqEaatqBekDLKztBG2CqBACq4wJRi4PZu1sA2+v8C6EJexrBAD1AOBzsLE0g/V1UvYR9sN3eR6lTLi4+TlY1wz6Qzr8u1t6FkY8vNzZTxaGfn6mAkEGFDgL4LrDDJDyE4hEIbdHB6ESE1iD4oVLfLAqPETIsOODwmCDJlv5MSGJklaS6khAQAh+QQFBQAEACwfAAIAVwAwAAAD/0i63P5LSAGrvTjrNuf+YKh1nWieIumhbFupkivPBEzR+GnnfLj3ooFwwPqdAshAazhEGUXJJIrJ1MGOUamJ2jQ9QVltkCv0XqFh5IncBX01afGYnDqD40u2z76JK/N0bnxweC5sRB9vF34zh4gjg4uMjXobihWTlJUZlw9+fzSHlpGYhTminKSepqebF50NmTyor6qxrLO0L7YLn0ALuhCwCrJAjrUqkrjGrsIkGMW/BMEPJcphLgDaABjUKNEh29vdgTLLIOLpF80s5xrp8ORVONgi8PcZ8zlRJvf40tL8/QPYQ+BAgjgMxkPIQ6E6hgkdjoNIQ+JEijMsasNY0RQix4gKP+YIKXKkwJIFF6JMudFEAgAh+QQFBQAEACw8AAIAQgBCAAAD/kg0PPowykmrna3dzXvNmSeOFqiRaGoyaTuujitv8Gx/661HtSv8gt2jlwIChYtc0XjcEUnMpu4pikpv1I71astytkGh9wJGJk3QrXlcKa+VWjeSPZHP4Rtw+I2OW81DeBZ2fCB+UYCBfWRqiQp0CnqOj4J1jZOQkpOUIYx/m4oxg5cuAaYBO4Qop6c6pKusrDevIrG2rkwptrupXB67vKAbwMHCFcTFxhLIt8oUzLHOE9Cy0hHUrdbX2KjaENzey9Dh08jkz8Tnx83q66bt8PHy8/T19vf4+fr6AP3+/wADAjQmsKDBf6AOKjS4aaHDgZMeSgTQcKLDhBYPEswoA1BBAgAh+QQFBQAEACxOAAoAMABXAAAD7Ei6vPOjyUkrhdDqfXHm4OZ9YSmNpKmiqVqykbuysgvX5o2HcLxzup8oKLQQix0UcqhcVo5ORi+aHFEn02sDeuWqBGCBkbYLh5/NmnldxajX7LbPBK+PH7K6narfO/t+SIBwfINmUYaHf4lghYyOhlqJWgqDlAuAlwyBmpVnnaChoqOkpaanqKmqKgGtrq+wsbA1srW2ry63urasu764Jr/CAb3Du7nGt7TJsqvOz9DR0tPU1TIA2ACl2dyi3N/aneDf4uPklObj6OngWuzt7u/d8fLY9PXr9eFX+vv8+PnYlUsXiqC3c6PmUUgAACH5BAUFAAQALE4AHwAwAFcAAAPpSLrc/m7IAau9bU7MO9GgJ0ZgOI5leoqpumKt+1axPJO1dtO5vuM9yi8TlAyBvSMxqES2mo8cFFKb8kzWqzDL7Xq/4LB4TC6bz1yBes1uu9uzt3zOXtHv8xN+Dx/x/wJ6gHt2g3Rxhm9oi4yNjo+QkZKTCgGWAWaXmmOanZhgnp2goaJdpKGmp55cqqusrZuvsJays6mzn1m4uRAAvgAvuBW/v8GwvcTFxqfIycA3zA/OytCl0tPPO7HD2GLYvt7dYd/ZX99j5+Pi6tPh6+bvXuTuzujxXens9fr7YPn+7egRI9PPHrgpCQAAIfkEBQUABAAsPAA8AEIAQgAAA/lIutz+UI1Jq7026h2x/xUncmD5jehjrlnqSmz8vrE8u7V5z/m5/8CgcEgsGo/IpHLJbDqf0Kh0ShBYBdTXdZsdbb/Yrgb8FUfIYLMDTVYz2G13FV6Wz+lX+x0fdvPzdn9WeoJGAYcBN39EiIiKeEONjTt0kZKHQGyWl4mZdREAoQAcnJhBXBqioqSlT6qqG6WmTK+rsa1NtaGsuEu6o7yXubojsrTEIsa+yMm9SL8osp3PzM2cStDRykfZ2tfUtS/bRd3ewtzV5pLo4eLjQuUp70Hx8t9E9eqO5Oku5/ztdkxi90qPg3x2EMpR6IahGocPCxp8AGtigwQAIfkEBQUABAAsHwBOAFcAMAAAA/9Iutz+MMo36pg4682J/V0ojs1nXmSqSqe5vrDXunEdzq2ta3i+/5DeCUh0CGnF5BGULC4tTeUTFQVONYAs4CfoCkZPjFar83rBx8l4XDObSUL1Ott2d1U4yZwcs5/xSBB7dBMBhgEYfncrTBGDW4WHhomKUY+QEZKSE4qLRY8YmoeUfkmXoaKInJ2fgxmpqqulQKCvqRqsP7WooriVO7u8mhu5NacasMTFMMHCm8qzzM2RvdDRK9PUwxzLKdnaz9y/Kt8SyR3dIuXmtyHpHMcd5+jvWK4i8/TXHff47SLjQvQLkU+fG29rUhQ06IkEG4X/Rryp4mwUxSgLL/7IqFETB8eONT6ChCFy5ItqJomES6kgAQAh+QQFBQAEACwKAE4AVwAwAAAD/0i63A4QuEmrvTi3yLX/4MeNUmieITmibEuppCu3sDrfYG3jPKbHveDktxIaF8TOcZmMLI9NyBPanFKJp4A2IBx4B5lkdqvtfb8+HYpMxp3Pl1qLvXW/vWkli16/3dFxTi58ZRcChwIYf3hWBIRchoiHiotWj5AVkpIXi4xLjxiaiJR/T5ehoomcnZ+EGamqq6VGoK+pGqxCtaiiuJVBu7yaHrk4pxqwxMUzwcKbyrPMzZG90NGDrh/JH8t72dq3IN1jfCHb3L/e5ebh4ukmxyDn6O8g08jt7tf26ybz+m/W9GNXzUQ9fm1Q/APoSWAhhfkMAmpEbRhFKwsvCsmosRIHx444PoKcIXKkjIImjTzjkQAAIfkEBQUABAAsAgA8AEIAQgAAA/VIBNz+8KlJq72Yxs1d/uDVjVxogmQqnaylvkArT7A63/V47/m2/8CgcEgsGo/IpHLJbDqf0Kh0Sj0FroGqDMvVmrjgrDcTBo8v5fCZki6vCW33Oq4+0832O/at3+f7fICBdzsChgJGeoWHhkV0P4yMRG1BkYeOeECWl5hXQ5uNIAOjA1KgiKKko1CnqBmqqk+nIbCkTq20taVNs7m1vKAnurtLvb6wTMbHsUq4wrrFwSzDzcrLtknW16tI2tvERt6pv0fi48jh5h/U6Zs77EXSN/BE8jP09ZFA+PmhP/xvJgAMSGBgQINvEK5ReIZhQ3QEMTBLAAAh+QQFBQAEACwCAB8AMABXAAAD50i6DA4syklre87qTbHn4OaNYSmNqKmiqVqyrcvBsazRpH3jmC7yD98OCBF2iEXjBKmsAJsWHDQKmw571l8my+16v+CweEwum8+hgHrNbrvbtrd8znbR73MVfg838f8BeoB7doN0cYZvaIuMjY6PkJGSk2gClgJml5pjmp2YYJ6dX6GeXaShWaeoVqqlU62ir7CXqbOWrLafsrNctjIDwAMWvC7BwRWtNsbGFKc+y8fNsTrQ0dK3QtXAYtrCYd3eYN3c49/a5NVj5eLn5u3s6e7x8NDo9fbL+Mzy9/T5+tvUzdN3Zp+GBAAh+QQJBQAEACwCAAIAfAB8AAAD/0i63P4wykmrvTjrzbv/YCiOZGmeaKqubOu+cCzPdArcQK2TOL7/nl4PSMwIfcUk5YhUOh3M5nNKiOaoWCuWqt1Ou16l9RpOgsvEMdocXbOZ7nQ7DjzTaeq7zq6P5fszfIASAYUBIYKDDoaGIImKC4ySH3OQEJKYHZWWi5iZG0ecEZ6eHEOio6SfqCaqpaytrpOwJLKztCO2jLi1uoW8Ir6/wCHCxMG2x7muysukzb230M6H09bX2Nna29zd3t/g4cAC5OXm5+jn3Ons7eba7vHt2fL16tj2+QL0+vXw/e7WAUwnrqDBgwgTKlzIsKHDh2gGSBwAccHEixAvaqTYcFCjRoYeNyoM6REhyZIHT4o0qPIjy5YTTcKUmHImx5cwE85cmJPnSYckK66sSAAj0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gwxZJAAA7');
        return this;
    },
    /**
     * 显示成功状态
     * @param   message        显示的字符串
     * @param   interval       自动消失的时间(秒)(不传或小于0时，不会自动消失)
     * @return                 警告框对象
     */
    showSucess: function (message , interval) {
        this.toggleDisplay(true , interval , message,'data:image/png;base64,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');
        return this;
    },
    /**
     * 显示错误状态
     * @param   message        显示的字符串
     * @param   interval       自动消失的时间(秒)(不传或小于0时，不会自动消失)
     * @return                 警告框对象
     */
    showError: function (message , interval) {
        this.toggleDisplay(true , interval , message,'data:image/png;base64,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');
        return this;
    },
    /**
     * 显示警告状态
     * @param   message        显示的字符串
     * @param   interval       自动消失的时间(秒)(不传或小于0时，不会自动消失)
     * @return                 警告框对象
     */
    showWaring:function (message , interval) {
        this.toggleDisplay(true , interval , message,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAqaSURBVHja7Z17jBXVHcc/OyyBCqGWWKCLrwKxgEnBGmClTcEKjUiWJiBEEtkmokXTpvkhNKlIARvRJqKcJm18AUl3SewjNClksRGJbENkXWPUpoIawYJAhRhNjBiJIP1j9947d/c+5v2bO3M+/+zemTnnfM/vmzNnzjzOaaLBEJjKOFq4kvG0MJYr+AYjGcYQLnKez/iEjzjDaU5xktN8aA5rK/ZHk7YAL8hkpjKTObQGzqKHbno5bN7Wrks9UmyIXMMsFtIeecaddNFr3teuX2VSaIi08CPamR97QfvooNt8oF3fclJkiMCNLGdN4gU/znO8ZrSr309KDJEZrGKlqoTtPGN6teOQAkNkInexTltFkUfYYY5qClA0RIbQxlau1ax+RY6zmt3mok7hSobIWO5lk07ZHtnEU+ZM8sUqGCKT2MCK5MsNwE4eMu8lW2TChshktrAw2TJDspe15khyxSVoiExkK23JlRche1idVFefkCEyhoe5J5myYmIbD5qz8ReTgCEylF+yJf5yEmAtfzDn4y0idkPkFl6Mu4xEmW9irU+shsg4tnNbnCWo8Dwrzf/iyjw2QwRW0BFX7ur8lE5zKY6MYzJEWtgV4ulFI/AKi83p6LN14tAqizmVcTtgFqdkSfTZRt5C5DKejOGhUlrp5D5zLsoMIzZEptBgz7AjYGqUI/lIT1myNId2wGFZFl1mkbUQGcKj/EojHqlgC7+O5oZ9RIbIKLr4gWZE1HmZBebT8NlEYohczTGGaEdEnUtca06EzSSCPkSmcdzaATRxXKaHzSS0ITKXN7QjkSJel7nhMghpiLTxknYMUsZLsihM8lCGyFJ2a9c/hfwjzGVwiHO/3MFftOueUpa2vtvzn2BJAxsiS60dNVjSeqTnrSAJA172Sps9WdXlJyZAjAIZInNtV+6Jm80Bv0kCGCLT7IWuZ24wb/hL4NsQuZrj2rVsKK7xN3r3aYiM4mM7KvfFJS73c4/L1zhEhtBl7fBJE8+Lj5j5Gxg+mvM7usGYze+8H+zDO1mK0a5bgzLb+6jEcx+Sy4ezUeLxQa9HQ+QyIn2Un0tGenkdwmsf8qR2bTKApxh6aiGymF3atckEt5u6cfRgiLRwSrsmRd4NlOo6bdlFxtd727GuIdLEyyl6C3G92ew3iazDd5rYeIWbar8TXL8PuTNFdjQ+s+p9XVnHEBmX4TfYdfiTfKvW7notZJu2/gyyvdbOmobILQ32xWxjsEDmVd9ZwxAZlrGP0dLDPhlWbVetFvJzbd0Z5hfVdlQ1RMbwuLbqDLNFxlTeUb2FPKytOeNUGRtVMUQmNvhn/unnbplYaXO1FvKEtt4csLXSxoqGyGRCvZ9q8USbTBm8sXILycZEGOmnQpwrGCKT7HAwIW6TSQM3VWohG7R15oiNAzcMMkTGNshsb9ngThlbvmFwC1mlrTFn3Fv+c4AhMpyHtBXmjE0y3P1zYAu5VVtfDlng/lFmiFQZrFhiZau4fpS3kAkpnNY4+1yD6yZKuSF3aWvLKa64uwyRZh7UVpZT1klz4V93C7lBW1eO+V7hH7chP9NWlWOKsS8aIkO5W1tVjlkpQ/v+KbWQ72pryjn98S8Zcoe2opyzvO9PvyHSxFptRTlnjTRBqYVcqa3H0udBwZAfaquxMAdKhuRnpt300g79hkgzP9ZWY2G+NBdayFXaWiwAXFUwZIa2EgsAMwqG2LdM0sFCcPpX+rCkgRWCA4zQX4DVAkATIxzsoDBNXOkAU7VVWIpc7wAztVVYisx06B+yW1LBHEfgJm0VliKtDsPC52KJDoeva0uwuHG4QluCxY3D2PCZWKLDYby2BIsba0jKsIakDIcWbQkWN7ZTTxkO39SWYHHjcLm2BIsbh5HaEixu7L2slOHY9UDShUMki05bosLhvLYEixuHz7QlWNw4fKItweLG4SNtCRY3Dme0JVjcOJwOn4klOpwULdZiwRqSOqwhKcPhQ20JFjf2sjdlOPhYydgSP/ZeVspoNsihRnrdWrK9XvWhZqC7gQzJ+qom3Q7Qq63CUqTXAbssd4o47AAntVVYipx0gHN8pa3DAsBXnHPAQKe2EgsAnaZ/ao292kosAOwtzHVir7PSQW/BENutp4OT/YaYC7ygrcXCC+ZCaYo/u2q6Ph1QMuRf2mosfR4UDLG9iD4noWiIuWQXk1Rmi7kE7qnG/6ytKOf0x79kyL+1FeWc/vgXDTFfsk1bU47ZZr7s+8e9oMsz2qpyTDH2bkNe11aVY4qxby5tMxdkc+qXBVtvNvtNIuvwnSZhNpsLhX/Ll83boa0sp7jiXm7IMd7X1pZD3udY6UeZIQbu11aXQ+43rh8DFyf+p7a6HFIW8wGGmC/YqK0vZ2w0X7h/Dl7g/mlthTljQLwHGWLO2FceEqTTDPjG06lw0EPaKnPEoFhXMMQcpUtbZ07oMkcHbnIqHmgXmUyGCnGuaIh5m93aWnPAbvP24I1OlYPtADF+Ksa4iiHmqL0ZHzPPDu4/oHoLgd9oK8446ytvrmqIOcsabc0ZZo05W3mHUyPRH7VVZ5iqsa1hiDnPPG3dGWWeqfrtc60Wgtlvh4gx0GX2V9/p1El8t7b6DFIzpnUMMR/aldYjpt3UnF2mXguBnRzSrkOGOMTO2gd4WAVXWlI0hdO7gVJdpy27yHhTZwY/T8sSy2J2adckEywxf693iKeJxnuOtE5gmnZtGp4O82j9g+r3IX3cp12bDOAphh4NMZ/bNaVDMtV87uUwry0Ec4Rl2nVqYJaZI94O9LFYRc/h1hF8X7tmDclj5vdeD/XcQgB4gIPadWtADvKA94M9XfaWkFF8bJeA8cVFRhsf81r6ayGYT5mgXcMGY4IfO3wbAuYE07Xr2EBMNyf8JfBtCJg3matdzwbhZvOm3yQBDAHTzSLtujYAi8wB/4kCGQJmjx2V1GGZ2RMkWeArpp7Dre9wu3atU8ty89dgCX1e9pYjSwlYbMZZZv4WNGkoQ0Da7Eung1gU7GTVR0hDQOZwQDsCqeLmIF15idCGgEzjDe0opIbp/i90y4nAEJCrOWZvqHCRCX6HgYMJeNlbjjnB6NzfdjzI6PB2hLjsLafnfGsHX8vxzfnHWFH+NW1QIjllFcjtZXCIy9yBRGoIyJQcrrUw1evTQC9E0oeUMEcYkaspZzsYEaUdkbeQPnLzHpeH96z8EoshIC3sojXueKjSw5J6byEGIeJTVgFzmtmZfk27ndlx2BFbC+lDxrGNhXGWoMJeVprY1keN1RAAuYUX4y4jUebV+twmPDGdskqY/QzPzMwQaxkerx0JtJA+ZAwPc08yZcXEs6yv9uVslCRkCIBM5IkGfRa/h9WVP/OPngQNAZDJbGmwbr6LtZXmJImLhA0BkElsYEXy5Qagk9+a95ItUsEQABnLqpRPlLaJpwbO9pYESoYAyBDa2Mq1egqq8F9Ws8dc1Clc0ZA+ZAIrWaetosgj7Eiq+66MuiF9yAxWsVJVwnaeNq9qxyE1hgAI3MhyhTmIHuc5XjPa1e8nRYYUkKuYQzvzYy9oHx10mw+061tOCg0pIN9mBgtZEbHGS3TSxasmpcsOpNiQEvIdrmcmc0I8Yemhm17eMu9o16Ue/weXvvrJ79QNDgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNi0xOVQxOTo0MTo1MyswODowMCGcYDUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDYtMTlUMTk6NDE6NTMrMDg6MDBQwdiJAAAAAElFTkSuQmCC');
        return  this;
    },
    /**
     * 移除状态框或警告框
     */
    dismiss: function () {
        clearTimeout(this.timeIdentifier);
        var bg = this.findTopWindow().document.getElementById('CYAlert_bg');
        bg.onclick = undefined;
        if (this.eternal == false){
            bg.style.background = this.cssBgColor;
            bg.style.visibility="hidden";
        }else {
            try{bg.remove();}catch(ex){try{bg.removeNode(true);}catch(ex){console.log(ex);}}
        }
    },
    /**
     * 设置背景色
     * @param   color   要设置的颜色字符串
     */
    bg: function (color) {
        var bg = this.findTopWindow().document.getElementById('CYAlert_bg');

        if (bg == undefined){
            console.log('请在show...方法后调用 bg()来设置背景色。');
        }else {
            var bgColor = getComputedStyle(bg).backgroundColor;
            if (bgColor == undefined){
                bgColor = bg.currentStyle.backgroundColor; //兼容IE
            }
            this.cssBgColor = bgColor;//保存之前的背景
            bg.style.background = color;
        }
    },
    /**
     * 初始化
     * @param   options     按钮名数组
     * @param   eternal     使用完是否从Dom移除 (默认为否)
     * @return              警告框对象
     */
    init: function (options , eternal) {
        var dc = this.findTopWindow().document;
        var bg = dc.getElementById('CYAlert_bg');
        if (bg != undefined){
            try{bg.remove();}catch(ex){try{bg.removeNode(true);}catch(ex){console.log(ex);}}
        }
        if (eternal != undefined && typeof (eternal) == 'boolean'){
            this.eternal = eternal;
        }
        if (options != undefined && typeof(options) == "object"){
            this.options = options;
        }

        /// 创建控件
        bg = dc.createElement('CYAlertDiv');
        bg.id = 'CYAlert_bg';
        bg.className =  'CYAlert_DOM_OBJ';
        bg.style.visibility="hidden";

        var content  = dc.createElement('CYAlertDiv');
        content.id = 'CYAlert_content';
        content.className =  'CYAlert_DOM_OBJ';

        var title = dc.createElement('p');
        title.id = 'CYAlert_title';
        title.className =  'CYAlert_DOM_OBJ';

        var partingH = dc.createElement('CYAlertDiv');
        partingH.className =  'CYAlert_DOM_OBJ';
        partingH.id = 'CYAlert_parting';

        var bottomBoxs = dc.createElement('CYAlertDiv');
        bottomBoxs.className =  'CYAlert_DOM_OBJ';
        bottomBoxs.id = 'CYAlert_bottomBoxs';

        var imgsBox = dc.createElement('img');
        imgsBox.ondragstart=function (){return false;};
        imgsBox.className =  'CYAlert_DOM_OBJ';
        imgsBox.id = 'CYAlert_imgsBox';

        /// 添加控件
        var body = dc.getElementsByTagName('body')[0];
        body.appendChild(bg);
        bg.appendChild(content);
        content.appendChild(title);
        content.appendChild(partingH);
        content.appendChild(imgsBox);
        content.appendChild(bottomBoxs);

        /// 按钮
        var bottomBoxWidth;
        switch(this.options.length) {
            case 1:
                bottomBoxWidth = '30%';
                bottomBoxs.style.flexDirection =  'row';
                break;
            case 2:
                bottomBoxWidth = '50%';
                bottomBoxs.style.flexDirection =  'row';
                break;
            default:
                bottomBoxWidth = '100%';
                bottomBoxs.style.flexDirection =  'column';
        }
        for (var i in this.options){
            var bottomBox = dc.createElement('CYAlertDiv');
            bottomBox.className =  'CYAlert_DOM_OBJ CYAlert_bottomBox';
            bottomBox.style['width'] = bottomBoxWidth;
            bottomBox.style['cursor'] = 'pointer';
            bottomBox.setAttribute("index",i);

            var buttomTitle = dc.createElement('CYAlertDiv');
            buttomTitle.innerText = this.options[parseInt(i)];
            buttomTitle.className =  'CYAlert_DOM_OBJ CYAlert_bottomTitle';

            bottomBoxs.appendChild(bottomBox);
            bottomBox.appendChild(buttomTitle);
        }
        return this;
    },
    /**
     * 找到顶层window(被动调用)
     */
    findTopWindow:function () {
        var w = parent;
        while (w !== w.parent){
            w = w.parent;
        }
        return w.window;
    }
    ,
    /**
     * 切换警告框和状态框(被动调用)
     * @param   identifier     切换标示
     * @param   interval       自动消失的时间
     * @param   message        显示的消息内容
     * @param   src            图片地址
     */
    toggleDisplay:function (identifier ,interval, message,src) {
        var win = this.findTopWindow();
        var dc = win.document;
        var that = this;
        if (identifier){
            if (dc.getElementById('CYAlert_bg') == undefined){
                this.init();
            }
            dc.getElementById('CYAlert_title').innerText = message;

            clearTimeout(this.timeIdentifier);
            dc.getElementById('CYAlert_bg').style.visibility="visible";
            dc.getElementById('CYAlert_bottomBoxs').style.display = 'none';
            dc.getElementById('CYAlert_parting').style.display = 'none';
            dc.getElementById('CYAlert_imgsBox').src = src;
            dc.getElementById('CYAlert_imgsBox').style.display = 'block';

            var intervalTime = parseFloat(interval ==undefined ? message.length*0.1 +2.5 : interval);
            if (intervalTime > 0){
                that.timeIdentifier = setTimeout(function () {that.dismiss();} , intervalTime*1000);
            }
        }else {
            dc.getElementById('CYAlert_bottomBoxs').style.display = 'flex'; //如果CSS中改变了标签类型，这里也要修改成相应的
            dc.getElementById('CYAlert_parting').style.display = 'block';  //如果CSS中改变了标签类型，这里也要修改成相应的
            dc.getElementById('CYAlert_imgsBox').style.display = 'none';
        }

        //修正位置
        that.location();
    },
    /**
     * 修正警告框位置(被动调用)
     */
    location: function () {
        var win = this.findTopWindow();
        var dc = win.document;

        //修正弹出对话框的Y轴位置
        var h = 0;
        if (dc.body.pageYOffset) {
            h = dc.body.pageYOffset;
        }else if (dc.documentElement && dc.documentElement.scrollTop){
            h = dc.documentElement.scrollTop;
        }else if (dc.body) {// all other Explorers
            h = dc.body.scrollTop;
        }

        var bodyHeight = Math.max(dc.body.scrollHeight,dc.documentElement.scrollHeight);
        dc.getElementById('CYAlert_bg').style.height = bodyHeight + 'px';
        var contentBox = dc.getElementById('CYAlert_content');
        contentBox.style.left = (dc.documentElement.clientWidth*0.5 - contentBox.clientWidth*0.5) +'px';
        contentBox.style.top = (dc.documentElement.clientHeight*0.5 - contentBox.clientHeight*0.5) +'px';
    },
    /**
     * 返回点击下标(被动调用)
     */
    result: function (that) {
        that.dismiss();
        try {
            that.successResult(that.index);
        }catch (ex){}
        that.index = 0;
    }
};


(function LoadCSS(){
    var dc = CYAlert.findTopWindow().document;
    var __FILE__ = (function () {
        try {
            throw Error();
        }catch(ex){
            if(ex.fileName) { //Firefox
                return ex.fileName;
            }
            else if(ex.sourceURL){ //Safari
                return  ex.sourceURL;
            }
            else if(ex.stack){ //Chrome 或 IE
                var stackPath = (ex.stack.match(/at\s+(.*?):\d+:\d+/)||['',''])[1];
                return (stackPath.indexOf('Anonymous function (') >= 0) 
                ? stackPath.substring(20,stackPath.length) 
                : stackPath;
            }
            else{
                var path = dc.scripts[dc.scripts.length-1].src;//兼容IE10以下
                return path ? path : location.href; //内联js文件，将返回所在html路径
            }
        }
    })();
    var s = dc.createElement("link");
    s.rel = "stylesheet";
    s.type = "text/css";
    s.href = __FILE__.substring(0,__FILE__.lastIndexOf('/')+1) +'CYAlert.css';
    dc.getElementsByTagName("head")[0].appendChild(s);
})();