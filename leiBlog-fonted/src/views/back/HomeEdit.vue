<template>
  <div id="homeedit">
    <v-card>
      <v-card-title primary-title>选择Banner文章</v-card-title>
      <v-card-actions>
        <v-select
          v-model="currentArticleId"
          :items="articles"
          item-text="title"
          item-value="_id"
          label="Outlined style"
          outlined
        ></v-select>
      </v-card-actions>
      <v-card-actions>
        <div v-for="n in 11" :key="n">
          {{n}}
          <v-checkbox v-model="proments[n-1]" :value="true"></v-checkbox>
        </div>
      </v-card-actions>
      <v-card-text>
        <span>Selected: {{ currentArticleId }}</span>
      </v-card-text>
      <base-card dark>
        <v-img class="grey lighten-2" height="400" width="100%" :src="currentArticle.coverBase64">
          <v-layout fill-height align-center pa-3>
            <v-flex xs12 md7 offset-md5>
              <h1 class="display-3 font-weight-light">{{currentArticle.title}}</h1>
              <div class="subheading text-uppercase pl-2 mb-4">{{currentArticle.gist}}</div>
              <v-btn color="primary" depressed text>Read More</v-btn>
            </v-flex>
          </v-layout>
        </v-img>
      </base-card>
      <v-card-actions>
        <v-btn block color="primary" dark @click="handleSubmit">确认更改</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      technicalarticles: [],
      lifearticles: [],
      currentArticleId: "",
      proments: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ]
    };
  },
  mounted() {
    this.fetchInfo();
  },
  methods: {
    fetchInfo() {
      this.request({
        method: "POST",
        url: "/technical/articalList",
        data: {
          page: this.page,
          limit: this.technicallimit
        }
      })
        .then(res => {
          this.technicalarticles = res.data.message;
          this.technicallength = Math.ceil(
            res.data.totalLength / this.technicallimit
          );
        })
        .catch(err => window.console.log(err));
      this.request({
        method: "POST",
        url: "/life/articalList",
        data: {
          page: this.page,
          limit: this.lifelimit
        }
      })
        .then(res => {
          this.lifearticles = res.data.message;
          this.lifelength = Math.ceil(res.data.totalLength / this.lifelimit);
        })
        .catch(err => window.console.log(err));
      this.request.post("/home/detail").then(res => {
        let info = res.data.data;
        this.currentArticleId = info.linkId;
        this.proments = info.proments;
      });
    },
    handleSubmit() {
      let obj = {
        title: this.currentArticle.title,
        gist: this.currentArticle.gist,
        linkId: this.currentArticle._id,
        coverBase64: this.currentArticle.coverBase64,
        proments: this.proments
      };
      this.request.post("/home/updateDetail", { obj }).then(res => {
        let success = res.data.success;
        if (success) this.$snackbar.success("更新成功");
      });
    }
  },
  computed: {
    articles() {
      let articles = this.technicalarticles.concat(this.lifearticles);
      return articles;
    },
    titles() {
      let articles = this.technicalarticles.concat(this.lifearticles);
      let titles = [];
      articles.forEach(element => {
        titles.push(element.title);
      });
      return titles;
    },
    currentArticle() {
      let articleList = this.articles;
      let obj = {};
      articleList.forEach(element => {
        if (element._id === this.currentArticleId) {
          obj = element;
        }
      });
      return obj;
    }
  }
};
</script>

<style>
</style>