import EventService from '@/services/EventService.js'

const state = {
  user: 'Adam Jahr',
  events: [],
  event: {}
}

const actions = {
  createEvent({ commit }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
      })
      .catch(error => {
        throw error
      })
  },

  fetchEvents({ commit }) {
    return EventService.getEvents()
      .then(response => {
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        throw error
      })
  },

  fetchEvent({ commit, state }, id) {
    const existingEvent = state.events.find(event => event.id === id)
    if (existingEvent) {
      commit('SET_EVENT', existingEvent)
    } else {
      return EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          throw error
        })
    }
  }
}

const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },

  SET_EVENT(state, event) {
    state.event = event
  },

  SET_EVENTS(state, events) {
    state.events = events
  }
}

const getters = {
  events: state => {
    return state.events
  },

  event: state => {
    return state.event
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
