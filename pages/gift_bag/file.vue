<template>
    <div>
        <div class="nuxtMainPanel" drag >
            <div class="pd20">

                <form action="/upload" method="post" enctype="multipart/form-data">
                    <h2>单图上传</h2>
                    <input type="file" name="logo">
                    <input type="submit" value="提交">
                </form>

                <!--<el-upload-->
                        <!--class="upload-demo"-->
                        <!--action="http://dv.shwe7.com/upload"-->
                        <!--:on-preview="handlePreview"-->
                        <!--:on-remove="handleRemove"-->
                        <!--:file-list="fileList" :list-type="jpg">-->
                    <!--<el-button size="small" type="primary">点击上传</el-button>-->
                    <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                <!--</el-upload>-->

                <div class="containerCenter">
                    <el-upload
                            name="logos"
                            class="upload-demo"
                            drag
                            action="../../upload"
                            list-type=""
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
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },{
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      };
    },
    created () {
      this.$store.dispatch('setIsTitle', {
        is_title: "領取禮袋資料"
      })
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
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
