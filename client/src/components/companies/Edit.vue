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

      <el-form-item label="Fiscal year">
        <el-select v-model="value" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
      },
      options: [{
          value: '01-12',
          label: 'From January to December'
        }, {
          value: '02-01',
          label: 'From February to January'
        }, {
          value: '03-02',
          label: 'From March to February'
        }, {
          value: '04-03',
          label: 'From April to March'
        }, {
          value: '05-04',
          label: 'From May to April'
        }, {
          value: '06-05',
          label: 'From June to May'
        }, {
          value: '07-06',
          label: 'From July to June'
        }, {
          value: '08-07',
          label: 'From August to July'
        }, {
          value: '09-08',
          label: 'From September to August'
        }, {
          value: '10-09',
          label: 'From October to September'
        }, {
          value: '11-10',
          label: 'From November to October'
        }, {
          value: '12-11',
          label: 'From December to November'
        }],
      value: ''
    }
  },
  beforeMount(){
    this.getCompany()
  },
  methods: {
    ...mapActions(['editCompany']),

    getCompany: function() {
      // Load specific thing infomation
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
