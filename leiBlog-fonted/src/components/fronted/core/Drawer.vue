<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Drawer — for phone</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item v-for="(link,i) in links" :key="i" link>
        <v-list-item-content>
          <v-btn text router :to="link.route">
            <v-icon>{{ link.icon }}</v-icon>
            {{link.text}}
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "CoreDrawer",
  data() {
    return {
      links: [
        { text: "Home", route: "/", icon: "mdi-home-city" },
        { text: "Technical", route: "/technical" , icon: "mdi-gavel" },
        { text: "Life", route: "/life" , icon: "mdi-camera"},
        { text: "Material", route: "/material", icon: "mdi-folder" },
        { text: "About Me", route: "/about", icon: "mdi-account" },
        { text: "Comment", route: "/comment", icon: "mdi-message-text" }
      ]
    };
  },
  props: {
    drawer: {
      default: false,
      type: Boolean
    }
  }
};
</script>
