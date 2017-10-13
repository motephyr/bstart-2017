<template>
  <div class="nav-list">
    <ul class="mlist">
      <li class="listLi"><nuxt-link class="listbutton" to="/users/list" ><i class="icon-account"></i>帳號</nuxt-link></li>
    </ul>
    <ul class="mlist bdTopLine">
      <li class="listLi"><nuxt-link class="listbutton" to="/years/edit" ><i class="icon-Calendar-year-plan"></i>歷年計畫</nuxt-link></li>
    </ul>
    <ul class="mlist">
      <li class="year">
        <!--<el-tooltip class="item" effect="dark" placement="top">-->
          <!--<div slot="content">選擇年度分類</div>-->
        <el-select v-model="valueYear" placeholder="年度">
          <el-option
                  v-for="item in optionsYear"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <!--</el-tooltip>-->
        <!--<select v-model="$store.state.year" @change="getYearPlaceId()">-->
          <!--　<option :value="p" v-for="(p, px) in $store.state.yearPlaces.years">{{p}}</option>-->
        <!--</select>-->
      </li>
      <li class="place">
        <!--<el-tooltip class="item" effect="dark" placement="top">-->
          <!--<div slot="content">選擇縣市分類</div>-->
          <el-select v-model="valuePlace" placeholder="縣市">
            <el-option
                    v-for="item in optionsPlace"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        <!--</el-tooltip>-->
        <!--<select v-model="$store.state.place" @change="getYearPlaceId()">-->
          <!--　<option :value="p" v-for="(p, px) in $store.state.yearPlaces.places">{{p}}</option>-->
        <!--</select>-->
      </li>
    </ul>
    <ul class="mlist">
      <li class="listLi"><nuxt-link class="listbutton" to="/funding_implementations" >經費執行情形</nuxt-link></li>
      <li class="listLi"><nuxt-link class="listbutton" to="/bookstarts" >嬰幼兒閱讀活動統計</nuxt-link></li>
      <li class="listLi"><nuxt-link class="listbutton" to="/reading_activities" >多元閱讀活動統計</nuxt-link></li>
      <li class="listLi"><nuxt-link class="listbutton" to="/promotion_activities" >本土語言閱讀活動統計</nuxt-link></li>
      <li class="listLi"><nuxt-link class="listbutton" to="/" >活動表件</nuxt-link></li>
      <li class="listLi"><nuxt-link class="listbutton" to="/" >領取禮袋資料</nuxt-link></li>
      <li class="listLi"><nuxt-link class="listbutton" to="/" >活動剪影</nuxt-link></li>
      <li class="listLi active"><nuxt-link class="listbutton" to="/" >下載</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    place: {
      get: function () {
        return $store.state.place
      },
      set: function (val) {
        this.$store.dispatch('setPlace', val)
      }
    },
    year: {
      get: function () {
        return $store.state.year
      },
      set: function (val) {
        this.$store.dispatch('setYear', val)
      }
    }
  },
  methods: {
    getYearPlaceId () {
      this.$store.dispatch('getYearPlaceId', {
        place: this.$store.state.place,
        year: this.$store.state.year
      })
    }
  },
  mounted () {
    console.log($('.mlist').html())
  },
  data(){
    return {
      optionsYear: [{
        value: '1',
        label: '106'
      }, {
        value: '2',
        label: '107'
      }, {
        value: '3',
        label: '108'
      }, {
        value: '4',
        label: '109'
      }, {
        value: '5',
        label: '110'
      }],
      optionsPlace: [{
        value: '1',
        label: '台北市'
      }, {
        value: '2',
        label: '新北市'
      }, {
        value: '3',
        label: '高雄縣'
      }, {
        value: '4',
        label: '宜蘭縣'
      }, {
        value: '5',
        label: '北京'
      },{
        value: '6',
        label: '台北'
      }, {
        value: '7',
        label: '新北'
      }, {
        value: '8',
        label: '高雄'
      }, {
        value: '9',
        label: '宜蘭'
      }, {
        value: '10',
        label: '北京h'
      }],
      valueYear: '1',
      valuePlace: '1'
    }
  }
  // ,
  // data () {
  //   return {
  //     xaxio: ['一月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '十二月'],
  //     yaxio: ['經常門', '資本門']
  //   }
  // }
}
</script>

<style>
  .nav-list{
    .mlist{
      position: relative;
      &.bdTopLine:before{
        content: "";
        height: 2px;
        width: 90%;
        background-color: #D4EBE3;
        position: absolute;
        left: 5%;
        bottom: 0;
        display: block;
      }
      .year,.place{
        width: 50%;
        display: inline-block;
        text-align: center;
        margin: 6px 0 12px 0;
        .el-select{
          width: 75%;
        }
      }
      .year:before,.place:before{
        display: block;
        margin: 6px;
        font-size: 11px;
        color: #AAC1B8;
      }
      .year:before{
        content: "年份";
      }
      .place:before{
        content: "地方";
      }
      /*border-top: 1px solid #D4F1E6;*/
      .listLi{
        position: relative;
        display: block;
        width: 100%;
        height: 60px;
        color: #129895;
        transition: all 0.2s;
        background: url("/img/listHover.svg") -6px 6px no-repeat;
        .listbutton {
          font-size: 18px;
          display: block;
          padding: 0 30px;
          height: 100%;
          line-height: 60px;
          color: #129895;
          vertical-align:middle;
          i[class^="icon-"], i[class*=" icon-"]{
            position: relative;
            display:inline-block;
            width: 36px;
            font-size: 24px;
            vertical-align:middle;
          }
        }
        &:hover{
          /*background: url("/img/listHover.svg") 0 6px no-repeat;*/
          .listbutton{
            color: #FF6500;
          }
        }
        &.active{
          /*background: #D4F1E6 ;*/
          background: url("/img/listHover.svg") 0 6px no-repeat;
          .listbutton{
            /*color: #fff;*/
          }
        }
      }
    }
  }
</style>
