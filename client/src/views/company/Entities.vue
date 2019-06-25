<template>
  <div>
    <h1>Entities</h1>
    <el-input
          v-model="search"
          style="max-width:400px;margin:20px 0;"
          placeholder="Type to search"/>
    <el-table
    <template>
      <el-table
        :data="entitiesData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-collapse-all
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <div v-for="item in props.row.officesDetails" style="min-width:400px;min-height:150px;float:left;padding:25px;">
              <el-card class="box-card">
                <div slot="header" class="card-header">
                  <span>{{item.name}}</span>
                </div>
                <div class="text item" style="min-height:90px;">
                  <ul style="list-style: none;">
                  <li style="font:14px;font-style:bold;">{{item.name}}</li>
                  <li>{{item.address}}</li>
                  <li>{{item.address2}}</li>
                  <li>{{item.zipcode}}&nbsp;{{item.town}}</li>
                  </ul>
                </div>
              </el-card>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Branch"
          prop="name">
        </el-table-column>
        <el-table-column
          label="Country"
          prop="country">
        </el-table-column>
        <el-table-column
          label="Offices"
          prop="offices">
        </el-table-column>
        <el-table-column
          label="Actions">
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
      <el-button type="primary">Create a new team</el-button>
    </template>
  </div>
</template>
  <script>
    export default {
      data() {
        return {
          entitiesData: [{
            id: 1,
            name: 'Loop SAS',
            country: 'France',
            offices: 'Paris, Nantes, Lyon',
            officesDetails: [
              {
                name: 'Loop - Siège social',
                address: '15 av des Champs Elysées',
                address2: 'BP 12598',
                zipcode: '75008',
                town: 'Paris'
              },
              {
                name: 'Loop Nantes',
                address: '10 près de la mer',
                zipcode: '44000',
                town: 'Nantes'
              },
              {
                name: 'Loop Lyon',
                address: '356 bvd du jambon',
                zipcode: '96000',
                town: 'Lyon'
                },
              {
                name: 'Loop',
                address: '1 av de la bière',
                zipcode: '52000',
                town: 'Lille'
              },
              {
                name: 'Loop St Denis development',
                address: '10 rue Catulienne',
                zipcode: '93200',
                town: 'Saint Denis'
              }
            ]
          }, {
            id: 2,
            name: 'Loop Limited',
            country: 'United Kingdom',
            offices: 'London',
            officesDetails: [
              {
                name: 'Loop Limited',
                address: '10 Downing street',
                address2: '',
                zipcode: 'XP345',
                town: 'London'
              }
            ]
          }, {
            id: 3,
            name: 'Loop Co',
            country: 'United States',
            offices: 'New-York, San Francisco',
            officesDetails: [
              {
                name: 'Loop NY',
                address: 'Central park',
                address2: '',
                zipcode: 'NY-987',
                town: 'New York'
              },
              {
                name: 'Loop SF',
                address: '10 flower garden',
                address2: '',
                zipcode: 'SF-123',
                town: 'San Francisco'
              }
            ]
          }],
          search:''
        }
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
        },
        load(tree, treeNode, resolve) {
          setTimeout(() => {
            resolve([
              {
                id: 31,
                date: '2016-05-01',
                name: 'wangxiaohu'
              }, {
                id: 32,
                date: '2016-05-01',
                name: 'wangxiaohu'
              }
            ])
          }, 1000)
        }
      },
    }
  </script>
<style scoped>
.card-header {
  font-weight:bold;
  font-size:18px;
}
</style>
