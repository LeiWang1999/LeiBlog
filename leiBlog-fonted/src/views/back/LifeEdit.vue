<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field v-model="title" label="请输入文章标题" :rules="titlerules" hide-details="auto"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field v-model="tag" label="请输入文章标签" hide-details="auto"></v-text-field>
      </v-col>
    </v-row>

    <div v-ripple="{ center: true }" class="text-center">
      <img :src="coverUrl" height="300px" width="500px" />
    </div>
    <v-file-input
      v-model="cover"
      accept="image/*"
      prepend-icon="mdi-camera"
      @change="changeCover"
      show-size
      counter
      label="上传封面（小于10Mb）"
    ></v-file-input>
    <v-subheader class="black--text">请输入文章简介</v-subheader>
    <v-textarea filled name="input-7-4" label="摘要" v-model="gist" :rules="gistrules"></v-textarea>
    <v-subheader class="black--text">内容</v-subheader>
    <editor :init="editorInit" v-model="content"></editor>
    <v-divider></v-divider>
    <v-subheader class="black--text">视频链接</v-subheader>
    <v-text-field v-model="videolink" label="请输入视频链接" hide-details="auto"></v-text-field>
    <v-card>
      <v-card-actions>
        <v-file-input v-model="file" @change="changeFile" show-size label="上传文件"></v-file-input>
      </v-card-actions>
      <v-card-text>
        <v-subheader>上传进度:{{uploadPercentage}}%</v-subheader>
        <v-progress-linear :value="uploadPercentage" :color="color" height="7"></v-progress-linear>
      </v-card-text>
    </v-card>

    <br />
    <v-divider></v-divider>
    <br />
    <v-btn :disabled="!isSaveDisable" block class="pink" @click="saveArticle">点我保存</v-btn>
  </v-container>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import plugins from "./tinymce/pliguns";
import toolbar from "./tinymce/toolbar";

export default {
  name: "lifeedit",
  components: {
    Editor
  },
  data() {
    return {
      uploadPercentage: 0,
      snackbar: false,
      warnningText: "",
      alertValue: false,
      tag: "",
      cover: [],
      clicktime: 0,
      coverUrl: "",
      updatetime: "",
      content: "",
      title: "",
      gist: "",
      file: [],
      apiKey: "ouv7gosz4fnfvray6qdn7yqbtwsoleq7zx7jfoboixat7ivq",
      videolink: "",
      titleRule1State: false,
      titleRule2State: false,
      gistRule1State: false,
      gistRule2State: false,
      titlerules: [
        value => {
          if (value) {
            this.titleRule1State = true;
            return true;
          } else {
            this.titleRule1State = false;
            return "必填！";
          }
        },
        value => {
          if ((value || "").length <= 20) {
            this.titleRule2State = true;
            return true;
          } else {
            this.titleRule2State = false;
            return "控制在20个字以内！";
          }
        }
      ],
      gistrules: [
        value => {
          if (value) {
            this.gistRule1State = true;
            return true;
          } else {
            this.gistRule1State = false;
            return "必填！";
          }
        },
        value => {
          if ((value || "").length <= 30) {
            this.gistRule2State = true;
            return true;
          } else {
            this.gistRule2State = false;
            return "控制在30个字以内！";
          }
        }
      ],
      editorInit: {
        height: 500,
        menubar: true,
        skin_url: "/tinymce/skins/ui/oxide",
        language_url: `/tinymce/langs/zh_CN.js`,
        language: "zh_CN", //调用放在langs文件夹内的语言包
        paste_data_images: true, // 允许粘贴图像
        powerpaste_word_import: "prompt", // 在尝试粘贴word内容后，提示用户在清除和合并选项之间进行选择。
        powerpaste_html_import: "prompt", //在尝试粘贴HTML内容后，提示用户在清除和合并选项之间进行选择
        //TinyMCE 会将所有的 font 元素转换成 span 元素
        convert_fonts_to_spans: true,
        //换行符会被转换成 br 元素
        convert_newlines_to_brs: false,
        force_br_newlines: false,
        //当返回或进入 Mozilla/Firefox 时，这个选项可以打开/关闭段落的建立
        force_p_newlines: false,
        //这个选项控制是否将换行符从输出的 HTML 中去除。选项默认打开，因为许多服务端系统将换行转换成，
        relative_urls: false,
        plugins: plugins,
        toolbar1: toolbar.toobar1,
        toolbar2: toolbar.toobar2,
        images_upload_handler: async (blobInfo, success, ) => {
          let file = blobInfo.blob();
          let formDataFinish = await this.uploadBigFile(file);
          this.request
            .post("/file/uploadBigFileFinish", formDataFinish)
            .then(res => {
              if (res.data.code == 1) {
                this.uploadPercentage = 0;
                success(res.data.data.downloadPath);
                this.$snackbar.success("图片上传成功");
              } else {
                this.$snackbar.success("图片上传失败,请重新上传");
              }
            });
        }
      }
    };
  },
  mounted() {
    if (this.$route.params.id) {
      // when article exist
      this.request
        .get("/life/articleDetail/" + this.$route.params.id)
        .then(res => {
          let article = res.data.info;
          this.title = article.title;
          this.content = article.content;
          this.tag = article.tag;
          this.clicktime = article.clicktime;
          this.coverUrl = article.coverUrl;
          this.updatetime = article.updatetime;
          this.gist = article.gist;
          this.videolink = article.videolink;
        });
    }
  },
  methods: {
    getDate: function() {
      let mydate, y, m, d, hh, mm, ss;
      mydate = new Date();
      y = mydate.getFullYear();
      m = mydate.getMonth() + 1;
      d = mydate.getDate();
      hh = mydate.getHours();
      mm = mydate.getMinutes();
      ss = mydate.getSeconds();
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      if (hh < 10) hh = "0" + hh;
      if (mm < 10) mm = "0" + mm;
      if (ss < 10) ss = "0" + ss;
      let date = y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
      return date;
    },
    saveArticle() {
      if (this.title.length === 0) {
        this.$snackbar.success("标题不能为空");
        return;
      }
      if (this.gist.length === 0) {
        this.$snackbar.success("简介不能为空");
        return;
      }
      if (this.tag.length === 0) {
        this.$snackbar.success("标签不能为空");
        return;
      }
      if (this.coverUrl.length === 0) {
        this.$snackbar.success("封面不能为空");
        return;
      }

      if (this.$route.params.id) {
        // save existed article
        let obj = {
          _id: this.$route.params.id,
          type: "life",
          title: this.title,
          updatetime: this.getDate(),
          gist: this.gist,
          tag: this.tag,
          clicktime: this.clicktime,
          coverUrl: this.coverUrl,
          content: this.content,
          videolink: this.videolink
        };
        this.request.post("life/updateArticle", { Info: obj }).then(res => {
          if (res.data.success == true) {
            this.refreshArticleList();
            this.$snackbar.success("保存成功");
          }
        });
      } else {
        // create a new book info
        let obj = {
          title: this.title,
          type: "life",
          createtime: this.getDate(),
          gist: this.gist,
          tag: this.tag,
          coverUrl: this.coverUrl,
          clicktime: 0,
          content: this.content,
          videolink: this.videolink
        };
        this.request({
          method: "post",
          url: "/life/saveArticle",
          data: {
            Info: obj
          }
        })
          .then(res => {
            if (res.data.success == true) {
              this.refreshArticleList();
              this.$snackbar.success("保存成功");
            }
          })
          .catch(err => window.console.log(err));
      }
    },
    // 保存成功后跳转至文章列表页
    refreshArticleList() {
      this.$router.push({ name: "lifelist" });
    },
    async changeFile(file) {
      let formDataFinish = await this.uploadBigFile(file);
      this.request
        .post("/file/uploadBigFileFinish", formDataFinish)
        .then(res => {
          if (res.data.code == 1) {
            this.uploadPercentage = 0;
            this.videolink = res.data.data.downloadPath;
            this.$snackbar.success("文件上传成功");
          } else {
            this.$snackbar.success("文件上传失败,请重新上传");
          }
        });
    },
    async uploadBigFile(file) {
      let _this = this;

      let bytesPerPiece = 1 * 256 * 1024; //切片大小
      let start = 0;
      let end;
      let index = 0;
      let file_size = file.size;
      let file_name = file.name;
      let totalPieces = Math.ceil(file_size / bytesPerPiece);
      let timestamp = new Date().getTime();
      while (start < file_size) {
        end = start + bytesPerPiece;
        if (end > file_size) {
          end = file_size;
        }
        let chunk = file.slice(start, end); //执行切片操作
        let sliceName = file_name + "." + index;
        let formData = new FormData();
        formData.append("timestamp", timestamp);
        formData.append("name", sliceName);
        formData.append("size", file_size);
        formData.append("total", totalPieces);
        formData.append("index", index);
        formData.append("file", chunk); //将表单id、文件、文件名输入form表单中，如果第三个参数不设置，则默认使用blob作为文件名
        let res1 = await _this.request.post("/file/uploadBigFile", formData);
        if (res1.data.code == 1) {
          _this.uploadPercentage = Math.ceil(((index + 1) / totalPieces) * 100);
          start = end;
          index++;
        } else {
          this.$snackbar.success("文件上传失败,请重新上传");
          return;
        }
      }
      let formDataFinish = new FormData();
      formDataFinish.append("timestamp", timestamp);
      formDataFinish.append("name", file_name);
      formDataFinish.append("size", file_size);
      formDataFinish.append("total", totalPieces);
      return formDataFinish;
    },
    async changeCover(file) {
      // 获取图片的大小，做大小限制有用
      let imgSize = this.cover.size;
      if (imgSize <= 10 * 1024 * 1024) {
        this.$snackbar.success("大小合适");
        // Url方法
        let formDataFinish = await this.uploadBigFile(file);
        this.request
        .post("/file/uploadBigFileFinish", formDataFinish)
        .then(res => {
          if (res.data.code == 1) {
            this.uploadPercentage = 0;
            this.coverUrl = res.data.data.downloadPath;
            this.$snackbar.success("图片上传成功");
          } else {
            this.$snackbar.success("图片上传失败,请重新上传");
          }
        });
      } else {
        this.$snackbar.success("大小不合适");
      }
    }
  },
  computed: {
    isSaveDisable() {
      return (
        this.titleRule1State &&
        this.titleRule2State &&
        this.gistRule1State &&
        this.gistRule2State
      );
    },
    color() {
      return ["error", "warning", "success"][
        Math.floor(this.uploadPercentage / 40)
      ];
    }
  }
};
</script>

<style>
</style>