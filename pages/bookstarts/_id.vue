<template>
  <div>
    <div class="nuxtMainPanel">
      <div class="pd20">
        <div class="container">
          <div class="row">
            <h2>館員、閱讀志工及幼托相關培訓課程</h2>

            <div v-for="y in bookstarts_1.yaxio" :key="y.id">{{y.value}}</div>
            <div v-for="(x, ix) in bookstarts_1.xaxio" :key="x.id">
              <div>{{x.value}}</div>
              <div v-for="(y, iy) in bookstarts_1.yaxio" :key="y.id">
                <div v-if="bookstarts_1.value.length > ix && bookstarts_1.value[ix]">
                  <el-input type="text" v-model="bookstarts_1.value[ix][iy]" ></el-input>
                </div>
              </div>
            </div>

          </div>
        </div>
        <table class="gTable">
          <thead>
          <tr>
            <th></th>
            <th v-for="y in bookstarts_1.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in bookstarts_1.xaxio" :key="x.id">
            <td>{{x.value}}</td>
            <td v-for="(y, iy) in bookstarts_1.yaxio" :key="y.id">
              <div v-if="bookstarts_1.value.length > ix && bookstarts_1.value[ix]">
                <el-input type="text" v-model="bookstarts_1.value[ix][iy]" ></el-input>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <button @click="update_data('bookstarts_1')">Update</button>

        <table class="gTable">
          <!--<colgroup>-->
            <!--<col style="background-color:red">-->
          <!--</colgroup>-->
          <thead>
          <tr>
            <th></th>
            <th v-for="y in bookstarts_2.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in bookstarts_2.xaxio" :key="x.id">
            <td>{{x.value}}</td>
            <td v-for="(y, iy) in bookstarts_2.yaxio" :key="y.id">
              <div v-if="bookstarts_2.value.length > ix && bookstarts_2.value[ix]">
                <el-input type="text" v-model="bookstarts_2.value[ix][iy]" ></el-input>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <button @click="update_data('bookstarts_2')">Update</button>

        <table class="gTable">
          <!--<colgroup>-->
            <!--<col style="background-color:red">-->
          <!--</colgroup>-->
          <thead>
          <tr>
            <th></th>
            <th v-for="y in bookstarts_3.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in bookstarts_3.xaxio" :key="x.id">
            <td>{{x.value}}</td>
            <td v-for="(y, iy) in bookstarts_3.yaxio" :key="y.id">
              <div v-if="bookstarts_3.value.length > ix && bookstarts_3.value[ix]">
                <el-input type="text" v-model="bookstarts_3.value[ix][iy]" ></el-input>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <button @click="update_data('bookstarts_3')">Update</button>

        <table class="gTable">
          <!--<colgroup>-->
            <!--<col style="background-color:red">-->
          <!--</colgroup>-->
          <thead>
          <tr>
            <th></th>
            <th v-for="y in bookstarts_4.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in bookstarts_4.xaxio" :key="x.id">
            <td>{{x.value}}</td>
            <td v-for="(y, iy) in bookstarts_4.yaxio" :key="y.id">
              <div v-if="bookstarts_4.value.length > ix && bookstarts_4.value[ix]">
                <el-input type="text" v-model="bookstarts_4.value[ix][iy]" ></el-input>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <button @click="update_data('bookstarts_4')">Update</button>

        <table class="gTable">
          <!--<colgroup>-->
            <!--<col style="background-color:red">-->
          <!--</colgroup>-->
          <thead>
          <tr>
            <th></th>
            <th v-for="y in bookstarts_5.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in bookstarts_5.xaxio" :key="x.id">
            <td>{{x.value}}</td>
            <td v-for="(y, iy) in bookstarts_5.yaxio" :key="y.id">
              <div v-if="bookstarts_5.value.length > ix && bookstarts_5.value[ix]">
                <el-input type="text" v-model="bookstarts_5.value[ix][iy]" ></el-input>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <button @click="update_data('bookstarts_5')">Update</button>

        <table class="gTable">
          <!--<colgroup>-->
            <!--<col style="background-color:red">-->
          <!--</colgroup>-->
          <thead>
          <tr>
            <th></th>
            <th v-for="y in bookstarts_6.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in bookstarts_6.xaxio" :key="x.id">
            <td>{{x.value}}</td>
            <td v-for="(y, iy) in bookstarts_6.yaxio" :key="y.id">
              <div v-if="bookstarts_6.value.length > ix && bookstarts_6.value[ix]">
                <el-input type="text" v-model="bookstarts_6.value[ix][iy]" ></el-input>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <button @click="update_data('bookstarts_6')">Update</button>

        <nuxt-link to="/">Back to the home page</nuxt-link>
      </div>
    </div>
    <div id="footerBar">
      <nuxt-link class="ftBt" to="/"><i class="icon-reply"></i> 返回</nuxt-link>
      <div class="ftBt"  @click="addYear()"><i class="icon-loupe"></i> 新增年度計畫</div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import _ from 'lodash'
export default {
  data () {
    return {
      bookstarts_1: {
        xaxio: [],
        yaxio: [],
        value: []
      },
      bookstarts_2: {},
      bookstarts_3: {},
      bookstarts_4: {},
      bookstarts_5: {},
      bookstarts_6: {},
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
        this.$router.replace('/promotion_activities?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    },
    async getData () {
      try {
        let bookstarts1 = await axios.get('/api/table_fields/' + 'bookstarts_1' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
        let bookstarts2 = await axios.get('/api/table_fields/' + 'bookstarts_2' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
        let bookstarts3 = await axios.get('/api/table_fields/' + 'bookstarts_3' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)

        this.bookstarts_1 = bookstarts1.data
        this.bookstarts_2 = bookstarts2.data
        this.bookstarts_3 = bookstarts3.data

        let bookstarts4 = await axios.get('/api/table_fields/' + 'bookstarts_4' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
        let bookstarts5 = await axios.get('/api/table_fields/' + 'bookstarts_5' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
        let bookstarts6 = await axios.get('/api/table_fields/' + 'bookstarts_6' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)

        this.bookstarts_4 = bookstarts4.data
        this.bookstarts_5 = bookstarts5.data
        this.bookstarts_6 = bookstarts6.data
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.$store.dispatch('setIsTitle', {
      is_title: "嬰幼兒閱讀活動統計"
    })
    this.getData()
  }
}
</script>
