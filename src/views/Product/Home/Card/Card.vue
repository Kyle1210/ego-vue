<template>
  <el-card>
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-content">
      <slot name="content"></slot>
    </div>
    <div class="card-charts">
     <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  color: #D0CFD0;
}
.card-content {
  margin-top: 5px;
  font-size: 30px;
  // text-indent: -5px;
}
.card-charts {
  position: relative;
  height: 80px;
  border-bottom: 1px solid #F7F5F7;
}
.card-footer {
  padding-top: 10px;
}
</style>
