<template>
  <v-layout row wrap pa-12>
    <v-flex offset-xs2 xs12 md8>
      <div class="page">
        <div class="wrapper">
          <h1 class="title">{{title}}</h1>
          <div class="some">
            <span class="date">
              <i class="iconfont icon-date">创建时间:{{date}}</i>
            </span>
          </div>
          <div class="detail" v-if="content">
            <div v-html="content"></div>
          </div>
        </div>
      </div>
      <v-btn absolute left bottom text @click="toGo(prev._id)">
        <span class="grey--text">上一篇:</span>
        {{prev.title?prev.title:'没有更多'}}
      </v-btn>
      <v-btn absolute right bottom text @click="toGo(next._id)">
        <span class="grey--text">下一篇:</span>
        {{next.title?next.title:'没有更多'}}
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "jszldetail",
  components: {},
  data() {
    return {
      title: "",
      date: "",
      gist: "",
      content: "",
      prev: {},
      next: {},
      articleId: null,
      clicktime: Number
    };
  },
  mounted() {
    if (this.$route.params.id) {
      // when article exist
      this.request
        .get("/tszs/articleDetail/" + this.$route.params.id)
        .then(res => {
          let article = res.data.info;
          this.title = article.title;
          this.date = article.date;
          this.gist = article.gist;
          this.content = article.content;
          this.clicktime = article.clicktime;
          let otherinfo = res.data.otherinfo;
          this.prev = otherinfo.prev;
          this.next = otherinfo.next;
        })
        .then(() => {
          let articleId = this.$route.params.id;
          let obj = {
            _id: articleId,
            title: this.title,
            date: this.date,
            gist: this.gist,
            content: this.content,
            clicktime: this.clicktime
          };
          if (obj.clicktime) {
            obj.clicktime = obj.clicktime + 1;
          } else {
            obj["clicktime"] = 1;
          }
          this.request
            .post("tszs/updateArticle", { articleInfo: obj })
            .then(()=> {
                this.$store.commit("setLevel", 3);
    this.$store.commit("setTitle", ["导航", "他山之石", this.title]);
            });
            
        });
        
    }
  },
  methods: {
    fecthData() {
      this.request
        .get("/tszs/articleDetail/" + this.$route.params.id)
        .then(res => {
          let article = res.data.info;
          this.title = article.title;
          this.date = article.date;
          this.gist = article.gist;
          this.content = article.content;
          this.clicktime = article.clicktime;
          let otherinfo = res.data.otherinfo;
          this.prev = otherinfo.prev;
          this.next = otherinfo.next;
        });
    },
    toGo(id) {
      if (id) {
        this.$router.push({ path: `/tszsDetail/${id}` });
        this.fecthData();
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.wrapper {
  .detail {
    font-size: 16px;
  }
  & > .title {
    font-size: 16px;
    text-align: center;
    font-weight: 500;
  }
  & > .some {
    text-align: center;
    // color: #999;
    margin: 10px 0;
    padding-bottom: 10px;
    .iconfont {
      color: #666;
      margin: 0 5px 0 0;
    }
    .date {
      margin: 0 10px 0 0;
      vertical-align: middle;
    }
    .category {
      vertical-align: middle;
      & > span {
        margin-right: 5px;
      }
    }
  }
}

@media (min-width: 768px) {
  //pc
  .wrapper {
    padding: 20px;
    & > .title {
      font-size: 28px;
    }
    & > .some {
      margin: 10px 0 40px;
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      .iconfont {
        color: #666;
        margin: 0 5px 0 0;
      }
      .date {
        margin: 0 20px 0 0;
      }
    }
  }
}
</style>
