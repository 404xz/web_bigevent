$(function() {
    
    //登陆注册切换功能
    $('#link_reg').on('click', () => {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login  ').on('click', () => {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    //引人 form layer 模板
    const form = layui.form; 
    const layer = layui.layer;// 提示框模板
    //自定义校验
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        repwd:(value) => {
            const pw = $('#form_reg [name=password]').val();
            if(pw != value) return '两次密码不一致'
        },
    })

    // const baseUrl = 'http://www.liulongbin.top:3007';
    // 注册提交事件
     $('#form_reg').on( 'submit' , (e) => {
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data:{
                //获取输入框的值
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success:(res) => {
                if(res.status != 0) return layer.msg(res.message);
                layer.msg('注册成功！');
                // 注册成功后跳转到登录界面
                $("#link_login").click();
            }
        })
     })

     //登陆事件
     $('#form_login').on('submit',function(e){
         e.preventDefault();
         $.ajax({
             type:'POST',
             url:'/api/login',
             //拼接成age=12&name=xz
             data:$(this).serialize(),
             success:(res) => {
                 if(res.status !== 0) return layer.msg('登陆失败！');
                 layer.msg('登陆成功！');
                 //登陆成功后把token指令放在本地
                 localStorage.setItem('token',res.token);
                 //跳转到首页
                 location.href = '/index.html'
             }
         })
     })




     
     //
})