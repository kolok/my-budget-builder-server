<template>
  <div>
    <h1 class="Content__Head1">Teams</h1>

      <el-input
        v-model="search"
        style="max-width:400px;margin:20px 0;"
        placeholder="Type to search"
      />
      <el-tree
        :data="teamData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => append(data)">
              Ajouter
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)">
              Supprimer
            </el-button>
          </span>
        </span>
      </el-tree>



    <el-table
      :data="teamData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      empty-text="No data"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column
        prop="name"
        label="Name"
        sortable
        width="auto"
      />
      <el-table-column
        prop="entity"
        label="Entity"
        sortable
        width="auto"
      />
      <el-table-column
        prop="office"
        label="Office"
        sortable
        width="auto"
      />
      <el-table-column
        prop="manager"
        label="Manager"
        sortable
        width="auto"
      />
      <el-table-column
        prop="ft"
        label="Full time"
        sortable
        width="auto"
      />
      <el-table-column
        label="Actions"
        width="auto"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >
            Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary">
      Create a new team
    </el-button>
  </div>
</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
        teamData: [{
          id: 1,
          name: 'Sales',
          label: 'Sales',
          manager: 'Emmanuel Macron',
          ft:10,
          children: [{
            id: 3,
            name: 'FR Sales',
            label: 'FR Sales',
            entity: 'loop SAS',
            ft:6
          }, {
            id: 4,
            name: 'US Sales',
            label: 'US Sales',
            entity: 'loop CO',
            ft:4,
            children: [{
              id: 5,
              name: 'NY Sales',
              label: 'NY Sales',
              entity: 'loop CO',
              office: 'New York',
              ft:3
            }, {
              id: 6,
              name: 'SF Sales',
              label: 'SF Sales',
              entity: 'loop CO',
              office: 'San Francisco',
              ft:1
            }]
          }]
        }, {
          id: 7,
          name: 'R&D',
          label: 'R&D',
          manager: 'Edouard Philippe',
          ft: 22.5,
          children: [{
            id: 8,
            name: 'Infra',
            label: 'Infra',
            entity: 'loop SAS',
            office: 'Paris',
            ft:2
          }, {
            id: 9,
            name: 'Development',
            label: 'Development',
            entity: 'loop SAS',
            office: 'Paris',
            ft:20.5,
            children: [{
              id: 10,
              name: 'Frontend',
              label: 'Frontend',
              entity: 'loop SAS',
              office: 'Paris',
              ft:12.5
            }, {
              id: 11,
              name: 'Backend',
              label: 'Backend',
              entity: 'loop SAS',
              office: 'Paris',
              ft:8
            }, {
              id: 12,
              name: 'This is a very long name of team because it can occur in the real life',
              label: 'This is a very long name of team because it can occur in the real life',
              entity: 'loop SAS',
              office: 'Paris'
            }]
          }]
        }, {
          id: 2,
          name: 'Board',
          label: 'Board',
          ft:3
        }],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
      },
      handleDelete(index, row) {
        console.log(index, row)
      }
    }
  }
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
