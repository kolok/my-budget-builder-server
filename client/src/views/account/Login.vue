<template>
  <div class="Content__CardContainer">
    <el-card
      class="Content__Card"
    >
      <div
        slot="header"
        class="Content__CardHeader"
      >
        <span>Login</span>
      </div>
      <div class="Content__CardFormContainer">
        <el-form
          ref="loginForm"
          :model="loginForm"
          @keyup.enter.native="submit('loginForm')"
        >
          <el-form-item
            prop="email"
            label="Email"
            :rules="[
              { required: true, message: 'Email is required', trigger: 'blur' },
              { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
            ]"
          >
            <el-input
              v-model="loginForm.email"
              placeholder="email"
            />
          </el-form-item>
          <el-form-item
            :rules="[{ required: true, message: 'Password is required'}]"
            label="Password"
            prop="password"
          >
            <el-input
              v-model="loginForm.password"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="Content__CardButton--Large"
              @click="submit('loginForm')"
            >
              Submit
            </el-button>
          </el-form-item>
        </el-form>
        <p>
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
