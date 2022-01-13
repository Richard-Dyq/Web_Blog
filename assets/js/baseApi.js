//注意：每次调$.get()或$.post()$.ajax()时，会先掉用ajaxPrefilter这个函数
//在这个函数中， 我们可以拿提供给ajax的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    //设置有权限的借口
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂载complete
    options.complete = function (res) {
        //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //清空token
            localStorage.removeItem('token')
            //重新跳转到登陆页面
            location.href = './login.html'
        }
    }
})
