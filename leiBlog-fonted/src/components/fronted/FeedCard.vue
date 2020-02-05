<template>
  <v-flex xs12 :class="classes">
    <base-card @click.stop="handleRead" :height="value.prominent ? 450 : 350" color="grey lighten-1" dark href="#!">
      <v-img
        :src="value.coverBase64"
        height="100%"
        gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
      >
        <v-layout v-if="!value.prominent" fill-height wrap text-xs-right ma-0>
          <v-flex xs12>
            <v-chip
              label
              class="mx-0 mb-2 text-uppercase"
              color="grey darken-3"
              text-color="white"
              small
              @click.stop
            >{{ value.tag }}</v-chip>
            <h3 class="title font-weight-bold mb-2">{{ value.title }}</h3>
            <div class="caption">
              Date {{ value.createtime }}
              <br />
            </div>
            <p>{{value.gist}}</p>
          </v-flex>
          <v-flex align-self-end>
            <v-chip
              class="text-uppercase ma-0"
              color="primary"
              label
              small
              
            >Read More</v-chip>
            <v-btn text text-color="white" small>
              <v-icon small>mdi-eye</v-icon>
              {{value.clicktime}}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-img>
    </base-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleRead() {
      let articleId = this.value._id;
      let obj = {};
      obj._id = articleId;
      obj.type = this.value.type;
      if (obj.type === "technical") {
        this.request
          .post("technical/updateClick", { Info: obj })
          .then(res => {
            if (res.data.success == true) {
              this.$router.push("/technicaldetail/" + articleId);
            }
          });
      } else if (obj.type === "life") {
        this.request
          .post("life/updateClick", { Info: obj })
          .then(res => {
            if (res.data.success == true) {
              this.$router.push("/lifedetail/" + articleId);
            }
          });
      }
    }
  },
  computed: {
    classes() {
      return {
        md6: this.size === 2,
        md4: this.size === 3
      };
    }
  }
};
</script>

<style>
.v-image__image {
  transition: 0.3s linear;
}
</style>
