
(function () {
    let layer = layui.layer
    let form = layui.form
    form.verify({
        nikename: function (value) {
            if (value.length > 6) {
                return '昵称必须小于六个字符'
            }
        }
    })
    function renderUerinfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                //利用layui快速给表单赋值
                form.val("form_userinfo", res.data);
            }
        })
    }
    renderUerinfo()
    //重置点击事件
    $('#btn_reset').on('click', function (e) {
        e.preventDefault()
        renderUerinfo()
    })
    //监听表单提交
    $('.layui-form').on('submit', (e) => {
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $('.layui-form').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败!')
                }
                layer.msg('更新用户信息成功')
                //调用父页面的方法，更新用户名
                window.parent.getUserInfo()
            }
        })
    })

}());
