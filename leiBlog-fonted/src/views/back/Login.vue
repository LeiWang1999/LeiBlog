<template>
  <v-app>
    <v-content>
      <v-btn fab fixed top right text @click.stop="updateSetting">
        <v-icon>mdi-palette</v-icon>
      </v-btn>
      <v-container fluid fill-height>
        <Setting />
        <v-layout align-center justify-center>
          <v-flex xs12 sm6 md3>
            <v-card class="elevation-8">
              <v-toolbar flat class="pl-2 pr-2">
                <v-btn block color="black" text>登录界面</v-btn>
              </v-toolbar>
              <v-card-text class="pl-4 pr-4 pt-1 pb-4">
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    type="text"
                    placeholder="用户名"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="pwRules"
                    placeholder=" 密码 "
                    prepend-inner-icon="mdi-lock"
                    :append-icon="show ? 'mdi-visibility' : 'mdi-visibility_off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    autocomplete="new-password"
                  ></v-text-field>
                  <v-checkbox v-model="checkbox" label="记住密码"></v-checkbox>
                  <v-btn color="primary" block dark min-height="46" @click="validate">登录</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import Setting from "@/components/back/setting";

export default {
  name: "Login",
  data: () => ({
    name: "",
    password: "",
    show: false,
    checkbox: false,
    nameRules: [
      v => !!v || "用户名是必填的"
    ],
    pwRules: [v => !!v || "密码是必填的"]
  }),
  methods: {
    ...mapActions(["updateSetting"]),
    validate() {
      if (this.$refs.form.validate()) {
        this.request
          .post("/user/checkInfo", {
            account: this.name,
            password: this.password
          })
          .then(res => {
            let status = res.data.success;
            if (status === false) {
              alert("账号或者密码错误");
              return;
            } else {
              localStorage.setItem("accessToken", "token");
              this.$router.push({ path: "/admin" });
            }
          });
      }
    }
  },
  components: {
    Setting
  }
};
</script>

<style lang="scss" scoped>
html {
  overflow: auto;
}
.v-content {
  background-size: 100% auto;
}
.avatar {
  margin-top: -50px;
}
</style>