<template>
  <nav>
    <v-app-bar flat fixed app class="white">
      <v-toolbar-title @click="drawer = !drawer" class="headline primary--text">
        <span>Lei</span>
        <span>Blog</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-for="(item, i) in this.links" :key="i" router :to="item.route">{{item.text}}</v-btn>
      </v-toolbar-items>
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
    </v-app-bar>
    <Drawer :drawer="drawer" />
  </nav>
</template>

<script>
import Drawer from "@/components/fronted/core/Drawer";

export default {
  name: "navbar",
  components: {
    Drawer
  },
  data() {
    return {
      drawer: false,
      keywords: "",
      links: [
        { text: "Home", route: "/" },
        { text: "Technical", route: "/technical" },
        { text: "Life", route: "/life" },
        { text: "Game", route: "/game" },
        { text: "Material", route: "/material" },
        { text: "About Me", route: "/about" },
        { text: "Comment", route: "/comment" }
      ]
    };
  },
  methods: {
    search() {
      this.$router.push("/search/" + this.keywords);
    }
  }
};
</script>

<style>
</style>