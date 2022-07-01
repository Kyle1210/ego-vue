<template>
  <div class="trademark-container">
    <div class="btn">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="dialogVisible = true">添加</el-button>
    </div>
    <!-- 表格 -->
    <el-table border :data="tableData">
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width" align="center">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width" align="center">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" alt="" width="100px" height="50px">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="width" align="center">
        <template slot-scope="{row}">
          <el-button type="warning" size="mini" @click="edit(row)" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteTrademarkById(row.id)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 "  -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[3,5,10,15]" :page-size="limit" layout="prev, pager, next, jumper, -> , total, sizes" :total="total">
    </el-pagination>

    <!-- 对话框 :before-close="handleClose" -->
    <el-dialog :title="trademarkInfo.id?'编辑':'添加'" :visible.sync="dialogVisible" width="30%" @closed="closed">
      <el-form ref="form" :model="trademarkInfo" :rules="rules" label-width="100px">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="trademarkInfo.tmName" size="mini" ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO">
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="trademarkInfo.logoUrl" :src="trademarkInfo.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submit" size="mini" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reqGetTrademarkList, reqDeleteTrademarkById, reqAddTrademark, reqEditTrademarkById } from '@/api/trademark/trademark.js'
import _ from 'lodash'
export default {
  mounted () {
    this.getTrademarkList()
  },

  data () {
    return {
      currentPage: 1,
      limit: 10,
      total: 10,
      tableData: [],
      dialogVisible: false,
      trademarkInfo: {
        id: '',
        tmName: '',
        logoUrl: ''
      },

      rules: {
        tmName: [
          { required: true, message: '此项必填奥', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    handleSizeChange (limit) {
      this.limit = limit
      this.getTrademarkList()
    },

    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.getTrademarkList()
    },

    // 获取列表数据
    async getTrademarkList () {
      // 获取列表数据
      const res = await reqGetTrademarkList(this.currentPage, this.limit)
      if (res.data.code === 200) {
        this.tableData = res.data.data.records
        this.currentPage = res.data.data.current
        this.total = res.data.data.total
      }
    },

    // 根据id删除品牌
    deleteTrademarkById (id) {
      this.$confirm('将永久词条记录,确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await reqDeleteTrademarkById(id)
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新界面
            if (this.tableData.length === 1) {
              this.currentPage -= 1
            }
            this.getTrademarkList(this.currentPage)
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 添加或者删除
    async addOrEdit () {
      // 通过trademarkInfo有无id判断是添加还是修改
      if (this.trademarkInfo.id) {
        // 有id，为修改
        const res = await reqEditTrademarkById(this.trademarkInfo)
        if (res.data.code === 200) {
          // 修改成功
          this.dialogVisible = false
          this.$message.success('修改成功')
          // 刷新页面
          this.getTrademarkList(this.currentPage)
        } else {
          this.$message.error('修改失败')
          this.dialogVisible = false
        }
      } else {
        // 无id，为添加
        const res = await reqAddTrademark(this.trademarkInfo)
        if (res.data.code === 200) {
          // 添加成功
          this.dialogVisible = false
          this.$message.success('添加品牌成功')
          // 刷新页面
          this.getTrademarkList(this.currentPage)
        } else {
          // 添加失败
          this.$message.error(res.message || '添加品牌失败')
        }
      }
    },

    handleAvatarSuccess (res, file) {
      this.trademarkInfo.logoUrl = URL.createObjectURL(file.raw)
      this.$message.success('上传成功')
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 编辑
    edit (row) {
      // 深拷贝一份row，防止修改的时候影响table里的数据
      const cloneRow = _.cloneDeep(row)
      this.trademarkInfo = cloneRow
      this.dialogVisible = true
    },

    closed () {
      this.trademarkInfo = {
        id: '',
        tmName: '',
        logoUrl: ''
      }
    },

    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.addOrEdit()
        } else {
          this.$message.error('输入有误,请重新输入')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.trademark-container {
  .btn {
    margin-bottom: 20px;
  }
  .el-table {
    width: 100%;
  }
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
