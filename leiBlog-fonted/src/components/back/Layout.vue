<template>
  <v-app>
    <Toolbar />

    <Navigation />

    <v-content>
      <Tab />
      <v-container fluid grid-list-xl>
          <router-view></router-view>
      </v-container>
    </v-content>

    <Setting />

    <v-footer fixed inset app absolute> Projected by Mars Studio </v-footer>

    <v-fab-transition app>
      <v-btn
        fab
        fixed
        bottom
        right
        large
        color="accent"
        v-show="backTopShow"
        @click="$vuetify.goTo(0)"
      >
        <v-icon> mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
import Navigation from "./navigation";
import Toolbar from "./toolbar";
import Setting from "./setting";
import Tab from "./tab";

export default {
  name: "Layout",
  data() {
    return {
      backTopShow: false
    };
  },
  methods: {
    handleScroll() {
      if (document.documentElement.scrollTop + document.body.scrollTop > 300) {
        this.backTopShow = true;
      } else {
        this.backTopShow = false;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  components: {
    Navigation,
    Toolbar,
    Setting,
    Tab
  }
};
</script>
