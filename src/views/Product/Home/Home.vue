<template>
  <div class="home-container">
    <!-- 上面部分 -->
    <div class="top-box">
      <el-row :gutter="10">
        <el-col :span="6">
          <Card>
            <template #header>
              <span>总销售额</span>
              <i class="el-icon-info"></i>
            </template>
            <template #content>
              <span>￥126560</span>
            </template>
            <template #charts>
              <div class="text">
                <span>周同比</span>
                <span>56.67%<i class="iconfont icon-sanjiaoshang1"></i></span>
                <span>日同比</span>
                <span>19.16%<i class="iconfont icon-sanjiaoxia1"></i></span>
              </div>
            </template>
            <template #footer>
              <span>日销售额￥&nbsp;12423</span>
            </template>
          </Card>
        </el-col>
        <el-col :span="6">
          <Card>
            <template #header>
              <span>访问量</span>
              <i class="el-icon-info"></i>
            </template>
            <template #content>
              <span>88460</span>
            </template>
            <template #charts>
              <LineCharts></LineCharts>
            </template>
            <template #footer>
              <span>日访问量&nbsp;1234</span>
            </template>
          </Card>
        </el-col>
        <el-col :span="6">
          <Card>
            <template #header>
              <span>支付笔数</span>
              <i class="el-icon-info"></i>
            </template>
            <template #content>
              <span>88460</span>
            </template>
            <template #charts>
              <BarCharts></BarCharts>
            </template>
            <template #footer>
              <span>转化率&nbsp;65%</span>
            </template>
          </Card>
        </el-col>
        <el-col :span="6">
          <Card>
            <template #header>
              <span>运营活动效果</span>
              <i class="el-icon-info"></i>
            </template>
            <template #content>
              <span>78%</span>
            </template>
            <template #charts>
              <ProgressBar></ProgressBar>
            </template>
            <template #footer>
              <div class="footer">
                <span>周同比</span>
                <span>12%<i class="iconfont icon-sanjiaoshang1"></i></span>
                <span>日同比</span>
                <span>11%<i class="iconfont icon-sanjiaoxia1"></i></span>
              </div>
            </template>
          </Card>
        </el-col>
      </el-row>
    </div>
    <!-- 销售额部分 -->
    <div class="sale-box">
      <el-card>
        <!-- @tab-click="handleClick" -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="销售额" name="sale">
            <div class="saleBar" ref="saleBar"></div>
          </el-tab-pane>
          <el-tab-pane label="访问量" name="vasit">
            <div class="visitBar" ref="visitBar"></div>
          </el-tab-pane>
        </el-tabs>
        <!-- 右侧时间选择部分 -->
        <div class="dataSelect">
          <span>今日</span>
          <span>本周</span>
          <span>本月</span>
          <span>本年</span>
          <el-date-picker size="mini" v-model="value1" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <!-- 排行部分 -->
        <div class="rankList">
          <h4>门店访问排行</h4>
          <ul>
            <li>
              <span>1</span>
              <span>麦当劳</span>
              <span>211,335</span>
            </li>
            <li>
              <span>2</span>
              <span>肯德基</span>
              <span>210,597</span>
            </li>
            <li>
              <span>3</span>
              <span>必胜客</span>
              <span>200,998</span>
            </li>
            <li>
              <span>4</span>
              <span>海底捞</span>
              <span>199,220</span>
            </li>
            <li>
              <span>5</span>
              <span>西贝莜面村</span>
              <span>195,444</span>
            </li>
            <li>
              <span>6</span>
              <span>汉堡王</span>
              <span>180,161</span>
            </li>
            <li>
              <span>7</span>
              <span>真功夫</span>
              <span>172,995</span>
            </li>
          </ul>
        </div>
      </el-card>
    </div>
    <!-- 销售额类别占比 -->
    <el-card>
      <div class="ratio" ref="ratio">

      </div>
    </el-card>
  </div>
</template>

<script>
import Card from '@/views/Product/Home/Card/Card'
import LineCharts from '@/components/LineCharts/LineCharts'
import BarCharts from '@/components/BarCharts/BarCharts'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
export default {
  mounted () {
    const Mycharts = this.$echarts.init(this.$refs.saleBar)
    Mycharts.setOption({
      title: {
        text: '销售额趋势',
        left: '85px',
        top: '50px'
      },
      grid: {
        top: '100px'
      },
      xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130, 200, 90, 250, 120, 150],
          type: 'bar',
          showBackground: true,
          color: 'skyblue',
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          barWidth: '50px'
        }
      ]
    })
    const pieCharts = this.$echarts.init(this.$refs.ratio)
    pieCharts.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '销售额类别占比',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '视频广告' },
            { value: 735, name: '联盟广告' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '直接访问' },
            { value: 300, name: '搜索引擎' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  },
  components: {
    Card,
    LineCharts,
    BarCharts,
    ProgressBar
  },
  data () {
    return {
      value1: '',
      activeName: 'sale'
    }
  },
  methods: {
    handleClick (tab, event) {
      const visitBar = this.$echarts.init(this.$refs.visitBar)
      visitBar.setOption({
        title: {
          text: '访问量',
          left: '85px',
          top: '50px'
        },
        grid: {
          top: '100px'
        },
        xAxis: {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [20, 20, 10, 5, 60, 10, 8, 30, 6, 70, 100, 150],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            },
            barWidth: '50px'
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  position: relative;
  .text {
    font-size: 15px;
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 90%;
    display: flex;
    justify-content: space-between;

    .icon-sanjiaoshang1 {
      color: red;
      margin-left: 5px;
    }
    .icon-sanjiaoxia1 {
      color: greenyellow;
      margin-left: 5px;
    }
  }
  .footer {
    font-size: 15px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    .icon-sanjiaoshang1 {
      color: red;
      margin-left: 5px;
    }
    .icon-sanjiaoxia1 {
      color: greenyellow;
      margin-left: 5px;
    }
  }
  .sale-box {
    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;
    .dataSelect {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 15px;
      span {
        margin-right: 20px;
      }
    }
    /deep/.el-tabs__item {
      font-size: 20px;
    }
    .saleBar {
      height: 500px;
      width: 1200px;
    }
    .visitBar {
      height: 500px;
      width: 1200px;
    }
  }
  .rankList {
    position: absolute;
    right: 40px;
    top: 85px;
    width: 420px;
    height: 380px;
    ul {
      padding: 0;
      margin: 0;
      list-style-type: none;
      li {
        margin: 40px 0;
        & span:first-child {
          width: 10px;
          margin-right: 20px;
        }
        span {
          display: inline-block;
          width: 100px;
        }
        & span:nth-child(2) {
          margin: 0 60px 0 10px;
        }
      }
    }
  }
  .ratio {
    width: 100%;
    height: 500px;
  }
}
</style>
