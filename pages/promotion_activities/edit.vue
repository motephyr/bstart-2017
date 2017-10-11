<template>
  <div>
    <table style="border: 1px solid black;">
      <colgroup>
        <col style="background-color:red">
      </colgroup>
      <tbody>
      <tr v-for="(x, ix) in promotion_activities_edit.xaxio" :key="x.id">
        <td>{{x.value}}<button @click="showHide(x.id)">Show/Hide</button></td>
      </tr>
      </tbody>
    </table>
    <button @click="add('promotion_activities_2')">Add</button>
    <input type="text" v-model="xaxio_name" />

  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  props: ['promotion_activities_edit'],
  data () {
    return {
      promotion_activities_2: {
        xaxio: [],
        yaxio: [],
        value: []
      },
      xaxio_name: ''
    }
  },
  methods: {
    add (name) {
      axios.post('/api/table_field_xs/' + name, {xaxio_name: this.xaxio_name}).then((res) => {
        this.$router.replace('/promotion_activities?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    },
    showHide (id) {
      axios.patch('/api/table_field_xs/' + id).then((res) => {
        this.$router.replace('/promotion_activities?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>
