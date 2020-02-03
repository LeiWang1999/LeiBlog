<template>
  <div>
    <v-card-actions>
      <v-text-field v-model="record1" label="备案号"></v-text-field>
    </v-card-actions>
    <v-card-actions>
      <v-text-field v-model="record2" label="公安网备"></v-text-field>
    </v-card-actions>
    <v-card-actions>
      <v-btn color="purple" block @click="updateRecord">确认修改</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "record",
  data() {
    return {
      record1: "",
      record2: ""
    };
  },
  mounted() {
    this.request.post("/record/getRecord").then(res => {
      this.record1 = res.data.data.record1;
      this.record2 = res.data.data.record2;
    });
  },
  methods: {
    updateRecord() {
      let obj = {};
      obj.record1 = this.record1;
      obj.record2 = this.record2;
      this.request
        .post("/record/updateRecord", {
          Info: obj
        })
        .then(res => {
          if (res.data.success) {
            this.$snackbar.success("保存成功");
          }
        });
    }
  }
};
</script>

<style>
</style>