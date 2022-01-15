(function () {
    let layer = layui.layer
    function getArticleList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function (res) {
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    getArticleList()
    //根据索引关闭对应的弹出层
    let index = null
    $('#add_art').on('click', () => {
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog_add').html()
        })
    })
    //通过代理的形式为表单绑定submit事件,因为在加载前，页面中还没有此html结构
    $('body').on('submit', '#form_add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                getArticleList()
                layer.msg('新增分类成功')
                layer.close(index)
            }
        })
    })
    //通过代理形式为，为编辑添加点击事件
    let indexEdit = null
    let form = layui.form
    $('body').on('click', '#btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: $('#dialog_edit').html()
        })
        let id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form_edit', res.data)
            }
        })
    })
    $('body').on('submit', '#form_edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改分类失败')
                }
                getArticleList()
                layer.msg('修改分类成功')
                layer.close(indexEdit)
            }
        })
    })
    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id')
        layer.confirm('你确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败')
                    }
                    layer.msg('删除分类成功')
                    layer.close(index);
                    getArticleList()
                }
            })
        });
    })
}())