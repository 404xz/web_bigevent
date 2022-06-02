$(function(){
    const initArtCateList = () => {
        $.ajax({
            type:'GET', 
            url:'/my/article/cates',
            success:(res) => {
                //调用 template 函数
                const htmlStr = template('tpl-table',res);
                $("tbody").empty().html(htmlStr)
            }
        })
    }
    initArtCateList()
    const layer = layui.layer;
    // const form = layui.form;
    let indexAdd = null
    $("#btnAddCate").click(() => {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $('#dialog-add').html(),
        });
    });

    
    
    //通过事件委托的方式监听提交事件
    $('body').on('submit','#form-add',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:(res) => {
                if(res.status !== 0) return layer.msg('新增文章分类失败！');
                initArtCateList()
                layer.msg('新增文章分类成功！');
                layer.close(indexAdd);
            }
        })
    })

    // 通过代理方式，为 btn-edit 按钮绑定点击事件
    let indexEdit = null;
    $("tbody").on("click", ".btn-edit", function () {
        // 弹出修改文章分类的弹窗
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        });

        const id = $(this).attr("data-id");
        // 发起请求获取对应分类的数据
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                // console.log(res);
                layui.form.val("form-edit", res.data);
            },
        });
    });

    // 更新文章分类
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("更新分类数据失败！")  ;
                }
                layer.msg("更新分类数据成功！");
                layer.close(indexEdit);
                initArtCateList();
            },
        });
    });

    //删除文章分类
    $('tbody').on('click','.btn-delete',function(e){
        e.preventDefault();
        const id = $(this).siblings('.btn-edit').attr("data-id");
        // 提示用户是否删除
        layer.confirm("确定删除吗？", { icon: 3, title: "   提示" }, function (index) {
            $.ajax({
                type:'GET', 
                url:"/my/article/deletecate/" + id,
                success:(res) => {
                    if(res.status !== 0) return layer.  msg('删除文章类别失败！');
                    layer.msg('删除文章类别成功！');
                    layer.close(index);
                    initArtCateList();
                }
            })
        })

    })
    //
})