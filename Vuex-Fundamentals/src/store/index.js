import Vuex from 'vuex'
import events from './modules/events'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

const ls = new SecureLS({ isCompression: false })
const dataState = createPersistedState({
  key: 'course_vuex',
  storage: {
    getItem: key => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: key => ls.remove(key)
  },
  paths: ['events']
})

export default new Vuex.Store({
  modules: {
    events
  },
  plugins: [dataState]
})
