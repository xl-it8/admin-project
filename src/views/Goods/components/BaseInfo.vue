<template>
  <el-form :label-position="labelPosition">
    <el-form-item label="商品名称">
      <el-input></el-input>
    </el-form-item>

    <el-form-item label="商品价格">
      <el-input-number
        controls-position="right"
      ></el-input-number>
    </el-form-item>

    <el-form-item label="商品重量">
      <el-input-number
        controls-position="right"
      ></el-input-number>
    </el-form-item>

    <el-form-item label="商品数量">
      <el-input-number
        controls-position="right"
      ></el-input-number>
    </el-form-item>

    <el-form-item label="商品分类">
      <el-cascader :props="{ expandTrigger: 'hover' }"></el-cascader>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      labelPosition:'top',
      goodsInfo:{},
    }
  }
}
</script>

<style lang="less" scoped>
.el-input-number {
  width: 100%;
  /deep/ .el-input__inner {
    text-align: left !important;
  }
}
</style>
