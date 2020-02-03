<template>
  <v-container class="my-5" grid-list-xs>
    <v-row>
      <v-col cols="12" sm="4" v-for="(book,i) in books" :key="i">
        <v-card hover flat>
          <v-img class="white--text" height="200px" :src="book.coverBase64">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <h2 class="headline" style="text-shadow: 0px 2px 5px #222;">{{book.name}}</h2>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-text>
            <p>{{book.gist}}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" router :to="'/cbzzDetail/'+book._id">查看详情</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="red" :href="book.buylink">点击购买</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-pagination total-visible="6" v-model="page" :length="length" @input="changePage"></v-pagination>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "cbzz",
  data() {
    return {
      books: [],
      page: 1,
      limit: 6,
      length: 0
    };
  },
  mounted() {
    this.$store.commit("setLevel", 2);
    this.$store.commit("setTitle", ["导航", "出版专著"]);
    this.fetchInfo();
  },
  methods: {
    fetchInfo() {
      this.request({
        method: "POST",
        url: "/cbzz/bookList",
        data: {
          page: this.page,
          limit: this.limit
        }
      })
        .then(res => {
          this.books = res.data.message;
          this.length = Math.ceil(res.data.totalLength / this.limit);
        })
        .catch(err => window.console.log(err));
    },
    changePage(page) {
      this.page = page;
      this.fetchInfo();
    }
  }
};
</script>

<style>
</style>