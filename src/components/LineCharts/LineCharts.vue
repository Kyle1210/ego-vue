<template>
  <div class="line-container" ref="lineCharts">

  </div>
</template>

<script>
export default {
  mounted () {
    // 实例化echarts
    const myEcharts = this.$echarts.init(this.$refs.lineCharts)
    myEcharts.setOption({
      grid: {
        left: -20,
        top: 1,
        bottom: 0,
        right: -20
      },
      xAxis: {
        show: false,
        type: 'category'
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [
        {
          data: [100, 30, 500, 20, 180, 50, 300, 100, 300, 500],
          type: 'line',
          smooth: true,
          symbol: 'none',
          color: 'purple',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [ // 渐变颜色
                {
                  offset: 0,
                  color: 'purple'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ],
              global: false
            }
          }

        }
      ]
    })
  }
}
</script>

<style lang="less" scoped>
.line-container {
  width: 100%;
  height: 100%;
}
</style>
