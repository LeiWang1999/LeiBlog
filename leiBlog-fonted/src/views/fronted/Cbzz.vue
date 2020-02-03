<template>
  <v-container class="my-5" grid-list-xs>
    <v-row>
      <v-col cols="12" sm="4" v-for="(book,i) in books" :key="i">
       <v-card hover flat>
  <v-img
    class="white--text"
    height="200px"
    :src="book.coverBase64"
  >
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <h2 class="headline" style="text-shadow: 0px 2px 5px #222;">{{book.name}}</h2>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
  <v-card-text>
      <p>
        {{book.gist}}
      </p>
  </v-card-text>
  <v-card-actions>
    <v-btn text color="red" :href="book.buylink" >点击购买</v-btn>
  </v-card-actions>
</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "cbzz",
  data() {
    return {
      books:[]
    };
  },
  mounted() {
    this.request({
      method: "POST",
      url: "/cbzz/bookList"
    })
      .then(res => {
        this.books = res.data.message;
      })
      .catch(err => window.console.log(err));
  }
};
</script>

<style>
</style>