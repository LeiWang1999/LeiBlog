<template>
  <v-container grid-list-xs>
    <v-alert class="primary white--text" v-model="alertValue">保存成功，等待页面跳转...</v-alert>
    <v-snackbar v-model="snackbar">
      {{ warnningText }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-subheader class="black--text">书名</v-subheader>
    <v-text-field v-model="name" label="请输入书籍名称" :rules="bookrules" hide-details="auto"></v-text-field>
    <div v-ripple="{ center: true }" class="text-center">
        <img :src="coverBase64" height="300px" width="500px" />
      </div>
      <v-file-input
        v-model="cover"
        accept="image/*"
        prepend-icon="mdi-camera"
        @change="changCover"
        show-size
        counter
        label="上传封面（小于1Mb）"
      ></v-file-input>
    <v-subheader class="black--text">请输入书籍摘要</v-subheader>
     <v-textarea
          filled
          name="input-7-4"
          label="摘要"
          v-model="gist"
          :rules="gistrules"
         ></v-textarea>
    <v-divider></v-divider>
        <v-subheader class="black--text">购买链接</v-subheader>
    <v-text-field v-model="buylink" label="请输入购买链接" hide-details="auto"></v-text-field>
    <v-divider></v-divider>
    <br />
    <v-btn :disabled="!isSaveDisable" block class="pink" @click="saveBook">点我保存</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "cbzzedit",
  data() {
    return {
      snackbar: false,
      warnningText: "",
      alertValue: false,
      updatetime: "",
      name: "",
      gist: "",
      buylink: "",
      bookRule1State: false,
      bookRule2State: false,
      gistRule1State: false,
      gistRule2State: false,
      cover:[],
      coverBase64:"",
      bookrules: [
        value => {
          if (value) {
            this.bookRule1State = true;
            return true;
          } else {
            this.bookRule1State = false;
            return "必填！";
          }
        },
        value => {
          if ((value || "").length <= 20) {
            this.bookRule2State = true;
            return true;
          } else {
            this.bookRule2State = false;
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
        .get("/cbzz/bookDetail/" + this.$route.params.id)
        .then(res => {
          let book = res.data.info;
          this.name = book.name;
          this.updatetime = book.updatetime;
          this.coverBase64 = book.coverBase64;
          this.gist = book.gist;
          this.buylink = book.buylink;
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
    saveBook() {
      if (this.name.length === 0) {
        this.warnningText = "标题不能为空!";
        this.snackbar = true;
        return;
      }
      if (this.gist.length === 0) {
        this.warnningText = "摘要不能为空";
        this.snackbar = true;
        return;
      }
      if (this.buylink.length === 0) {
        this.warnningText = "购买链接不能为空！";
        this.snackbar = true;
        return;
      }

      if (this.$route.params.id) {
        // save existed article
        let obj = {
          _id: this.$route.params.id,
          book: this.book,
          date: this.getDate(),
          coverBase64: this.coverBase64,
          gist: this.gist,
          content: this.content
        };
        this.request
          .post("cbzz/updateBook", { bookInfo: obj })
          .then(res => {
            if (res.data.success == true) {
              this.warnningText = "保存成功";
              this.snackbar = true;
              this.refreshBookList();
            }
          });
      } else {
        // create a new book info
        let obj = {
          name: this.name,
          date: this.getDate(),
          gist: this.gist,
          buylink: this.buylink,
          coverBase64: this.coverBase64
        };
        this.request({
          method: "post",
          url: "/cbzz/saveBook",
          data: {
            bookInfo: obj
          }
        })
          .then(res => {
            if (res.data.success == true) {
              this.warnningText = "保存成功";
              this.snackbar = true;
              this.refreshBookList();
            }
          })
          .catch(err => window.console.log(err));
      }
    },
    changCover() {
      // 获取图片的大小，做大小限制有用
      let _this = this;
      let imgSize = this.cover.size;
      if (imgSize <= 1024 * 1024) {
        // 合格
        window.console.log("大小合适");

        // base64方法
        var reader = new FileReader();
        reader.readAsDataURL(_this.cover); // 读出 base64
        reader.onloadend = function() {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result;
          _this.coverBase64 = dataURL;
        };
      } else {
        window.console.log("大小不合适");
      }
    },
    // 保存成功后跳转至文章列表页
    refreshBookList() {
      this.$router.push({ name: "cbzzlist" });
    }
  },
  computed: {
    isSaveDisable() {
      return (
        this.bookRule1State &&
        this.bookRule2State &&
        this.gistRule1State &&
        this.gistRule2State
      );
    }
  }
};
</script>

<style>
</style>