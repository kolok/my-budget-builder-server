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
function buildTreeSelector(teams) {
  var root = {value:0, children: []}
  var node_list = { 0 : root}
  var teamSelector = []
  for (var i = 0; i < teams.length; i++) {
    teamSelector[i] = {
      value: teams[i].id,
      label: teams[i].name,
      parent_team_id: teams[i].parent_team_id,
      children: []
    }
    node_list[teamSelector[i].value] = teamSelector[i];
  }
  for (var i = 0; i < teamSelector.length; i++) {
    node_list[teamSelector[i].parent_team_id || 0 ].children.push(node_list[teamSelector[i].value]);
  }
  return root.children;
}

export default {
  state: {
    teams: [],
    teamTree: [],
    teamTreeSelector: []
  },
  getters: {
    teams: state => state.teams,
    teamTree: state => state.teamTree,
    teamTreeSelector: state => state.teamTreeSelector
  },
  mutations: {
    SET_TEAMS: (state, teams) => {
      state.teams = teams
    },
    SET_TEAMTREE: (state, teams) => {
      state.teamTree = buildTree(teams);
      state.teamTreeSelector = buildTreeSelector(teams);
    },
    CREATE_TEAM: (state, team) => {
      state.teams.push(team)
      state.teamTree = buildTree(state.teams);
      state.teamTreeSelector = buildTreeSelector(state.teams);
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
      state.teamTreeSelector = buildTreeSelector(state.teams);
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
      if (team.parent_team_id.length !== undefined){
        team.parent_team_id = team.parent_team_id[ team.parent_team_id.length - 1 ]
      }
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
