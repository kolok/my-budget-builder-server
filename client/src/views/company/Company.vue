<template>
  <div>
    <div v-if="userCompanyExists">
      <h1>Edit your company settings</h1>
      <Row :gutter="30">
        <Col />
          <CompanyEdit :id="this.getCurrentUser.company_id"/>
        </Col>
      </Row>
    </div>
    <div v-else>
      <h1>Oops, something went wrong</h1>
      you need to belong to a company
    </div>
  </div>
</template>

<script>
import CompanyEdit from '../../components/companies/Edit.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CompanyEdit
  },
  computed: {
    ...mapGetters(['getCurrentUser']),
    userCompanyExists: function() {
      console.log(this.getCurrentUser.company_id)
      return this.getCurrentUser.company_id !== undefined
    }
  },
  data() {
    return {

    }
  }
}
</script>
