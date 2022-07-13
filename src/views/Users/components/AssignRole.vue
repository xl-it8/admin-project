<template>
  <div class="AssignRole">
    <el-dialog title="分配角色" :visible.sync="isShowRole">
      <div class="main">
        当前的用户: <span>admin</span>  <br/>
        当前的角色:<span>超级管理员</span> <br/>
        分配新角色:
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.value
            }}</span>
          </el-option>
        </el-select> 
      </div>
      <div slot="footer">
        <el-button @click="$emit('update:isShowRole', false)">取 消</el-button>
        <el-button type="primary" @click="sureAssign">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AssignRole',
  props: {
    isShowRole: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      value: '',
      cities: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Nanjing',
        label: '南京'
      }, {
        value: 'Chengdu',
        label: '成都'
      }, {
        value: 'Shenzhen',
        label: '深圳'
      }, {
        value: 'Guangzhou',
        label: '广州'
      }]
    }
  },
  mounted() {
  },
  methods: {
    //确定分配角色
    sureAssign() {
      // this.$message.success('编辑用户成功')
      this.$emit('update:isShowRole', false)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
