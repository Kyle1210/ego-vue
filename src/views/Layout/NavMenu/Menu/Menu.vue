<template>
  <!-- 判断是否有子节点，没有的话渲染出来，有的话继续判断 <递归> -->
  <div>
    <!-- 没有子节点 -->
    <el-menu-item :index="path" v-if="!route.children">
      <!-- icon 图标 -->
      <i :class="route.meta.icon"></i>
      <!-- title 标题 -->
      <span>{{route.meta.title}}</span>
    </el-menu-item>

    <!-- 有子节点 -->
    <el-Submenu :index="path" v-else>
      <template slot="title">
        <!-- icon 图标 -->
        <i :class="route.meta.icon"></i>
        <!-- title 标题 -->
        <span>{{route.meta.title}}</span>
      </template>
      <!-- 继续判断有没有子节点 -- 递归 -->
      <Menu v-for="item in route.children" :key="item.path" :route="item" :path="path +'/'+ item.path"></Menu>
    </el-Submenu>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    route: {
      type: Object
    },
    path: {
      type: String
    }
  }
}
</script>

<style>
</style>
