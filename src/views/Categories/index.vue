<template>
  <div class="categories">
    <MyHeader name1="商品管理" name2="商品分类" />
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="isShowSort = true"
          >添加分类</el-button
        >
      </div>
      <!-- 表格区域 -->
      <el-table
        :data="categoriesList"
        row-key="cat_id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="#" width="50px" type="index">
          <template slot-scope="scope">
            <span v-if="scope.row.isIndex">{{ scope.row.parentIndex }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="cat_name" label="分类名称"> </el-table-column>

        <el-table-column label="是否有效">
          <template>
            <i class="el-icon-success"></i>
          </template>
        </el-table-column>

        <el-table-column prop="cat_level" label="排序">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level === 1"
              >二级</el-tag
            >
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页区域 -->
      <div class="page">
        <el-pagination
          :current-page="pagenum"
          :page-sizes="[1, 2, 4, 6, 10]"
          :page-size="pagesize"
          :total="categoriesAbout.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加商品分类弹窗 -->
    <AddSort
      :isShowSort.sync="isShowSort"
      @updateIsShow="isShowSort = $event"
    ></AddSort>
  </div>
</template>

<script>
import AddSort from './components/AddSort.vue'
import { getCategories } from '@/api/categories'
import MyHeader from '@/components/MyHeader'
export default {
  components: { MyHeader, AddSort },
  data() {
    return {
      type: null,
      pagenum: 1,
      pagesize: 4,
      categoriesList: [],
      categoriesAbout: {},
      isShowSort: false
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      try {
        const res = await getCategories({ type: this.type, pagenum: this.pagenum, pagesize: this.pagesize })
        // console.log(res)
        this.categoriesAbout = res.data.data
        const list = res.data.data.result
        //遍历循环 保证索引号就在父级有
        list.forEach((item, index) => {
          item.isIndex = true
          item.parentIndex = index + 1
        })
        this.categoriesList = list
      } catch (e) {
        console.log(e)
      }
    },
    //处理页面条数时触发 返回页面数量
    handleSizeChange(val) {
      this.pagesize = val
      this.getCategories()
    },
    //处理当前页码的时候触发 返回页码值
    handleCurrentChange(val) {
      this.pagenum = val
      this.getCategories()
      // console.log('------' + val)
    }
  }

}
</script>

<style lang="less" scoped>
.el-icon-success {
  color: green;
}
.page {
  margin-top: 20px;
}
</style>
