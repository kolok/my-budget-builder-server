<template>
  <div style="float: right; padding: 3px 0">
    <el-button
      style="float: right; padding: 3px 0"
      type="text"
      icon="el-icon-edit"
      @click="handleEditOffice(officeForm)"
    />

    <el-dialog
      title="Edit the office"
      :visible.sync="editOfficeDialog"
    >
      <el-form
        ref="officeForm"
        :model="officeForm"
        :rules="officeRule"
        label-width="250px"
        class="Dialog__Form"
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
          @click="handleUpdateOffice('officeForm')"
        >Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    officeForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editOfficeDialog: false,
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
  },
  computed: {
    ...mapGetters(['countries'])
  },
  methods: {
    ...mapActions(['updateOffice']),
    handleEditOffice(office) {
      // display the form to add an office
      this.editOfficeDialog = true
    },
    handleUpdateOffice: function(formName) { // Create office
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateOffice(this.officeForm)
            .then(() => {
              this.editOfficeDialog = false
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
      this.editOfficeDialog = false
    }
  }
}
</script>
