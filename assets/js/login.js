$('#sign_up').on('click', () => {
    $('.signIn').hide()
    $('.signUp').show()
})
$('#sign_in').on('click', () => {
    $('.signUp').hide()
    $('.signIn').show()
})
let form = layui.form
let layer = layui.layer
form.verify({
    pass: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    repass: function (value, itme) {
        let pwd = $('.signUp input[name=password]').val()
        if (pwd !== value) {
            return '两次密码不一致'
        }
    }
})
$('#form_signUp').on('submit', (e) => {
    e.preventDefault()
    let data = { username: $('#form_signUp [name=username]').val(), password: $('#form_signUp [name=password]').val() }
    $.post('/api/reguser',
        data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            $('#sign_in').click()
        })
})
$('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('登陆失败')
            }
            console.log(res);
            layer.msg('登陆成功')
            //将登陆成功后的token中存储到本地存储中
            localStorage.setItem('token', res.token)
            location.href = './index.html'
        }
    })
})

