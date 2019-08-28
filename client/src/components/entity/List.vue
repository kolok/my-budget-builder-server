<template>
  <div>
    <el-table
      :data="entities"
      class="Content__Table"
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
        sortable
      >
        <template slot-scope="props">
          {{ getCountry(props.row.country_id) }}
        </template>
      </el-table-column>
      <el-table-column
        label="Currency"
        sortable
      >
        <template slot-scope="props">
          {{ getCurrency(props.row.default_currency_id) }}
        </template>
      </el-table-column>
      <el-table-column
        label="Offices"
        sortable
      >
        <template slot-scope="props">
          {{ getOfficeNames(props.row.offices) }}
        </template>
      </el-table-column>
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
    getCountry: function(country_id) {
      return this.$store.getters.getCountryById(country_id).name
    },
    getCurrency: function(currency_id) {
      var currency = this.$store.getters.getCurrencyById(currency_id)
      return currency.name + '( ' + currency.symbol + ' )'
    },
    getOfficeNames: function(offices) {
      return offices.map( office => office.name).join(', ')
    }
  }
}
</script>
