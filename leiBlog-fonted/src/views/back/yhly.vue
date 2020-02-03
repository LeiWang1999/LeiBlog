-<template>
  <div>
    <div class="dialog text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title primary-title big class="red--text">提示</v-card-title>

          <v-card-text big class="black--text">删除不可撤销，确定删除？</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="handleDelete">确定</v-btn>
            <v-btn color="primary" text @click="dialog = false">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="replydialog" width="500">
        <v-card>
          <v-card-title class="pink--text headline grey lighten-2" primary-title>回复</v-card-title>

          <v-card-text>
            <v-row>
              <v-col md="12" sm="12">
                <v-text-field disabled label="昵称" v-model="messages[curIndex].nickname"></v-text-field>
              </v-col>
              <v-col md="12" sm="12">
                <v-text-field disabled label="邮箱" v-model="messages[curIndex].email"></v-text-field>
              </v-col>
              <v-col md="12" sm="12">
                <v-text-field disabled label="联系方式" v-model="messages[curIndex].phone"></v-text-field>
              </v-col>
                            <v-col md="12" sm="12">
                <v-text-field disabled label="标题" v-model="messages[curIndex].title"></v-text-field>
              </v-col>
              <v-col md="12" sm="12">
                <v-text-field disabled label="留言内容" v-model="messages[curIndex].content"></v-text-field>
              </v-col>
              <v-col md="12" sm="12">
                <v-text-field outlined label="回复内容" v-model="messages[curIndex].replycontent"></v-text-field>
              </v-col>
              <v-col md="12" sm="12"></v-col>
              <v-col md="12" sm="12"></v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="handleReply">确定</v-btn>
            <v-btn color="primary" text @click="replydialog = false">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">标题</th>
            <th class="text-center">昵称</th>
            <th class="text-center">内容</th>
            <th class="text-center">状态</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in messages" :key="i" class="text-center">
            <td>{{ item.title }}</td>
            <td>{{ item.nickname }}</td>
            <td>{{ item.content }}</td>
            <td>
              <div v-if="item.isreplied === true">
                <span class="grey--text">已回复</span>
              </div>
              <div v-else>
                <span class="red--text">未回复</span>
              </div>
            </td>
            <td>
              <v-btn text color="primary" @click="showReplyDialog(i)">回复</v-btn>
              <v-btn text color="red" @click="showDialog(i)">删除</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "yhly",
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
      dialog: false,
      replydialog: false,
      curIndex: 0
    };
  },
  mounted() {
    this.fetchData();
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
    fetchData() {
      this.request({
        method: "POST",
        url: "/yhly/messageList"
      })
        .then(res => {
          this.messages = res.data.message;
        })
        .catch(err => window.console.log(err));
    },
    handleReply() {
      this.replydialog = false;
      let obj = this.messages[this.curIndex];
      obj.replytime = this.getDate();
      this.request({
        method: "POST",
        url: "/yhly/updateMessage",
        data: { info: obj }
      }).then(res => {
        if (res.data.success == true) {

          this.fetchData();
        } else window.console.log(res);
      });
    },
    handleDelete() {
      this.dialog = false;
      let index = this.curIndex;
      let messageId = this.messages[index]["_id"];
      this.request({
        method: "POST",
        url: "/yhly/deleteMessage",
        data: { id: messageId }
      })
        .then(res => {
          if (res.data.success == true) {
            this.fetchData();
          } else window.console.log(res);
        })
        .catch(err => window.console.log(err));
    },
    showDialog(index) {
      this.dialog = true;
      this.curIndex = index;
    },
    showReplyDialog(index) {
      this.replydialog = true;
      this.curIndex = index;
    }
  }
};
</script>

<style>
</style>