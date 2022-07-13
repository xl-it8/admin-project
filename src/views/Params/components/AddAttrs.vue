<template>
  <div class="addAttrs">
    <el-dialog
      :title="activeName === 'first' ? '添加动态参数' : '添加静态参数'"
      :visible.sync="isShowAttr1"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        ref="ruleForm"
      >
        <el-form-item
          :label="activeName === 'first' ? '动态参数' : '静态参数'"
          prop="attr_name"
        >
          <el-input v-model="ruleForm.attr_name"></el-input>
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
import { addAttrs } from '@/api/categories'
export default {
  name: 'AddAttrs',
  props: {
    isShowAttr: {
      type: Boolean,
      required: true
    },
    //判断时动态还是静态
    activeName: {
      type: String,
      required: true
    },
    //级联选择器的id值 数组
    value: {
      type: Array,
      required: true
    },
    // 函数调用
    getSortParmas: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      ruleForm: {
        attr_name: ''
      },
      rules: {
        attr_name: [{
          required: true, message: '请输入参数名称', trigger: 'blur'
        }]
      },
      isShowAttr1: this.isShowAttr,
      attr_vals: null
    }
  },
  watch: {
    isShowAttr(newVal) {
      this.isShowAttr1 = newVal
    },
    //监听变化 子传父
    isShowAttr1(newVal) {
      this.$emit('updateIsShow', newVal)
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.activeName === 'first') {
            await addAttrs(this.value[2], { attr_name: this.ruleForm.attr_name, attr_sel: 'many', attr_vals: this.attr_vals })
            // this.paramsList = res.data.data
            this.getSortParmas()
          } else {
            const res = await addAttrs(this.value[2], { attr_name: this.ruleForm.attr_name, attr_sel: 'only', attr_vals: this.attr_vals })
            this.getSortParmas()
            // this.paramsList = res.data.data
            console.log(res)
          }
          this.$message.success('添加成功')
          this.$emit('update:isShowAttr', false)
          this.isShowAttr1 = false
        } else {
          this.$message.error('添加失败')
        }
      })
    },
    resetForm() {
      this.$emit('updateIsShow', false)
    }
  }
}
</script>

<style>
</style>
