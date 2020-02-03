<template>
  <v-layout row wrap pa-12>
    <v-flex offset-xs2 xs12 md8>
      <div class="page">
        <div class="wrapper">
          <h1 class="title">《{{name}}》</h1>
          <div class="some">
            <span class="date">
              <i class="iconfont icon-date">更新时间:{{updatetime}}</i>
            </span>
            <span class="date">
              <i class="iconfont icon-date">阅读次数:{{clicktime}}</i>
            </span>
          </div>
          <div class="detail" v-if="content">
            <div v-html="content"></div>
          </div>
          <v-btn absolute left bottom text @click="toGo(prev._id)">
            <span class="grey--text">上一篇:</span>
            {{prev.name?prev.name:'没有更多'}}
          </v-btn>
          <v-btn absolute right bottom text @click="toGo(next._id)">
            <span class="grey--text">下一篇:</span>
            {{next.name?next.name:'没有更多'}}
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "jqdtdetail",
  components: {},
  data() {
    return {
      name: "",
      gist: "",
      content: "",
      updatetime: "",
      coverBase64: "",
      buylink: "",
      prev: {},
      next: {},
      articleId: null,
      clicktime: 0
    };
  },
  mounted() {
    if (this.$route.params.id) {
      // when article exist
      this.fetchInfo();
    }
  },
  methods: {
    fetchInfo() {
      this.request
        .get("/cbzz/bookDetail/" + this.$route.params.id)
        .then(res => {
          let book = res.data.info;
          this.name = book.name;
          this.updatetime = book.updatetime;
          this.coverBase64 = book.coverBase64;
          this.buylink = book.buylink;
          this.content = book.content;
          this.clicktime = book.clicktime;
          this.prev = res.data.otherinfo.prev;
          this.next = res.data.otherinfo.next;
        })
        .then(() => {
          let bookId = this.$route.params.id;
          let obj = {
            _id: bookId,
            name: this.name,
            gist: this.gist,
            content: this.content,
            coverBase64: this.coverBase64,
            buylink: this.buylink,
            updatetime: this.updatetime,
            clicktime: this.clicktime
          };
          if (obj.clicktime) {
            obj.clicktime = obj.clicktime + 1;
          } else {
            obj["clicktime"] = 1;
          }
          this.request.post("cbzz/updateBook", { bookInfo: obj });

          this.$store.commit("setLevel", 3);
          this.$store.commit("setTitle", ["导航", "出版专著", this.name]);
        });
    },
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
