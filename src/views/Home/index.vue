<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <div class="left-logo">
        <img src="" alt="" />
        <span>后台管理系统</span>
      </div>
      <div class="right">
        <el-button type="info" @click="signOut">退出</el-button>
      </div>
    </el-header>

    <el-container>
      <!-- 侧边 -->
      <!-- <el-aside :style="isCollapse ? { width: '64px' } : { width: '200px ' }"> -->
      <el-menu
        unique-opened
        router
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#02ac42"
        text-color="#fff"
      >
        <!-- 点击切换按钮 -->
        <div
          :style="isCollapse ? { width: '64px' } : { width: '200px' }"
          class="toggleMenu"
          @click="isCollapse = !isCollapse"
        >
          |||
        </div>

        <el-submenu :index="obj.id + ''" v-for="obj in menuList" :key="obj.id">
          <template slot="title">
            <i :class="'el-icon-' + obj.icon"></i>
            <span slot="title">{{ obj.authName }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="item.path"
              v-for="item in obj.children"
              :key="item.id"
            >
              <i class="el-icon-menu"></i>
              {{ item.authName }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <!-- </el-aside> -->
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenus } from '@/api/admin'
export default {
  name: 'Home',
  data() {
    return {
      isCollapse: true,
      menuList: [],
      iconList: ['s-custom', 's-management', 's-shop', 's-order', 's-platform'
      ]
    }
  },
  mounted() {
    this.getMenus()
  },
  methods: {
    async getMenus() {
      try {
        const res = await getMenus()
        this.menuList = res.data.data.map((item, index) => {
          item.icon = this.iconList[index]
          return item
        })
        // console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    signOut() {
      this.$store.commit('saveUser', {})
      this.$router.push('/login')
    },
    handleOpen() {

    },
    handleClose() { }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  .el-header {
    background-color: #02ac42;
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    .left-logo {
      color: #fff;
      font-size: 22px;
      margin-left: 10px;
    }
    .el-button--info {
      background-color: #90d4ab;
      border: none;
    }
  }
  .toggleMenu {
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    background-color: #90d4ab;
    color: #fff;
    text-align: center;
  }

  .el-menu {
    border: none;
  }
  .el-main {
    background: url("https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/f3d3572c11dfa9ec0f3dfeb665d0f703918fc104.jpg")
      no-repeat 0 0 / cover;
  }
}
</style>
