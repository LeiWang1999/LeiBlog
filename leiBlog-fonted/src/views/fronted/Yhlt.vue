<template>
  <div>
    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="pink--text headline grey lighten-2" primary-title>留言</v-card-title>
        <v-card-text>
          <v-row>
            <v-col md="12" sm="12">
              <v-text-field label="昵称" v-model="formData.nickname"></v-text-field>
            </v-col>
            <v-col md="12" sm="12">
              <v-text-field label="邮箱" v-model="formData.email"></v-text-field>
            </v-col>
            <v-col md="12" sm="12">
              <v-text-field label="联系方式" v-model="formData.phone"></v-text-field>
            </v-col>
            <v-col md="12" sm="12">
              <v-text-field label="标题" v-model="formData.title"></v-text-field>
            </v-col>
            <v-col md="12" sm="12">
              <v-text-field label="留言内容" v-model="formData.content"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="handleCommit">确定</v-btn>
          <v-btn color="primary" text @click="dialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container class="my-5" grid-list-xs>
      <v-btn text color="red lighten-1" @click="dialog = true">新增留言</v-btn>
      <v-row>
        <v-col cols="12" sm="4" v-for="(comment,i) in messages" :key="i">
          <v-card hover flat>
            <v-card-title primary-title>{{comment.title}}</v-card-title>
            <v-subheader>昵称:{{comment.nickname}}</v-subheader>
            <v-subheader>
              留言时间:{{comment.createtime}}
              <br />
              回复时间:{{comment.replytime}}
            </v-subheader>
            <v-card-text class="black--text">
              <p>留言内容:{{comment.content}}</p>
              <p>回复内容:{{comment.replycontent}}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="1500" :top="true">{{warnningText}}</v-snackbar>
  </div>
</template>

<script>
export default {
  name: "yhlt",
  data() {
    return {
      messages: [
        {
          _id: String,
          title: String,
          nickname: "nickname",
          email: "email",
          phone: "phone",
          content: "content",
          createtime: String,
          isreplied: Boolean,
          replycontent: String,
          replytime: String
        }
      ],
      formData: {
        title: "",
        nickname: "",
        email: "",
        phone: "",
        content: "",
        createtime: String,
        isreplied: Boolean,
        replycontent: String,
        replytime: String
      },
      snackbar: false,
      dialog: false,
      warnningText: ""
    };
  },
  mounted() {
    this.request({
      method: "POST",
      url: "/yhly/messageList"
    })
      .then(res => {
        this.messages = res.data.showMessage;
      })
      .catch(err => window.console.log(err));
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
    handleCommit() {
      let obj = this.formData;
      obj.createtime = this.getDate();
      if (obj.title.length === 0) {
        this.warnningText = "标题不能为空!";
        this.snackbar = true;
        return;
      }
      if (obj.nickname.length === 0) {
        this.warnningText = "昵称不能为空";
        this.snackbar = true;
        return;
      }
      if (obj.email.length === 0) {
        this.warnningText = "邮箱不能为空！";
        this.snackbar = true;
        return;
      }
      if (obj.phone.length === 0) {
        this.warnningText = "标题不能为空!";
        this.snackbar = true;
        return;
      }
      if (obj.content.length === 0) {
        this.warnningText = "内容不能为空!";
        this.snackbar = true;
        return;
      }

      this.request({
        method: "POST",
        url: "/yhly/saveMessage",
        data: { info: obj }
      }).then(res => {
        if (res.data.success == true) {
          this.dialog = false;

          this.warnningText = "添加成功，等待审核与回复。";
          this.snackbar = true;
        } else window.console.log(res);
      });
    }
  }
};
</script>
