<template>
  <div class="rights">
    <MyHeader name1="权限管理" name2="权限列表" />
    <!-- 权限列表 -->
    <el-card>
      <el-table :data="rightsList" stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">等级一</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'"
              >等级二</el-tag
            >
            <el-tag type="warning" v-else>等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAuthority } from '@/api/admin'
import MyHeader from '@/components/MyHeader.vue'
export default {
  components: { MyHeader },
  data() {
    return {
      rightsList: []
    }
  },
  async mounted() {
    try {
      const res = await getAuthority('list')
      this.rightsList = res.data.data
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

}
</script>

<style>
</style>
