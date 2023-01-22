$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    //追加消息后可以让滚动条滚动到屏幕最底部
    resetui()
    //为发送消息按钮绑定点击事件
    $("#btnSend").on("click", function () {
        var text = $("#ipt").val().trim();
        if (text.length <= 0) {
            return $("#ipt").val('');
        } else {
            // 如果用户输入了聊天内容，则将聊天内容追加到页面上显示
            $("#talk_list").append('<li class="right_word"><img src="images/person02.png"/> <span> ' + text + ' </span> </li > ')
            $("#ipt").val('');
            //让滚动条的位置滚动到屏幕的最底部
            resetui()
            //发起请求，获取聊天内容
            getMsg(text);
        }
    })
    //定义函数：获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            type: 'get',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                if (res.message == 'success') {
                    //接受聊天消息
                    var msg = res.data.info.text;
                    $("#talk_list").append('<li class="left_word"><img src="images/person01.png"/> <span> ' + msg + ' </span> </li > ')
                    //重置滚动条的位置
                    resetui();
                    //获取消息就自动播放语音，调用播放语音函数写在获取消息函数里面
                    getVoice(msg);
                }
            }
        })
    }
    //定义函数：把文字转化为语音进行播放
    function getVoice(text) {
        $.ajax({
            type: 'get',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                if (res.status == 200) {
                    //播放语音
                    $(".vioce").attr('src',res.voiceUrl)
                }
            }
        })
    }
    //为文本框绑定 keyup 事件
    $("#ipt").on("keyup",function (e) {
        if (e.keyCode === 13) {
            //调用按钮元素的 click 函数
            $("#btnSend").click();
        }
    })
})