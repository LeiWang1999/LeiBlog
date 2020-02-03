<template>
<v-app>
  <v-container grid-list-xs>
      <v-card>
          <v-card-media src="src" height="200px">
          </v-card-media>
          <v-card-title primary-title>
              <div>
                  <h3 class="headline mb-0">headline</h3>
                  <div>description</div>
              </div>
          </v-card-title>
          <v-card-actions>
              <v-btn flat color="primary">404 NotFound</v-btn>
              <v-btn flat color="primary">text</v-btn>
          </v-card-actions>
      </v-card>
  </v-container>
</v-app>
</template>

<script>
export default {

}
</script>

<style>

</style>