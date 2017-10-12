<template>
  <div>
    <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
    <h1>歷年計畫</h1>
　  <div :value="p.id" v-for="p in years">{{p}}</div>
      <input type="text">
    <button @click="addYear()">addYear</button>
    <nuxt-link to="/">Back to the home page</nuxt-link>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      value1: ''
    };
  },
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
  },
  mounted: function () {
    $("body").append("gggggggggggggg");
  }
}
</script>
