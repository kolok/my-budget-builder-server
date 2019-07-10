<template>
  <div style="display:inline">
    <el-form ref="companyForm" :model="companyForm" label-width="250px" style="max-width:600px">
   		<el-form-item label="Company name">
   		  <el-input v-model="companyForm.name"></el-input>
      </el-form-item>

      <el-form-item label="Fiscal year start month">
        <el-select v-model="companyForm.first_month_fiscal_year" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Currency">
        <el-select v-model="companyForm.default_currency_id" placeholder="Select a currency">
          <el-option
            v-for="currency in currencyList"
            :key="currency.id"
            :label="currency.combineName"
            :value="currency.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="subdomain"
        label="Komber sub-domain"
      >
        <el-input v-model="companyForm.subdomain" placeholder="subdomain" class="subdomain" :disabled="true"></el-input>
        <span class="domain">.komber.io</span>
      </el-form-item>

      <el-form-item>
  			<el-button type="primary" @click="onSubmit">Save</el-button>
		  </el-form-item>
    </el-form>

  </div>

</template>

<script>
import CompanyResource from '../../api/company.service'
import CurrencyResource from '../../api/currency.service'
import { mapActions } from 'vuex'

export default {
  components: {
  },
  props: {
    'id': {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      'companyForm': {},
      options: [{
          value: '1',
          label: 'January'
        }, {
          value: '2',
          label: 'February'
        }, {
          value: '3',
          label: 'March'
        }, {
          value: '4',
          label: 'April'
        }, {
          value: '5',
          label: 'May'
        }, {
          value: '6',
          label: 'June'
        }, {
          value: '7',
          label: 'July'
        }, {
          value: '8',
          label: 'August'
        }, {
          value: '9',
          label: 'September'
        }, {
          value: '10',
          label: 'October'
        }, {
          value: '11',
          label: 'November'
        }, {
          value: '12',
          label: 'December'
        }],
      currencyList: [],
      value: ''
    }
  },
  beforeMount(){
    this.getCompany()
    this.getCurrencyList()
  },
  methods: {
    ...mapActions(['editCompany']),

    getCompany: function() {
      // Load specific thing infomation
      CompanyResource.get(this.id)
        .then(response => {
          this.companyForm = response.data
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },

    getCurrencyList: function() {
      // Load specific thing infomation
      CurrencyResource.list()
        .then(response => {
          this.currencyList = response.data
          let currencyList = []
          response.data.forEach(function(currency){
            currency.id = currency.id + 10
            currency.combineName = currency.name + ' (' + currency.symbol + ')'
            currencyList.push(currency)
          })
          this.currencyList = currencyList
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },

    onSubmit: function() {
      let payload = { _id: this.id, content: this.companyForm }
      this.editCompany(payload)
        .then(response => {
          const h = this.$createElement;
          this.$notify({
            title: 'Company update',
            message: h('i', { style: 'color: teal' }, 'company ' + this.companyForm.name + ' was updated'),
            type: 'success'
          });
        })
        .catch(e => {
          const h = this.$createElement;
          this.$notify({
            title: 'Company update',
            message: h('i', { style: 'color: red' }, 'something went wrong, the company wasn\'t updated'),
            type: 'error'
          });
          console.log(e)
        })
    }
  }
}
</script>

<style>
.subdomain {
  width: 200px;
  float: left;
  clear: none;
}
.domain {
  float: left;
}
</style>
