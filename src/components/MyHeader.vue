<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ name1 }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ name2 }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    name1: {
      type: String,
      required: true
    },
    name2: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>
