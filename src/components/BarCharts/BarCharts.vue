<template>
  <div class="barCharts-container" ref="barCharts">

  </div>
</template>

<script>
export default {
  mounted () {
    // 实例化echarts
    const myEcharts = this.$echarts.init(this.$refs.barCharts)
    myEcharts.setOption({
      grid: {
        left: 0,
        top: 1,
        bottom: 0,
        right: 0
      },
      xAxis: {
        type: 'category',
        show: false
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130, 300, 200, 250, 280],
          type: 'bar'
        }
      ]
    })
  }
}
</script>

<style lang="less" scoped>
.barCharts-container {
  width: 100%;
  height: 100%;
}
</style>
