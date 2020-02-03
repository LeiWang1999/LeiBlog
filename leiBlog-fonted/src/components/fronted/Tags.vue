<template>
  <v-container pa-0>
    <base-subheading>Tags</base-subheading>
    <v-chip
      v-for="(category, i) in categories"
      :key="i"
      tag
      label
      small
      color="secondary"
      text-color="white"
    >
      {{ category.text }}
    </v-chip>
  </v-container>
</template>

<script>
  // Utilities
  import {
    mapGetters
  } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['categories'])
    }
  }
</script>
