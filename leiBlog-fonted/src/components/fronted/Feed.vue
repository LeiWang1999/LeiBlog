<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <slot />
      </v-flex>
      <feed-card
        v-for="(article, i) in paginatedArticles"
        :key="i"
        :size="layout[i]"
        :value="article"
      />
    </v-layout>
  </v-container>
</template>

<script>
// Utilities

export default {
  name: "Feed",

  components: {
    FeedCard: () => import("@/components/fronted/FeedCard")
  },
  mounted() {
    this.fetchInfo();
  },
  data: () => ({
    layout: [2, 2, 1, 2, 2, 3, 3, 3, 3, 3, 3],
    page: 1,
    technicallimit: 6,
    lifelimit: 5,
    technicallength: 6,
    lifelength: 6,
    technicalarticles: [],
    lifearticles: []
  }),
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
    }
  },

  computed: {
    paginatedArticles() {
      let articles = [];
      var element = this.technicalarticles[0];
      articles.push(element);
      for (let index = 0; index < 5; index++) {
        var element1 = this.lifearticles[index];
        if (!element1) {
          break;
        }
        articles.push(element1);
        var element2 = this.technicalarticles[index + 1];
                if (!element2) {
          break;
        }
        articles.push(element2);
      }
      return articles;
    },
    length() {
      let articles = this.technicalarticles.concat(this.lifearticles);
      return Math.ceil(articles.length / 11);
    }
  }
};
</script>
