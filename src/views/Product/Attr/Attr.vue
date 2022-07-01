<template>
  <div class="attr-container">
    <el-card>
      <ThreeLevelLinkage @getCategory1And2And3Id="getCategory1And2And3Id" :isShow="isShow"></ThreeLevelLinkage>
    </el-card>
    <el-card class="box-card">
      <div v-show="isShow">
        <el-button type="primary" size="mini" icon="el-icon-plus" :disabled="isDisabled" @click="isShow = false">添加属性</el-button>
        <el-table border style="width: 100%" :data="attrInfoList">
          <el-table-column type="index" label="序号" width="50" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="180" align="center">
          </el-table-column>
          <el-table-column prop="attrValueList" label="属性值列表">
            <template slot-scope="{row}">
              <el-tag type="success" v-for="(attrValue,index) in row.attrValueList" :key="index">{{attrValue.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="180" align="center">
            <template slot-scope="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="editAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="deleteAttr(row)" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性 -->
      <div v-show="!isShow" class="addAttr">
        <el-form label-width="80px">
          <el-form-item label="属性名">
            <el-input v-model="addAttrInfo.attrName" size="mini" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="addAttr" :disabled="!addAttrInfo.attrName?true:false">添加属性值</el-button>
            <el-button @click="showAddAttr" size="mini">取消</el-button>
          </el-form-item>
                  </el-form>
          <!-- 表格部分 -->
          <div class="addTable">
            <el-table style="width: 100%" border :data="addAttrInfo.attrValueList">
            <el-table-column type="index" label="序号" width="50" align="center">
            </el-table-column>
            <el-table-column prop="valueName" label="属性值名称" width="width">
              <template slot-scope="{row,$index}">
                <el-input :ref="$index" v-model="row.valueName" size="mini" v-if="row.isEdit"  @blur="row.isEdit = false" @keyup.enter.native="row.isEdit = false"></el-input>
                <div v-else @click="showInput(row,$index)">{{row.valueName}}</div>
              </template>
            </el-table-column>
            <el-table-column  label="操作" prop="prop">
              <template slot-scope="{$index}">
                <el-button type="danger" icon="el-icon-delete" @click="deleteAddAttr($index)" size="mini"></el-button>
              </template>
            </el-table-column>
          </el-table>
          </div>
          <el-button type="primary" size="mini" @click="savaAttr">保存</el-button>
          <el-button size="mini" @click="isShow = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { reqGetAttrList, reqDeleteAttr, reqSaveAttrInfo } from '@/api/attr/attr.js'
export default {
  name: 'Attr',
  methods: {
    // 获取品牌列表
    async getAttrInfoList () {
      const { data: res } = await reqGetAttrList(this.category1Id, this.category2Id, this.category3Id)
      this.addAttrInfo = {
        categoryLevel: 3,
        categoryId: null,
        attrName: '',
        attrValueList: []
      }
      if (res.code === 200) {
        this.attrInfoList = res.data
        this.isDisabled = false
      } else {
        this.$message.error(res.message || '获取品牌列表失败')
      }
    },

    // 获取三级联动组件传过来的3个id，并获取attr列表信息
    getCategory1And2And3Id (category1Id, category2Id, category3Id) {
      this.category1Id = category1Id
      this.category2Id = category2Id
      this.category3Id = category3Id
      this.getAttrInfoList()
    },

    // 删除属性
    async deleteAttr (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await reqDeleteAttr(row.id)
          if (res.code === 200) {
            this.$message.success('删除成功!')
            this.getAttrInfoList()
          } else {
            this.$message.error(res.data || '删除失败')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 添加属性
    addAttr () {
      this.addAttrInfo.attrValueList.push({
        attrId: this.category3Id,
        valueName: '',
        isEdit: true
      })
      this.$nextTick(() => {
        this.$refs[this.addAttrInfo.attrValueList.length - 1].focus()
      })
    },

    showInput (row, index) {
      // 显示输入框
      row.isEdit = true
      this.$nextTick(() => {
        // 让其获得焦点
        this.$refs[index].focus()
      })
    },

    showAddAttr () {
      this.isShow = true
      this.addAttrInfo = {
        attrName: '',
        attrValueList: []
      }
    },

    deleteAddAttr (index) {
      // 删除数组中的元素
      this.addAttrInfo.attrValueList.splice(index, 1)
    },

    async savaAttr () {
      this.addAttrInfo.categoryId = this.category3Id
      const { data: res } = await reqSaveAttrInfo(this.addAttrInfo)
      if (res.code === 200) {
        this.$message.success('保存成功')
        // 隐藏添加，展示表格
        this.isShow = true
        // 更新数据
        this.getAttrInfoList()
      } else {
        // 添加失败
        this.$message.error(res.data || '保存失败')
        this.isShow = true
        // 更新数据
        this.getAttrInfoList()
      }
    },

    editAttr (row) {
      this.isShow = false
      this.addAttrInfo = row
    }
  },

  data () {
    return {
      attrInfoList: [],
      category1Id: null,
      category2Id: null,
      category3Id: null,
      isDisabled: true,
      isShow: true,
      isShowInput: true,
      addAttrInfo: {
        categoryLevel: 3,
        categoryId: null,
        attrName: '',
        attrValueList: []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.attr-container {
  .box-card {
    margin-top: 30px;
    .el-table {
      margin-top: 20px;
    }
  }

  /deep/.el-tag {
    margin: 0 5px;
  }

  .addAttr {
    .el-form-item {
      margin-bottom: 10px;
    }
  }
}

.addAttr {
  .el-table {
    margin-bottom: 20px;
  }
}
</style>
