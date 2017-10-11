<template>
  <div>
    <h1>歷年計畫</h1>
　   <div :value="p.id" v-for="p in years">{{p}}</div>
    <button @click="addYear()">addYear</button>
    <nuxt-link to="/">Back to the home page</nuxt-link>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  asyncData ({ params, error }) {
    return axios.get('/api/year_places')
      .then((res) => {
        return res.data
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'User not found' })
      })
  },
  methods: {
    addYear (e) {
      axios.post('/api/year_places').then((res) => {
        this.$router.replace('/years/edit' + '?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>
