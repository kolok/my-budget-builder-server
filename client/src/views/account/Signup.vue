<template>
  <div class="beautiful-gradient" style="height:100%;padding:100px 0;">
    <el-card class="box-card" style="max-width:300px;width: 100%;margin: 0px auto;">
      <div slot="header" class="clearfix" style="font-size: 14px;font-weight: bold;">
        <span>Sign up</span>
      </div>
      <div class="signupform">
        <el-form
          ref="signupForm"
          :model="signupForm"
          :rules="ruleSignup"
        >
          <el-form-item
            prop="companyname"
            label="Company name"
          >
            <el-input v-model="signupForm.companyname" placeholder="Company name"></el-input>
          </el-form-item>
          <el-form-item
            prop="name"
            label="Name"
          >
            <el-input v-model="signupForm.name" placeholder="Name"></el-input>
          </el-form-item>
          <el-form-item
            prop="email"
            label="Email"
          >
            <el-input v-model="signupForm.email" placeholder="email"></el-input>
          </el-form-item>
          <el-form-item
            label="Password"
            prop="password"
          >
            <el-input type="password" v-model="signupForm.password" autocomplete="off" placeholder="Password"></el-input>
          </el-form-item>

          <el-form-item
            label="Confirm Password"
            prop="retypePwd"
          >
            <el-input type="password" v-model="signupForm.retypePwd" autocomplete="off" placeholder="Type password again"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit('signupForm')" style="width:100%">Sign me up</el-button>
          </el-form-item>
        </el-form>
        <p>
          Already have an account?
          <router-link to="/login">
            Login here
          </router-link>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      signupForm: {
        companyname: '',
        name: '',
        email: '',
        password: '',
        retypePwd: ''
      },
      ruleSignup: {
        companyname: [
          { required: true, message: 'Company name can\'t be blank' },
        ],
        name: [
          { required: true, message: 'Name can\'t be blank' },
        ],
        email: [
          { required: true, message: 'You cannot use a blank email' },
          { type: 'email', message: 'Please input correct email address'}
        ],
        password: [
          { required: true, message: 'You cannot use a blank password' },
          { min:6, message: 'Too short'}
        ],
        retypePwd: [
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Please enter your password again'))
            } else if (value !== this.signupForm.password) {
              callback(new Error('The two input passwords do not match'))
            } else {
              callback()
            }
          }
          }]
      }
    }
  },
  methods: {
    ...mapActions(['signupwithcompany']),
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    submit: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.signupwithcompany(this.signupForm)
            .then(() => {
              this.$Message.success(this.signupForm.email + ' Added')
              this.$router.push('/teamDashboard')
            }).catch(err => {
              this.$Message.error('Error')
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
