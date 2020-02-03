<template>
<v-card hover flat>
  <v-img
    class="white--text"
    height="200px"
    src="@/static/home/资料下载.jpg"
  >
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <h2 class="headline" style="text-shadow: 0px 2px 5px #222;">资料下载</h2>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
  <v-card-title small>
    <div>
      <p class="grey--text">2020年1月16日下午10点   南京</p>
    </div>
  </v-card-title>
  <v-card-text>
      <p>
        我猜你可能需要下载这些软件......
      </p>
  </v-card-text>
  <v-card-actions>
    <v-btn text outlined dark color="pink" router to="/zlxz" >了解更多</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
export default {
  name: "zlxzcard",
  data() {
    return {
      files: []
    };
  },
  mounted() {
    this.request({
      method: "POST",
      url: "/zlxz/fileList"
    })
      .then(res => {
        this.files = res.data.message;
      })
      .catch(err => window.console.log(err));
  }
};
</script>

<style>
</style>