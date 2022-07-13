<template>
  <div class="goods">
    <MyHeader name1="商品管理" name2="商品列表" />
    <el-card>
      <!-- 头部 -->
      <div slot="header" class="ipt">
        <el-input placeholder="请输入内容" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" style="margin-left: 20px" @click="$router.push('/goods/add')">添加商品</el-button>
      </div>
      <!-- 表格区域 -->
      <el-table :data="goodsList" stripe >
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="500px">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.add_time | dateFormate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
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
          :page-sizes="[1, 5, 10, 15]"
          :page-size="pagesize"
          :total="goodsAbout.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getGoodsData } from '@/api/goods'
import MyHeader from '@/components/MyHeader.vue'
export default {
  components: { MyHeader },
  data() {
    return {
      goodsList: [],
      goodsAbout: {},
      query: null,
      pagenum: 1,
      pagesize: 5
    }
  },
  mounted() {
    this.getGoodsData()
  },
  methods: {
    //得到商品数据
    async getGoodsData() {
      try {
        const res = await getGoodsData({ query: this.query, pagenum: this.pagenum, pagesize: this.pagesize })
        this.goodsAbout = res.data.data
        this.goodsList = this.goodsAbout.goods
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    //处理页面条数时触发 返回页面数量
    handleSizeChange(val) {
      this.pagesize = val
      this.getGoodsData()
    },
    //处理当前页码的时候触发 返回页码值
    handleCurrentChange(val) {
      this.pagenum = val
      this.getGoodsData()
    }
  }
}

</script>

<style lang="less" scoped>
.ipt {
  display: flex;
  .el-input-group {
    width: 300px;
  }
  .addUser {
    margin-left: 20px;
  }
}
.page {
  margin-top: 20px;
}
</style>
