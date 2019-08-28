<template>
  <div>
    <h1 class="Content__Head1">Change your password</h1>
    <el-form
      class="Content__Form"
      ref="changePwdForm"
      :model="changePwdForm"
      label-width="250px"
    >
      <el-form-item
        label="Current"
        prop="oldPassword"
      >
        <el-input
          v-model="changePwdForm.oldPassword"
          type="password"
        />
        </el-input>
      </el-form-item>
      <el-form-item
        label="New"
        prop="newPassword"
      >
        <el-input
          v-model="changePwdForm.newPassword"
          type="password"
        />
        </el-input>
      </el-form-item>
      <el-form-item
        label="Retype New"
        prop="retypePwd"
      >
        <el-input
          v-model="changePwdForm.retypePwd"
          type="password"
        />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="changePwd('changePwdForm')"
        >
          Save Changes
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AuthService from '../../api/auth.service'

export default {
  components: {
  },
  data() {
    return {
      changePwdForm: {
        oldPassword: '',
        newPassword: '',
        retypePwd: ''
      },
      ruleChangePwd: {
        oldPassword: [
          { required: true, message: 'Current password is required' }
        ],
        newPassword: [
          { required: true, message: 'You cannot use a blank password.' },
          { type: 'string', min:6, message: 'Too short'}
        ],
        retypePwd: [
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Please retype the new password'))
            } else {
              if (value !== this.changePwdForm.newPassword) {
                callback(new Error('Passwords do not match'))
              }
              callback()
            }
          }}
        ]
      }
    }
  },
  methods: {
    changePwd: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          AuthService.changePassword(this.changePwdForm)
            .then(() => {
              this.$Message.success('Password has succefully updated')
            }).catch(err => {
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
