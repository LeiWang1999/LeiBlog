<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <slot />
      </v-flex>
      <feed-card v-for="(article, i) in articleList" :key="i" :size="layout[i]" :value="article" />
    </v-layout>
    <div class="text-center">
      <v-pagination total-visible="6" v-model="page" :length="length" @input="changePage"></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "technical",
  components: {
    FeedCard: () => import("@/components/fronted/FeedCard")
  },
  data() {
    return {
      layout: [2, 2, 3, 3, 3],
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
        url: "/technical/articalList",
        data: {
          page: this.page,
          limit: this.limit
        }
      })
        .then(res => {
          this.articleList = res.data.message;
          window.console.log(this.articleList);
          this.length = Math.ceil(res.data.totalLength / this.limit);
        })
        .catch(err => window.console.log(err));
    },
    handleRead(index) {
      let articleId = this.articleList[index]["_id"];
      this.$router.push("/technicalDetail/" + articleId);
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