<template>
  <div class="permission-container">
    <el-input v-model="roleInfo.roleName" disabled></el-input>
    <el-tree  ref="tree" :data="permissionList" show-checkbox node-key="id" :default-expanded-keys="roleIds" :props="defaultProps">
    </el-tree>
    <el-button type="primary" size="mini" @click="addPermission">保存</el-button>
    <el-button size="mini" @click="$emit('showRole', true)">取消</el-button>
  </div>
</template>

<script>
import { reqGetPermission, reqGetRolePermission, reqAddOrEditPermission } from '@/api/acl/acl.js'
export default {
  mounted () {
    this.getPermission()
    this.getRolePermission()
  },
  methods: {

    // 更改或添加角色权限
    async addPermission () {
      if (this.$refs.tree.getCheckedKeys().length === 0) {
        this.$message.warning('至少要选中一条哦')
        return
      }
      // 获取当前半选状态的节点的key，并把id为1的<全部数据>删除掉
      const halfCheckKeys = this.$refs.tree.getHalfCheckedKeys().filter(item => item !== '1')
      const { data: res } = await reqAddOrEditPermission(this.roleInfo.id, this.$refs.tree.getCheckedKeys().concat(halfCheckKeys))
      if (res.code === 20000) {
        this.$message.success(res.message)
        this.$emit('showRole', true)
      }
    },

    // 获取所有权限列表
    async getPermission () {
      const { data: res } = await reqGetPermission()
      if (res.code === 20000) {
        this.permissionList = res.data.children
      } else {
        this.$message.error(res.message)
      }
    },

    // 获取当前角色的权限
    async getRolePermission () {
      const { data: res } = await reqGetRolePermission(this.roleInfo.id)
      if (res.code === 20000) {
        this.rolePermission = res.data.children
        this.selectIds(this.rolePermission)
        // 这里很重要 >>>  其他方法回显都有问题，这个方法没问题
        this.roleIds.forEach(item => {
          this.$nextTick(() => {
            this.$refs.tree.setChecked(item, true, false)
          })
        })
      } else {
        this.$message.error(res.message)
      }
    },

    // 递归取出选中的id
    selectIds (arr) {
      arr.forEach(item => {
        if (item.select) {
          this.roleIds.push(item.id)
        }
        if (item.children) {
          this.selectIds(item.children)
        }
      })
    }
  },
  props: {
    roleInfo: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      // 控制tree树是否父子关联
      flag: false,
      // 创建一个数组，用于分割选中的节点和半选中的节点
      roleIds: [],
      rolePermission: [],
      permissionList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.permission-container {
  .el-tree {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
