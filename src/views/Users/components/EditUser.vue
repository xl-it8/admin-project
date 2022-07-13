<template>
  <div class="editUser">
    <el-dialog title="编辑用户" :visible.sync="dialogVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        ref="ruleForm"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="ruleForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="$emit('update:dialogVisible', false)"
          >取 消</el-button
        >
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editUserInfo, getUserById } from '@/api/user'
export default {
  name: 'EditUser',
  //校验时props会在组件实例创建之前执行
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    person: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      //收集到所有相关表单数据
      ruleForm: {
        username: '',
        email: '',
        phone: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { required: true, message: '邮箱格式不正确', trigger: 'blur', pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { message: '电话号码格式不正确', trigger: 'blur', pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/ }
        ]
      }
      // dialogFormVisible: this.dialogVisible
    }
  },
  mounted() {
    // //以下vue无法检测到不能引起页面更新
    // this.$set(this.ruleForm, 'username', this.person.username)
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const res = await editUserInfo({ id: this.person.id, email: this.ruleForm.email, mobile: this.ruleForm.phone })
          console.log(res)
          const res1 = await getUserById(this.person.id)
          this.$message.success('编辑用户成功')
          //重新更新页面
          this.$emit('updateData', res1.data.data)
          this.$emit('update:dialogVisible', false)
        } else {
          this.$message.error('编辑添加失败')
        }
      })
    }
  },
  //props传递过来的数据一开始是个空对象,当数据在mounted接受后要是父组件数据改变不会再次引起变化 因为mounted只调用一次 所有借助watch监听数据的变化传递过来是数据变化就重新调用解析模板 或者利用v-if 销毁创建过程
  watch: {
    person: {
      deep: true,
      handler(newVal) {
        this.$set(this.ruleForm, 'username', newVal.username)
        this.$set(this.ruleForm, 'email', newVal.email)
        this.$set(this.ruleForm, 'phone', newVal.mobile)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
