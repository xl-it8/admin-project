<template>
  <div class="orders">
    <MyHeader name1="订单管理" name2="订单列表" />
    <el-card>
      <!-- 头部 -->
      <div slot="header" class="ipt">
        <el-input placeholder="请输入内容" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <!-- 表格区域 -->
      <el-table :data="ordersList" stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column prop="order_pay" label="是否付款">
          <template slot-scope="scope">
            <el-tag type="danger">{{
              scope.row.order_pay !== "0" ? "已支付" : "未支付"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="update_time" label="下单时间">
          <template slot-scope="scope">
            <span>{{ scope.row.update_time | dateFormate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pay_status" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click.native="dialogVisible = true"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 修改收获地址弹窗 -->
    <el-dialog title="修改收获地址" :visible.sync="dialogVisible">
      <el-cascader
        :options="cityOptions"
         change-on-select
      >
      </el-cascader>
      <div slot="footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cityOptions from '@/utils/city_data2017_element.js'
import { getOrderList } from '@/api/order'
import MyHeader from '@/components/MyHeader'
export default {
  components: { MyHeader },
  data() {
    return {
      cityOptions: cityOptions,
      ordersList: [],
      ordersAbout: {},
      query: null,
      pagenum: 1,
      pagesize: 10,
      dialogVisible: false,
      address: '',
      addressList: []
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      try {
        const res = await getOrderList({ query: this.query, pagenum: this.pagenum, pagesize: this.pagesize })
        this.ordersAbout = res.data.data
        this.ordersList = this.ordersAbout.goods
        console.log(res)
      } catch (e) {
        console.log(e)
      }
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
</style>
