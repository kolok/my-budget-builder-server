<template>
  <div>
    <el-table
      :data="entities"
      style="width: 100%;margin-bottom: 20px;"
      :default-sort="{prop: 'name', order: 'descending'}"
      row-key="id"
      border
      default-collapse-all
      empty-text="No entity..."
    >
      <el-table-column
        label="Entity"
        prop="name"
        sortable
      />
      <el-table-column type="expand">
        <template slot-scope="props">
          <ListOffice :entity="props.row"/>
        </template>
      </el-table-column>
      <el-table-column
        label="Country"
        prop="country.name"
        sortable
      />
      <el-table-column
        label="Currency"
        prop="currencyName"
        sortable
      />
      <el-table-column
        label="Offices"
        prop="officeNames"
      />
      <el-table-column
        label="Actions"
      >
        <template slot-scope="scope">
          <EntityEdit :entity-form="scope.row" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import EntityEdit from './Edit.vue'
import ListOffice from './ListOffices.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    EntityEdit,
    ListOffice
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapGetters(['entities'])
  },
  created() {
    this.$store.dispatch('getCurrencies'),
    this.$store.dispatch('getCountries'),
    this.$store.dispatch('getEntitiesWithOffices').then(() => {
      this.loading = false
    })
  },
  methods: {
  }
}
</script>
<style scoped>
.card-header {
  font-weight:bold;
  font-size:18px;
}

.card-header-action {
  font-style:italic;
  font-size:18px;
}
</style>
