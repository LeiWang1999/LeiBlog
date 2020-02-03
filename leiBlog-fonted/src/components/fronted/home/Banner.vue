<template>
  <base-card dark>
    <v-img
      class="grey lighten-2"
      height="400"
      width="100%"
      :src="coverBase64"
    >
      <v-layout
        fill-height
        align-center
        pa-3
      >
        <v-flex
          xs12
          md7
          offset-md5
        >
          <h1 class="display-3 font-weight-light">
            {{title}}
          </h1>
          <div class="subheading text-uppercase pl-2 mb-4">
            {{gist}}
          </div>
          <v-btn
            color="primary"
            depressed
            text
          >
            Read More
          </v-btn>
        </v-flex>
      </v-layout>
    </v-img>
  </base-card>
</template>

<script>
export default {
  data(){
    return{
      title:"",
      coverBase64:"",
      gist:"",
      linkId:"",
    }
  },
  mounted(){
      this.request.post("/home/detail").then(res => {
        let info = res.data.data;
        this.title = info.title;
        this.coverBase64 = info.coverBase64;
        this.gist = info.gist;
        this.linkId = info.linkId;
      });
  }
}
</script>

<style>

</style>
