<template>
  <div style="width: 100%;height: 100%;">
    <div class="modalbox">
      <p slot="title">
        Sign up
      </p>
      <!-- Begin: Form -->
      <form
        id="signupForm"
        @submit="signup"
        method="post"
      >
        <p>
          <label for="company">Company</label>
          <input
            id="company"
            v-model="signupForm.company"
            type="text"
            name="company"
          >
        </p>
        <p>
          <label for="name">Name</label>
          <input
            id="name"
            v-model="signupForm.name"
            type="text"
            name="name"
          >
        </p>
        <p>
          <label for="email">Email</label>
          <input
            id="email"
            v-model="signupForm.email"
            type="email"
            name="email"
          >
        </p>
        <p>
          <label for="password">Password</label>
          <input
            id="password"
            v-model="signupForm.password"
            type="password"
            name="password"
          >
        </p>
        <p>
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="signupForm.confirmPassword"
            type="confirmPassword"
            name="confirmPassword"
          >
        </p>
        <p>
          <Button
            type="success"
            long
            @click="submit('signupForm')"
          >
            Sign me up!
          </Button>
        </p>
      </form>
      <p>
        Already have an account?
        <router-link to="/login">
          Login here
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      signupForm: {
        company: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      ruleSignup: {
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
    ...mapActions(['signup']),
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    submit: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.signup(this.signupForm)
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
