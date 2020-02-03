<template>
  <div>
    <div>
      <h2>{{source.title}}</h2>
    </div>
    <div :class="expand ? 'alone-item-expand' : 'alone-item'">
      <span>
        <label>视频介绍：</label>
        <br />
        <p class="grey--text">{{source.gist}}</p>
      </span>
    </div>
    <div @click="expand = !expand" class="expand-pointer">
      <v-icon v-if="!expand">mdi-chevron-down</v-icon>
      <v-icon v-if="expand">mdi-chevron-up</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
      expand: false // 是否展开
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
.expand-pointer {
  text-align: center;
  cursor: pointer;
}

.alone-item {
  margin: 5px 0;
  width: 100%;
  color: #666;
  font-weight: 500;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.alone-item-expand {
  margin: 5px 0;
  color: #666;
  font-weight: 500;
}

.item {
  display: flex;
  margin: 5px 0;
  font-weight: 500;
  justify-content: space-between;
  width: 100%;

  p {
    margin-bottom: 0 !important;
  }

  span {
    width: 50%;
    color: #666;
  }
}
</style>
