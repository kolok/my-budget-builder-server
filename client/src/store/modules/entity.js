import EntityResource from '../../api/entity.service'
import OfficeResource from '../../api/office.service'

export default {
  state: {
    entities: []
  },
  getters: {
    entities: state => state.entities
  },
  mutations: {
    SET_ENTITIES: (state, entities) => {
      state.entities = entities
    },
    CREATE_ENTITY: (state, entity) => {
      state.entities.push(entity)
    },
    UPDATE_ENTITY: (state, entity) => {
      state.entities.forEach(item => {
        if (item.id === entity.id) {
          item = entity
        }
      })
    },
    DELETE_ENTITY: (state, id) => {
      state.entities = state.entities.filter(item => item.id !== id)
    },

    /*
     * Manage the Office related interactions
     */
    CREATE_OFFICE: (state, office) => {
      state.entities.forEach(item => {
        if (item.id === office.entity_id) {
          item.offices.push(office)
        }
      })
    },
    async DELETE_OFFICE (state, office) {
      state.entities.forEach(item => {
        if (item.id === office.entity_id) {
          item.offices = item.offices.filter(off => off.id !== office.id)
        }
      })
    },


  },
  actions: {
    getEntitiesWithOffices: ({ commit }) => {
      return EntityResource.listWithOffices()
        .then(response => {
          var entities = response.data
          commit('SET_ENTITIES', entities)
        })
        .catch(err => {
          throw err
        })
    },
    createEntity: ({commit}, entity) => {
      return EntityResource.create(entity)
        .then(response => {
          var entity = response.data
          commit('CREATE_ENTITY', entity)
        })
        .catch(err => {
          throw err
        })
    },
    updateEntity: ({commit}, payload) => {
      return EntityResource.update(payload.id, payload)
        .then(response => {
          commit('UPDATE_ENTITY', response.data)
        })
        .catch(err => {
          throw err
        })
    },
    /*eslint no-unused-vars: [2, { "args": "none" }]*/
    deleteEntity: ({commit}, id) => {
      return EntityResource.delete(id)
        .then(response => {
          commit('DELETE_ENTITY', id)
        })
        .catch(err => {
          throw err
        })
    },

    /*
     * Manage the Office related interactions
     */
    createOffice: ({commit}, office) => {
      return OfficeResource.create(office)
        .then(response => {
          var office = response.data
          commit('CREATE_OFFICE', office)
        })
        .catch(err => {
          throw err
        })
    },
    deleteOffice: ({commit}, id) => {
      return OfficeResource.delete(id)
        .then(response => {
          commit('DELETE_OFFICE', response.data)
        })
        .catch(err => {
          throw err
        })
    },

  }
}
