<template>
  <div class="layout-container">
    <el-container class="container">
      <el-aside width="200px">
        <NavMenu></NavMenu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <Header></Header>
        </el-header>
        <el-main>
            <AppMain></AppMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from '@/views/Layout/NavMenu/NavMenu'
import AppMain from '@/views/Layout/AppMain/AppMain'
import Header from '@/views/Layout/Header/Header'
export default {
  name: 'Layout',
  components: {
    NavMenu,
    AppMain,
    Header
  }
}
</script>

<style lang="less">
.layout-container {
  background-size: 100%;
  width: 100%;
  height: 100%;
  .container {
    height: 100%;
  }
}
</style>
