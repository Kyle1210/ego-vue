<template>
  <div class="progress-container" ref="progressBar"></div>
</template>

<script>
export default {
  mounted () {
    // 实例化echarts
    const myEcharts = this.$echarts.init(this.$refs.progressBar)
    myEcharts.setOption({
      grid: {
        left: 5,
        right: 5
      },
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          data: [78],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          barWidth: '20px',
          color: '#8FBE3F'
        }
      ]
    })
  }
}
</script>

<style lang="less" scoped>
.progress-container {
  width: 100%;
  height: 100%;
}
</style>
