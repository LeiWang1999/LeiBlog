<template>
  <v-layout column justify-center align-center class="index-container">
    <v-flex xs12 sm8 md6 class="card-container">
      <v-card class="card" v-for="(item,i) in articleList" :key="i">
        <v-card-title class="headline">{{item.title}}</v-card-title>
        <v-card-text class="post">
          <span class="post-time">
            <v-icon small>mdi-calendar-month-outline</v-icon>
            发表于{{item.date}}
          </span>
          <span>
            <v-icon small>mdi-view</v-icon>阅读次数 {{item.clicktime}}
          </span>
        </v-card-text>
        <v-card-text class="content">{{item.gist}}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="handleRead(i)">阅读原文 »</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "jszl",
  data() {
    return {
      articleList: []
    };
  },
  mounted() {
    this.request({
      method: "POST",
      url: "/jqdt/articalList"
    })
      .then(res => {
        this.articleList = res.data.message;
      })
      .catch(err => window.console.log(err));
  },
  methods:{
    handleRead(index){
      let articleId = this.articleList[index]["_id"];
      let obj = this.articleList[index];
      window.console.log(obj)
      if (obj.clicktime) {
        obj.clicktime = obj.clicktime +1;
      }else{
        obj["clicktime"] = 1;
      }
      this.request
          .post("jqdt/updateArticle", { articleInfo: obj })
          .then(res => {
            if (res.data.success == true) {
               this.$router.push("/jqdtDetail/" + articleId);
            }
          });
    }
  }
};
</script>

<style lang="less" scoped>
.index-container {
  max-width: 1000px !important;
  margin: 0 auto;
}
.v-card {
  box-shadow: none;
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