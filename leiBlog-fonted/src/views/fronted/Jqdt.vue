<template>
  <div>
    <v-layout column justify-center align-center class="index-container">
      <v-flex xs12 class="card-container" v-for="(item,i) in articleList" :key="i">
        <v-card hover flat>
          <v-divider></v-divider>
          <v-card-title class="headline">{{item.title}}</v-card-title>
          <v-card-text class="post">
            <span class="post-time">
              <v-icon small>mdi-calendar-month-outline</v-icon>
              发表于{{item.date}}
            </span>
            <span>
              <v-icon small>mdi-view</v-icon>
              阅读次数 {{item.clicktime}}
            </span>
          </v-card-text>
          <v-card-text class="content">{{item.gist}}</v-card-text>
          <v-btn color="primary" text @click="handleRead(i)">阅读原文 »</v-btn>
        </v-card>
        <br />
      </v-flex>
    </v-layout>

    <div class="text-center">
      <v-pagination total-visible="6" v-model="page" :length="length" @input="changePage"></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "jszl",
  data() {
    return {
      length: 0,
      page: 1,
      limit: 5,
      articleList: []
    };
  },
  mounted() {
    this.$store.commit("setLevel", 2);
    this.$store.commit("setTitle", ["导航", "近期动态"]);
    this.fetchInfo();
  },
  methods: {
    fetchInfo() {
      this.request({
        method: "POST",
        url: "/jqdt/articalList",
        data: {
          page: this.page,
          limit: this.limit
        }
      })
        .then(res => {
          this.articleList = res.data.message;
          this.length = Math.ceil(res.data.totalLength / this.limit);
        })
        .catch(err => window.console.log(err));
    },
    handleRead(index) {
      let articleId = this.articleList[index]["_id"];
      this.$router.push("/jqdtDetail/" + articleId);
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