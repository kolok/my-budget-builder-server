import TeamResource from '../../api/team.service'
import OfficeResource from '../../api/office.service'

export default {
  state: {
    teams: []
  },
  getters: {
    teams: state => state.teams
  },
  mutations: {
    SET_TEAMS: (state, teams) => {
      state.teams = teams
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
