<template lang="html">
  <div>
    <v-footer height="auto" color="white">
      <v-layout row wrap>
        <span
          >Made with <v-icon small color="red lighten-1">mdi-heart</v-icon> by
          Vuetify | Proudly Powered by Mars
        </span>
      </v-layout>
      <v-spacer>
        <span> Copyright © 南京工业大学</span>
        <a href="http://www.beian.miit.gov.cn" target="_blank"
          >苏ICP备11073482号</a
        >
        &nbsp;&nbsp;
        <a
          class="police"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32011102010195"
          target="_blank"
          >公网安备32011102010195号</a
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
    //
  })
};
</script>

<style lang="css" scoped>
.attribution a[href] {
  text-decoration: underline;
  color: #ccc;
}
</style>
