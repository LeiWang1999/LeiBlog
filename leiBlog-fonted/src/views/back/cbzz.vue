<template>
  <div>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title primary-title big class="red--text">提示</v-card-title>
          <v-card-text big class="black--text">删除不可撤销，确定删除？</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="handleDelete">确定</v-btn>
            <v-btn color="primary" text @click="dialog = false">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-btn dark color="purple" @click="handleAdd">
      <v-icon>mdi-plus</v-icon>
      <span>点我新增</span>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">书名</th>
            <th class="text-center">摘要</th>
            <th class="text-center">购买链接</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in books" :key="i" class="text-center">
            <td>{{ item.name }}</td>
            <td>
              {{ item.gist }}
            </td>
            <td>{{ item.buylink }}</td>
            <td>
              <v-btn text color="primary" @click="handleEdit(i)">编辑</v-btn>
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
  name: "cbzz",
  data() {
    return {
      books: [],
      dialog: false,
      curIndex: 0
    };
  },
  mounted() {
    this.request({
      method: "POST",
      url: "/cbzz/bookList"
    })
      .then(res => {
        this.books = res.data.message;
      })
      .catch(err => window.console.log(err));
  },
  methods: {
    fetchData() {
      this.request({
        method: "POST",
        url: "/cbzz/bookList"
      })
        .then(res => {
          this.books = res.data.message;
        })
        .catch(err => window.console.log(err));
    },
    handleAdd() {
      this.$router.push("/admin/cbzzedit");
    },
    handleEdit(index) {
      let bookId = this.books[index]["_id"];
      this.$router.push("/admin/cbzzedit/" + bookId);
    },
    handleDelete() {
      this.dialog = false;
      let index = this.curIndex;
      let bookId = this.books[index]["_id"];
      this.request({
        method: "POST",
        url: "/cbzz/deleteBook",
        data: { bookId: bookId }
      })
        .then(res => {
          if (res.data.success == true) {
            this.fetchData();
          }
        })
        .catch(err => window.console.log(err));
    },
    showDialog(index) {
      this.dialog = true;
      this.curIndex = index;
    }
  }
};
</script>

<style>
</style>