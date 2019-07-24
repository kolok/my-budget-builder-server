<template>
  <div>
    <template>
      <el-button
        type="primary"
        @click="createDialog = true"
      >
        Create a new entity
      </el-button>
    </template>

    <el-dialog
      title="Create an entity"
      :visible.sync="createDialog"
    >
      <el-form
        ref="entityForm"
        :model="entityForm"
        :rules="entityRule"
        label-width="250px"
        style="max-width:600px"
      >
        <el-form-item
          prop="name"
          label="Entity"
        >
          <el-input
            v-model="entityForm.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="Country"
          prop="country_id"
        >
          <el-select
            v-model="entityForm.country_id"
            placeholder="Select a country"
          >
            <el-option
              v-for="country in countries"
              :key="country.id"
              :label="country.name"
              :value="country.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Currency"
          prop="default_currency_id"
        >
          <el-select
            v-model="entityForm.default_currency_id"
            placeholder="Select a currency"
          >
            <el-option
              v-for="currency in currencies"
              :key="currency.id"
              :label="currency.longName"
              :value="currency.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleCancel">Annuler</el-button>
        <el-button
          type="primary"
          @click="handleCreateEntity('entityForm')"
        >Confirmer</el-button>
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
        default_currency_id: ''
      },
      entityRule: {
        name: [
          { required: true, message: 'Entity name can\'t be blank' },
          { max:25, message: 'Too long'},
          { min:3, message: 'Too short'}
        ],
        country_id: [
          { required: true, message: 'A country should be selected' }
        ],
        default_currency_id: [
          { required: true, message: 'A currency should be selected' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['currencies', 'countries'])
  },
  methods: {
    ...mapActions(['addEntity']),
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    handleCreateEntity: function(formName) { // Create entity
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
    handleCancel: function(){
      this.createDialog = false
    }
  }
}
</script>
