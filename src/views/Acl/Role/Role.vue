<template>
  <div class="role-container" >
    <div v-if="isShowRole">
      <!-- <el-form inline>
      <el-form-item>
        <el-input v-model="inputVal" size="mini" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search">查询</el-button>
        <el-button size="mini">清空</el-button>
      </el-form-item>
    </el-form> -->
    <el-button type="primary" size="mini" @click="dialogVisible = true">添加</el-button>
    <el-button type="danger" size="mini" @click="batchDeletRole">批量删除</el-button>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="roleList" border ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="width">
        <template slot-scope="{row,$index}">
          <el-input :ref="$index" v-model="row.roleName" size="mini" v-if="row.isEdit" @blur="editRoleName(row)" @keyup.enter.native="$event.target.blur()"></el-input>
          <div v-else>{{row.roleName}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="width">
      </el-table-column>
      <el-table-column prop="gmtModified" label="更新时间" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-tooltip class="item" effect="dark" content="添加权限" placement="top">
            <el-button type="info" icon="el-icon-info" size="mini" @click="showAddPermission(row)"></el-button>
          </el-tooltip>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showInput(row,$index)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRole(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 @size-change="handleSizeChange" " -->
    <el-pagination @current-change="handleCurrentChange" background="" :current-page="currentPage" :page-sizes="[5,10,15,20]" :page-size="limit" layout="prev, pager, next, jumper, -> ,total, sizes" :total="total">
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog title="添加角色" :visible.sync="dialogVisible" width="30%" @closed="roleName=''">
      <span>请输入新名称</span>
      <el-input v-model="role.roleName" placeholder=""></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addRole" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    </div>
    <transition name="el-fade-in-linear" mode="out-in" v-else>
      <AddPermission :roleInfo="roleInfo" @showRole="showRole"></AddPermission>
    </transition>
  </div>
</template>

<script>
import { reqGetRoles, reqDeleteRoleById, reqAddRole, reqBatchDeleteRoleById, reqUpdateRole } from '@/api/acl/acl.js'
import AddPermission from '@/views/Acl/Role/AddPermission/AddPermission'
export default {
  components: {
    AddPermission
  },

  created () {
    this.getRoles()
  },
  data () {
    return {
      roleInfo: {},
      isShowRole: true,
      role: {
        roleName: ''
      },
      dialogVisible: false,
      loading: true,
      currentPage: 1,
      limit: 10,
      total: 0,
      inputVal: '',
      roleList: [],
      // 储存被选中的表格数据
      multipleSelection: []
    }
  },
  methods: {
    showRole (val) {
      this.isShowRole = val
    },
    // 展示添加权限页面
    showAddPermission (row) {
      this.isShowRole = false
      this.roleInfo = row
    },
    // 修改角色名，并切换为查看模式
    async editRoleName (row) {
      row.isEdit = false
      const { data: res } = await reqUpdateRole(row)
      if (res.code === 20000) {
        this.$message.success(res.message)
        this.getRoles()
      } else {
        this.$message.error(res.message)
      }
    },
    // 切换为编辑模式
    showInput (row, index) {
      row.isEdit = true
      // 让输入框获取焦点
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 批量删除角色
    async batchDeletRole () {
      if (this.multipleSelection.length !== 0) {
        // 批量删除角色
        const { data: res } = await reqBatchDeleteRoleById(this.multipleSelection)
        if (res.code === 20000) {
        } else {
          this.$message.error(res.message)
        }
      }
    },

    // 添加角色
    async addRole () {
      const { data: res } = await reqAddRole(this.role)
      if (res.code === 20000) {
        this.$message.success(res.message)
        this.dialogVisible = false
        this.getRoles()
      } else {
        this.$message.error(res.message)
      }
    },
    // 根据id删除角色
    deleteRole (row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await reqDeleteRoleById(row.id)
          if (res.code === 20000) {
            this.$message.success(res.message)
            this.dialogVisible = false
            this.getRoles()
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

    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.getRoles()
    },

    // 获取角色列表
    async getRoles () {
      const { data: res } = await reqGetRoles(this.currentPage, this.limit)
      if (res.code === 20000) {
        this.total = res.data.total
        this.roleList = res.data.items
        this.roleList.forEach(item => {
          this.$set(item, 'isEdit', false)
        })
        this.loading = false
      } else {
        this.$message.error('获取角色列表失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.role-container {
  .el-table {
    margin-top: 20px;
  }
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
