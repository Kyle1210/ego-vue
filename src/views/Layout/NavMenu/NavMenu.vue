<template>
  <div class="navMenu-container">
    <el-menu router="" :default-active="$route.path" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <Menu v-for="(route, index) in routeList" :key="index" :route="route" :path="route.path"></Menu>
    </el-menu>
  </div>
</template>

<script>
import Menu from '@/views/Layout/NavMenu/Menu/Menu'
export default {
  // <div v-for="route in routeList" :key="route.path">
  //       <!-- 无子菜单 -->
  //       <el-menu-item :index="route.path" v-if="!route.children">
  //           <i :class="route.meta.icon"></i>
  //           <span slot="title">{{route.meta.title}}</span>
  //         </el-menu-item>
  //       <!-- 有子菜单 -->
  //       <el-submenu :index="route.path" v-else>
  //         <template slot="title">
  //           <i :class="route.meta.icon"></i>
  //           <span>{{route.meta.title}}</span>
  //         </template>
  //         <el-menu-item :index="route.path +'/'+ item.path" v-for="item, in route.children" :key="item.path">
  //           <template slot="title">
  //             <span>{{item.meta.title}}</span>
  //           </template>
  //         </el-menu-item>
  //       </el-submenu>
  //     </div>
  name: 'NvaMenu',
  components: {
    Menu
  },

  mounted () {
    this.routeList = this.$router.options.routes.filter(item => item.name === 'Layout')
    this.routeList = this.routeList[0].children
  },

  data () {
    return {
      routeList: []
    }
  }
}
</script>
<style lang="less" scoped>
.navMenu-container {
  height: 100%;
  /deep/.el-menu {
    height: 100%;
    border: none;
    i {
      margin-right: 10px;
    }

  }
}
</style>
