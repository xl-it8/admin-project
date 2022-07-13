<template>
  <div class="addSort">
    <el-dialog title="添加商品分类" :visible.sync="isShowSort1">
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        ref="ruleForm"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="ruleForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            clearable
            :options="sortOptions"
            :props="{
              expandTrigger: 'hover',
              label: 'cat_name',
              checkStrictly: true,
            }"
          ></el-cascader>
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
import { getCategories, addCategories } from '@/api/categories'
export default {
  name: 'AddSort',
  props: {
    isShowSort: {
      type: Boolean,
      required: true
    }
  },
  async mounted() {
    try {
      const res = await getCategories({ type: this.type })
      this.sortOptions = res.data.data
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  },
  data() {
    return {
      //收集到所有相关表单数据
      ruleForm: {
        cat_name: ''
      },
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      type: 2,
      sortOptions: [],
      sortName: [],
      isShowSort1: this.isShowSort,
      cat_pid: '',
      cat_level: 1
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          console.log(this.sortName)
          // eslint-disable-next-line no-undef
          const res = await addCategories({ cat_pid: this.cat_pid, cat_name: this.ruleForm.cat_name, cat_level: this.cat_level })
          console.log(res)
          this.$message.success('创建成功')
          this.$emit('update:isShowSort', false)
          this.isShowSort1 = false
          this.$refs.ruleForm.resetFields(this.ruleForm)
        } else {
          this.$message.error('创建失败')
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields(this.ruleForm)
    }
  },
  watch: {
    isShowSort(newVal) {
      this.isShowSort1 = newVal
    },
    //监听变化 子传父
    isShowSort1(newVal) {
      this.$emit('updateIsShow', newVal)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
