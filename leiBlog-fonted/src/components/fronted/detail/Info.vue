<template>
  <div>
    <base-card dark>
      <v-img class="grey lighten-2" height="400" width="100%" :src="source.coverBase64">
        <v-layout fill-height align-center pa-3>
          <v-flex xs12 md7 offset-md5>
            <h1 class="display-3 font-weight-light">{{source.title}}</h1>
            <div class="subheading text-uppercase pl-2 mb-4">{{source.gist}}</div>
          </v-flex>
        </v-layout>
      </v-img>
    </base-card>
    <div class="detail" v-html="source.content"></div>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {};
  },
  props: {
    source: {
      type: Object
    }
  }
};
</script>

<style scoped lang="scss">
.detail {
  font-size: 16px;
}
</style>
