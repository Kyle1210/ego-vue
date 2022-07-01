<template>
  <!-- 三级联动组件 -->
  <div class="three-container">
    <el-form ref="form" abel-width="80px" inline>
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="category1Id" @change="getCategory2List" :disabled="!isShow">
          <el-option :label="category1.name" :value="category1.id" v-for="category1 in category1List" :key="category1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="category2Id" @change="getCategory3List" :disabled="!isShow">
          <el-option :label="category2.name" :value="category2.id" v-for="category2 in category2List" :key="category2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="category3Id" @change="backCategory1And2And3Id" :disabled="!isShow">
          <el-option :label="category3.name" :value="category3.id" v-for="category3 in category3List" :key="category3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reqGetCategory1, reqGetCategory2, reqGetcategory3 } from '@/api/attr/attr.js'
export default {
  name: 'ThreeLevelLinkage',
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },

  mounted () {
    this.getCategory1List()
  },

  methods: {
    // 获取一级分类数据
    async getCategory1List () {
      const { data: res } = await reqGetCategory1()
      if (res.code === 200) {
        this.category1List = res.data
      } else {
        this.$message.error(res.message || '获取分类数据失败')
      }
    },

    // 获取二级分类数据
    async getCategory2List () {
      this.category2Id = null
      this.category3Id = null
      const { data: res } = await reqGetCategory2(this.category1Id)
      if (res.code === 200) {
        this.category2List = res.data
      } else {
        this.$message.error(res.message || '获取分类数据失败')
      }
    },

    // 获取三级分类数据
    async getCategory3List () {
      this.category3Id = null
      const { data: res } = await reqGetcategory3(this.category2Id)
      if (res.code === 200) {
        this.category3List = res.data
      } else {
        this.$message.error(res.message || '获取分类数据失败')
      }
    },

    // 将三级id传给父组件
    backCategory1And2And3Id () {
      this.$emit('getCategory1And2And3Id', this.category1Id, this.category2Id, this.category3Id)
    }

  },

  data () {
    return {
      category1Id: null,
      category2Id: null,
      category3Id: null,
      category1List: [],
      category2List: [],
      category3List: []
    }
  }
}
</script>

<style lang="less" scoped>
.three-container {
  padding-top: 10px;
  /deep/.el-form-item__label {
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
