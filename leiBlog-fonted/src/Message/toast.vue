<template>
  <v-snackbar v-model="snackbar" color="primary" :timeout="timeout" top>
    {{ mes }}
    <v-spacer></v-spacer>
    <v-btn dark text color="red" @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>
 
<script>
export default {
  name: "Snackbar",
  components: {},
  data() {
    return {
      colorName: "",
      snackbar: false,
      mes: "",
      timeout: 3000
    };
  },
  created() {},
  methods: {
    info(mes) {
      this.timeout = 6000;
      this.snackbar = true;
      this.colorName = "info";
      this.mes = mes;
    },
    error(mes) {
      this.timeout = 6000;
      this.snackbar = true;
      this.colorName = "error";
      this.mes = mes;
    },
    warning(mes) {
      this.timeout = 6000;
      this.snackbar = true;
      this.colorName = "warning";
      this.mes = mes;
    },
    success(mes) {
      this.timeout = 6000;
      this.snackbar = true;
      this.colorName = "success";
      this.mes = mes;
    }
  }
};
</script>
 

