<template>
  <v-container fluid>
    <div class="text-center">上一次更新时间</div>
    <p class="text--primary text-center">{{updatetime}}</p>
    <div v-ripple="{ center: true }" class="text-center">
      <img :src="avatarBase64" class="user-header-com" />
    </div>
    <v-file-input
      v-model="avatar"
      accept="image/*"
      prepend-icon="mdi-camera"
      @change="changAvatar"
      show-size
      counter
      label="上传头像（小于50Kb）"
    ></v-file-input>
    <v-textarea outlined label="个人简介" v-model="content"></v-textarea>
    <v-text-field v-model="email" label="邮箱"></v-text-field>
    <v-text-field v-model="phone" label="联系方式"></v-text-field>

    <v-subheader>详细信息</v-subheader>
    <editor
      :api-key="apiKey"
      initialValue="<p>input ...</p>"
      :init="editorInit"
      v-model="detailContent"
    ></editor>

    <v-btn block class="purple white--text" @click="updateInfo">确认修改</v-btn>
  </v-container>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import plugins from "./tinymce/pliguns";
import toolbar from "./tinymce/toolbar";
export default {
  name: "aboutAdmin",
  components: {
    Editor
  },
  data() {
    return {
      content: "",
      updatetime: "",
      avatar: [],
      avatarBase64: "",
      email: "",
      phone: "",
      apiKey: "ouv7gosz4fnfvray6qdn7yqbtwsoleq7zx7jfoboixat7ivq",
      detailContent: "",
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
        images_upload_handler: (blobInfo, success) => {
          success(
            "data:" + blobInfo.blob().type + ";base64," + blobInfo.base64()
          );
        }
      }
    };
  },
  mounted() {
    this.fetchInfo();
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
      let time = y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
      return time;
    },
    fetchInfo() {
      this.request.post("/about/detail").then(data => {
        let res = data.data.res;
        this.content = res.content;
        this.updatetime = res.updatetime;
        this.avatarBase64 = res.avatarBase64;
        this.email = res.email;
        this.phone = res.phone;
        this.detailContent = res.detailContent;
      });
    },
    updateInfo() {
      let obj = {
        content: this.content,
        updatetime: this.getDate(),
        avatarBase64: this.avatarBase64,
        email: this.email,
        phone: this.phone,
        detailContent: this.detailContent
      };
      this.request.post("/about/updateDetail", { obj }).then(res => {
        let success = res.data.success;
        if (success == true) this.$snackbar.success("更新成功");
        else this.$snackbar.success("出现未知错误");
        this.fetchInfo();
      });
    },
    changAvatar() {
      // 获取图片的大小，做大小限制有用
      let _this = this;
      let imgSize = this.avatar.size;
      if (imgSize <= 50 * 1024) {
        // 合格
        this.$snackbar.success("大小合适");

        // base64方法
        var reader = new FileReader();
        reader.readAsDataURL(_this.avatar); // 读出 base64
        reader.onloadend = function() {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result;
          _this.avatarBase64 = dataURL;
        };
      } else {
        this.$snackbar.success("大小不合适");
      }
    }
  }
};
</script>

<style>
.user-header-com {
  width: 144px;
  height: 144px;
  display: inline-block;
}
</style>