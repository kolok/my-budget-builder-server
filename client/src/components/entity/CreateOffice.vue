<template>
  <div>
    <template>
      <el-card class="box-card">
        <div
          slot="header"
          class="card-header-action"
        >
          <span>Create a new Office</span>
        </div>
        <div
          class="card-action"
          style="min-height:90px;display: flex;align-items: center; justify-content: center;"
        >
          <el-button
            icon="el-icon-circle-plus-outline"
            type="text"
            style="font-size: 50px"
            @click="handleAddOffice"
          />
        </div>
      </el-card>
    </template>
    <el-dialog
      title="Create an office"
      :visible.sync="addOfficeDialog"
    >
      <el-form
        ref="officeForm"
        :model="officeForm"
        :rules="officeRule"
        label-width="250px"
        style="max-width:600px"
      >
        <el-form-item
          prop="name"
          label="Office"
        >
          <el-input
            v-model="officeForm.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="address"
          label="Address"
        >
          <el-input
            v-model="officeForm.address"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="zipcode"
          label="Zipcode"
        >
          <el-input
            v-model="officeForm.zipcode"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="town"
          label="Town"
        >
          <el-input
            v-model="officeForm.town"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="Country"
          prop="country_id"
        >
          <el-select
            v-model="officeForm.country_id"
            placeholder="Select a country"
            filterable
          >
            <el-option
              v-for="country in countries"
              :key="country.id"
              :label="country.name"
              :value="country.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleCancel('officeForm')">Cancel</el-button>
        <el-button
          type="primary"
          @click="handleCreateOffice('officeForm')"
        >Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    entityID: {
      type: Number,
      required: true
    },
    countryID: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      officeForm: {
        name:'',
        country_id: this.countryID,
        entity_id: this.entityID
      },
      addOfficeDialog: false,
      officeRule: {
        name: [
          { required: true, message: 'Office name can\'t be blank' },
          { max:25, message: 'Too long'},
          { min:3, message: 'Too short'}
        ],
        address: [
          { required: true, message: 'Address can\'t be blank' },
          { max:25, message: 'Too long'},
          { min:3, message: 'Too short'}
        ],
        zipcode: [
          { required: true, message: 'Zipcode can\'t be blank' },
          { max:25, message: 'Too long'},
          { min:3, message: 'Too short'}
        ],
        town: [
          { required: true, message: 'Town can\'t be blank' },
          { max:25, message: 'Too long'},
          { min:3, message: 'Too short'}
        ]
      }
    }
  },
  created(){
    //this.officeForm.country_id = this.countryID
  },
  computed: {
    ...mapGetters(['countries'])
  },
  methods: {
    ...mapActions(['createOffice']),
    handleAddOffice: function(id) {
      // display the form to add an office
      this.addOfficeDialog = true
    },
    handleCreateOffice: function(formName) { // Create office
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createOffice(this.officeForm)
            .then(() => {
              // reset form data
              this.$refs[formName].resetFields()
              this.addOfficeDialog = false
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
    handleCancel: function(formName){
      this.$refs[formName].resetFields()
      this.addOfficeDialog = false
    }
  }
}
</script>

<style scoped>
  .card-header-action {
    font-style:italic;
    font-size:18px;
  }
</style>
