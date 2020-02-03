<template>
  <nav>
    <v-app-bar fixed app dark class="primary">
      <router-link to="/" class="white--text">
        <v-toolbar-title class="headline">
          <span>Blcui</span>
          <span>的个人主页</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-text-field
        flat
        :solo-inverted="!$vuetify.theme.dark"
        :solo="$vuetify.theme.dark"
        append-icon="mdi-magnify"
        label="搜索文章"
        v-model="keywords"
        hide-details
        @keyup.enter="search"
      ></v-text-field>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-for="(item, i) in this.links" :key="i" router :to="item.route">{{item.text}}</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      drawer: false,
      keywords:"",
      links: [
        { text: "Home", route: "/" },
        { text: "近期动态", route: "/jqdt" },
        { text: "出版专著", route: "/cbzz" },
        { text: "技术专栏", route: "/jszl" },
        { text: "资料下载", route: "/zlxz" },
        { text: "用户论坛", route: "/yhlt" }
      ]
    };
  },
  methods:{
    search(){
      
    }
  }
};
</script>

<style>
</style>