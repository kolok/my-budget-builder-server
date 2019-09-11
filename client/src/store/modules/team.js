import TeamResource from '../../api/team.service'
import OfficeResource from '../../api/office.service'

export default {
  state: {
    teams: [],
    teamTree: []
  },
  getters: {
    teams: state => state.teams,
    teamTree: state => state.teamTree
  },
  mutations: {
    SET_TEAMS: (state, teams) => {
      state.teams = teams
    },
    SET_TEAMTREE: (state, teams) => {
      var root = {id:0, parent_id: null, children: []}
      var node_list = { 0 : root};
      for (var i = 0; i < teams.length; i++) {
        node_list[teams[i].id] = teams[i];
        node_list[teams[i].id].children = [];
      }
      for (var i = 0; i < teams.length; i++) {
        node_list[teams[i].parent_team_id || 0 ].children.push(node_list[teams[i].id]);
      }
      state.teamTree = root.children;
    },
    CREATE_TEAM: (state, team) => {
      state.teams.push(team)
    },
    UPDATE_TEAM: (state, team) => {
      state.teams.forEach(item => {
        if (item.id === team.id) {
          item = team
        }
      })
    },
    DELETE_TEAM: (state, id) => {
      state.teams = state.teams.filter(item => item.id !== id)
    },
  },
  actions: {
    getTeams: ({ commit }) => {
      return TeamResource.list()
        .then(response => {
          var teams = response.data
          commit('SET_TEAMS', teams)
          commit('SET_TEAMTREE', teams)
        })
        .catch(err => {
          throw err
        })
    },
    createTeam: ({commit}, team) => {
      return TeamResource.create(team)
        .then(response => {
          var team = response.data
          commit('CREATE_TEAM', team)
        })
        .catch(err => {
          throw err
        })
    },
    updateTeam: ({commit}, payload) => {
      return TeamResource.update(payload.id, payload)
        .then(response => {
          commit('UPDATE_TEAM', response.data)
        })
        .catch(err => {
          throw err
        })
    },
    /*eslint no-unused-vars: [2, { "args": "none" }]*/
    deleteTeam: ({commit}, id) => {
      return TeamResource.delete(id)
        .then(response => {
          commit('DELETE_TEAM', id)
        })
        .catch(err => {
          throw err
        })
    },
  }
}
