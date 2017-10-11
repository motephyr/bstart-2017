<template>
  <div>
    <h1>reading_activities</h1>
    <p>If you try to access this URL not connected, you will be redirected to the home page (server-side or client-side)</p>

    <table style="border: 1px solid black;">
      <colgroup>
        <col style="background-color:red">
      </colgroup>
      <thead>
      <tr>
        <th></th>
        <th v-for="y in reading_activities_1.yaxio" :key="y.id">{{y.value}}</th> 
      </tr>
      </thead>
      <tbody>
      <tr v-for="(x, ix) in reading_activities_1.xaxio" :key="x.id">
        <td>{{x.value}}</td>
        <td v-for="(y, iy) in reading_activities_1.yaxio" :key="y.id">
          <div v-if="reading_activities_1.value.length > ix && reading_activities_1.value[ix]"> 
            <input type="text" v-model="reading_activities_1.value[ix][iy]" />
          </div>
        </td> 
      </tr>
      </tbody>
    </table>
    <button @click="update_data('reading_activities_1')">Update</button>
    <table style="border: 1px solid black;">
      <colgroup>
        <col style="background-color:red">
      </colgroup>
      <thead>
      <tr>
        <th></th>
        <th v-for="y in reading_activities_2.yaxio" :key="y.id">{{y.value}}</th> 
      </tr>
      </thead>
      <tbody>
      <tr v-for="(x, ix) in reading_activities_2.xaxio" :key="x.id">
        <td>{{x.value}}</td>
        <td v-for="(y, iy) in reading_activities_2.yaxio" :key="y.id">
          <div v-if="reading_activities_2.value.length > ix && reading_activities_2.value[ix]"> 
            <input type="text" v-model="reading_activities_2.value[ix][iy]" />
          </div>
        </td> 
      </tr>
      </tbody>
    </table>
        <button @click="update_data('reading_activities_2')">Update</button>

    <nuxt-link to="/">Back to the home page</nuxt-link>
    <edit :reading_activities_edit="reading_activities_edit" />
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import _ from 'lodash'
import Edit from './edit.vue'
export default {
  components: {
    Edit
  },
  data () {
    return {
      reading_activities_1: {
        xaxio: [],
        yaxio: [],
        value: []
      },
      reading_activities_2: {},
      reading_activities_edit: {},
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
      var changeValue = _(this[name].xaxio).map((x, i) => {
        x.table_values = this[name].value[i]
        return x
      }).value()
      console.log(changeValue)
      axios.post('/api/table_values/' + name, {change_value: changeValue, yearPlaceId: this.$store.state.yearPlaceId}).then((res) => {
        this.$router.replace('/reading_activities?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    },
    async getData () {
      try {
        let readingActivitiesEdit = await axios.get('/api/table_fields/' + 'reading_activities_1' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId +'&action=edit')
        let readingActivities1 = await axios.get('/api/table_fields/' + 'reading_activities_1' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
        let readingActivities2 = await axios.get('/api/table_fields/' + 'reading_activities_2' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
        this.reading_activities_1 = readingActivities1.data
        this.reading_activities_2 = readingActivities2.data
        this.reading_activities_edit = readingActivitiesEdit.data
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
