<template>
  <base-card dark>
    <v-img
      class="grey lighten-2"
      height="400"
      width="100%"
      :src="require('@/assets/articles/blurcamera.jpg')"
    >
      <v-layout
        fill-height
        align-center
        pa-3
      >
        <v-flex
          xs12
          md7
          offset-md5
        >
          <h1 class="display-3 font-weight-light">
            The Art Of Travel
          </h1>
          <div class="subheading text-uppercase pl-2 mb-4">
            Finding Beauty, One flight at a time
          </div>
          <v-btn
            color="primary"
            depressed
            rounded
          >
            Subscribe
          </v-btn>
        </v-flex>
      </v-layout>
    </v-img>
  </base-card>
</template>
