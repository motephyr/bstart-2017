<template>
  <div class="">
    <ul id="allYear">
        <li class="single">
            <div class="year">106</div>
            <div class="RegularGoor"><br>345,678</div>
            <div class="CapitalGate"><br>345,678</div>
            <div class="Subtotal"><br>345,678</div>
            <el-switch v-model="valueSw106" on-color="#00D9AD" off-color="#ff4949"></el-switch>
            <el-date-picker v-model="value106" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
        </li>
        <li class="single">
            <div class="year">107</div>
            <div class="RegularGoor"><br>345,678</div>
            <div class="CapitalGate"><br>345,678</div>
            <div class="Subtotal"><br>345,678</div>
            <el-switch v-model="valueSw107" on-color="#00D9AD" off-color="#ff4949"></el-switch>
            <el-date-picker v-model="value107" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
        </li>
        <li class="single">
            <div class="year">108</div>
            <div class="RegularGoor"><br>345,678</div>
            <div class="CapitalGate"><br>345,678</div>
            <div class="Subtotal"><br>345,678</div>
            <el-switch v-model="valueSw108" on-color="#00D9AD" off-color="#ff4949"></el-switch>
            <el-date-picker v-model="value108" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
        </li>
        <li class="single">
            <div class="year">109</div>
            <div class="RegularGoor"><br>345,678</div>
            <div class="CapitalGate"><br>345,678</div>
            <div class="Subtotal"><br>345,678</div>
            <el-switch v-model="valueSw109" on-color="#00D9AD" off-color="#ff4949"></el-switch>
            <el-date-picker v-model="value109" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
        </li>
        <li class="single">
            <div class="year">110</div>
            <div class="RegularGoor"><br>345,678</div>
            <div class="CapitalGate"><br>345,678</div>
            <div class="Subtotal"><br>345,678</div>
            <el-switch v-model="valueSw110" on-color="#00D9AD" off-color="#ff4949"></el-switch>
            <el-date-picker v-model="value110" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
        </li>
    </ul>
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
  head: {
    title: 'Years Edit',
    meta: [
      { hid: 'description', name: 'description', content: 'Years Edit description' }
    ]
  },
  data() {
    return {
      pagetitle: "sadsad",
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      valueSw106: true,
      valueSw107: true,
      valueSw108: true,
      valueSw109: true,
      valueSw110: true,
      value106: '',
      value107: '',
      value108: '',
      value109: '',
      value110: '',
      value: ''
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
    //    $("body").append("gggggggggggggg");
  }
}
</script>

<style>
  #allYear{
      .single{
          display: block;
          background-color: #2A639C;
          padding: 12px 0;
          border-bottom: 1px solid #144E90;
          width: 100%;
          position: relative;
          float: left;
          .year{
              text-align: left;
              font-size: 36px;
              color: #00D9AD;
              display: inline-block;
              margin: 12px 5%;
          }
          .RegularGoor,.CapitalGate,.Subtotal{
              text-align: right;
              font-size: 20px;
              color: #C5EAFE;
              display: inline-block;
              margin: 12px 5%;
          }
          .RegularGoor{}
          .CapitalGate{}
          .Subtotal{}
          .year:after,.RegularGoor:before,.CapitalGate:before,.Subtotal:before{
              font-size: 14px;
              color: #5496D7;
          }
          .year:after{
              content: ' 年度';
          }
          .RegularGoor:before{
              content: '經常門';
          }
          .CapitalGate:before{
              content: '資本門';
          }
          .Subtotal:before{
              content: '總計';
          }
          .el-switch{
              /*float: right;*/
              margin: 6px 10px;
          }
          .el-date-editor{
              /*float: right;*/
              width: 130px;
              margin: 0 10px;
              .el-input__inner{
                  background-color: #2761A0;
                  color: #70fff5;
                  cursor: pointer;
              }
          }
      }
  }
</style>
