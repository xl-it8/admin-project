<template>
  <div class="params">
    <MyHeader name1="商品管理" name2="分类参数" />
    <el-card>
      <!-- 头部警告 -->
      <div class="topWarn">
        <i class="el-icon-warning"></i>
        <span>注意：只允许为第三级分类设置相关参数！</span>
      </div>
      <!-- 选择第三列表 -->
      <el-form :label-position="labelPosition">
        <el-form-item label="选择商品分类:">
          <el-cascader
            ref="value"
            v-model="value"
            :options="categoriesList"
            :props="{
              expandTrigger: 'hover',
              label: 'cat_name',
              value: 'cat_id',
            }"
            @change="selectShopChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <!-- tabs栏 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button
            type="primary"
            :disabled="isDisabled"
            @click="isShowAttr = true"
            >添加参数</el-button
          >
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <el-button
            type="primary"
            :disabled="isDisabled"
            @click="isShowAttr = true"
            >添加属性</el-button
          >
        </el-tab-pane>
      </el-tabs>

      <!-- 表格内容 -->
      <el-table :data="paramsList">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row>
              <template v-if="inputAttr.length">
                <el-tag
                  style="margin: 0 10px"
                  v-for="(item, index) in inputAttr"
                  :key="index"
                  closable
                  @close="delTag(props.row.attr_id, index)"
                  >{{ item }}</el-tag
                >
              </template>
              <el-input
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native.stop="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                size="small"
                @click="
                  attr_id = props.row.attr_id;
                  inputVisible = true;
                "
                >+ New Tag</el-button
              >
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="attr_name" label="分类名称"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="
                AtrrsObj = scope.row;
                isShowAttr = true;
              "
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delSortParmas(scope.row.attr_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加动态或静态属性弹窗 -->
    <AddAttrs
      :activeName="activeName"
      :isShowAttr="isShowAttr"
      @updateIsShow="isShowAttr = $event"
      :value="value"
      :getSortParmas="getSortParmas"
    />
    <!-- 修改参数弹窗 -->
    <ChangeAttrs
      :isShowAttr="isShowAttr"
      @updateIsShow="isShowAttr = $event"
      :value="value"
      :getSortParmas="getSortParmas"
      :AtrrsObj="AtrrsObj"
    />
  </div>
</template>

<script>
import AddAttrs from './components/AddAttrs.vue'
import ChangeAttrs from './components/ChangeAttrs.vue'
import { getCategories, getSortParmas, delSortParmas, editParams } from '@/api/categories'
//其实完全可以定义全局组件 在main.js中
import MyHeader from '@/components/MyHeader.vue'
export default {
  components: { MyHeader, AddAttrs, ChangeAttrs },
  data() {
    return {
      labelPosition: 'left',
      //选择绑定的值  这里的固定的值 注意 ajax返回的数据 如果没有对应的value,label,children要利用props修改值 与其保持一致
      value: [], //收集到的列表的id
      activeName: 'first',
      categoriesList: [],
      paramsList: [],
      isDisabled: true,
      isShowAttr: false,
      AtrrsObj: {},
      inputVisible: false,
      inputValue: '',
      inputAttr: [],
      attr_id: ''
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
        this.categoriesList = res.data.data
      } catch (e) {
        console.log(e)
      }
    },
    //tab栏点击切换时调用改函数
    handleClick() {
      if (this.value.length <= 0) {
        this.$message.error('请选择三级分类')
      }
      this.selectShopChange()
    },
    async getSortParmas() {
      if (this.activeName === 'first') {
        const res = await getSortParmas(this.value[2], 'many')
        this.paramsList = res.data.data
        console.log(res)
      } else {
        const res = await getSortParmas(this.value[2], 'only')
        this.paramsList = res.data.data
        console.log(res)
      }
    },
    //选择级别该变时调用
    async selectShopChange() {
      const node = this.$refs.value.getCheckedNodes()
      // console.log(node[0])
      if (node[0].level === 2) {
        this.$message.error('请选择三级分类')
        this.isDisabled = true
        return
      }
      this.isDisabled = false
      this.getSortParmas()
      // console.log(this.value) 获取v-model收集的id数组
    },
    //s删除参数
    async delSortParmas(id) {
      await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // console.log(this.value[2])
      try {
        await delSortParmas(this.value[2], id)
        this.getSortParmas()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (e) {
        this.$message({
          type: 'info',
          message: '删除失败!'
        })
      }
    },
    async editParams() {
      const editInputAttr = this.inputAttr.join(' ')
      console.log(this.attr_id)
      if (this.activeName === 'first') {
        try {
          const res = await editParams(this.value[2], this.attr_id, { attr_name: this.inputValue, attr_sel: 'many', attr_vals: editInputAttr })
          this.$message.success('创建成功')
          console.log(res)
        } catch (e) {
          this.$message.error('创建失败')
        }
      } else {
        try {
          const res = await editParams(this.value[2], this.AtrrsObj.attr_id, { attr_name: this.inputValue, attr_sel: 'only', attr_vals: editInputAttr })
          console.log(res)
          this.$message.success('创建成功')
        } catch (e) {
          this.$message.error('创建失败')
        }
      }
    },
    handleInputConfirm() {
      this.inputAttr.push(this.inputValue)
      this.editParams()
      this.inputValue = ''
      this.inputVisible = false
    },
    // 删除tag
    delTag(id, index) {
      const res = delSortParmas(this.value[2], id)
      console.log(res)
      this.inputAttr.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.topWarn {
  padding: 5px 5px;
  margin-bottom: 10px;
  background-color: #fdf6ec;
  color: #e6a23c;
  span {
    margin-left: 5px;
    font-size: 13px;
    line-height: 18px;
  }
}

.el-input {
  width: 82px;
}
</style>
