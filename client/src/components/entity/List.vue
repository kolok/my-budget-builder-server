<template>
  <div>
    <el-table
      :data="entities"
      style="width: 100%;margin-bottom: 20px;"
      :default-sort = "{prop: 'name', order: 'descending'}"
      row-key="id"
      border
      default-collapse-all
    >
      <el-table-column
        label="Entity"
        prop="name"
        sortable
      >
      </el-table-column>

      <el-table-column type="expand">
        <template slot-scope="props">
          <div>
            <div v-for="item in props.row.offices" style="min-width:400px;min-height:150px;float:left;padding:25px;">
              <el-card class="box-card">
                <div slot="header" class="card-header">
                  <span>{{item.name}}</span>
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    icon="el-icon-delete"
                    @click="handleDeleteOffice(item)"
                  />
                </div>
                <div class="text item" style="min-height:90px;">
                  <ul style="list-style: none;">
                  <li style="font:14px;font-style:bold;">{{item.name}}</li>
                  <li>{{item.address}}</li>
                  <li>{{item.zipcode}}&nbsp;{{item.town}}</li>
                  </ul>
                </div>
              </el-card>
            </div>
            <div id='boo' style="min-width:400px;min-height:150px;float:left;padding:25px;">
              <el-card class="box-card">
                <div slot="header" class="card-header-action">
                  <span>Create a new Office</span>
                </div>
                <div class="card-action" style="min-height:90px;display: flex;align-items: center; justify-content: center;">
                <el-button icon="el-icon-circle-plus-outline" type="text" style="font-size: 50px"/>
                </div>
              </el-card>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Country"
        prop="country.name"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="Currency"
        prop="currencyName"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="Offices"
        prop="officeNames">
      </el-table-column>
      <el-table-column
        label="Actions"
        >
      <template slot-scope="scope">
        <EntityEdit :entityForm="scope.row"/>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import EntityEdit from '../../components/entity/Edit.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      EntityEdit
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
      this.$store.dispatch('getEntitiesWithOffices').then(() => {
        this.loading = false
      })
    },
    methods: {
      ...mapActions(['removeEntity']),
      handleDeleteOffice(office) {
        console.log('office: ', office)
      }
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
