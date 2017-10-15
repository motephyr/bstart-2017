<template>
  <div>
    <div class="nuxtMainPanel">
      <div class="">
          <h1>歷年計畫</h1>
          　  <div :value="p.id" v-for="p in years">{{p}}</div>
          <!--<button @click="addYear()">addYear</button>-->
          <!--<nuxt-link to="/">Back to the home page</nuxt-link>-->
        <ul id="allYear" class="container mgCenter">
            <li class="single row">
                <div class="col-6 col-sm-5 col-md-4 col-lg-2 year">110</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-2 RegularGoor"><br>215,345,678</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 CapitalGate"><br>345,345,678</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 Subtotal"><br>3,945,345,678</div>
                <div class="col-12 col-sm-10 col-md-8 col-lg-2 dateArrival">
                    <el-date-picker v-model="value110" type="date" placeholder="已結束" :picker-options="pickerOptions0"></el-date-picker>
                </div>
            </li>
            <li class="single">
                <div class="col-6 col-sm-5 col-md-4 col-lg-2 year">109</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-2 RegularGoor"><br>245,345,678</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 CapitalGate"><br>345,345,678</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 Subtotal"><br>3,945,345,678</div>
                <div class="col-12 col-sm-10 col-md-8 col-lg-2 dateArrival">
                    <el-date-picker v-model="value109" type="date" placeholder="已結束" :picker-options="pickerOptions0"></el-date-picker>
                </div>
            </li>
            <li class="single">
                <div class="col-6 col-sm-5 col-md-4 col-lg-2 year">108</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-2 RegularGoor"><br>345,678</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 CapitalGate"><br>345,678</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 Subtotal"><br>345,678</div>
                <div class="col-12 col-sm-10 col-md-8 col-lg-2 dateArrival">
                    <el-date-picker v-model="value108" type="date" placeholder="已結束" :picker-options="pickerOptions0"></el-date-picker>
                </div>
            </li>
            <li class="single">
                <div class="col-6 col-sm-5 col-md-4 col-lg-2 year">107</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-2 RegularGoor"><br>345,678</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 CapitalGate"><br>345,678</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 Subtotal"><br>345,678</div>
                <div class="col-12 col-sm-10 col-md-8 col-lg-2 dateArrival">
                    <el-date-picker v-model="value107" type="date" placeholder="已結束" :picker-options="pickerOptions0"></el-date-picker>
                </div>
            </li>
            <li class="single">
                <div class="col-6 col-sm-5 col-md-4 col-lg-2 year">106</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-2 RegularGoor"><br>345,678</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 CapitalGate"><br>345,678</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 Subtotal"><br>345,678</div>
                <div class="col-12 col-sm-10 col-md-8 col-lg-2 dateArrival">
                    <el-date-picker v-model="value106" type="date" placeholder="已結束" :picker-options="pickerOptions0"></el-date-picker>
                </div>
            </li>
        </ul>
      </div>
    </div>
    <div id="footerBar">
        <nuxt-link class="ftBt" to="/"><i class="icon-chevron-thin-left"></i> 返回</nuxt-link>
        <div class="ftBt"  @click="addYear()"><i class="icon-plus4"></i> 新增年度計畫</div>
    </div>
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
      &.mgCenter{
          text-align: center;
          margin: 0 auto;
      }
      .single{
          display: block;
          background-color: #FFF;
          padding: 12px;
          margin: 22px;
          position: relative;
          border-radius: 12px;
          box-shadow: 0 1px 3px 0 rgba(134, 168, 194, 0.83);
          .year{
              text-align: right;
              font-size: 36px;
              font-weight: 300;
              color: #00BE9A;
              display: inline-block;
              margin: 6px 0;
          }
          .RegularGoor,.CapitalGate,.Subtotal,.dateArrival{
              text-align: right;
              display: inline-block;
              margin: 6px 0;
          }
          .RegularGoor{
              color: #5CA300;
              font-size: 16px;
          }
          .CapitalGate{
              color: #008BD0;
              font-size: 16px;
          }
          .Subtotal{
              color: #00C4C4;
              font-size: 20px;
          }
          .dateArrival{
              text-align: right;
              .el-date-editor{
                  width: 100%;
                  /*margin: 0 10px;*/
              }
          }
          .year:after,.RegularGoor:before,.CapitalGate:before,.Subtotal:before,.dateArrival:before{
              font-size: 13px;
              color: #AFBCD1;
              font-weight: 300;
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
          .dateArrival:before{
              content: '編輯期間至';
              display: block;
              padding: 0 0 5px 12px;
          }
          .RegularGoor:after,.CapitalGate:after,.Subtotal:after {
              content: '/元';
              font-size: 14px;
              color: #AFBCD1;
              padding-left: 2px;
          }
      }
  }
  @media (max-width: 400px) {
      #allYear{
          .single{
              padding: 8px 0;
              margin: 10px;
              .RegularGoor,.CapitalGate,.Subtotal {
                  font-size: 18px;
                  padding: 0 12px;
              }
              .RegularGoor:after,.CapitalGate:after,.Subtotal:after {
                  content: '';
              }
          }
      }
  }
</style>
