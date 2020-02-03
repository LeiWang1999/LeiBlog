<template>
  <v-container grid-list-xs>
    <v-snackbar v-model="snackbar">
      {{ warnningText }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-text-field v-model="title" label="请输入文章标题" :rules="rules" hide-details="auto"></v-text-field>
    <v-divider></v-divider>
    <editor
      api-key="ouv7gosz4fnfvray6qdn7yqbtwsoleq7zx7jfoboixat7ivq"
      initialValue="<p>在这里输入文章内容</p>"
      :init="editorInit"
      v-model="content"
    ></editor>
    <br />
    <v-divider></v-divider>
    <br />
    <v-btn :disabled="!isSaveDisable" block class="pink" @click="saveArticle">点我保存</v-btn>
  </v-container>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "editDemo",
  components:{
    Editor
  },
  data() {
    return {
      snackbar: false,
      warnningText: "",
      title: "",
      content: "",
      titleRule1State: false,
      titleRule2State: false,
      rules: [
        value => {
          if (value) {
            this.titleRule1State = true;
            return true;
          } else {
            this.titleRule1State = false;
            return "必填！";
          }
        },
        value => {
          if ((value || "").length <= 20) {
            this.titleRule2State = true;
            return true;
          } else {
            this.titleRule2State = false;
            return "控制在20个字以内！";
          }
        }
      ],
      editorInit:{
        height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
      }
    };
  },
  methods: {
    saveArticle() {
      //   let self = this;
      if (this.title.length === 0) {
        this.warnningText = "标题不能为空!";
        this.snackbar = true;
        return;
      }
      if (this.content.length === 0) {
        this.warnningText = "内容不能为空！";
        this.snackbar = true;
        return;
      }
      alert("保存" + this.title + "成功");
    },
  },
  computed: {
    isSaveDisable() {
      return this.titleRule1State && this.titleRule2State;
    }
  }
};
</script>

<style>
</style>