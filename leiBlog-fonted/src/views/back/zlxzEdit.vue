<template>
  <v-container grid-list-xs>
    <v-alert class="primary white--text" v-model="alertValue">保存成功，等待页面跳转...</v-alert>
    <v-snackbar v-model="snackbar">
      {{ warnningText }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-subheader class="black--text">软件名称</v-subheader>
    <v-text-field v-model="name" label="请输入软件名称" :rules="namerules" hide-details="auto"></v-text-field>
    <v-subheader class="black--text">请输入视软件简介</v-subheader>
     <v-textarea
          filled
          name="input-7-4"
          label="简介"
          v-model="gist"
          :rules="gistrules"
         ></v-textarea>
    <v-divider></v-divider>
        <v-subheader class="black--text">下载链接</v-subheader>
    <v-text-field v-model="downloadlink" label="请输入下载链接" hide-details="auto"></v-text-field>
    <v-divider></v-divider>
            <v-subheader class="black--text">上传文件</v-subheader>
      <v-file-input show-size label="上传文件"></v-file-input>
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
      name: "",
      gist: "",
      downloadlink: "",
      nameRule1State: false,
      nameRule2State: false,
      gistRule1State: false,
      gistRule2State: false,
      namerules: [
        value => {
          if (value) {
            this.nameRule1State = true;
            return true;
          } else {
            this.nameRule1State = false;
            return "必填！";
          }
        },
        value => {
          if ((value || "").length <= 20) {
            this.nameRule2State = true;
            return true;
          } else {
            this.nameRule2State = false;
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
      // when file exist
      this.request
        .get("/zlxz/fileDetail/" + this.$route.params.id)
        .then(res => {
          let file = res.data.info;
          this.name = file.name;
          this.updatetime = file.updatetime;
          this.gist = file.gist;
          this.downloadlink = file.downloadlink;
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
      if (this.name.length === 0) {
        this.warnningText = "标题不能为空!";
        this.snackbar = true;
        return;
      }
      if (this.gist.length === 0) {
        this.warnningText = "简介不能为空";
        this.snackbar = true;
        return;
      }
      if (this.downloadlink.length === 0) {
        this.warnningText = "下载链接不能为空！";
        this.snackbar = true;
        return;
      }

      if (this.$route.params.id) {
        // save existed file
        let obj = {
          _id: this.$route.params.id,
          name: this.name,
          updatetime: this.getDate(),
          gist: this.gist,
          downloadlink: this.downloadlink
        };
        this.request
          .post("zlxz/updateFile", { fileInfo: obj })
          .then(res => {
            if (res.data.success == true) {
              this.warnningText = "保存成功";
              this.snackbar = true;
              this.refreshFileList();
            }
          });
      } else {
        // create a new file info
        let obj = {
          name: this.name,
          updatetime: this.getDate(),
          gist: this.gist,
          downloadlink: this.downloadlink
        };
        this.request({
          method: "post",
          url: "/zlxz/saveFile",
          data: {
            info: obj
          }
        })
          .then(res => {
            if (res.data.success == true) {
              this.warnningText = "保存成功";
              this.snackbar = true;
              this.refreshFileList();
            }
          })
          .catch(err => window.console.log(err));
      }
    },
    // 保存成功后跳转至文章列表页
    refreshFileList() {
      this.$router.push({ name: "zlxzlist" });
    }
  },
  computed: {
    isSaveDisable() {
      return (
        this.nameRule1State &&
        this.nameRule2State &&
        this.gistRule1State &&
        this.gistRule2State
      );
    }
  }
};
</script>

<style>
</style>