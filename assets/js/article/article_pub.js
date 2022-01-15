(function () {
    function initcate() {
        let layer = layui.layer
        let form = layui.form
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败')
                }
                //渲染模版引擎
                console.log(res);
                let htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                //调用form.render()
                form.render()
            }
        })
    }
    initcate()
}())