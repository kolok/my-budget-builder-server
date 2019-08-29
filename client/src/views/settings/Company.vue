<template>
  <div>
    <div v-if="userCompanyExists">
      <h1 class="Content__Head1">Edit your company settings</h1>
      <CompanyEdit :id="getCurrentCompany.id" />
    </div>
    <div v-else>
      <h1 class="Content__Head1">Oops, something went wrong</h1>
      you need to belong to a company
    </div>
  </div>
</template>

<script>
  import CompanyEdit from '../../components/company/Edit.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      CompanyEdit
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters(['getCurrentCompany']),
      userCompanyExists: function() {
        return this.getCurrentCompany.id !== undefined
      }
    }
  }
</script>
