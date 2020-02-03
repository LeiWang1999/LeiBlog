<template>
  <v-app>
    <Navbar />
    <v-content>
      <transition appear name="fade">
        <router-view />
      </transition>
    </v-content>
    <pageFooter />
  </v-app>
</template>

<script>
import Navbar from "@/components/fronted/Navbar";
import pageFooter from "@/components/fronted/pageFooter";
export default {
  name: "fontedindex",
  components: {
    Navbar,
    pageFooter
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>