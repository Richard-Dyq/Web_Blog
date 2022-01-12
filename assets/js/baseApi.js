//注意：每次调$.get()或$.post()$.ajax()时，会先掉用ajaxPrefilter这个函数
//在这个函数中， 我们可以拿提供给ajax的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
})