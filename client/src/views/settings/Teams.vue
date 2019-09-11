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
      @click="() => append(data)">
      <i class="el-icon-plus" />
      Add a root team
    </el-button>
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
            @click="() => remove(node, data)">
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
        search: ''
      }
    },
    computed: {
      ...mapGetters(['teams', 'teamTree'])
    },
    created() {
      this.$store.dispatch('getTeams')
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
      },
      handleDelete(index, row) {
        console.log(index, row)
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('draggingNode: ', draggingNode.label, dropType);
        console.log('dropNode: ', dropNode.label, dropType);
      },
      append(data) {
        console.log('data: ', data);
      },
      remove(node, data) {
        console.log('data: ', data);
        console.log('node: ', node);
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
      }
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
