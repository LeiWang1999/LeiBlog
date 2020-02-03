<template>
  <v-layout v-if="articleList.length" column justify-center align-center class="index-container">
    <v-flex xs12 sm8 md6 v-for="(item,i) in articleList" :key="i" class="card-container">
      <v-card hover flat>
        <v-divider></v-divider>
        <v-subheader v-if="item.type=='technical'" small>
          <span class="red--text">Location:</span>Technical
        </v-subheader>
        <v-subheader v-if="item.type=='life'" small>
          <span class="blue--text">Location:</span>Life
        </v-subheader>
        <v-subheader v-if="item.type=='material'" small>
          <span class="orange--text">Location:</span>Material
        </v-subheader>

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
        <v-btn v-if="item.type=='material'" color="primary" :href="item.downloadlink" text>点击下载</v-btn>
        <v-btn v-else color="primary" text @click="handleRead(item._id, item.type)">阅读原文 »</v-btn>
      </v-card>
      <br />
    </v-flex>
  </v-layout>

  <v-layout v-else column justify-center align-center class="index-container">
    <v-flex xs12 sm8 md6 class="card-container">
      <h2 class="text-center">对不起，没有找到相关文章</h2>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      articleList: []
    };
  },
  mounted() {
    let keywords = this.$route.params.keywords;
    this.fetchInfo(keywords);
  },
  computed: {
    newKeyword() {
      return this.$route.params.keywords;
    }
  },
  watch: {
    newKeyword(val) {
      this.fetchInfo(val);
    }
  },
  methods: {
    fetchInfo(keywords) {
      this.request({
        method: "POST",
        url: "/user/search",
        data: {
          keywords: keywords
        }
      }).then(res => {
        this.articleList = res.data.result;
      });
    },
    handleRead(id, type) {
      this.$router.push("/" + type + "detail/" + id);
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