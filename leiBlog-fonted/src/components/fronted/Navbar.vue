<template>
  <nav>
    <v-app-bar flat fixed app  class="white">
      <router-link to="/" >
        <v-toolbar-title class="headline">
          <span>Blog</span>
        </v-toolbar-title>
      </router-link>
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
  </nav>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      drawer: false,
      keywords: "",
      links: [
        { text: "Home", route: "/" },
        { text: "Technical", route: "/technical" },
        { text: "Life", route: "/life" },
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