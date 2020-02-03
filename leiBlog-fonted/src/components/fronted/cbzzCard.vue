<template>
<v-card hover flat>
  <v-img
    class="white--text"
    height="200px"
    src="@/static/home/出版专著.jpg"
  >
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <h2 class="headline" style="text-shadow: 0px 2px 5px #222;">出版专著</h2>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
  <v-card-title small>
    <div>
      <p class="grey--text">2020年1月16日下午11点   南京</p>
    </div>
  </v-card-title>
  <v-card-text>
      <p>
        这些年来，写了很多书......
      </p>
  </v-card-text>
  <v-card-actions>
    <v-btn text outlined dark color="purple" router to="/cbzz" >了解更多</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
export default {
  name: "cbzzcard",
  data() {
    return {
      books: []
    };
  },
  mounted() {
    this.request({
      method: "POST",
      url: "/cbzz/bookList"
    })
      .then(res => {
        this.books = res.data.message.slice(0,5);
      })
      .catch(err => window.console.log(err));
  }
};
</script>

<style>
</style>