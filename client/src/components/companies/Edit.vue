<template>
  <div style="display:inline">
    <el-form ref="companyForm" :model="companyForm" label-width="150px" style="max-width:600px">
   		<el-form-item label="Company name">
   		  <el-input v-model="companyForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Company info">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="Free fields: fill free to put any comment"
          v-model="companyForm.info">
        </el-input>
      </el-form-item>
      <el-form-item>
  			<el-button type="primary" @click="onSubmit">Save</el-button>
		  </el-form-item>
    </el-form>

  </div>

</template>

<script>
import CompanyResource from '../../api/company.service'
import { mapActions } from 'vuex'

export default {
  components: {
  },
  props: {
    'id': {
      type: String,
      required: true
    }
  },
  data() {
    return {
      'companyForm': {
        'name': '',
        'info': ''
      }
    }
  },
  beforeMount(){
    this.getCompany()
  },
  methods: {
    ...mapActions(['editCompany']),

    getCompany: function() {
      // Load specific thing infomation
      console.log("++++ Onload company form")
      CompanyResource.get(this.id)
        .then(response => {
          let company = response.data
          this.companyForm.name = company.name
          this.companyForm.info = company.info
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },

    onSubmit: function() {
      let payload = { _id: this.id, content: this.companyForm }
      this.editCompany(payload)
        .then(response => {
          this.editModal = false
        })
        .catch(e => {
          console.log(e)
        })
    },

    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    edit: function(formName) { // Edit item
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // payload info passed to the state management of companies
          let payload = { _id: this.id, content: this.companyForm }
          this.editCompany(payload)
            .then(response => {
              this.editModal = false
            })
            .catch(e => {
              console.log(e)
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
