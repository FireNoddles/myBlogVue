<template>
        <div class = "loginBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class = "loginForm">
            <h1 class="h1">登录</h1>
            <el-form-item prop="name">
            <el-input placeholder="用户名" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
            <el-input type="password" placeholder="密码" v-model="ruleForm.pwd" @keyup.enter.native="submitForm('ruleForm')"></el-input>
  </el-form-item>
</el-form>
</div>
</template>

<style>
.h1 {
    color: rgba(234, 235, 234, 0.944);
    text-align: center;
    position: absolute;
    top: -80%;
    left: 50%;
    font-size:x-large;
}

.loginBox {
  width: 450px;
  height: 300px;
  /* background-color: rgb(11, 11, 11); */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 9px;
  background: rgba(255,255,255,.1);
  backdrop-filter: blur(4px); 
}

.loginForm {
  width: 100%;
  position: absolute;
  bottom: 10%;
  left: -8%;
  padding: 0 20px;
  box-sizing: border-box;
}

</style>

<script>
import { PostLoginApi } from '@/request/api.js'
  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          pwd: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            PostLoginApi(this.ruleForm).then(res=>{
              console.log(res.data)
              if(res.data.status == 0){
                window.sessionStorage.setItem('token', res.data.data.token)
                this.$router.push('/admin')
              }
              
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>