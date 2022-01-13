// 1.1 获取裁剪区域的 DOM 元素 
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}
// 1.3 创建裁剪区域 
$image.cropper(options)
$('#btn_upload').on('click', () => {
    $('#file').click()
})
let layer = layui.layer
//为文件选择框绑定change事件
$('#file').on('change', (e) => {
    let img = e.target.files
    if (img.length === 0) {
        return layer.msg('请选择照片！')
    }
    //拿到选择的文件 
    let imgfile = img[0]
    // 将文件转换为路径
    let imgURL = URL.createObjectURL(imgfile)
    $image
        .cropper('destroy') // 销毁旧的裁剪区域 
        .attr('src', imgURL) // 重新设置图片路径 
        .cropper(options)
})
$('#btn_confirm').on('click', () => {
    //将用户裁剪的区域转换成base64格式的字符串
    var dataURL = $image
        .cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        })
        .toDataURL('image/png')
    //发起ajax请求
    $.ajax({
        url: '/my/update/avatar',
        method: 'POST',
        data: {
            avatar: dataURL
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更换头像失败')
            }
            layer.msg('更新头像成功')
            window.parent.getUserInfo()
        }
    })

})