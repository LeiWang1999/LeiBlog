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
    <v-textarea filled name="input-7-4" label="简介" v-model="gist" :rules="gistrules"></v-textarea>
    <v-divider></v-divider>
    <v-subheader class="black--text">下载链接</v-subheader>
    <v-text-field v-model="downloadlink" label="请输入下载链接" hide-details="auto"></v-text-field>
    <v-divider></v-divider>
    <v-card>
      <v-card-actions>
        <v-file-input v-model="file" @change="changeFile" show-size label="上传文件"></v-file-input>
      </v-card-actions>
      <v-card-text>
        <v-subheader>上传进度:{{uploadPercentage}}%</v-subheader>
        <v-progress-linear :value="uploadPercentage" :color="color" height="7"></v-progress-linear>
      </v-card-text>
    </v-card>
    <v-btn :disabled="!isSaveDisable" block class="pink" @click="saveFile">点我保存</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "materialedit",
  data() {
    return {
            uploadPercentage: 0,
      snackbar: false,
      warnningText: "",
      alertValue: false,
      updatetime: "",
      file: [],
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
        .get("/material/fileDetail/" + this.$route.params.id)
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
      return date;
    },
    saveFile() {
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
        this.request.post("material/updateFile", { fileInfo: obj }).then(res => {
          if (res.data.success == true) {
            this.refreshFileList();
            this.$snackbar.success("保存成功");
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
          url: "/material/saveFile",
          data: {
            info: obj
          }
        })
          .then(res => {
            if (res.data.success == true) {
              this.refreshFileList();
              this.$snackbar.success("保存成功");
            }
          })
          .catch(err => window.console.log(err));
      }
    },
    // 保存成功后跳转至文章列表页
    refreshFileList() {
      this.$router.push({ name: "materiallist" });
    },
    async changeFile(file) {
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

      this.request
        .post("/file/uploadBigFileFinish", formDataFinish)
        .then(res => {
          if (res.data.code == 1) {
            this.uploadPercentage = 0;
            this.downloadlink = res.data.data.downloadPath;
            this.$snackbar.success("文件上传成功");
          } else {
            this.$snackbar.success("文件上传失败,请重新上传");
          }
        });
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