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
      :data="teamData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      node-key="id"
      default-expand-all
      @node-drop="handleDrop"
      draggable
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
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
      this.$store.dispatch('getTeams').then((teams) => {
        var node_list = { 0 : this.root};
        for (var i = 0; i < this.teams.length; i++) {
          node_list[this.teams[i].id] = this.teams[i];
          node_list[this.teams[i].id].children = [];
          node_list[this.teams[i].id].label = node_list[this.teams[i].id].name;
        }
        for (var i = 0; i < this.teams.length; i++) {
          node_list[this.teams[i].parent_team_id || 0 ].children.push(node_list[this.teams[i].id]);
        }
        this.teamData = this.root.children;
      })
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
