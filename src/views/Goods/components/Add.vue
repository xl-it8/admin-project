<template>
  <div class="add">
    <el-card class="box-card">
      <div class="header">
        <i class="el-icon-info"></i>
        <span>添加商品信息</span>
      </div>
      <!-- 步骤条 -->
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab区域 -->
      <el-tabs :tab-position="tabPosition" @tab-click="next">
        <el-tab-pane label="基本信息">
          <BaseInfo />
        </el-tab-pane>

        <el-tab-pane label="商品参数">
          <div
            class="shopParams"
            v-for="(item, index) in shopParamsList"
            :key="index"
          >
            <div class="title">{{ item.attr_name }}</div>
            <el-checkbox
              v-for="(item, index) in item.attr_vals.split(' ')"
              :key="index"
              v-model="checked1"
              :label="item"
              border
            ></el-checkbox>
          </div>
        </el-tab-pane>

        <el-tab-pane label="商品属性">
          <div
            class="shopAttrs"
            v-for="(item, index) in shopAttrsList"
            :key="index"
          >
            <div class="title">{{ item.attr_name }}</div>
            <el-input v-model="input"></el-input>
          </div>
        </el-tab-pane>

        <el-tab-pane label="商品图片">
          <el-upload
            action="http://liufusong.top:8899/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>

        <el-tab-pane label="商品内容">
          <VueEditor v-model="content" />
          <el-button type="primary" style="margintop: 20px">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getSortParmas, upload } from '@/api/categories'
//局部引入富文本
import { VueEditor } from 'vue2-editor'
import BaseInfo from './BaseInfo.vue'
export default {
  name: 'Add',
  components: { BaseInfo, VueEditor },
  data() {
    return {
      tabPosition: 'left',
      active: 0,
      checked1: true,
      input: '',
      fileList: [],
      content: 'insert text here ...',
      shopParamsList: [],
      shopAttrsList: []
    }
  },
  // mounted() {
  //   this.getSortParmas()
  // },
  methods: {
    next(value) {
      console.log(value.index)
      if (value.index === 0) {
        this.active = 0
      }
      if (value.index === '1') {
        this.getSortParmas('many')
      }
      if (value.index === '2') {
        this.getSortParmas('only')
        this.shopAttrsList = this.shopParamsList
      }
      // if (value.index < this.active) {
      //   this.active = value.index - 1
      // }
      // if (value.index > this.active) {
      //   this.active = value.index - 1
      // }
      if (value.index !== this.active) {
        this.active = value.index - 1
      }
      this.active++
    },
    async getSortParmas(sel) {
      try {
        const res = await getSortParmas(6, sel)
        this.shopParamsList = res.data.data
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    async handlePreview(file) {
      // console.log(file)
      // try {
      //   const res = await upload(file)
      //   console.log(res)
      // } catch (e) {
      //   console.log(e)
      // }
    },
    handleRemove(file) {
      // console.log(file)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  background-color: #f4f4f5;
  color: #909399;
  text-align: center;
  font-size: 13px;
  margin-bottom: 10px;
}
</style>
