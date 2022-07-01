<template>
  <div class="addSpu-container">
    <el-form label-width="80px">
      <el-form-item label="SPU名称">
        <el-input size="mini" v-model="spuInfo.spuName" placeholder="请输入spu名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spuInfo.tmId" placeholder="请选择品牌" size="mini">
          <el-option :label="item.tmName" :value="item.id" v-for="item in trademarkList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" v-model="spuInfo.description" placeholder="请输入spu描述"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload action="/api/admin/product/fileUpload" :on-success="handleAvatarSuccess" list-type="picture-card" :file-list="spuInfo.spuImageList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select value="" v-model="saleId" :placeholder="optionSale.length===0?'没有可选啦':`还剩下`+ optionSale.length +`个可选`" size="mini">
          <el-option :label="item.name" :value="item.id" v-for="item in optionSale" :key="item.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addSaleAttr" :disabled="!saleId">添加销售属性</el-button>
        <!-- 表格 -->
        <el-table border style="width: 100%" :data="spuInfo.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="180">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{row}">
              <el-tag closable @close="handleClose(row,index)" type="success" v-for="(item,index) in row.spuSaleAttrValueList" :key="item.id">{{item.saleAttrValueName}}</el-tag>
              <!-- 输入框 -->
              <el-input class="input-new-tag" v-if="row.isShowInput" ref="input" v-model="row.inputValue"  @keyup.enter.native="handleInputConfirm(row)" @blur="handleInputConfirm(row)" size="small"  />
              <el-button class="button-new-tag" v-else size="small" @click="showInput(row)" >添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="180">
            <template slot-scope="{row}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteSpuSaleAttr(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="saveOrEditSpu">保存</el-button>
        <el-button size="mini" @click="goback">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reqGetSpuInfoById, reqGetTrademarkList, reqGetSpuSale, reqGetSpuImageListById, reqUpdateSpu, reqSaveSpu } from '@/api/spu/spu.js'
export default {
  name: 'AddSpu',
  mounted () {},
  data () {
    return {
      baseSaleAttrId: null,
      saleId: null,
      trademarkList: [],
      spuSaleAttrList: [],
      spuInfo: {
        category3Id: null,
        id: null,
        spuName: '',
        description: '',
        spuSaleAttrList: [],
        tmId: null,
        spuImageList: []
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },

  methods: {
    goback () {
      this.$emit('showSpu', 1)
      this.defaultSpuInfo()
    },

    deleteSpuSaleAttr (row) {
      this.spuInfo.spuSaleAttrList = this.spuInfo.spuSaleAttrList.filter(item => !(row.baseSaleAttrId === item.baseSaleAttrId))
    },

    // 重置spuInfo
    defaultSpuInfo (category3Id) {
      this.spuInfo = {
        category3Id: category3Id || null,
        id: null,
        spuName: '',
        description: '',
        spuSaleAttrList: [],
        tmId: null,
        spuImageList: []
      }
    },
    // 更新或者添加spu
    async saveOrEditSpu () {
      // 通过spuInfo里的id是否为null来判断是添加还是修改
      if (this.spuInfo.id) {
        // 修改操作
        this.spuInfo.spuImageList.forEach(item => {
          item.imgName = item.name
          item.imgUrl = item.url
        })
        const { data: res } = await reqUpdateSpu(this.spuInfo)
        if (res.code === 200) {
          this.$message.success('保存成功')
          this.$emit('showSpu', 1)
        } else {
          this.$message.error('保存失败')
        }
      } else {
        // 添加操作
        this.spuInfo.spuImageList.forEach(item => {
          item.imgName = item.name
          item.imgUrl = item.url
        })
        const { data: res } = await reqSaveSpu(this.spuInfo)
        if (res.code === 200) {
          this.$message.success('添加成功')
          this.$emit('showSpu', 1)
        }
      }
    },
    // 上传成功的回调
    handleAvatarSuccess (response, file, fileList) {
      this.$message.success('上传成功')
      this.spuInfo.spuImageList.push({
        name: file.name,
        url: file.response.data
      })
    },

    handleInputConfirm (row) {
      if (row.inputValue) {
        row.spuSaleAttrValueList.push({
          baseSaleAttrId: row.baseSaleAttrId,
          saleAttrValueName: row.inputValue
        })
      }
      this.$set(row, 'isShowInput', false)
      row.inputValue = ''
    },

    // 显示输入框
    showInput (row) {
      // 响应式
      this.$set(row, 'isShowInput', true)
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    // 点击tag标签的关闭按钮
    handleClose (row, index) {
      row.spuSaleAttrValueList.splice(index, 1)
    },

    handleRemove (file, fileList) {
      this.spuInfo.spuImageList = this.spuInfo.spuImageList.filter(item => {
        if (item.uid !== file.uid) {
          return true
        }
      })
    },
    handlePictureCardPreview (file, fileList) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    // 根据id获取spu信息
    async reqGetSpuInfoById (spuId) {
      const { data: res } = await reqGetSpuInfoById(spuId)
      if (res.code === 200) {
        this.spuInfo.spuName = res.data.spuName
        this.spuInfo.description = res.data.description
        this.spuInfo.spuSaleAttrList = res.data.spuSaleAttrList
        this.spuInfo.tmId = res.data.tmId
        this.spuInfo.id = res.data.id
        this.spuInfo.category3Id = res.data.category3Id
      }
    },

    // 获取所有品牌信息
    async getTrademarkList () {
      const { data: res } = await reqGetTrademarkList()
      if (res.code === 200) {
        this.trademarkList = res.data
      } else {
        this.$message.error('获取品牌列表失败')
      }
    },

    // 获取所有销售属性
    async getSaleList () {
      const { data: res } = await reqGetSpuSale()
      if (res.code === 200) {
        this.spuSaleAttrList = res.data
      }
    },

    // 添加销售属性
    addSaleAttr () {
      const arr = this.spuSaleAttrList.filter(item => item.id === this.saleId)
      this.spuInfo.spuSaleAttrList.push({
        baseSaleAttrId: arr[0].id,
        saleAttrName: arr[0].name,
        spuSaleAttrValueList: []
      })
      this.saleId = null
    },

    // 根据id获取spu图片
    async getSpuImageById (id) {
      const { data: res } = await reqGetSpuImageListById(id)
      if (res.code === 200) {
        res.data.forEach(item => {
          this.spuInfo.spuImageList.push({
            name: item.imgName,
            url: item.imgUrl
          })
        })
      }
    }
  },

  computed: {
    optionSale () {
      return this.spuSaleAttrList.filter(item => {
        return !this.spuInfo.spuSaleAttrList.some(element => {
          return item.id === element.baseSaleAttrId
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.addSpu-container {
  /deep/.el-form-item__label {
    font-weight: bold;
  }
}
</style>

<style lang="less">
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

<style lang="less">
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
