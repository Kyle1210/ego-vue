<template>
  <div class="user-container">
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
    <!-- <el-button type="danger" size="mini" @click="batchDelete">批量删除</el-button> -->
    <!-- 表格 -->
    <el-table v-loading="loading" :data="userList" border ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="nickName" label="用户昵称" width="width">
      </el-table-column>
      <el-table-column prop="roleName" label="权限列表" width="width">
      </el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="width">
      </el-table-column>
      <el-table-column prop="gmtModified" label="更新时间" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row}">
          <el-button type="info" icon="el-icon-user-solid" size="mini" @click="setRole(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserInfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 @size-change="handleSizeChange" " -->
    <el-pagination @current-change="handleCurrentChange" background="" :current-page="currentPage" :page-sizes="[5,10,15,20]" :page-size="limit" layout="prev, pager, next, jumper, -> ,total, sizes" :total="total">
    </el-pagination>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" @closed="resetAddUser">
      <el-form ref="form" label-width="80px" :model="addUser" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUser.username" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="addUser.nickName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="addUser.password" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitAddUser" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置角色对话框 -->
    <el-dialog title="设置角色" :visible.sync="showSetRole" width="30%" @closed="closed">
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.userName" disabled size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="userInfo.roleId" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="role in roleList" :key="role.id" :label="role.id">{{role.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSetRole = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="AssignRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="isShowEditUser" width="30%">
      <el-form ref="editUser" :model="editUser" :rules="editUserRules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUser.username" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="editUser.nickName" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isShowEditUser = false">取 消</el-button>
        <el-button type="primary" @click="submitEditUser" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reqGetUser, reqGetRoles, reqGetRoleByUserId, reqAssignRole, reqSaveUser, reqDeleteUser, reqUpdateUser } from '@/api/acl/acl.js'
import _ from 'lodash'
export default {
  created () {
    this.getUserList()
    this.getAllRole()
  },
  data () {
    return {
      editUserRules: {
        username: [
          { required: true, message: '用户名必填', trigger: 'blur' }
        ]
      },
      editUser: {},
      isShowEditUser: false,
      isIndeterminate: true,
      checkAll: false,
      userInfo: {
        userId: null,
        userName: '',
        roleId: []
      },
      roleList: [],
      showSetRole: false,
      loading: true,
      userList: [],
      inputVal: '',
      // 表格选中项
      multipleSelection: [],
      currentPage: 1,
      limit: 10,
      total: 0,
      dialogVisible: false,
      addUser: {
        username: '',
        nickName: '',
        password: ''
      },
      // 校验规则
      rules: {
        name: [{ required: true, message: '此项必填', trigger: 'blur' }],
        password: [{ required: true, message: '密码必填', trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetAddUser () {
      this.addUser = {}
    },
    // 批量删除
    batchDelete () {
      if (this.multipleSelection) {
        const arr = []
        this.multipleSelection.forEach(item => {
          arr.push(item.id)
        })
        arr.forEach(async item => {
          const res = await reqDeleteUser(item)
          console.log(res)
        })
      }
    },

    submitEditUser () {
      this.$refs.editUser.validate(async (valid) => {
        if (valid) {
          const { data: res } = await reqUpdateUser(this.editUser)
          if (res.code === 20000) {
            this.$message.success(res.message)
            this.getUserList()
            this.isShowEditUser = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editUserInfo (row) {
      this.isShowEditUser = true
      this.editUser = _.cloneDeep(row)
    },

    // 删除用户
    deleteUser (row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await reqDeleteUser(row.id)
          if (res.code === 20000) {
            this.$message.success(res.message)
            this.getUserList()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 根据用户id设置角色
    async AssignRole () {
      const { data: res } = await reqAssignRole(this.userInfo)
      if (res.code === 20000) {
        this.$message.success(res.message)
        this.showSetRole = false
        this.getUserList()
      }
    },

    closed () {
      this.userInfo.roleId = []
    },

    handleCheckAllChange (val) {
      if (val) {
        // 全选状态
        this.roleList.forEach(item => {
          this.userInfo.roleId.push(item.id)
          this.isIndeterminate = false
        })
      } else {
        this.userInfo.roleId = []
        this.isIndeterminate = false
      }
    },
    handleCheckedCitiesChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.roleList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roleList.length
    },

    async setRole (row) {
      this.userInfo.userId = row.id
      this.userInfo.userName = row.username
      this.showSetRole = true
      this.getRoleByUserId(this.userInfo.userId)
    },

    handleCurrentChange (currentPage) {
      this.loading = true
      this.currentPage = currentPage
      this.getUserList()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    submitAddUser () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 发送请求
          const { data: res } = await reqSaveUser(this.addUser)
          if (res.code === 20000) {
            this.$message.success(res.message)
            this.getUserList()
          } else {
            this.$message.error(res.message)
          }
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 根据用户id获取对应角色
    async getRoleByUserId (userId) {
      const { data: res } = await reqGetRoleByUserId(userId)
      if (res.code === 20000) {
        res.data.assignRoles.forEach(item => {
          this.userInfo.roleId.push(item.id)
        })
      } else {
        this.$message.error('获取角色失败')
      }
    },

    // 获取用户列表
    async getUserList () {
      const { data: res } = await reqGetUser(this.currentPage, this.limit)
      if (res.code === 20000) {
        this.userList = res.data.items
        this.total = res.data.total
        this.loading = false
      } else {
        this.$message.error('获取用户列表失败')
        this.loading = false
      }
    },

    // 获取所有角色
    async getAllRole () {
      const { data: res } = await reqGetRoles(1, 100)
      this.roleList = res.data.items
    }
  }
}
</script>

<style lang="less" scoped>
.user-container {
  .el-table {
    margin-top: 20px;
  }
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
