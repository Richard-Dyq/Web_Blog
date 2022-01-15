(function () {
    let q = {
        pagenum: 1,//默认请求第一页的数据
        pagesize: 2,//默认请求两条，
        cate_id: '',
        state: ''//文章的状态
    }
    let layer = layui.layer
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                console.log(res);
                let htmlStr = template('tpl-list', res)
                $('tbody').html(htmlStr)
                //使用模版引擎渲染页面数据
            }
        })
    }
    initTable()
    //定义padding函数
    function padZero(n) {
        return n > 9 ? n : 0 + n
    }
    //定义美化时间过滤器
    template.defaults.imports.dateFormat = function (date) {
        const dt = new Date(date)
        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())
        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
}())