<template>
  <div>
    <v-layout column justify-center align-center class="index-container">
      <v-flex xs12 sm8 md6 v-for="(item,i) in files" :key="i" class="card-container">
        <v-card hover flat>
          <v-divider></v-divider>
          <v-card-title class="headline">{{item.name}}</v-card-title>
          <v-card-text class="post">
            <span class="post-time">
              <v-icon small>mdi-calendar-month-outline</v-icon>
              发表于{{item.updatetime}}
            </span>
            <span>
              <v-icon small>mdi-view</v-icon>
              下载次数 {{item.downloadtime}}
            </span>
          </v-card-text>
          <v-card-text class="content">{{item.gist}}</v-card-text>
          <v-btn color="primary" text @click="updateCount(i)">点击下载</v-btn>
        </v-card>
        <br />
      </v-flex>
    </v-layout>

    <div class="text-center">
      <v-pagination v-if="length > 1" total-visible="6" v-model="page" :length="length" @input="changePage"></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "material",
  data() {
    return {
      page: 1,
      limit: 6,
      length: 0,
      keywords: "",
      files: [],
      currentPage: 1
    };
  },
  mounted() {
    this.$store.commit("setLevel", 2);
    this.$store.commit("setTitle", ["导航", "资料下载"]);
    this.fetchData();
    this.files.forEach(element => {
      element.expand = false;
    });
  },
  methods: {
    fetchData() {
      this.request({
        method: "POST",
        url: "/material/fileList",
        data: {
          page: this.page,
          limit: this.limit
        }
      })
        .then(res => {
          this.files = res.data.message;
          this.length = Math.ceil(res.data.totalLength / this.limit);
        })
        .catch(err => window.console.log(err));
    },
    updateCount(index) {
      let obj = {};
      obj._id = this.files[index]._id;
      this.request.post("material/updateClick", { fileInfo: obj }).then(()=>{
        window.location.href = this.files[index].downloadlink;                 
        this.fetchData()});
    },
    changePage(page) {
      this.page = page;
      this.fetchData();
    }
  }
};
</script>

<style lang="less" scoped>
.index-container {
  max-width: 1000px !important;
  margin: 0 auto;
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