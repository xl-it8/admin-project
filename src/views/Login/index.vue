<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" size="medium">
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input
          prefix-icon="el-icon-user"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          prefix-icon="el-icon-lock"
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //登录验证 form必须配置:rules="rules" form-item 必须配置prop属性
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //重置表单 利用resetFields函数方法
    resetForm() {
      this.$refs.loginForm.resetFields()
    },
    //登录
    submitForm() {
      this.$refs.loginForm.validate(async (valid) => {
        //  valid 校验结果 布尔值
        if (valid) {
          try {
            const res = await login(this.loginForm)
            this.$store.commit('saveUser', res.data.data)
            this.$router.push('/home')
            this.$message.success('恭喜您登录成功')
          } catch (e) {
            console.log(e)
          }
        } else {
          this.$message.error('登录校验失败')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background: url("https://pic2.zhimg.com/v2-6ed4b194c46046ab1e92bce49f42fbc0_r.jpg?source=1940ef5c")
    no-repeat 0 0 / cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
