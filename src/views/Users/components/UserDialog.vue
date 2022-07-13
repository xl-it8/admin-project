<template>
  <div class="addUser">
    <el-button type="primary" @click="dialogFormVisible = true"
      >添加用户</el-button
    >
    <el-dialog title="添加用户对话框" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        ref="ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addUser } from '@/api/user'
export default {
  name: 'UserDialog',
  data() {
    return {
      //收集到所有相关表单数据
      ruleForm: {
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        email: [
          { message: '请输入邮箱', trigger: 'blur' },
          { message: '邮箱格式不正确', trigger: 'blur', pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ }
        ],
        phone: [
          { message: '请输入电话号码', trigger: 'blur' },
          { message: '电话号码格式不正确', trigger: 'blur', pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/ }
        ]
      },
      dialogFormVisible: false
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const res = await addUser(this.ruleForm)
          this.$emit('getOneUser', res.data.data)
          this.$message.success('添加用户成功')
          this.$refs.ruleForm.resetFields(this.ruleForm)
          this.dialogFormVisible = false
        } else {
          this.$message.error('用户添加失败')
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields(this.ruleForm)
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
