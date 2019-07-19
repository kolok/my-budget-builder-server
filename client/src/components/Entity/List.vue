<template>
  <div>
    <el-table
      :data="entities"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-collapse-all
    >
      <el-table-column
        label="Entity"
        prop="name">
      </el-table-column>

      <el-table-column type="expand">
        <template slot-scope="props">
          <div v-for="item in props.row.offices" style="min-width:400px;min-height:150px;float:left;padding:25px;">
            <el-card class="box-card">
              <div slot="header" class="card-header">
                <span>{{item.name}}</span>
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
        </template>
      </el-table-column>
      <el-table-column
        label="Country"
        prop="country.name">
      </el-table-column>
      <el-table-column
        label="Currency"
        prop="currencyName">
      </el-table-column>
      <el-table-column
        label="Offices"
        prop="officeNames">
      </el-table-column>
      <el-table-column
        label="Actions"
        >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
      </el-table-column>
    </el-table>
    <template>
      <el-button type="primary">Create a new entity</el-button>
    </template>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
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
      getNameList(offices) {
        console.log("off.name")
        offices.forEach( off => console.log(off.name))
      },
      handleEdit(index,row) {
        console.log('edit', row)
      },
      handleDelete(index,row) {
        console.log('delete', row)
      }
    }
  }
</script>
<style scoped>
.card-header {
  font-weight:bold;
  font-size:18px;
}
</style>
