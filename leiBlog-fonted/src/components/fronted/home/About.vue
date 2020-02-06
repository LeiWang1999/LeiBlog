<template>
  <v-container id="about" tag="section">
    <base-subheading>About Me</base-subheading>
    <p>电子信息专业在校生一枚，学习前端是因为兴趣和职责（其实电子也学得不错啦）。</p>
    <p>年级轻轻就成了全干攻城狮</p>
    <v-layout wrap pa-2>
      <v-btn
        :block="$vuetify.breakpoint.xsOnly"
        class="ma-0"
        color="secondary"
        style="height: 48px"
        router
        to="/about"
      >点击了解更多</v-btn>
    </v-layout>
  </v-container>
</template>
