<template>
    <div class="login">
        <section>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="uname">
                    <el-input type="text" v-model="ruleForm2.uname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="upwd">
                    <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
export default {
  data() {

    // 校验函数, rule可以拿到被校验字段的信息与校验规则, value可以拿到字段的值
    // 如果校验通过必须调用callback, 不通过不要调用
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm2.checkPass !== "") {
    //       this.$refs.ruleForm2.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    return {
    
        // 这里的字段要按照接口文档进行修改
        ruleForm2: {
            pass: "",
            checkPass: "",
        },

      //验证规则
        rules2: {
            uname: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
            ],
            upwd: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
            ],
        }
    };
  },
  methods: {
    login(){
        this.$axios.post(this.$api.login, this.ruleForm2).then((res)=>{
            console.log(res);
            if(res.data.status == 0){
                this.$alert("登录成功","",{
                    confirmButtonText: '确定',
                    callback: () => {
                        // location.href = 'http://127.0.0.1:8080/#/admin';
                        // 登陆成功后跳转到用户要跳转到的页面
                        this.$router.push({ path : this.$route.query.next || '/admin'})

                        localStorage.setItem('uname', res.data.message.uname)
                    }
                })
            }else{
                this.$alert(res.data.message)
            }
            
        })
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          this.$alert("登录失败")
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="less">
body{
    
}
.login {
    height: 100%;
    background: url(../../imgs/city.jpg) rgba(0, 0, 0, .3);
    background-size: 100%;
    section {
        padding-top:30px;
        padding-right: 30px;
        background-color: #fff;
        width: 400px;
        height: 200px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 100px;
        border-radius: 5px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    }
}
</style>