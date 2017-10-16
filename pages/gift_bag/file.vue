<template>
    <div>
        <div class="nuxtMainPanel">
            <div class="pd20">
                <div class="containerCenter">
                    <el-upload
                            class="upload-demo"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">將文件拖到此處<br><br>或<em>點擊上傳</em></div>
                        <div class="el-upload__tip" slot="tip">只能上傳jpg/png文件，且不超過500kb</div>
                    </el-upload>
                </div>
                <!--<div :value="p.id" v-for="p in years">{{p}}</div>-->
                <!--<button @click="addYear()">addYear</button>-->
                <!--<nuxt-link to="/">Back to the home page</nuxt-link>-->
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
        is_title: "領取禮袋資料"
      })
    }
  }
</script>

<style>
    .containerCenter{
        max-width: 280px;
        margin: 0 auto;
        .el-upload-dragger{
            position: fixed;
            top: 50%;
            margin-top: -110px;
            padding: 0 60px;
            width: auto;
        }
    }
</style>
