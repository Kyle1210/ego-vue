<template>
    <div class="login-container">
        <div class="login">
          <h3>登陆</h3>
          <el-form hide-required-asterisk ref="ruleForm" :model="userInfo" :rules="rules" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input placeholder="用户名" size="mini" v-model="userInfo.username">
                <i slot="prefix" class="iconfont icon-yonghu-xianxing"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="密码" size="mini" v-model="userInfo.password" show-password @keyup.enter.native="submit">
                <i slot="prefix" class="iconfont icon-mima"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="name" class="btn" label-width="0">
              <el-button type="primary" size="mini" @click="submit">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      userInfo: {
        username: '',
        password: ''
      },

      rules: {
        username: [{ required: true, message: '用户名必填~', trigger: 'blur' }],
        password: [{ required: true, message: '密码必填~', trigger: 'blur' }]
      }
    }
  },

  methods: {
    submit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '正在登陆中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          // 校验通过，派发actions
          this.$store.dispatch('user/login', this.userInfo)
          loading.close()
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
.login-container {
  overflow: hidden;
  height: 100%;
  width: 100%;
  background: url(~@/assets/阿狸壁纸.jpg);
  background-size: cover;
  .login {
    backdrop-filter: blur(20px);
    padding-top: 10px;
    width: 400px;
    height: 250px;
    margin: 300px auto;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
    text-align: center;
    /deep/.el-input__inner {
      background: transparent;
    }
    .demo-ruleForm {
      width: 300px;
      margin: 0 auto;
      /deep/.el-button {
        width: 100%;
      }
    }
  }
}
/deep/.el-input__inner {
  color: #fff;
}
</style>
