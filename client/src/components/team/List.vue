<template>
  <div>
    <el-table
      :data="teams"
      class="Content__Table"
      :default-sort="{prop: 'name', order: 'descending'}"
      row-key="id"
      border
      default-collapse-all
      empty-text="No entity..."
    >
      <el-table-column
        label="Team"
        prop="name"
        sortable
      />
      <el-table-column
        label="Parent team id"
        prop="parent_team_id"
        sortable
      />
      <el-table-column
        label="Actions"
      >
        <template slot-scope="scope">

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      loading: true,
      root: {id:0, parent_id: null, children: []}
    }
  },
  computed: {
    ...mapGetters(['teams'])
  },
  created() {
    this.$store.dispatch('getTeams').then((teams) => {
      console.log(this.teams);
      var root = {id:0, parent_id: null, children: []};
      var node_list = { 0 : root};
      for (var i = 0; i < this.teams.length; i++) {
          node_list[this.teams[i].id];
      }
      for (var i = 0; i < this.teams.length; i++) {
        node_list[this.teams[i].id] = this.teams[i];
        node_list[this.teams[i].id].children = [];
          node_list[this.teams[i].parent_team_id || 0 ].children.push(node_list[this.teams[i].id]);
      }
      console.log(root);
      this.loading = false
    })
  },
  methods: {
  }
}
</script>
