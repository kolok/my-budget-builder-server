import EntityResource from '../../api/entity.service'

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
    ADD_ENTITY: (state, entity) => {
      state.entities.push(entity)
    },
    EDIT_ENTITY: (state, entity) => {
      state.entities.forEach(item => {
        if (item._id === entity._id) {
          item.name = entity.name
          item.info = entity.info
        }
      })
    },
    REMOVE_ENTITY: (state, id) => {
      state.entities = state.entities.filter(item => item._id !== id)
    }
  },
  actions: {
    getEntitiesWithOffices: ({ commit }) => {
      return EntityResource.listWithOffices()
        .then(response => {
          var entities = response.data
          entities.forEach (entity => {
            var officeNames = []
            entity.offices.forEach( office => {officeNames.push(office.name)})
            entity.officeNames = officeNames.join(', ')
            if (entity.currency !== null) {
              entity.currencyName = entity.currency.name + ' ( ' + entity.currency.symbol + ' )'
            }
          })
          commit('SET_ENTITIES', entities)
        })
        .catch(err => {
          throw err
        })
    },
    addEntity: ({commit}, entity) => {
      return EntityResource.create(entity)
        .then(response => {
          var entity = response.data
          if (entity.currency !== null) {
            entity.currencyName = entity.currency.name + ' ( ' + entity.currency.symbol + ' )'
          }
          commit('ADD_ENTITY', response.data)
        })
        .catch(err => {
          throw err
        })
    },
    editEntity: ({commit}, payload) => {
      return EntityResource.update(payload._id, payload.content)
        .then(response => {
          commit('EDIT_ENTITY', response.data)
        })
        .catch(err => {
          throw err
        })
    },
    /*eslint no-unused-vars: [2, { "args": "none" }]*/
    removeEntity: ({commit}, id) => {
      return EntityResource.delete(id)
        .then(response => {
          commit('REMOVE_ENTITY', id)
        })
        .catch(err => {
          throw err
        })
    }
  }
}
