<template>
  <div class="roles">
    <MyHeader name1="权限管理" name2="角色列表" />
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" round>添加角色</el-button>
      </div>
      <!-- 表格区域 -->
      <el-table :data="rolesList" border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row v-for="(item, index) in props.row.children" :key="index">
              <el-col :span="8" :push="2">
                <div>
                  <el-tag>{{ item.authName }} </el-tag>
                  <i class="el-icon-caret-right"></i>
                </div>
              </el-col>
              <el-col :span="16">
                <div
                  v-for="(item1, index) in item.children"
                  :key="index"
                  class="rolesMian"
                >
                  <div>
                    <el-tag type="success">{{ item1.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </div>
                  <div>
                    <span v-for="(item2, index) in item1.children" :key="index"
                      ><el-tag
                        closable
                        @close="delRights(props.row.id, item2.id)"
                        >{{ item2.authName }}</el-tag
                      ></span
                    >
                  </div>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="assignRights(scope.row.id)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限弹窗 -->
    <el-dialog title="分配权限" :visible.sync="isShowRoles">
      <el-tree
        :data="rightsList"
        show-checkbox
        node-key="id"
        ref="tree"
        highlight-current
        :props="{ label: 'authName' }"
      >
      </el-tree>
      <div slot="footer">
        <el-button @click="isShowRoles = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedId">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAuthority } from '@/api/admin'
import { getRoles, delRoles, assignRights } from '@/api/role'
import MyHeader from '@/components/MyHeader.vue'
export default {
  name: 'Roles',
  components: { MyHeader },
  data() {
    return {
      rolesList: [],
      rightsList: [],
      isShowRoles: false,
      rolesId: ''
    }
  },
  mounted() {
    this.getRoles()
  },
  methods: {
    async getRoles() {
      try {
        const res = await getRoles()
        this.rolesList = res.data.data
        // console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    // 删除权限
    async delRights(rolesId, rightsId) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await delRoles(rolesId, rightsId)
        const returnRoles = res.data.data
        this.rolesList.forEach(item => {
          if (item.id === rolesId) {
            item.children = returnRoles
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // console.log(res)
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消删除!'
        })
      }
    },
    //分配权限
    async assignRights(id) {
      // console.log(rolesId)
      this.rolesId = id
      this.isShowRoles = true
      try {
        const res = await getAuthority('tree')
        this.rightsList = res.data.data
        // console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    async getCheckedId() {
      const res = this.$refs.tree.getHalfCheckedKeys()
      const res1 = this.$refs.tree.getCheckedKeys()
      const IdArr = [...res, ...res1]
      const IdStr = IdArr.join(',')
      try {
        await assignRights(this.rolesId, IdStr)
        // console.log(result)fh7
        this.getRoles()
        this.$message.success('更新成功')
      } catch (e) {
        console.log(e)
      }
    }
  }

}
</script>

<style lang="less" scoped>
.el-row {
  margin: 10px 0;
  .el-tag {
    margin: 10px 10px;
  }
  .el-tag--success {
    margin: 10px 2px;
  }
  .rolesMian {
    display: flex;
    div {
      &:last-child {
        padding-left: 50px;
      }
    }
  }
}
</style>
