<template>
  <div>
    <el-input
      v-model="search"
      class="Content__Input--Search"
      placeholder="Type to search"
    />
    <br>
    <el-button
      type="text"
      size="mini"
      @click="showCreateDialog()">
      <i class="el-icon-plus" />
      Add a root team
    </el-button>

    <el-dialog
      title="Create a new team"
      :visible.sync="createDialog"
    >
      <el-form
        ref="teamForm"
        :model="teamForm"
        :rules="teamRule"
        label-width="250px"
        class="Dialog__Form"
      >
        <el-form-item
          prop="name"
          label="Team"
        >
          <el-input
            v-model="teamForm.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="Parent Team"
          prop="parent_team_id"
        >
          <el-select
            v-model="teamForm.parent_team_id"
            placeholder="Root"
          >
            <el-option
              v-for="team in teams"
              :key="team.id"
              :label="team.name"
              :value="team.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
      >
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button
          type="primary"
          @click="handleCreateTeam('teamForm')"
        >Save</el-button>
      </span>
    </el-dialog>







    <el-tree
      :data="filterTree(teamTree)"
      node-key="id"
      default-expand-all
      @node-drop="handleDrop"
      draggable
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span :class="data.search">{{ data.name }}</span>
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
            @click="() => removeTeam(data)">
            Supprimer
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>

  import TeamList from '../../components/team/List.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      TeamList
    },
    data() {
      return {
        root: {id:0, parent_id: null, children: []},
        teamData: [],
        search: '',
        createDialog: false,
        teamForm: {
          name: '',
          parent_team_id:''
        },
        teamRule: {
          name: [
            { required: true, message: 'Entity name can\'t be blank' },
            { max:25, message: 'Too long'},
            { min:3, message: 'Too short'}
          ]
        }

      }
    },
    computed: {
      ...mapGetters(['teams', 'teamTree'])
    },
    created() {
      this.$store.dispatch('getTeams')
    },
    methods: {
      ...mapActions(['createTeam', 'deleteTeam']),
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('draggingNode: ', draggingNode.label, dropType);
        console.log('dropNode: ', dropNode.label, dropType);
      },
      filterTree(teamTree) {
        var result = [];
        teamTree.forEach( node => {
          if (filterTree(node, this.search)){
            result.push(node);
          }
        });
        return result;


        if (this.search == ""){
          return teamTree;
        }
        teamTree.forEach( data => {
          if (data.name.toLowerCase().includes(this.search.toLowerCase()))
          {
            result.push(data);
          }
        })
        return result;
        //return teamTree.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()));
      },

      //////////////////////////
      // Team Management //
      //////////////////////////

      showCreateDialog() {
        this.createDialog = true;
      },
      handleCreateTeam: function(formName) { // Create entity
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.createTeam(this.teamForm)
              .then(response => {
                // reset form data
                this.$refs[formName].resetFields()
                this.createDialog = false
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
      handleCancel: function(){
        this.createDialog = false
      },
      append(data) {
        console.log('data: ', data);
      },
      removeTeam(data) {
        this.deleteTeam(data.id).catch(e => {
          console.log(e)
        });
      },
    }
  }

  function filterTree( treeNode, search ) {
    if (treeNode.children === undefined || treeNode.children.length == 0 ){
      return treeNode.name.toLowerCase().includes(search.toLowerCase())
    }
    else {
      var found = false;
      treeNode.children.forEach( node => {
        if (filterTree( node, search )) {
          found = true
        }
      });
      return treeNode.name.toLowerCase().includes(search.toLowerCase()) || found;
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
