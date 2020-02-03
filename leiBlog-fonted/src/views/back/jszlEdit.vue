<template>
  <v-container grid-list-xs>
    <v-alert class="primary white--text" v-model="alertValue">保存成功，等待页面跳转...</v-alert>
    <v-snackbar v-model="snackbar">
      {{ warnningText }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-subheader class="black--text">标题</v-subheader>
    <v-text-field v-model="title" label="请输入视频标题" :rules="titlerules" hide-details="auto"></v-text-field>
    <v-subheader class="black--text">请输入视频简介</v-subheader>
     <v-textarea
          filled
          name="input-7-4"
          label="摘要"
          v-model="gist"
          :rules="gistrules"
         ></v-textarea>
    <v-divider></v-divider>
        <v-subheader class="black--text">视频链接</v-subheader>
    <v-text-field v-model="videolink" label="请输入视频链接" hide-details="auto"></v-text-field>
    <v-divider></v-divider>
    <br />
    <v-btn :disabled="!isSaveDisable" block class="pink" @click="saveArticle">点我保存</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "jszledit",
  data() {
    return {
      snackbar: false,
      warnningText: "",
      alertValue: false,
      updatetime: "",
      title: "",
      gist: "",
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
      ]
    };
  },
  mounted() {
    if (this.$route.params.id) {
      // when article exist
      this.request
        .get("/jszl/articleDetail/" + this.$route.params.id)
        .then(res => {
          let article = res.data.info;
          this.title = article.title;
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
      return date
    },
    saveArticle() {
      if (this.title.length === 0) {
        this.warnningText = "标题不能为空!";
        this.snackbar = true;
        return;
      }
      if (this.gist.length === 0) {
        this.warnningText = "简介不能为空";
        this.snackbar = true;
        return;
      }
      if (this.videolink.length === 0) {
        this.warnningText = "视频链接不能为空！";
        this.snackbar = true;
        return;
      }

      if (this.$route.params.id) {
        // save existed article
        let obj = {
          _id: this.$route.params.id,
          title: this.title,
          updatetime: this.getDate(),
          gist: this.gist,
          videolink: this.videolink
        };
        this.request
          .post("jszl/updateArticle", { articleInfo: obj })
          .then(res => {
            if (res.data.success == true) {
              this.warnningText = "保存成功";
              this.snackbar = true;
              this.refreshArticleList();
            }
          });
      } else {
        // create a new book info
        let obj = {
          title: this.title,
          createtime: this.getDate(),
          gist: this.gist,
          videolink: this.videolink
        };
        this.request({
          method: "post",
          url: "/jszl/saveArticle",
          data: {
            articleInfo: obj
          }
        })
          .then(res => {
            if (res.data.success == true) {
              this.warnningText = "保存成功";
              this.snackbar = true;
              this.refreshArticleList();
            }
          })
          .catch(err => window.console.log(err));
      }
    },
    // 保存成功后跳转至文章列表页
    refreshArticleList() {
      this.$router.push({ name: "jszllist" });
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
    }
  }
};
</script>

<style>
</style>