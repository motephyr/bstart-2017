<template>
  <!--<div class="pd20 bgcB">-->
  <div class="pd20">
    <div class="fIHeader">
      <div class="RegularGoor"><br>345,678</div>
      <div class="CapitalGate"><br>345,678</div>
      <div class="Subtotal"><br>345,678</div>
    </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="多元閱讀" name="first">
          <div v-for="struct in structs" :key="struct.sub_field">
            <table class="gTable">
              <!--<colgroup>-->
                <!--<col style="background-color:red">-->
              <!--</colgroup>-->
              <thead>
              <tr>
                <th></th>
                <!--<th>{{struct.sub_field}}</th>-->
                <th v-for="y in struct.yaxio" :key="y.id">{{y.value}}</th>
                <th>小計</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(x, ix) in struct.xaxio" :key="x.id">
                <td>{{x.value}}</td>
                <td v-for="(y, iy) in struct.yaxio" :key="y.id">
                  <div v-if="struct.value.length > ix && struct.value[ix]">
                    <!--<input type="text" v-model="struct.value[ix][iy]" />-->
                    <el-input v-model="struct.value[ix][iy]" placeholder=""></el-input>
                  </div>
                </td>
                <td></td>
              </tr>
              </tbody>
            </table>
            <button @click="update_data(struct.sub_field)">Update</button>
          </div>

          <nuxt-link to="/">Back to the home page</nuxt-link>
        </el-tab-pane>
        <el-tab-pane label="本土語言" name="second"></el-tab-pane>
      </el-tabs>
    <h1>funding_implementations</h1>
    <p>If you try to access this URL not connected, you will be redirected to the home page (server-side or client-side)</p>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import _ from 'lodash'
export default {
  data () {
    return {
      activeName: 'first',
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
  @media (max-width: 400px) {
    table{
      td,th{
        .el-input{
          width: 100px;
          .el-input__inner{
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
