<template>
  <div>
    <div class="detail" v-html="source.content"></div>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
    };
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
