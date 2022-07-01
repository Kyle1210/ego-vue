<template>
  <div class="sku-container">
    <el-card>
      <!-- 表格 -->
      <el-table border :data="skuList" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column prop="skuName" label="名称" width="250">
        </el-table-column>
        <el-table-column prop="skuDesc" label="描述" width="250">
        </el-table-column>
        <el-table-column prop="prop" label="默认图片" width="100" align="center">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" alt="" style="width: 100%; height: 100%">
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量(KG)" width="250">
        </el-table-column>
        <el-table-column prop="price" label="价格(元)" width="250">
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width" align="center">
          <template slot-scope="{row}">
            <el-button type="success" v-if="row.isSale === 0" icon="el-icon-upload2" @click="onSale(row)" size="mini" :loading="loading"></el-button>
            <el-button type="info" v-else icon="el-icon-download" size="mini" @click="cancelSale(row)" :loading="loading"></el-button>
            <el-button type="info" icon="el-icon-info" @click="showSkuInfo(row)" size="mini" :loading="loading"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteSku(row)" :loading="loading"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="limit" layout="prev, pager, next, jumper, -> ,total, sizes" :total="total">
      </el-pagination>
    </div>
    <!-- sku详情 -->
    <div class="skuInfo">
      <el-drawer :visible.sync="drawer" :with-header="false" size="50%" @closed="closeDrawrer">
        <el-row gutter.number="15">
          <el-col :span="4">
            名称
          </el-col>
          <el-col :span="20">
            {{skuInfo.skuName}}
          </el-col>
        </el-row>
        <el-row gutter.number="15">
          <el-col :span="4">
            描述
          </el-col>
          <el-col :span="20">
            {{skuInfo.skuDesc}}
          </el-col>
        </el-row>
        <el-row gutter.number="15">
          <el-col :span="4">
            价格
          </el-col>
          <el-col :span="20">
            {{skuInfo.price}}
          </el-col>
        </el-row>
        <el-row gutter.number="15">
          <el-col :span="4">
            平台属性
          </el-col>
          <el-col :span="20">
            <el-tag type="success" v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{item.skuId}} - {{item.valueId}}</el-tag>
          </el-col>
        </el-row>
        <el-row gutter.number="15">
          <el-col :span="4">
            商品图片
          </el-col>
          <el-col :span="20">
            <el-carousel height="650px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { reqGetSkuList, reqCancel, reqOnSale, reqGetSkuInfoById, reqDeleteSkuById } from '@/api/sku/sku.js'
export default {
  mounted () {
    this.getSkuList()
  },
  data () {
    return {
      loading: false,
      drawer: false,
      skuList: [],
      currentPage: 1,
      limit: 10,
      total: 0,
      skuInfo: {}
    }
  },
  methods: {
    // 删除sku
    async deleteSku (row) {
      this.loading = true
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await reqDeleteSkuById(row.id)
        if (res.code === 200) {
          this.$message.success('删除成功')
          this.getSkuList()
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    closeDrawrer () {
      this.skuInfo = {}
    },

    // 显示sku
    async showSkuInfo (row) {
      this.loading = true
      this.drawer = true
      const { data: res } = await reqGetSkuInfoById(row.id)
      if (res.code === 200) {
        this.loading = false
        this.skuInfo = res.data
      }
    },

    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.getSkuList()
    },

    handleSizeChange (limit) {
      this.limit = limit
      this.getSkuList()
    },

    // 获取sku列表数据
    async getSkuList () {
      const { data: res } = await reqGetSkuList(this.currentPage, this.limit)
      if (res.code === 200) {
        this.total = res.data.total
        this.skuList = res.data.records
      }
    },

    // 下架sku
    async cancelSale (row) {
      this.loading = true
      const { data: res } = await reqCancel(row.id)
      if (res.code === 200) {
        this.$message.success('下架成功')
        this.getSkuList()
        this.loading = false
      } else {
        this.$message.error(res.data || '未知错误')
        this.loading = false
      }
    },

    // 上架sku
    async onSale (row) {
      this.loading = true
      const { data: res } = await reqOnSale(row.id)
      if (res.code === 200) {
        this.$message.success('上架成功')
        this.getSkuList()
        this.loading = false
      } else {
        this.$message.error('上架失败')
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sku-container {
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  .skuInfo {
    .el-drawer {
      .el-col-4 {
        margin-top: 20px;
        text-align: right;
        font-weight: bold;
        font-size: 20px;
      }
      .el-col-20 {
        font-size: 20px;
        margin-top: 20px;
        padding-left: 20px;
      }
      .el-carousel img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
