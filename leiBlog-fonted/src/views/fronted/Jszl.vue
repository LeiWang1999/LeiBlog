<template>
  <v-layout column justify-center align-center class="index-container">
    <v-flex xs12 sm8 md6 v-for="(item,i) in news" :key="i" class="card-container">
      <v-card hover flat>
        <v-divider></v-divider>
        <v-card-title class="headline">{{item.title}}</v-card-title>
        <v-card-text class="post">
          <span class="post-time">
            <v-icon small>mdi-calendar-month-outline</v-icon>
            发表于{{item.createtime}}
          </span>
          <span>
            <v-icon small>mdi-view</v-icon>
            阅读次数 {{item.clicktime}}
          </span>
        </v-card-text>
        <v-card-text class="content">{{item.gist}}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="handleRead(i)">阅读原文 »</v-btn>
        </v-card-actions>
      </v-card>
      <br />
    </v-flex>
    <div class="text-center">
      <v-pagination total-visible="6" v-model="page" :length="length" @input="changePage"></v-pagination>
    </div>
  </v-layout>
</template>

<script>
export default {
  name: "jszl",
  data() {
    return {
      page: 1,
      limit: 5,
      length: 6,
      news: []
    };
  },
  mounted() {
    this.$store.commit("setLevel", 2);
    this.$store.commit("setTitle", ["导航", "技术专栏"]);
    this.fetchInfo();
  },
  methods: {
    fetchInfo() {
      this.request({
        method: "POST",
        url: "/jszl/articalList",
        data: {
          page: this.page,
          limit: this.limit
        }
      })
        .then(res => {
          this.news = res.data.message;

          this.length = Math.ceil(res.data.totalLength / this.limit);
        })
        .catch(err => window.console.log(err));
    },
    handleRead(index) {
      let articleId = this.news[index]["_id"];
      let obj = this.news[index];
      if (obj.clicktime) {
        obj.clicktime = obj.clicktime + 1;
      } else {
        obj["clicktime"] = 1;
      }
      this.request
        .post("jszl/updateArticle", { articleInfo: obj })
        .then(res => {
          if (res.data.success == true) {
            this.$router.push("/jszlDetail/" + articleId);
          }
        });
    },
    changePage(page) {
      this.page = page;
      this.fetchInfo();
    }
  }
};
</script>

<style lang="less" scoped>
.index-container {
  max-width: 1000px !important;
  margin: 0 auto;
}
.card {
  background-color: rgba(255, 255, 255, 0) !important;
  &:not(:last-child) {
    border-bottom: 1px dotted #aaa;
  }
}
.card:not(:first-child) {
  margin-top: 40px !important;
}
.card-container {
  width: 90%;
}
.post {
  padding-bottom: 8px;
  font-size: 12px;
  &-class {
    margin: 0 6px;
    padding: 0 6px;
    border-left: 1px solid #aaa;
    border-right: 1px solid #aaa;
  }
}
.content {
  padding-top: 0;
}
</style>