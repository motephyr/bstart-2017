<template>
    <div>
        <div class="nuxtMainPanel" drag >
            <div class="pd20">

                <!--<form action="/upload" method="post" enctype="multipart/form-data">-->
                    <!--<h2>单图上传</h2>-->
                    <!--<input type="file" name="logo">-->
                    <!--<input type="submit" value="提交">-->
                <!--</form>-->

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
                            name="xlsxUp"
                            class="upload-demo"
                            drag
                            action="/upload/107/11"
                            list-type=""
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">將文件拖到此處<br><br>或<em>點擊上傳</em></div>
                        <div class="el-upload__tip" slot="tip">只能上傳xlsx/ods文件</div>
                    </el-upload>
                </div>

                <!--<form method="POST" action="/upload" encType="multipart/form-data" name="form">-->
                    <!--<input id="inputFile" type="file"-->
                           <!--accept="application/vnd.ms-excel|xls"-->
                           <!--name="logos" onChange={this.handleFileChange}/>-->
                    <!--<button onClick={this.handleSubmit}>点击提交</button>-->
                <!--</form>-->

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
  import axios from '~/plugins/axios'
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
    },
    mounted: function () {
      var y = "106";
      var p = "11";
//      var df = "/uploads/xlsx/"+y+"/"+p;
      axios.get("file/"+y+"/"+p).then(function (res) {
        var df ="dsfsdfdsfsdf";
        console.log(res.df);
        var pd = "sadasd"
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
</script>

<style>
    .containerCenter{
        width: 220px;
        margin: 0 auto;
        text-align: center;
        .el-upload-dragger{
            margin-top: 110px;
            padding: 0 60px;
            width: auto;
        }
    }
</style>
