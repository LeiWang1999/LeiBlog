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
    <v-btn dark color="pink" @click="handleAdd">
      <v-icon>mdi-plus</v-icon>
      <span>点我新增</span>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">标题</th>
            <th class="text-center">日期</th>
            <th class="text-center">摘要</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in news" :key="i" class="text-center">
            <td>{{ item.title }}</td>
            <td>
              <v-icon small>mdi-clock</v-icon>
              {{ item.date }}
            </td>
            <td>{{ item.gist }}</td>
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
  name: "tszs",
  data() {
    return {
      news: [],
      dialog: false,
      curIndex: 0
    };
  },
  mounted() {
    this.request({
      method: "POST",
      url: "/tszs/articalList"
    })
      .then(res => {
        this.news = res.data.message;
      })
      .catch(err => window.console.log(err));
  },
  methods: {
    fetchData() {
      this.request({
        method: "POST",
        url: "/tszs/articalList"
      })
        .then(res => {
          this.news = res.data.message;
        })
        .catch(err => window.console.log(err));
    },
    handleAdd() {
      this.$router.push("/admin/tszsedit");
    },
    handleEdit(index) {
      let articleId = this.news[index]["_id"];
      this.$router.push("/admin/tszsedit/" + articleId);
    },
    handleDelete() {
      this.dialog = false;
      let index = this.curIndex;
      let articleId = this.news[index]["_id"];
      this.request({
        method: "POST",
        url: "/tszs/deleteArticle",
        data: { articleId: articleId }
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