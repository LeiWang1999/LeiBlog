<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex offset-xs2 xs12 md8>
        <Info :source="source" />
        <div v-if="source.videolink">
          <Player :source="source" />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Info from "@/components/fronted/detail/Info";
import Player from "@/components/fronted/detail/Player";
export default {
  name: "Detail",
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
        .get("/life/articleDetail/" + this.$route.params.id)
        .then(res => {
          this.source = res.data.info;
        });
    }
  }
};
</script>

