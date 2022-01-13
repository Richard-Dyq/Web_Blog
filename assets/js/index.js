(function () {
    //获取用户基本信息
    getUserInfo()
    let layer = layui.layer
    $('#btn_logout').on('click', function () {
        layer.confirm('你确定退出?', { icon: 3, title: '提示' }, function (index) {
            //清空token
            localStorage.removeItem('token')
            //重新跳转到登陆页面
            location.href = './login.html'
            layer.close(index);
        });
    })

}());
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //请求头配置对象,配置到baseApi
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
        //无论成功还是失败，都会掉用complete回调函数,把该段代码放进prefilter中ß
        // complete: function (res) {
        //     console.log(res);
        //     //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //清空token
        //         localStorage.removeItem('token')
        //         //重新跳转到登陆页面
        //         location.href = './login.html'
        //     }
        // }
    })
}
function renderAvatar(user) {
    let name = user.nickname || user.username
    //渲染用户名
    $('#welcome').html('欢迎,&nbsp;' + name)
    //渲染图片头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}