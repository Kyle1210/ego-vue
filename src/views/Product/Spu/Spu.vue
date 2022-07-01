<template>
  <div class="container-spu">
    <el-card>
      <!-- 三级联动 -->
      <ThreeLevelLinkage @getCategory1And2And3Id="getCategory1And2And3Id" :isShow="isShow===1?true:false"></ThreeLevelLinkage>
    </el-card>
    <el-card class="spu-box">
      <div v-show="isShow === 1">
        <!-- 添加按钮 -->
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addSpu" :disabled="!categoryId">添加spu</el-button>
        <!-- 表格区域 -->
        <el-table border style="width: 100%" :data="spuList">
          <el-table-column type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column label="SPU操作" width="width">
            <template slot-scope="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="editSpu(row)">编辑SPU</el-button>
              <!-- <el-button type="info" icon="el-icon-info" size="mini"></el-button> -->
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteSpu(row)">删除SPU</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页
      @current-change="handleCurrentChange"-->
        <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange"  :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="limit" layout="prev, pager, next, jumper,  ->, sizes, total" :total="total">
        </el-pagination>
      </div>
      <AddSpu v-if="isShow===2" ref="addOrEditSpu" @showSpu="showSpu"></AddSpu>
    </el-card>
  </div>
</template>

<script>
import { reqGetSpuList, reqDeleteSpuById } from '@/api/spu/spu.js'
import AddSpu from '@/views/Product/Spu/AddSpu/AddSpu'
export default {
  components: {
    AddSpu
  },
  data () {
    return {
      currentPage: 0,
      limit: 10,
      total: 0,
      categoryId: null,
      spuList: [],
      // 1:显示spu列表 2:显示添加、编辑页面 3:显示添加sku
      isShow: 1
    }
  },

  methods: {

    handleSizeChange (limit) {
      this.limit = limit
      this.getSpuList()
    },

    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      // 刷新
      this.getSpuList()
    },
    // 删除spu
    deleteSpu (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await reqDeleteSpuById(row.id)
        if (res.code === 200) {
          this.$message.success('删除成功')
          // 刷新列表
          this.getSpuList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addSpu () {
      this.isShow = 2
      this.$nextTick(() => {
        this.$refs.addOrEditSpu.defaultSpuInfo(this.categoryId)
        this.$refs.addOrEditSpu.getTrademarkList()
        this.$refs.addOrEditSpu.getSaleList()
      })
    },

    getCategory1And2And3Id (id1, id2, id3) {
      this.categoryId = id3
      this.getSpuList()
    },

    // 获取spu列表数据
    async getSpuList () {
      const { data: res } = await reqGetSpuList(this.currentPage, this.limit, this.categoryId)
      if (res.code === 200) {
        this.spuList = res.data.records
        this.total = res.data.total
      }
    },

    // 编辑spu
    editSpu (row) {
      // 打开spu信息
      this.isShow = 2
      this.$nextTick(() => {
        // 调用子组件中的方法
        this.$refs.addOrEditSpu.reqGetSpuInfoById(row.id)
        this.$refs.addOrEditSpu.getTrademarkList()
        this.$refs.addOrEditSpu.getSaleList()
        this.$refs.addOrEditSpu.getSpuImageById(row.id)
      })
    },

    showSpu (val) {
      this.isShow = val
      // 刷新列表
      this.getSpuList()
    }
  }
}
</script>

<style lang="less" scpoed>
.container-spu {
  .spu-box {
    margin-top: 20px;
    .el-table {
      margin-top: 20px;
    }
    .el-pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
