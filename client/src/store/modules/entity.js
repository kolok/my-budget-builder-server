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
    ADD_ENTITY: (state, entity) => {
      state.entities.push(entity)
    },
    EDIT_ENTITY: (state, entity) => {
      state.entities.forEach(item => {
        if (item.id === entity.id) {
          item = entity
        }
      })
    },
    REMOVE_ENTITY: (state, id) => {
      state.entities = state.entities.filter(item => item.id !== id)
    },


    ADD_OFFICE: (state, office) => {
      state.entities.forEach(item => {
        if (item.id === office.entity_id) {
          item.offices.push(office)
          var officeNames = []
          item.offices.forEach( office => {officeNames.push(office.name)})
          item.officeNames = officeNames.join(', ')
        }
      })
    },
    async REMOVE_OFFICE (state, office) {
      state.entities.forEach(item => {
        if (item.id === office.entity_id) {
          console.log('REMOVE_OFFICE inside:', item)

          item.offices = item.offices.filter(off => off.id !== office.id)
          var officeNames = []
          item.offices.forEach( off => { officeNames.push(off.name) } )
          item.officeNames = officeNames.join(', ')
        }
      })
    },


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
          commit('ADD_ENTITY', entity)
        })
        .catch(err => {
          throw err
        })
    },
    editEntity: ({commit}, payload) => {
      return EntityResource.update(payload.id, payload)
        .then(response => {
          /*
           * FIXME: update currencyName and country.name, it is not updated in table after update,
           * we need to refresh with a F5 to see the updated
           */
          var entity = response.data
          if (entity.currency !== null) {
            entity.currencyName = entity.currency.name + ' ( ' + entity.currency.symbol + ' )'
          }
          console.log('Entity', entity)
          commit('EDIT_ENTITY', entity)
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
    },





    addOffice: ({commit}, office) => {
      return OfficeResource.create(office)
        .then(response => {
          var office = response.data
          commit('ADD_OFFICE', office)
        })
        .catch(err => {
          throw err
        })
    },
    removeOffice: ({commit}, id) => {
      return OfficeResource.delete(id)
        .then(response => {
          commit('REMOVE_OFFICE', response.data)
        })
        .catch(err => {
          throw err
        })
    },

  }
}
