<template lang="html">
  <div>
    <v-footer height="auto" color="white" small>
      <v-layout row wrap>
        <span
          >Made with <v-icon small color="red lighten-1">mdi-heart</v-icon> by
          Vuetify | Proudly Powered by Mars
        </span>
         | 
              <div>
        <span class="grey--text">今日点击:</span>
        <span >{{uv}}</span>
        <span class="grey--text">次</span>
        |
        <span class="grey--text">昨天点击:</span>
        <span >{{uvBefore}}</span>
        <span class="grey--text">次</span>
      </div>
      </v-layout>
      <v-spacer>
        <span> Copyright © </span>
        <a href="http://www.beian.miit.gov.cn" target="_blank"
          >{{record1}}号</a
        >
        &nbsp;&nbsp;
        <a
          class="police"
          :href="'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' + record2"
          target="_blank"
          >公网安备{{record2}}号</a
        >
      </v-spacer>
      <router-link to="/admin" class="black--text">后台界面</router-link>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "pageFooter",
  data: () => ({
    uv: 0,
    uvBefore: 0,
    record1: "",
    record2: ""
  }),
  mounted() {
    this.request
      .post("/history/getVisit", {
        date: this.getCurrentDate(),
        dateBefore: this.getBeforeDate()
      })
      .then(res => {
        this.uv = res.data.uvToday;
        this.uvBefore = res.data.uvBefore;
      });
      this.request
        .post("/record/getRecord").then(res => {
          this.record1 = res.data.data.record1;
          this.record2 = res.data.data.record2;
        })
  },
  methods: {
    getCurrentDate: function() {
      let mydate, y, m, d;
      mydate = new Date();
      y = mydate.getFullYear();
      m = mydate.getMonth() + 1;
      d = mydate.getDate();
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      let date = y + "-" + m + "-" + d;
      return date;
    },
    getBeforeDate: function() {
      let mydate, y, m, d;
      mydate = new Date();
      mydate = new Date(mydate - 24 * 60 * 60 * 1000);
      y = mydate.getFullYear();
      m = mydate.getMonth() + 1;
      d = mydate.getDate();
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      let date = y + "-" + m + "-" + d;
      return date;
    }
  }
};
</script>

<style lang="css" scoped>
.attribution a[href] {
  text-decoration: underline;
  color: #ccc;
}
</style>
