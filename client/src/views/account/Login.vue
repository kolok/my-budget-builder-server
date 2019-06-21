<template>
  <div class="default-main-content">
    <el-card class="box-card" style="max-width:300px;width: 100%;margin: 0px auto;">
      <div slot="header" class="clearfix" style="font-size: 14px;font-weight: bold;">
        <span>Login</span>
      </div>
      <div class="loginform">
        <el-form ref="loginForm" :model="loginForm">

          <el-form-item
            prop="email"
            label="Email"
            :rules="[
              { required: true, message: 'Email is required', trigger: 'blur' },
              { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
            ]"
          >
            <el-input v-model="loginForm.email" placeholder="email"></el-input>
          </el-form-item>
          <el-form-item
            :rules="[{ required: true, message: 'Password is required'}]"
            label="Password"
            prop="password"
          >
            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit('loginForm')" style="width:100%">Submit</el-button>
          </el-form-item>
        </el-form>
        <p style="font-size: 14px;">
          Don't have an account?
          <router-link to="/signup">
            Sign up
          </router-link>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['login']),

    submit: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login(this.loginForm)
            .then(() => {
              this.$router.push('/teamDashboard')
            })
            .catch(err => {
              this.$Message.error(err.message)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
