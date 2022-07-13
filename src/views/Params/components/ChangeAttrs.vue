<template>
  <div class="changeAttrs">
    <el-dialog title="修改动态参数" :visible.sync="isShowAttr1">
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        ref="ruleForm"
      >
        <el-form-item label="参数名称" prop="attr_name">
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
import { editParams } from '@/api/categories'
export default {
  name: 'AddAttrs',
  props: {
    isShowAttr: {
      type: Boolean,
      required: true
    },
    //判断时动态还是静态
    // activeName: {
    //   type: String,
    //   required: true
    // },
    //级联选择器的id值 数组
    value: {
      type: Array,
      required: true
    },
    // 函数调用
    getSortParmas: {
      type: Function,
      required: true
    },
    AtrrsObj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ruleForm: {
        attr_name: this.AtrrsObj.attr_name
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
    },
    AtrrsObj: {
      deep: true,
      handler(newVal) {
        this.$set(this.ruleForm, 'attr_name', newVal.attr_name)
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const res = await editParams(this.value[2], this.AtrrsObj.attr_id, { attr_name: this.ruleForm.attr_name, attr_sel: 'many', attr_vals: this.attr_vals })
          console.log(res)
          this.getSortParmas()
        }
        this.$message.success('修改成功')
        this.$emit('update:isShowAttr', false)
        this.isShowAttr1 = false
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
