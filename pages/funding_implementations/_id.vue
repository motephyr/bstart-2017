<template>
  <div>
    <h1>funding_implementations</h1>
    <p>If you try to access this URL not connected, you will be redirected to the home page (server-side or client-side)</p>
    <div v-for="struct in structs" :key="struct.sub_field">
    <table style="border: 1px solid black;">
      <colgroup>
        <col style="background-color:red">
      </colgroup>
      <thead>
      <tr>
        <th>{{struct.sub_field}}</th>
        <th v-for="y in struct.yaxio" :key="y.id">{{y.value}}</th> 
      </tr>
      </thead>
      <tbody>
      <tr v-for="(x, ix) in struct.xaxio" :key="x.id">
        <td>{{x.value}}</td>
        <td v-for="(y, iy) in struct.yaxio" :key="y.id">
          <div v-if="struct.value.length > ix && struct.value[ix]"> 
            <input type="text" v-model="struct.value[ix][iy]" />
          </div>
        </td> 
      </tr>
      </tbody>
    </table>
    <button @click="update_data(struct.sub_field)">Update</button>
    </div>


    <nuxt-link to="/">Back to the home page</nuxt-link>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import _ from 'lodash'
export default {
  data () {
    return {
      structs: [],
      vuexData: this.$store.state
    }
  },
  watch: {
    'vuexData.yearPlaceId': {
      handler: function(newValue, oldValue) { // 可以获取新值与老值两个参数
        this.getData()
      }
    }
  },
  methods: {
    update_data (name) {
      var struct = _(this.structs).filter((x) => {return x.sub_field === name}).value()[0]
      var changeValue = _(struct.xaxio).map((x, i) => {
        x.table_values = struct.value[i]
        return x
      }).value()
      axios.post('/api/table_values/updateSubField/' + 'funding_implementations', {change_value: changeValue, yearPlaceId: this.$store.state.yearPlaceId, subField: name}).then((res) => {
        this.$router.replace('/funding_implementations?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    },
    async getData () {
      try {
        // let readingActivitiesEdit = await axios.get('/api/table_fields/' + 'funding_implementations' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId +'&action=edit')
        let res = await axios.post('/api/table_fields/getSubField/' + 'funding_implementations', {year: this.$store.state.year, yearPlaceId: this.$store.state.yearPlaceId})
        this.structs = res.data
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style>
  h1{
    color: #009558;
  }
</style>
