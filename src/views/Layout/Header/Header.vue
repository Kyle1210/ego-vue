<template>
  <div class="header-container">
    <div class="breadcrumb">
      <transition name="el-fade-in-linear" mode="out-in">
        <Breadcrumb></Breadcrumb>
      </transition>
    </div>
    <div class="avatar">
      <el-dropdown trigger="click">
      <span class="el-dropdown-link">
       <img :src="userInfo.avatar" height="45px" width="45px">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('user', ['userInfo'])
  },

  methods: {
    logout () {
      // 派发actions
      this.$store.dispatch('user/logout').then(() => {
        location.reload()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .breadcrumb {
      height: 100%;
  }
  .avatar {
    width: 45px;
    height: 45px;
    padding: 2px 0;
  }
}
</style>
