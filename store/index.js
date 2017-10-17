import axios from '~/plugins/axios'

export const state = () => ({
  authUser: null,
  year: 106,
  place: '中央',
  yearPlaceId: 1,
  yearPlaces: {years: null, places: null},
  isActive: false,
  isTitle: ''
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
  SET_YEAR: function (state, year) {
    state.year = year
  },
  SET_PLACE: function (state, place) {
    state.place = place
  },
  SET_YEAR_PLACE_ID: function (state, yearPlaceId) {
    state.yearPlaceId = yearPlaceId
  },
  SET_YEAR_PLACES: function (state, yearPlaces) {
    state.yearPlaces = yearPlaces
  },
  SET_IS_ACTIVE: function (state, isActive) {
    state.isActive = isActive
  },
  SET_IS_TITLE: function (state, isTitle) {
    state.isTitle = isTitle
  }
}

// async function a(place, year){
//   console.log(place)
//   console.log(year)
//   try {
//     console.log('aaa')
//     var res = await axios.get('/api/year_places/getId?place=' + place + '&year=' + year)
//     console.log('bbb')
//     commit('SET_YEAR_PLACE_ID', res.data.id)
//     console.log('aaa')
//   } catch (error) {
//     if (error.response.status === 401) {
//       throw new Error('Bad credentials')
//     }
//   }
// }

export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.loggedIn) {
      commit('SET_USER', {username: req.session.name})
      try {
        var res = await axios.post('/api/users/email',{email: req.session.email})
        commit('SET_PLACE', res.data.area)

        var yearPlaces = await axios.get('/api/year_places')
        commit('SET_YEAR_PLACES', yearPlaces.data)

        var yearPlaceId = await axios.post('/api/year_places/getId', {place: res.data.area, year: state().year})
        commit('SET_YEAR_PLACE_ID', yearPlaceId.data.id)
      } catch (error) {
        if (error.response.status === 401) {
          throw new Error('Bad credentials')
        }
      }
    }
  },
  async getYearPlaceId ({ commit }, { place, year }) {
    var yearPlaceId = await axios.post('/api/year_places/getId', {place: place, year: year})
    commit('SET_YEAR_PLACE_ID', yearPlaceId.data.id)
  },
  setYear ({ commit }, { year }) {
    return commit('SET_YEAR', year)
  },
  setPlace ({ commit }, { place }) {
    return commit('SET_PLACE', place)
  },

  logout ({ commit }) {
    return axios.post('/logout').then(() => {
      commit('SET_USER', null)
    })
  },
  setIsActive ({ commit }, { is_active }) {
    commit('SET_IS_ACTIVE', is_active)
  },
  setIsTitle ({ commit }, { is_title }) {
    commit('SET_IS_TITLE', is_title)
  }
}
