<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <div v-html="detailContent"></div>
      </v-flex>
      <v-flex xs12 md4>
        <v-card flat hover>
          <v-card-title primary-title>
            <v-avatar slot="offset" class="mx-auto d-block" size="130">
              <img :src="avatarBase64" />
            </v-avatar>
          </v-card-title>

          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">Student / Njtech-University</h6>
            <h4 class="card-title font-weight-light">王磊</h4>
            <p class="card-description font-weight-light">{{content}}</p>
            <v-btn block color="success" target href="https://github.com/NjtechPrinceling" text class="font-weight-light">Follow Me</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      updatetime: "",
      avatarBase64: "",
      email: "",
      phone: "",
      detailContent: ""
    };
  },
  mounted() {
    this.fetchInfo();
  },
  methods: {
    fetchInfo() {
      this.request.post("/about/detail").then(data => {
        let res = data.data.res;
        this.content = res.content;
        this.updatetime = res.updatetime;
        this.avatarBase64 = res.avatarBase64;
        this.email = res.email;
        this.phone = res.phone;
        this.detailContent = res.detailContent;
      });
    }
  }
};
</script>
