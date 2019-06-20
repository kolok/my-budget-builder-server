<template>
  <div>
    <div>
      <h1>Entities</h1>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all>
        <el-table-column
          prop="date"
          label="date"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="Nom"
          sortable
          width="auto">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  <script>
    export default {
      data() {
        return {
          tableData: [{
            id: 1,
            date: '2016-05-02',
            name: 'wangxiaohu'
          }, {
            id: 2,
            date: '2016-05-04',
            name: 'wangxiaohu'
          }, {
            id: 3,
            date: '2016-05-01',
            name: 'wangxiaohu',
            children: [{
                id: 31,
                date: '2016-05-01',
                name: 'wangxiaohu'
              }, {
                id: 32,
                date: '2016-05-01',
                name: 'wangxiaohu'
            }]
          }, {
            id: 4,
            date: '2016-05-03',
            name: 'wangxiaohu'
          }],
          tableData1: [{
            id: 1,
            date: '2016-05-02',
            name: 'wangxiaohu'
          }, {
            id: 2,
            date: '2016-05-04',
            name: 'wangxiaohu'
          }, {
            id: 3,
            date: '2016-05-01',
            name: 'wangxiaohu',
            hasChildren: true
          }, {
            id: 4,
            date: '2016-05-03',
            name: 'wangxiaohu'
          }]
        }
      },
      methods: {
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

</style>
