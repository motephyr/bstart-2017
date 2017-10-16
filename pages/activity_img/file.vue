<template>
    <div>
        <div class="nuxtMainPanel">
            <div class="pd20">
                <div class="row">
                    <div class="addTabName">
                        <el-input></el-input>
                        <div class="ftBt"><i class="icon-loupe"></i> 新增項目</div>
                    </div>
                </div>
                <el-tabs type="border-card">
                    <el-tab-pane label="嬰幼兒">
                        <!--<el-tooltip class="item" effect="dark" content="刪除「嬰幼兒」活動項目" placement="left">-->
                            <!--<div @click="openTabActives" class="dlThisYear icon-cancel"></div>-->
                        <!--</el-tooltip>-->
                    嬰幼兒
                    </el-tab-pane>
                    <el-tab-pane label="青少年">青少年</el-tab-pane>
                    <el-tab-pane label="樂齡">樂齡</el-tab-pane>
                    <el-tab-pane label="多元文化">多元文化</el-tab-pane>
                    <el-tab-pane label="原住民">原住民</el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div id="footerBar">
            <div class="ftBt"><i class="icon-download3"></i> 下載</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created () {
    this.$store.dispatch('setIsTitle', {
      is_title: "活動剪影"
    })
  }
}
</script>

<style>
  .containerCenter{
    max-width: 280px;
    margin: 0 auto;
  }
  .addTabName {
    margin: 12px auto;
    position: relative;
    .el-input {
      height: 36px;
      width: auto;
      display: inline-block;
      margin-right: 114px;
    }
    .ftBt {
      i:before, i:after {
        vertical-align: middle;
        font-size: 24px;
        padding: 0;
      }
      i:before { }
      i:after { }
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
      &:hover {
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
</style>
