import TeamResource from '../../api/team.service'
import OfficeResource from '../../api/office.service'

function buildTree(teams) {
  var root = {id:0, parent_id: null, children: []}
  var node_list = { 0 : root};
  for (var i = 0; i < teams.length; i++) {
    node_list[teams[i].id] = teams[i];
    node_list[teams[i].id].children = [];
  }
  for (var i = 0; i < teams.length; i++) {
    node_list[teams[i].parent_team_id || 0 ].children.push(node_list[teams[i].id]);
  }
  return root.children;
}

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
      state.teamTree = buildTree(teams);
    },
    CREATE_TEAM: (state, team) => {
      state.teams.push(team)
      state.teamTree = buildTree(state.teams);
    },
    setTeamInTree: (node, team) => {
      if (node.id == team.parent_team_id) {
        node.children.push(team);
        return true;
      }
      if (node.children.length == 0) {
        return false;
      }
      return node.children.forEach( subnode => {this.setTeamInTree(subnode, team)} )
    },
    UPDATE_TEAM: (state, team) => {
      state.teams.forEach(item => {
        if (item.id === team.id) {
          item = team
        }
      })
    },
    DELETE_TEAM: (state, team) => {
      console.log(team)
      state.teams.forEach( node => {
        if (node.parent_team_id == team.id) {
          node.parent_team_id = team.parent_team_id
        }
      })
      state.teams = state.teams.filter(item => item.id !== team.id)
      state.teamTree = buildTree(state.teams);
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
          commit('DELETE_TEAM', response.data)
        })
        .catch(err => {
          throw err
        })
    },
  }
}
