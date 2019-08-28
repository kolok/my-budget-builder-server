<template>
  <div class="CardContainer">
    <el-card
      class="Card"
    >
      <div
        slot="header"
        class="Card__Header"
      >
        <span>Login</span>
      </div>
      <div class="Card__FormContainer">
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
              style="width:100%"
              @click="submit('loginForm')"
            >
              Submit
            </el-button>
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

<style scoped>

  .CardContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .Card {
    max-width:400px;
    width: 100%;
    margin: 0px auto;
  }

  .Card__Header {
    font-size: 14px;
    font-weight: bold;
  }

</style>
