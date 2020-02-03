<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <v-card hover flat>
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">个人简介</span>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-title>
          <v-container>
            <v-layout column align-center>
              <v-flex mt-5>
                <v-avatar size="150" color="red">
                  <img :src="avatarBase64" alt="个人头像" />
                </v-avatar>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-title>
        <v-card-text>
          <h2 align="center">崔北亮</h2>
        </v-card-text>
        <v-card-text>
          <div v-html="detailContent"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card hover flat>
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline">个人简介</span>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-title>
        <v-container>
          <v-layout column align-center>
            <v-flex mt-5>
              <v-avatar size="150" color="red">
                <img :src="avatarBase64" alt="个人头像" />
              </v-avatar>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-title>
      <v-card-text>
        <h2 align="center">崔北亮</h2>
      </v-card-text>
      <v-card-text>
        <p>{{content}}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn text outlined dark color="black" @click="showDialog">了解更多</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color="grey">mdi-email</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "grjjcard",
  data() {
    return {
      content: "",
      avatarBase64:"",
      dialog: false,
      detailContent:""
    };
  },
  mounted() {
    this.request.post("/grjj/detail").then(data => {
      let res = data.data.res;
      this.content = res.content;
      this.avatarBase64 = res.avatarBase64;
      this.detailContent = res.detailContent;
    });
  },
  methods: {
    showDialog() {
      this.dialog = true;
    }
  }
};
</script>

<style>
</style>