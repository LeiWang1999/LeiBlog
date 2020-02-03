<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 sm12>
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
  data(){
    return{
      source:{}
    }
  },
  mounted(){
        if (this.$route.params.id) {
      // when article exist
      this.request
        .get("/jszl/articleDetail/" + this.$route.params.id)
        .then(res => {
         this.source =  res.data.info;
        });
        }
  }
};
</script>

