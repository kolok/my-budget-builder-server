<template>
  <div>
    <template>
      <el-button
        type="primary"
        @click="createDialog = true"
        icon="el-icon-edit"
        size="mini"
      >
        Edit
      </el-button>
    </template>
    <template>
      <el-button
        size="mini"
        type="danger"
        icon="el-icon-delete"
        @click="handleDelete()"
      >
        Delete
      </el-button>
    </template>

    <el-dialog title="Create an entity" :visible.sync="createDialog">
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
          <el-input v-model="entityForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="Country"
          prop="country_id"
        >
          <el-select v-model="entityForm.country_id" placeholder="Select a country">
            <el-option
              v-for="country in countries"
              :key="country.id"
              :label="country.name"
              :value="country.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Currency"
          prop="default_currency_id"
        >
          <el-select v-model="entityForm.default_currency_id" placeholder="Select a currency">
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
        <el-button @click="cancel('entityForm')">Annuler</el-button>
        <el-button type="primary" @click="handleEdit('entityForm')">Confirmer</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    entityForm: Object
  },
  data() {
    return {
      currencyList: [],
      createDialog: false,
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
  created() {
    this.$store.dispatch('getCurrencies'),
    this.$store.dispatch('getCountries')
  },
  methods: {
    ...mapActions(['editEntity', 'removeEntity']),
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    handleEdit: function(formName) { // Create entity
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editEntity(this.entityForm)
            .then(response => {
              this.createDialog = false
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
    cancel: function(formName){
      this.$refs[formName].resetFields()
      this.createDialog = false
    },
    handleDelete() {
      this.$confirm('Do you really want to delete this Entity?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.removeEntity(this.entityForm.id)
      });
    }
  }
}
</script>
