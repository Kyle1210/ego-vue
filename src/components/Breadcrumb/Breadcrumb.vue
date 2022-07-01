<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in breadList" :key="index">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',

  mounted () {
    this.getBreadPath()
  },

  data () {
    return {
      breadList: []
    }
  },

  methods: {
    getBreadPath () {
      this.breadList = this.$route.matched.filter(item => item.meta && item.meta.title)
      // 访问不是首页
      if (this.$route.name !== 'Home') {
        this.breadList = [{ path: '/', meta: { title: '首页' } }].concat(this.breadList)
      }
    }
  },

  watch: {
    // 侦听当前路由
    $route: {
      handler () {
        this.getBreadPath()
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.breadcrumb-container {
  height: 100%;
  /deep/.el-breadcrumb {
    height: 100%;
    line-height: 50px;
  }
}
</style>
