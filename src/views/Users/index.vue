<template>
  <div>
    <MyHeader name1="用户管理" name2="用户列表" />
    <el-card>
      <div slot="header" class="ipt">
        <el-input
          placeholder="请输入内容"
          v-model.trim="filterContext"
          clearable
          @clear="clearIpt"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="filterUserInfo"
          ></el-button>
        </el-input>
        <!-- 添加用户弹窗 -->
        <UserDialog @getOneUser="addUser" />
      </div>
      <!-- 表格内容 -->
      <div class="table-user">
        <el-table :data="userList" stripe style="width: 100%">
          <el-table-column prop="id" label="#"> </el-table-column>
          <el-table-column prop="username" label="姓名" >
          </el-table-column>
          <el-table-column prop="mobile" label="电话" >
          </el-table-column>
          <el-table-column prop="role_name" label="角色" >
          </el-table-column>
          <el-table-column prop="mg_state" label="状态" >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                @change="changeStatus(scope.row.id, scope.row.mg_state)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="fn(scope.row)"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-delete"
                @click="delUser(scope.row)"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-setting"
                @click="isShowRole = true"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 编辑用户弹窗 -->
        <EditUser
          :dialogVisible.sync="dialogVisible"
          :person="person"
          @updateData="updateUserInfo"
        />
        <!-- 分配角色弹窗 -->
        <AssignRole :isShowRole.sync="isShowRole"></AssignRole>
        <!-- 底部页面 -->
      </div>
      <div class="page">
        <el-pagination
          :current-page="pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="pagesize"
          :total="userAbout.total"
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
import { getUserList, putUserStatus, delUser } from '@/api/user'
import MyHeader from '@/components/MyHeader.vue'
import UserDialog from './components/UserDialog.vue'
import EditUser from './components/EditUser.vue'
import AssignRole from './components/AssignRole'
export default {
  components: { MyHeader, UserDialog, EditUser, AssignRole },
  data() {
    return {
      input: '',
      userList: [],
      userAbout: {},
      //当前页码
      pagenum: 1,
      //每页显示条数
      pagesize: 5,
      //筛选条件
      query: null,
      filterContext: '',
      dialogVisible: false,
      isShowRole: false,
      person: {}
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    //得到用户数据
    async getUserList() {
      try {
        const res = await getUserList({ query: this.query, pagenum: this.pagenum, pagesize: this.pagesize })
        this.userAbout = res.data.data
        this.userList = this.userAbout.users
        // console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    // 修改用户状态
    async putUserStatus(uid, status) {
      try {
        const res = await putUserStatus(uid, status)
        this.userList = this.userList.map(item => {
          if (item.uid === uid) {
            item.mg_state = Boolean(res.data.data.mg_state)
            return item
          } else {
            return item
          }
        })
        // console.log(this.userList)
      } catch (e) {
        console.log(e)
      }
    },
    async changeStatus(id, status) {
      // console.log(id, status)
      await this.putUserStatus(id, status)
      this.$message.success('修改状态成功')
    },
    //处理页面条数时触发 返回页面数量
    handleSizeChange(val) {
      this.pagesize = val
      this.getUserList()
    },
    //处理当前页码的时候触发 返回页码值
    handleCurrentChange(val) {
      this.pagenum = val
      this.getUserList()
      // console.log('------' + val)
    },
    //添加用户
    addUser(personObj) {
      // console.log(personObj)
      this.userList.push(personObj)
      this.getUserList()
    },
    //筛选用户信息
    filterUserInfo() {
      this.query = this.filterContext
      this.getUserList()
    },
    //清空输入内容时调用
    clearIpt() {
      this.query = null
      this.getUserList()
    },
    //通过id获取用户信息
    fn(PersonObj) {
      this.person = PersonObj
      this.dialogVisible = true
    },
    //删除用户信息
    async delUser(person) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await delUser(person.id)
        console.log(res)
        const msg = res.data.meta.msg.substr(0, 3)
        if (msg === '不允许') {
          this.$message({
            type: 'info',
            message: '删除失败'
          })
          return
        }
        this.getUserList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    // //更新用户信息
    updateUserInfo(personInfo) {
      const index = this.userList.findIndex(item => item.id === personInfo.id)
      this.userList.splice(index, 1, personInfo)
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
