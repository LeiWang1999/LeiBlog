<template>
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
        <div class="footer">
          <v-btn text @click="toGo(prev._id)">
            <span class="grey--text">←上一篇</span>
            {{prev.title?prev.title:'没有更多'}}
          </v-btn>
          <v-btn text @click="toGo(next._id)">
            <span class="grey--text">下一篇→</span>
            {{next.title?next.title:'没有更多'}}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
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
      this.fecthData();
    }
  },
  methods: {
    fecthData() {
      this.request
        .get("/jqdt/articleDetail/" + this.$route.params.id)
        .then(res => {
          let article = res.data.info;
          window.console.log(res.data);
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
        this.$router.push({ path: `/jqdtDetail/${id}` });
        this.fecthData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  padding: 10px;
  & > .title {
    font-size: 16px;
    text-align: center;
    font-weight: 500;
  }
  & > .some {
    text-align: center;
    color: #999;
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
  .footer {
    display: flex;
    justify-content: space-between;
    margin: 20px 20%;
    border-radius: 6px;
    .btn {
      text-align: center;
      background: #fff;
      color: #666;
      padding: 10px;
      flex: 1;
      border: 1px solid #ddd;
      transition: all 0.3s;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        background: #3b99fc;
        color: #fff;
      }
      p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &.prev {
        border-right: none;
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
