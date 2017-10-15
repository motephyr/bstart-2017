<template>
  <div>
    <div class="nuxtMainPanel">
    <div class="pd20">
      <div class="">
      <div class="fIHeader row">
        <div class="col-6 col-sm-3 col-md-3 col-lg-3 RegularGoor"><br>345,678</div>
        <div class="col-6 col-sm-3 col-md-3 col-lg-3 CapitalGate"><br>345,678</div>
        <div class="col-6 col-sm-3 col-md-3 col-lg-3 Subtotal"><br>345,678</div>
      </div>
      </div>
      <div class="row">
        <div class="addTabName">
          <el-input></el-input>
          <div class="ftBt"><i class="icon-loupe"></i> 新增項目</div></div>
      </div>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane name="center">
            <span slot="label">總表</span>
            <table class="gTable">
              <thead>
                <tr>
                  <th></th>
                  <th>經常門</th>
                  <th>資本門</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </el-tab-pane>
          <el-tab-pane name="first">
            <span slot="label">多元閱讀</span>
            <el-tooltip class="item" effect="dark" content="刪除該經費項目" placement="left">
              <div @click="openTabName" class="dlThisYear icon-cancel"></div>
            </el-tooltip>
            <div v-for="struct in structs" :key="struct.sub_field">
              <table class="gTable">
                <colgroup>
                  <col>
                  <col>
                  <col>
                </colgroup>
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
                  <th>{{x.value}}</th>
                  <td v-for="(y, iy) in struct.yaxio" :key="y.id">
                    <div v-if="struct.value.length > ix && struct.value[ix]">
                      <!--<input type="text" v-model="struct.value[ix][iy]" />-->
                      <!--<el-input :disabled="true" v-model="struct.value[ix][iy]" placeholder=""></el-input>-->
                      <el-input v-model="struct.value[ix][iy]" placeholder=""></el-input>
                    </div>
                  </td>
                  <td></td>
                </tr>
                </tbody>
                <tfoot>
                  <th></th>
                  <td></td>
                  <td></td>
                </tfoot>
              </table>
              <button @click="update_data(struct.sub_field)">Update</button>
            </div>
            <!--<nuxt-link to="/">Back to the home page</nuxt-link>-->
          </el-tab-pane>
          <el-tab-pane name="second">
            <span slot="label">本土語言</span>
          </el-tab-pane>
        </el-tabs>
    </div>
    </div>
    <div id="footerBar">
      <div class="ftBt" onClick="javascript:history.back(-1);"><i class="icon-chevron-thin-left"></i> 返回</div>
      <div class="ftBt" @click="addYear()"><i class="icon-assignment"></i> 儲存</div>
    </div>
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
    },
    openTabName() {
      this.$confirm('此操作將永久刪除[ＸＸＸ]刪除該經費項目資料 , 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '刪除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除,資料尚在'
        });
      });
    }
  },
  created () {
    this.$store.dispatch('setIsTitle', {
      is_title: "經費執行情形"
    })
    this.getData()
  },
  mounted: function () {
    $(document).ready(function () {
      //console.log($('body').html());
    });
  }
}
</script>
<style>
  h1{
    color: #009558;
  }
  .el-tabs__content {
    overflow: auto;
    position: relative;
  }
  .fIHeader{
    padding: 0 18px 18px 18px;
    .RegularGoor, .CapitalGate, .Subtotal {
      text-align: right;
      font-size: 24px;
      font-weight: 400;
      color: #4D6373;
      display: inline-block;
      margin: 12px 0;
    }
    .RegularGoor{
      color: #79A300;
    }
    .CapitalGate{
      color: #008BD0;
    }
    .Subtotal{
      color: #00C4C4;
    }
    .RegularGoor,.CapitalGate,.Subtotal{
      color: #00364D;
    }
    .RegularGoor:before, .CapitalGate:before, .Subtotal:before {
      font-size: 14px;
      color: #AFBCD1;
      margin: 2px 0;
      height: 22px;
      line-height: 22px;
    }
    .RegularGoor:before {
      content: '經常門';
    }
    .CapitalGate:before {
      content: '資本門';
    }
    .Subtotal:before {
      content: '總計';
    }
    .RegularGoor:after,.CapitalGate:after,.Subtotal:after {
      content: ' 元';
      font-size: 14px;
      color: #AFBCD1;
    }
  }
  .addTabName{
    margin: 12px auto;
    position: relative;
    .el-input{
      height: 36px;
      width: auto;
      display: inline-block;
      margin-right: 114px;
    }
    .ftBt{
      i:before,i:after{
        vertical-align: middle;
        font-size: 24px;
        padding: 0;
      }
      i:before{}
      i:after{}
      position: absolute;
      right: 3px;
      width: 114px;
      background-color: rgb(30, 143, 139);
      border: 1px solid rgb(30, 143, 139);
      color: rgba(255, 255, 255, 0.69);
      height: 36px;
      line-height: 36px;
      margin: 0 0 0 -5px;
      padding: 0 8px;
      border-radius: 0 5px 5px 0;
      font-size: 15px;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      transition: all 0.3s;
      &:hover{
        color: rgb(30, 143, 139);
        border: 1px solid rgba(30, 143, 139, 0.6);
        background-color: #FFF;
      }
    }
  }
  .dlThisYear{
    display: block;
    position: absolute;
    font-size: 18px;
    right: 2px;
    top: 2px;
    cursor: pointer;
    color: rgba(114, 122, 136, 0.79);;
    &:hover{
      color: #C12A27;
    }
  }
  .el-message-box{
    max-width: 280px;
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
    .pd20{
      padding: 0;
    }
  }
</style>
