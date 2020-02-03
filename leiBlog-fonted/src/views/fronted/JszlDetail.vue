<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex offset-xs2 xs12 md8>
        <Info :source="source" />
        <Player :source="source" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Info from "@/components/fronted/jqdtdetail/Info";
import Player from "@/components/fronted/jqdtdetail/Player";
export default {
  name: "jszldetail",
  components: {
    Info,
    Player
  },
  data() {
    return {
      source: {}
    };
  },
  mounted() {
    if (this.$route.params.id) {
      // when article exist
      this.request
        .get("/jszl/articleDetail/" + this.$route.params.id)
        .then(res => {
          this.source = res.data.info;

          this.$store.commit("setLevel", 3);
          this.$store.commit("setTitle", [
            "导航",
            "技术专栏",
            this.source.title
          ]);
        });
    }
  }
};
</script>

