<template>
  <v-card
    tile
    flat
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-card>
</template>

<script>
  export default {
    name: 'BaseCard',

    inheritAttrs: false
  }
</script>
