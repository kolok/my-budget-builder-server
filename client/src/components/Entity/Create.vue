<template>
  <div>
    <template>
      <el-button type="primary" @click="createDialog = true">Create a new entity</el-button>
    </template>

    <el-dialog title="Adresse d'expédition" :visible.sync="createDialog">
      <el-form :model="entityForm" label-width="250px" style="max-width:600px">
        <el-form-item label="Entity">
          <el-input v-model="entityForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Country">
          <el-select v-model="entityForm.country_id" placeholder="Select a country">
            <el-option
              v-for="country in countries"
              :key="country.id"
              :label="country.name"
              :value="country.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Currency">
          <el-select v-model="entityForm.currency_id" placeholder="Select a currency">
            <el-option
              v-for="currency in currencies"
              :key="currency.id"
              :label="currency.name"
              :value="currency.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddEntity">Annuler</el-button>
        <el-button type="primary" @click="createDialog = false">Confirmer</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      currencyList: [],
      createDialog: false,
      entityForm: {
        name: '',
        country_id:'',
        currency_id: ''
      }
    }
  },
  computed: {
    ...mapGetters(['currencies', 'countries'])
  },
  created() {
    this.$store.dispatch('getCurrencies'),
    this.$store.dispatch('getCountries')
  },
  methods: {
    ...mapActions(['addEntity']),
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    create: function(formName) { // Create item
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addEntity(this.entityForm)
            .then(response => {
              // reset form data
              this.$refs[formName].resetFields()
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancelAddEntity: function(){
      this.createDialog = false
    }
  }
}
</script>
